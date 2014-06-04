#!/usr/bin/env node
"use strict";

var y2md = require("../lib/yuidoc2md"),
    mfs = require("more-fs"),
    cliArgs = require("command-line-args"),
    dope = require("console-dope");

var usage = "Usage:\n\
$ yuidoc2md [options] <files>\n\
\n\
-t, --template    A handlebars template filename to override the default\n\
-j, --json        Output json\n\
-h, --help        Print this help\n";

try{
	var argv  = cliArgs([
		{ name: "help", type: Boolean, alias: "h" },
		{ name: "input", alias: "i", type: Array, defaultOption: true },
		{ name: "template", alias: "t", type: String },
		{ name: "json", type: Boolean, alias: "j" }
	]).parse();
} catch (err){
    dope.red.error("Error: " + err.message);
    process.exit(1);
}

/* End here with usage instructions if `--help` or no `--input` specified */
if (argv.help || (!argv.input)){
    dope.log(usage);
    process.exit(0);
}

var stats = new mfs.FileSet(argv.input);
var result = argv.json
    ? JSON.stringify(y2md.getJson(stats.files), null, "   ")
    : y2md.getMarkdown(stats.files, argv.template);
process.stdout.write(result);

if (stats.files.length){
    dope.green.underline.error("Processed:");
    dope.error(stats.files.join("\n").trim());
}
if (stats.dirs.length){
    dope.cyan.underline.error("Not files, ignored:");
    dope.error(stats.dirs.join("\n").trim());
}
if (stats.notExisting.length){
    dope.cyan.underline.error("Do not exist:");
    dope.error(stats.notExisting.join("\n").trim());
}
