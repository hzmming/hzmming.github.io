---
title: require.context
date: 2020-03-06
tags:
  - 前端
categories:
  - 前端
---

这个方法是webpack提供的，node是没有的，因为webpack可以node和es6混写，让人没理清楚

 

```javascript
const allProviders = {};
const req = require.context("@/providers", false, /^((?!index).)*\.js$/); // 不匹配index.js
// require.context的返回值既是方法，还有方法成员：keys
req.keys().forEach(path => {
  const fileName = path.replace("./", "").replace(".js", "");
  allProviders[fileName] = req(path).default; // req(path)获取模块
});
```



node如果想要实现类似功能的话

 

```javascript
// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder/16161653
var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file);
});
```

有时间再完善完善这篇笔记，好好理解下webpack和node的requrie区别