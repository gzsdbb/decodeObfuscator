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
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./input/demo.js";
//process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./output/decodeResult.js";
decodeFile = process.argv[2] + ".decrypted.js"
//多个文件输入

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {
    encoding: "utf-8"
});
let ast = parser.parse(sourceCode);

console.time("处理完毕，耗时");


//字面量解混淆
console.info("traverse Hex or Unicode String.......");

traverse(ast, simplifyLiteral);

console.info("constantFold.......");

traverse(ast, constantFold);

console.info("delete Repeat Define.......");

traverse(ast, deleteRepeatDefine);

traverse(ast, SimplifyIfStatement);

traverse(ast, standardLoop);

console.info("resolve Sequence.......");

traverse(ast, resolveSequence);

console.info("traverse CallExpress To ToLiteral.......");

traverse(ast, CallExpressToLiteral);

console.info("constantFold.......");

traverse(ast, constantFold);


//object key值Literal
console.info("Object Preconditioning .......");

traverse(ast, keyToLiteral);

traverse(ast, preDecodeObject);

//处理object

console.info("Object Decode .......");


traverse(ast, decodeObject);


console.info("Control Flow Decoding.......");

traverse(ast, decodeControlFlow);

console.info("constantFold.......");

traverse(ast, constantFold);
try {
    console.info("remove Dead Code.......");

    traverse(ast, removeDeadCode);

    ast = parser.parse(generator(ast)
        .code);

    traverse(ast, removeDeadCode);

    traverse(ast, simplifyLiteral);


    //可能会误删一些代码，可屏蔽
    traverse(ast, deleteObfuscatorCode);
} catch (e) {
    console.warn("remove Dead Code failed")
}

console.timeEnd("处理完毕，耗时");

let { code} = generator(ast, opts = {
    jsescOption: {
        "minimal": true
    }
});

fs.writeFile(decodeFile, code, (err) => {});

console.info("源文件: " + encodeFile);
console.info("解密文件: " + decodeFile)