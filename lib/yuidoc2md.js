"use strict";
var Thing = require("nature").Thing,
    fs = require("fs"),
    path = require("path"),
    os = require("os"),
    util = require("util"),
    Y = require("yuidocjs"),
    mustache = require("mustache"),
    l = console.log;

Array.prototype.first = function(prop, val){
    var result = this.filter(function(mod){ 
        return mod.name === name;
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
}

exports.getMarkdown = function(srcFileName){
    var output = [],
        tmp = getTempDir(srcFileName),
        yuidocOptions = { 
            quiet: true,
            norecurse: true,
            paths: [ tmp.dir ],
            writeJSON: false
        }; 

    var json = (new Y.YUIDoc(yuidocOptions)).run(),
        defaultTemplate = path.resolve(__dirname, "..", "templates", "class.mustache"),
        template = fs.readFileSync(defaultTemplate, "utf-8");

    fs.unlinkSync(tmp.file);

    for (var className in json.classes){
        var yuidocClass = json.classes[className];
    
        yuidocClass.properties = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            classitem.example = classitem.example || "";
            return classitem.file === yuidocClass.file && classitem.itemtype === "property";
        });
        yuidocClass.methods = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            classitem.example = classitem.example || "";
            /**
            matches based on file name,  needs to match on classname incase multi classes defined per file.
            */
            return classitem.file === yuidocClass.file && classitem.itemtype === "method";
        });
    
        var markdown = mustache.render(template, yuidocClass);
        output.push(markdown);
    }
    return output.join("\n");
};

exports.getJson = function(files){
    var output = { modules: [] },
        templatePath = path.resolve(__dirname, "..", "templates", "class.mustache"),
        template = fs.readFileSync(templatePath, "utf-8");

    if (!Array.isArray(files)){
        files = [ files ];
    }
    
    files.forEach(function(file){
        var tmp = getTempDir(file),
            yuidocOptions = { 
                quiet: true,
                norecurse: true,
                paths: [ tmp.dir ],
                writeJSON: false
            },
            json = (new Y.YUIDoc(yuidocOptions)).run();

        fs.unlinkSync(tmp.file);
        // l(JSON.stringify(json, null, "   "))
        
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
                    example: prop.example
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
                    params: method.params,
                    "return": method.return,
                    chainable: method.chainable
                });
            });
            
        }
    });
    return JSON.stringify(output, null, "   ")
};

function getTempDir(file, done){
    var tempDir = os.tmpdir(),
        tempFileName = path.resolve(tempDir, path.basename(file));
    if(!fs.existsSync(tempDir)){ 
        fs.mkdirSync(tempDir); 
    }
    fs.writeFileSync(tempFileName, fs.readFileSync(file));
    return { dir: tempDir, file: tempFileName };
}

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
