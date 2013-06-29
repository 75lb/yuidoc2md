"use strict";
var exec = require("child_process").exec,
    spawn = require("child_process").spawn,
    fs = require("fs"),
    path = require("path"),
    util = require("util"),
    Y = require("yuidocjs"),
    mustache = require("mustache");

exports.getMarkdown = function(options){
    var output = [],
        json = (new Y.YUIDoc(options.yuidoc)).run();

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
