var assert = require("assert"),
    yuidoc2md = require("../lib/yuidoc2md"),
    fs = require("fs");

it("one class", function(){
    var result = yuidoc2md.getMarkdown2("test/fixture/src/one-class.js"),
        expected = fs.readFileSync("test/fixture/expected/one-class.md", "utf-8");
    assert.equal(result, expected);
});

it("two classes", function(){
    var result = yuidoc2md.getMarkdown2("test/fixture/src/two-classes.js"),
        expected = fs.readFileSync("test/fixture/expected/two-classes.md", "utf-8");
    assert.equal(result, expected);
});
