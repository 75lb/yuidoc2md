#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md"),
    fs = require("fs"),
    path = require("path"),
    Thing = require("nature").Thing;

global.l = console.log;
process.argv.splice(0, 2);

var options  = new Thing()
    .mixIn(y2md.getMarkdown.getOptions(), "getMD")
    .define({ name: "output-dir", alias: "o", default: "yuidoc2md" })
    .set(process.argv);

var generatedDocs = y2md.getMarkdown(options.where({ group: "getMD" }));

if (!fs.existsSync(options["output-dir"])){
    fs.mkdirSync(options["output-dir"]);
}

generatedDocs.forEach(function(generatedDoc){
    fs.writeFileSync(
        path.resolve(options["output-dir"], generatedDoc.name) + ".md", 
        generatedDoc.markdown
    );
});