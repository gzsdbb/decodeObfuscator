/*****************************************************
Module name:main.js
Author:悦来客栈的老板
Date:2022.04.06


混淆工具地址:https://obfuscator.io/

脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！


使用方法可以观看在线视频:

https://www.bilibili.com/video/BV16V411H7yz

*****************************************************/

const fs = require('fs');
const usefulPlugins = require("./tools/usefulPlugins");
const decodeObfuscator = require("./tools/decodeOb");
const consoleColor = require("./tools/consoleColor");


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

    //加载ast插件
    process.argv.length > 3 ? require("./" + process.argv[3]) : require('./commonPlugin.js')

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
    console.log("Usage: node main.js <decrypted.js> [<plugin.js>]")
}