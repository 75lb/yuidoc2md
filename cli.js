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
$ yuidoc2md [options] <files>\n\
\n\
-t, --template    A handlebars template filename to override the default\n\
-j, --json        Output json\n\
-h, --help        Print this help\n";

var optionSet  = new Thing()
    .define({ name: "help", type: "boolean", alias: "h" })
    .define({ name: "input", alias: "i", type: Array, defaultOption: true })
    .define({ name: "template", alias: "t", type: "string" })
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
    var result = optionSet.json
        ? JSON.stringify(y2md.getJson(optionSet.input), null, "   ")
        : y2md.getMarkdown(optionSet.input, optionSet.template);
    if (optionSet.output){
        fs.writeFileSync(optionSet.output, result);
    } else {
        process.stdout.write(result);
    }

} else {
    console.error(red("Some option values were invalid"));
    optionSet.validationMessages.forEach(function(prop){
        prop.validationMessages.forEach(function(msg){
            console.error(prop.property, ":\t", msg);
        });
    });
}
