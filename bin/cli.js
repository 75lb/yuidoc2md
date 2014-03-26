#!/usr/bin/env node
"use strict";

var y2md = require("../lib/yuidoc2md"),
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

var argv  = new Model()
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
if (argv.help || (!argv.input)){
    dope.log(usage);
    process.exit(0);
}

if (argv.valid){
    var stats = new mfs.FileStats(argv.input);
    var result = argv.json
        ? JSON.stringify(y2md.getJson(stats.files), null, "   ")
        : y2md.getMarkdown(stats.files, argv.template);
    process.stdout.write(result);
    
    if (stats.files.length){
        dope.green.underline.error("Processed:");
        dope.error(stats.files.join("\n").trim());
    } else {
        
    }
    if (stats.dirs.length){
        dope.cyan.underline.error("Not files, ignored:");
        dope.error(stats.dirs.join("\n").trim());
    }
    if (stats.notExisting.length){
        dope.cyan.underline.error("Do not exist:");
        dope.error(stats.notExisting.join("\n").trim());
    }

} else {
    dope.red.error("Some option values were invalid");
    dope.error(argv.validationMessages.toString());
}
