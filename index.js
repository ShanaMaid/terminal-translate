#!/usr/bin/env node


// 翻译引擎
const baidu = require('./engine/baidu');
const youdao = require('./engine/youdao');
const iciba = require('./engine/iciba');
const engine = {baidu, youdao, iciba};




// 翻译
module.exports = (query, config) => {
  engine[config.default](query, config)
};
