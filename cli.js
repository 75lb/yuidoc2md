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
$ yuidoc2md [options] <src-dir> <src-dir> ...\n\
\n\
-d, --output-dir  Where the output markdown files will be written\n\
-e, --exclude     A comma-separated list of source directories to exclude\n\
-t, --template    Override the built-in moustache template\n\
-i, --input       Input file to process\n\
-o, --output      Output file\n\
-h, --help        Print this help\n\n";

var optionSet  = new Thing()
    .mixIn(new y2md.MarkdownOptions(), "getMD")
    .define({ name: "output-dir", alias: "o", default: "yuidoc2md" })
    .define({ name: "help", type: "boolean", alias: "h" })
    .on("error", function(err){
        console.error(red("Error: ") + err.message);
        process.exit(1);
    })
    .set(process.argv);

if (optionSet.help){
    console.log(usage);
    process.exit(0);
}

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
