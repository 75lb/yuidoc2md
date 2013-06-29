var y2md = require("./lib/yuidoc-to-markdown");

y2md.generate({ paths: [ './hdx' ], exclude: "hdx/js/libs" });