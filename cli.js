#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md"),
    fs = require("fs"),
    path = require("path"),
    Thing = require("nature").Thing;

function red(txt){
    return "\x1b[31m" + txt + "\x1b[0m";
}

var optionSet  = new Thing()
    .mixIn(new y2md.getMarkdownOptions(), "getMD")
    .define({ name: "output-dir", alias: "o", default: "yuidoc2md" })
    .on("error", function(err){
        console.error(red("Error: ") + err.message);
        process.exit(1);
    })
    .set(process.argv);

if (optionSet.valid){
    var generatedDocs = y2md.getMarkdown(optionSet.where({ group: "getMD" }));

    if (!fs.existsSync(optionSet["output-dir"])){
        fs.mkdirSync(optionSet["output-dir"]);
    }

    if (generatedDocs){
        generatedDocs.forEach(function(generatedDoc){
            fs.writeFileSync(
                path.resolve(optionSet["output-dir"], generatedDoc.name) + ".md", 
                generatedDoc.markdown
            );
        });
    }

} else {
    console.error(red("Some option values were invalid"));
    optionSet.validationMessages.forEach(function(prop){
        prop.validationMessages.forEach(function(msg){
            console.error(prop.property, ":\t", msg);
        });
    });
}
