#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md");

global.l = console.log;

var markdowns = y2md.getMarkdown({
    yuidoc: { 
        paths: [ "test/fixture" ], 
        writeJSON: false
    }
});

l(markdowns);

// var paths = {
//         templates: path.resolve("doc-generation", "templates"),
//         output: path.resolve("doc-generation", "md"),
//         classTemplate: path.resolve("doc-generation", "templates", "class.mustache"),
//         debug: path.resolve("doc-generation", "debug")
//     },
// 
//     if (debug){
//         grunt.file.write(
//             path.resolve(paths.debug, className + ".json"), 
//             JSON.stringify(yuidocData, null, "\t")
//         );
//     }
//     
// mdPath = path.resolve(paths.output, className + ".md");
// 
// grunt.file.write(mdPath, output);
// grunt.log.ok(mdPath + " created.");
