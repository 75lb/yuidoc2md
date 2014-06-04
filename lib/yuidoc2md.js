"use strict";
var fs = require("fs"),
    path = require("path"),
    Y = require("yuidocjs"),
    handlebars = require("handlebars"),
    w = require("wodge"),
    mfs = require("more-fs");

/* module API */
exports.getMarkdown = getMarkdown;
exports.getJson = getJson;

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

/**
Return markdown format documentation for the supplied files
@param {string|string[]} - source code files to extract docs from
@param {string} [templatePath="templates/class.hbs"] - the path to the handlebars template
@return {string}
*/
function getMarkdown(files, templatePath){
    files = w.arrayify(files);
    templatePath = templatePath || path.resolve(__dirname, "..", "templates", "class.hbs");

    var json = exports.getJson(files),
        template = fs.readFileSync(templatePath, "utf-8"),
        markdown = handlebars.compile(template)(json);
    return markdown;
}

/**
Return the yuidoc documentation in a data structure suitable for feeding into a template engine
@param {string|string[]} - source code files
@return {Object}
*/
function getJson(files){
    files = w.arrayify(files);

    var output = { modules: [] },
        tmpDir = mfs.getTempDir("yuidoc2md"),
        yuidocOptions = {
            quiet: true,
            norecurse: false,
            paths: [ tmpDir ],
            writeJSON: false
        };

    mfs.copy(files, tmpDir);
    var json = (new Y.YUIDoc(yuidocOptions)).run();

    for (var className in json.classes){
        var clss = json.classes[className],
            module;

        if (clss.module) {
            module = w.first(output.modules, "name", clss.module);
            if (!module){
                module = new Module(clss.module);
                output.modules.push(module);
            }
        } else {
            module = new Module();
            output.modules.push(module);
        }

        var outputClass = w.first(module.classes, "name", clss.name);
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
    mfs.rmdir(tmpDir);
    return output;
}
