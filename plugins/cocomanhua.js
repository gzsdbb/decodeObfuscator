//自动解析cocomanhuan加密密钥

//先加载通用解密
require('./commonPlugin.js');

let map = new Map();

const extratKeys = {
    CallExpression(path) {
        const {
            callee, arguments
        } = path.node;
        if (types.isMemberExpression(callee) && arguments.length === 2) {
            let {
                object, property
            } = callee;
            if (!types.isMemberExpression(object)) return
            if (object.object.name === "window" && object.property.name === "devtools" && property.name === "jsd") {

                let[key, tar] = arguments;
                if (!types.isMemberExpression(tar.callee)) return;
                let key_name = tar.callee.object.arguments[0].property.name;
                let _set = map.get(key_name) || new Set();
                let decodeKey = getBindingValue(key, path);
                _set.add(decodeKey);
                map.set(key_name, _set)

            }
        }
    }
}

console.info('extra cocomanahua keys...');

traverse(ast, extratKeys);

for ([key, value] of map) {
    map.set(key, Array.from(value))
}

let keys = JSON.stringify(Object.fromEntries(map)),
keysFile = "./coco_keys.json";

const fs = require('fs');
fs.writeFile(keysFile, keys, (err) => {});

