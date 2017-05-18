# terminal-translate
命令行翻译工具，翻译引擎支持： 百度-有道，陆续添加中~~~一直用网页版翻译真的很烦躁


## 翻译引擎支持

- [x] 百度翻译
- [ ] 有道翻译

...持续添加中

## 效果图
![](./example/1.png)

## 安装
```
npm install terminal-translate -g
```

## 帮助
`tr -h` 激活帮助菜单
```
  Usage: translate
  a tearmail-transtalte tool!
  GithubID: ShanaMaid
  Repository: https://github.com/ShanaMaid/terminal-translate.git

  Options:

    -h, --help               output usage information
    -v, --version            show version
    -f, --baidu-from <from>  baidu engine: from language, default: auto
    -t, --baidu-to <to>      baidu engine: to language, default: zh
    -l, --baidu-language     baidu engine language
    -e, --engine <to>        change translate engine
    -c, --config             show config.json

```
## 使用手册
单个单词翻译
```
tr word

translate word
```

多个单词以空格分隔
```
tr apple book

translate apple book
```

句子翻译请以双引号包裹
```
tr "I love your money!"

translate "I love your money"
```

单词句子混合同时翻译
```
tr apple book "I love your money!"

translate apple book "I love your money!"
```


``

## 翻译引擎

### 百度翻译引擎

修改百度翻译引擎语言翻译结果为英语，翻译结果不能修改`auto`
```
tr -t en
```

修改百度翻译引擎语言翻译起始语言为中文(不建议修改，默认值为auto，会自动检测)
```
tr -f zh
```

查看百度翻译引擎支持的语言翻译列表
```
tr -l
```

### 有道翻译引擎



## 配置文件
```
{
  "default": "baidu",
  "baidu": {
    "appid": "20170517000048160",
    "key": "1_S_7oC6uvfR0rSpQVk6",
    "from": "auto", ## 翻译起始语言，不建议修改，auto时引擎会自动检测语言
    "to": "zh",     ## 翻译结果语言
    "language": {
      "zh": "中文 - Chinese",
      "en": "英语 - English",
      "yue": "粤语 - Cantonese",
      "wyw": "文言文 - Classical Chinese",
      "jp": "日语 - Japanese",
      "kor": "韩语 - Korean",
      "fra": "法语 - French",
      "spa": "西班牙语 - Spanish",
      "th": "泰语 - Thai",
      "ara": "阿拉伯语 - Arabic",
      "ru": "俄语 - Russian",
      "pt": "葡萄牙语 - Portuguese",
      "de": "德语 - German",
      "it": "意大利语 - Italian",
      "el": "希腊语 - Greek",
      "nl": "荷兰语 - Dutch",
      "pl": "波兰语 - Polish",
      "bul": "保加利亚语 - Bulgarian",
      "est": "爱沙尼亚语 - Estonian",
      "dan": "丹麦语 - Danish",
      "fin": "芬兰语 - Finnish",
      "cs": "捷克语 - Czech",
      "rom": "罗马尼亚语 - Romanian",
      "slo": "斯洛文尼亚语 - Slovenia language",
      "swe": "瑞典语 - Swedish",
      "hu": "匈牙利语 - Hungarian",
      "cht": "繁体中文 - Traditional Chinese",
      "vie": "越南语 - Vietnamese"
    }
  },
  "youdao": {
    "key": "1253992655",
    "keyfrom": "ShanaTranslate"
  }
}
```


