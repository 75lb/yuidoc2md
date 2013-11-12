var assert = require("assert"),
    yuidoc2md = require("../lib/yuidoc2md"),
    fs = require("fs");

it("override template");

describe("getMarkdown()", function(){
    it("one file", function(){
        var result = yuidoc2md.getMarkdown("test/fixture/Select.js"),
            expected = fs.readFileSync("test/expected/Select.md", "utf-8");
        assert.equal(result, expected);
    });

    it("multiple files", function(){
        var result = yuidoc2md.getMarkdown([
                "test/fixture/ComboBox.js",
                "test/fixture/mixins.js",
                "test/fixture/Select.js"
            ]),
            expected = fs.readFileSync("test/expected/multi.md", "utf-8");
        assert.equal(result, expected);
    });
});

describe("getJson(files)", function(){
    it("multiple files", function(){
        var result = yuidoc2md.getJson([
                "test/fixture/ComboBox.js",
                "test/fixture/mixins.js",
                "test/fixture/Select.js"
            ]),
            expected = fs.readFileSync("test/expected/getJson.json", "utf-8");
        assert.equal(JSON.stringify(result, null, "   "), expected);
    });
});
