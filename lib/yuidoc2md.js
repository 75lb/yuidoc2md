"use strict";
var Thing = require("nature").Thing,
    fs = require("fs"),
    path = require("path"),
    os = require("os"),
    util = require("util"),
    Y = require("yuidocjs"),
    mustache = require("mustache"),
    l = console.log;

/**
@method getMarkdown
@return Array
@example
    [
        {
            name: "ClassA",
            yuidocClass: {
                name: 'ClassB',
                shortname: 'ClassB',
                classitems: [],
                plugins: [],
                <etc..>
            },
            markdown: "#ClassB\n\nThe description for ClassA\n\n\n etc etc"
        },
        {
            name: "ClassA",
            <etc..>
        }
    ]
*/
exports.getMarkdown = function(options){
    options = new exports.MarkdownOptions().set(options);
    
    if (!options.valid){
        throw new Error(JSON.stringify(options.validationMessages));
        return;
    }

    var output = [],
        yuidocOptions = { 
            paths: options.paths,
            writeJSON: false,
            exclude: options.exclude
        }; 
    
    var json = (new Y.YUIDoc(yuidocOptions)).run(),
        defaultTemplate = path.resolve(__dirname, "..", "templates", "class.mustache"),
        template = fs.readFileSync(options.template || defaultTemplate, "utf-8");

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

        var generatedClass = {
            name: className,
            yuidocClass: yuidocClass,
            markdown: markdown
        };
        output.push(generatedClass);
    }
    return output;
};

exports.getMarkdown2 = function(srcFileName){
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
