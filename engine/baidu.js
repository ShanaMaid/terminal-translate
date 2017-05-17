const http = require('http');
const MD5 = require('../lib/md5');
const utf8 = require('utf8');
const fs = require("fs");

module.exports = (query, to = 'zh') => {
  let config = fs.readFileSync('config.json');
  config = JSON.parse(config);
  const appid = config.baidu.appid;
  const salt = (new Date).getTime();
  const data = {
    q: query,
    from: 'auto',
    to,
    appid,
    salt, 
    sign: MD5(appid + query + salt + config.baidu.key)
  }

  let url = "http://api.fanyi.baidu.com/api/trans/vip/translate?";
  for (let item in data) {
    url += `${item}=${data[item]}&`;
  }

  http.get(url, (res) => {
    var resData = "";
    res.on("data",function(data){
      resData += data;
    });
    res.on("end", function() {
      resData = JSON.parse(resData);
      let template = ` ~ 原文: query \r\n ~ 译文: result \r\n \r\n`;
      let str = '';
      for (let item of resData.trans_result) {
        str += template.replace('query', item.src).replace('result', item.dst);
      }
      console.log(str);
    });
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}