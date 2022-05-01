
const fs = require('fs');
const usefulPlugins = require("./tools/usefulPlugins");
const decodeObfuscator = require("./tools/decodeOb");
const consoleColor = require("./tools/consoleColor");
const  load = require("./tools/pluginLoader").default;


//js混淆代码读取
if (process.argv.length > 2) {
    encodeFile = process.argv[2];

    decodeFile = encodeFile.replace(/js$/, "decrypted.js");

    //将源代码解析为AST
    let sourceCode = fs.readFileSync(encodeFile, {
        encoding: "utf-8"
    });
    global.ast = parser.parse(sourceCode);

    console.time("处理完毕，耗时");

    //加载解密ast集合
    process.argv.length > 3 ? load(process.argv[3]) : load();

    console.timeEnd("处理完毕，耗时");

    let { code} = generator(ast, opts = {
        jsescOption: {
            "minimal": true
        }
    });

    fs.writeFile(decodeFile, code, (err) => {});

    console.info("源文件: " + encodeFile);
    console.info("解密文件: " + decodeFile)
} else {
    console.log("Usage: node main.js <decrypted_js_path> [<plugin_name>]")
}