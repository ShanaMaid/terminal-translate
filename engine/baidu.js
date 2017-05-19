const http = require('http');
const MD5 = require('../lib/md5');
const chalk = require('chalk');

module.exports = (query, config) => {
  const appid = config.baidu.appid;
  const key = config.baidu.key;
  let languageFrom = config.baidu.from;
  let languageTo = config.baidu.to;
  const salt = (new Date).getTime();
  query = query.join('\n');

  const data = {
    q: query,
    from: languageFrom,
    to: languageTo,
    appid,
    salt, 
    sign: MD5(appid + query + salt + key)
  }

 
  let url = "http://api.fanyi.baidu.com/api/trans/vip/translate?";
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
      let template = `\r\n ${chalk.green('~')} query \r\n ${chalk.green('~')} result \r\n`;
      let str = '\r\n';
      if (!("trans_result" in resData)) {
        console.log('查询出错!错误信息如下:');
        console.log(resData)
        return;
      }
      for (let item of resData.trans_result) {
        str += template.replace('query', chalk.cyan(item.src)).replace('result', chalk.cyan(item.dst));
      }
      console.log(str);
    });
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}