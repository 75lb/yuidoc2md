var exec = require("child_process").exec,
    spawn = require("child_process").spawn,
    fs = require("fs"),
    path = require("path"),
    util = require("util"),
    Y = require("yuidocjs"),
    mustache = require("mustache");

exports.getMarkdown = function(options){
    var paths = {
            templates: path.resolve("doc-generation", "templates"),
            output: path.resolve("doc-generation", "md"),
            classTemplate: path.resolve("doc-generation", "templates", "class.mustache"),
            debug: path.resolve("doc-generation", "debug")
        },
        classTemplate = grunt.file.read(paths.classTemplate),
        output = [],
        json = (new Y.YUIDoc(options.yuidoc)).run();

    for (var className in json.classes){
        var classData = json.classes[className];
        
        classData.properties = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            return classitem.file === classData.file && classitem.itemtype === "property";
        });
        classData.methods = json.classitems.filter(function(classitem){
            classitem.description = classitem.description || "";
            return classitem.file === classData.file && classitem.itemtype === "method";
        });
        
        var md = mustache.render(classTemplate, classData),
            mdPath = path.resolve(paths.output, className + ".md");

        if (debug){
            grunt.file.write(
                path.resolve(paths.debug, className + ".json"), 
                JSON.stringify(classData, null, "\t")
            );
        } 

        grunt.file.write(mdPath, output);
        grunt.log.ok(mdPath + " created.");
    }
}
