const http = require('http');
const chalk = require('chalk');

module.exports = (query, config) => {
  const pos = Math.floor(Math.random() * config.youdao.length);
  const key = config.youdao[pos].key;
  const keyfrom = config.youdao[pos].keyfrom;
  const q = query.join(' ');
  const data = {
    key,
    keyfrom,
    type: 'data',
    doctype: 'json',
    version: '1.1',
    q
  }

  const errorCode = {
    0: '正常',
    20: '要翻译的文本过长',
    30: '无法进行有效的翻译',
    40: '不支持的语言类型',
    50: '无效的key',
    60: '无词典结果,仅在获取词典结果生效'
  }

  let url = 'http://fanyi.youdao.com/openapi.do?';

  for (let item in data) {
    url += `${item}=${data[item]}&`;
  }

  url = encodeURI(url);

  http.get(url, (res) => {
    var resData = "";
    res.on("data",function(data){
      resData += data;
    });
    res.on("end", function() {
      resData = JSON.parse(resData);
      let str = '';
      if (resData.errorCode === 0) {
        str += `\r\n  ${chalk.green('~')} ${chalk.cyan(resData.query)}`;
        
        if ('basic' in resData) {
          let basic = resData.basic
          if ('phonetic' in basic) {
            str +=  chalk.magenta(` - [${basic.phonetic}]`);
          }
          if ('us-phonetic' in basic) {
            str += chalk.magenta(`   美[${basic['us-phonetic']}]`);
          }
          if ('uk-phonetic' in basic) {
            str += chalk.magenta(`   英[${basic['uk-phonetic']}]`);
          }
          str += `\r\n  ${chalk.green('~')} ${chalk.cyan(resData.translation.join(','))}`;
          
          if ('explains' in basic) {
            str += `\r\n`;
            for (let item of basic.explains) {
              str += chalk.green(`\r\n   -  ${item}`);
            }
            str += `\r\n`;
          }
        } else {
          str += `\r\n  ${chalk.green('~')} ${chalk.cyan(resData.translation.join(','))}`;
        }
        

        if ('web' in resData) {
          let count = 1;
          let regExp = new RegExp(`(${query.join('|')})`, 'ig');
          for (let item of resData.web) {
            str += `\r\n   ${chalk.gray(count++)}. ${item.key.replace(regExp, chalk.yellow(`$&`))}`;
            str += chalk.blue(`\r\n     ${item.value.join(',')} \r\n`);
          }
          str += `\r\n`;
        }

        console.log(str)
        // console.log(resData);
      } else {
        console.log(errorCode[resData.errorCode]);
      }
    });
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });

}