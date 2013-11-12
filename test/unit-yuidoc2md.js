var assert = require("assert"),
    yuidoc2md = require("../lib/yuidoc2md"),
    fs = require("fs");

// describe("getMarkdown()", function(){
//     it("one class", function(){
//         var result = yuidoc2md.getMarkdown("test/fixture/one-class.js"),
//             expected = fs.readFileSync("test/expected/one-class.md", "utf-8");
//         assert.equal(result, expected);
//     });
// 
//     it("two classes", function(){
//         var result = yuidoc2md.getMarkdown("test/fixture/two-classes.js"),
//             expected = fs.readFileSync("test/expected/two-classes.md", "utf-8");
//         assert.equal(result, expected);
//     });
// });

describe("getJson(files)", function(){
    it("multiple files", function(){
        var result = yuidoc2md.getJson([
                "test/fixture/ComboBox.js",
                "test/fixture/mixins.js",
                "test/fixture/Select.js"
            ]),
            expected = fs.readFileSync("test/expected/getJson.json", "utf-8");
        assert.equal(result, expected);
    });
});
