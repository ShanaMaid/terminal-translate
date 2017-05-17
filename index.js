#!/usr/bin/env node

const fs = require("fs");

// 翻译引擎
const baidu = require('./engine/baidu');
const youdao = require('./engine/youdao');
const engine = {baidu, youdao};

// 输入
const query = process.argv.splice(2).join("\n");


// 载入配置文件
let config = fs.readFileSync('config.json');
config = JSON.parse(config);



// 翻译
engine[config.default](query);
