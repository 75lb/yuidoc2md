"use strict";
var exec = require("child_process").exec,
    spawn = require("child_process").spawn,
    Thing = require("nature").Thing,
    fs = require("fs"),
    path = require("path"),
    util = require("util"),
    Y = require("yuidocjs"),
    mustache = require("mustache");

exports.getMarkdown = function(options){
    options = new Thing()
        .define({ name: "paths", type: Array, defaultOption:true, required: true })
        .define({ name: "exclude", alias: "e", type: "string" })
        .set(options);
    
    if (!options.valid){
        console.error(options.validationMessages);
        process.exit(1);
    }

    var output = [];
    var yuidocOptions = { paths: options.paths, writeJson: false }; 
    if (options.exclude){
        yuidocOptions.exclude = options.exclude;
    }
    
    var json = (new Y.YUIDoc(options.yuidoc)).run();

    for (var className in json.classes){
        var yuidocClass = json.classes[className];
        
        yuidocClass.properties = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            return classitem.file === yuidocClass.file && classitem.itemtype === "property";
        });
        yuidocClass.methods = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            return classitem.file === yuidocClass.file && classitem.itemtype === "method";
        });
        
        var markdown = mustache.render(options.template, yuidocClass);

        var generatedClass = {
            name: className,
            yuidocClass: yuidocClass,
            markdown: markdown
        };
        output.push(generatedClass);
    }
    return output;
}
