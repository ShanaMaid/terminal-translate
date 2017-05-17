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


