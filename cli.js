#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md"),
    fs = require("fs"),
    path = require("path"),
    Thing = require("nature").Thing;

function red(txt){
    return "\x1b[31m" + txt + "\x1b[0m";
}

var usage = "Usage:\n\
$ yuidoc2md [options] \n\
\n\
-t, --template    Override the built-in moustache template\n\
-i, --input       Input file to process\n\
-o, --output      Output file\n\
-h, --help        Print this help\n\n";

var optionSet  = new Thing()
    .define({ name: "help", type: "boolean", alias: "h" })
    .define({ name: "input", type: "string", alias: "i" })
    .define({ name: "output", type: "string", alias: "o" })
    .define({ name: "json", type: "boolean", alias: "j" })
    .on("error", function(err){
        console.error(red("Error: ") + err.message);
        process.exit(1);
    })
    .set(process.argv);

if (optionSet.help || (!optionSet.input && !optionSet.paths)){
    console.log(usage);
    process.exit(0);
}

if (optionSet.valid){
    if (optionSet.json){
        console.log(y2md.getJson(optionSet.input));
    } else {
        var md = y2md.getMarkdown(optionSet.input);
        if (optionSet.output){
            fs.writeFileSync(optionSet.output, md);
        } else {
            console.log(md);
        }
    }

} else {
    console.error(red("Some option values were invalid"));
    optionSet.validationMessages.forEach(function(prop){
        prop.validationMessages.forEach(function(msg){
            console.error(prop.property, ":\t", msg);
        });
    });
}
