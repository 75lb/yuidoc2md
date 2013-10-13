var assert = require("assert"),
    yuidoc2md = require("../lib/yuidoc2md"),
    fs = require("fs");

it("summary", function(){
    var input = fs.readFileSync("test/fixture/src/classC.js");
    var result = yuidoc2md.getMarkdown2(input);
    assert.equal(input, result);
});
