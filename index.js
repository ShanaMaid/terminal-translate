#!/usr/bin/env node


// 翻译引擎
const baidu = require('./engine/baidu');
const youdao = require('./engine/youdao');
const engine = {baidu, youdao};




// 翻译
module.exports = (query, config) => {
  engine[config.default](query, config)
};
