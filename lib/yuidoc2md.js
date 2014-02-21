"use strict";
var Thing = require("nature").Thing,
    fs = require("fs"),
    path = require("path"),
    os = require("os"),
    util = require("util"),
    Y = require("yuidocjs"),
    handlebars = require("handlebars");

Array.prototype.first = function(prop, val){
    var result = this.filter(function(mod){
        return mod[prop] ? mod[prop] === val : false;
    });
    return result ? result[0] : null;
};

function Module(name){
    this.name = name;
    this.classes = [];
}
function Class(name){
    this.name = name;
    this.properties = [];
    this.methods = [];
    this.events = [];
}

function arrayify(input){
    return Array.isArray(input) ? input : [ input ];
}

function getTempDir(files){
    var tempDir = path.join(os.tmpdir(), "yuidoc2md");
    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir);
    }
    files.forEach(function(file){
        var tempFileName = path.resolve(tempDir, path.basename(file));
        fs.writeFileSync(tempFileName, fs.readFileSync(file));
    });
    return tempDir;
}
function rmDir(dirName){
    fs.readdirSync(dirName).forEach(function(file){
        fs.unlinkSync(path.join(dirName, file));
    });
    fs.rmdirSync(dirName);
}

exports.getMarkdown = function(files, templatePath){
    files = arrayify(files);
    templatePath = templatePath || path.resolve(__dirname, "..", "templates", "class.hbs");

    var json = exports.getJson(files),
        template = fs.readFileSync(templatePath, "utf-8"),
        markdown = handlebars.compile(template)(json);
    return markdown;
};

exports.getJson = function(files){
    files = arrayify(files);

    var output = { modules: [] },
        tmpDir = getTempDir(files),
        yuidocOptions = {
            quiet: true,
            norecurse: true,
            paths: [ tmpDir ],
            writeJSON: false
        },
        json = (new Y.YUIDoc(yuidocOptions)).run();
        
    for (var className in json.classes){
        var clss = json.classes[className],
            module;

        if (clss.module) {
            module = output.modules.first("name", clss.module);
            if (!module){
                module = new Module(clss.module);
                output.modules.push(module);
            }
        } else {
            module = new Module();
            output.modules.push(module);
        }

        var outputClass = module.classes.first("name", clss.name);
        if (!outputClass){
            outputClass = new Class(clss.name);
            module.classes.push(outputClass);
        }
        outputClass.description = clss.description;
        outputClass.extends = clss.extends;
        outputClass.uses = clss.uses;
        outputClass.constructorArgs = clss.params;
        outputClass.examples = clss.example;

        var properties = json.classitems.filter(function(item){
            return  item.itemtype === "property" &&
                    item.class === outputClass.name &&
                    item.module === module.name;
        });
        properties.forEach(function(prop){
            outputClass.properties.push({
                name: prop.name,
                type: prop.type,
                default: prop.default,
                examples: prop.example,
                description: prop.description
            });
        });

        var methods = json.classitems.filter(function(item){
            return  item.itemtype === "method" &&
                    item.class === outputClass.name &&
                    item.module === module.name;
        });
        methods.forEach(function(method){
            outputClass.methods.push({
                name: method.name,
                description: method.description,
                chainable: method.chainable ? "true" : null,
                params: method.params,
                returns: method.return,
                examples: method.example
            });
        });

        var events = json.classitems.filter(function(item){
            return  item.itemtype === "event" &&
                    item.class === outputClass.name &&
                    item.module === module.name;
        });
        events.forEach(function(evt){
            outputClass.events.push({
                name: evt.name,
                description: evt.description,
                params: evt.params,
                examples: evt.example
            });
        });
    }
    rmDir(tmpDir);
    return output;
};

exports.MarkdownOptions = function(){
    Thing.call(this);
    this.define({
            name: "paths", type: Array, defaultOption:true, required: false,
            valueTest: function(paths){
                return paths.every(function(path){
                    return fs.statSync(path).isDirectory();
                });
            },
            valueFailMsg: "All specified paths must be directories."
        })
        .define({ name: "exclude", alias: "e", type: "string", default: "" })
        .define({ name: "template", alias: "t", type:"string" });
};
util.inherits(exports.MarkdownOptions, Thing);
