#!/usr/bin/env node

const program = require('commander');
const fs = require("fs");
const translate = require("../index.js");
const path = require('path');

const configPath = path.resolve(__dirname, '../config.json');

const config = JSON.parse(fs.readFileSync(configPath));
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

program
  .usage(`\r\n  ${package.description}\r\n  GithubID: ${package.author}\r\n  Repository: ${package.repository.url}`)
  .option('-v, --version', 'show version')
  .option('-f, --baidu-from <from>', 'baidu engine: from language, default: auto')
  .option('-t, --baidu-to <to>', 'baidu engine: to language, default: zh')
  .option('-l, --baidu-language', 'baidu engine language')
  .option('-e, --engine <engine>', 'change translate engine')
  .option('-c, --config', 'show config.json')
  .parse(process.argv);

// baidu-engine language: from
if (program.baiduFrom) {
  let language = config.baidu.language;
  if (program.baiduFrom === config.baidu.to) {
    console.log('Error! The "from" must be diffent from "to" ');
    return;
  }
  for (let item in language) {
    if (item === program.baiduFrom || program.baiduFrom === 'auto') {
      config.baidu.from = program.baiduFrom;
      fs.writeFileSync(configPath, JSON.stringify(config));
      console.log('success!');
      return;
    }
  }
  console.log('Error!\r\n  ~The "from" is not exsit!You can use tr -l to show language list!');
}

// baidu-engine language: to
else if (program.baiduTo) {
  let language = config.baidu.language;
  if (program.baiduTo === config.baidu.from) {
    console.log('Error! The "to" must be diffent from "from" ');
    return;
  }
  for (let item in language) {
    if (item === program.baiduTo) {
      config.baidu.to = program.baiduTo;
      fs.writeFileSync(configPath, JSON.stringify(config));
      console.log('success!');
      return;
    }
  }
  console.log('Error!\r\n  ~The "from" is not exsit!You can use tr -l to show language list!');
}

// show baidu-engine language
else if (program.baiduLanguage) {
  let language = config.baidu.language;
  console.log('\r\n You can use:\r\n');
  console.log(language);
}

// change engine
else if (program.engine) {
  if (program.engine !== 'default' && (program.engine in config)) {
    config.default = program.engine;
    fs.writeFileSync(configPath, JSON.stringify(config));
    console.log('success!');
    return;
  }
  delete config.default;
  console.log(`Error!\r\n  ~ The ${program.engine} is not exsit! \r\n  ~ Your input should be one of: `);
  for (let item in config) {
    console.log(`   ~  ${item}`);
  }
}

// show config.json
else if(program.config) {
  delete config.baidu.language;
  console.log(config);
}

// translate
else if (program.args.length > 0) {
  translate(program.args, config);
}

// default
else {
  console.log('\r\n Welcome to use terminal-translate tools!You can use tr -h to get more help!')
}


