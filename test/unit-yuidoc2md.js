var assert = require("assert"),
    yuidoc2md = require("../lib/yuidoc2md"),
    fs = require("fs");

it("test override template");
it("should print an index of properties or methods list length is long");
it("sort property and methods by name?");
it("should doc events");
it("should doc optional properties");
it("should order output classes according to order of input files");

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
