#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md"),
    fs = require("fs"),
    mfs = require("more-fs"),
    path = require("path"),
    Model = require("nature").Model,
    dope = require("console-dope");

var usage = "Usage:\n\
$ yuidoc2md [options] <files>\n\
\n\
-t, --template    A handlebars template filename to override the default\n\
-j, --json        Output json\n\
-h, --help        Print this help\n";

var optionSet  = new Model()
    .define({ name: "help", type: "boolean", alias: "h" })
    .define({ name: "input", alias: "i", type: Array, defaultOption: true })
    .define({ name: "template", alias: "t", type: "string" })
    .define({ name: "json", type: "boolean", alias: "j" })
    .on("error", function(err){
        dope.red.error("Error: " + err.message);
        process.exit(1);
    })
    .set(process.argv);

/* End here with usage instructions if `--help` or no `--input` specified */
if (optionSet.help || (!optionSet.input)){
    dope.log(usage);
    process.exit(0);
}

if (optionSet.valid){
    var stats = new mfs.FileStats(optionSet.input);
    var result = optionSet.json
        ? JSON.stringify(y2md.getJson(stats.files), null, "   ")
        : y2md.getMarkdown(stats.files, optionSet.template);
    process.stdout.write(result);
    
    if (stats.dirs.length){
        dope.red.log("Input must be files only, these directories were ignored: ");
        dope.log(stats.dirs.join("\n").trim());
    }
    if (stats.notExisting.length){
        dope.red.log("These files do not exist: ");
        dope.log(stats.notExisting.join("\n").trim());
    }

} else {
    dope.red.error("Some option values were invalid");
    dope.error(optionSet.validationMessages.toString());
}
