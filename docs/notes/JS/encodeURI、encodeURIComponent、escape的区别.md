---
title: encodeURI、encodeURIComponent、escape的区别
date: 2019-10-29
tags:
  - JS
categories:
  - JS
---

encodeURI、encodeURIComponent、escape、decodeURI、decodeURIComponent、unescape的区别

1. `encodeURI`、`encodeURIComponent`是用于`URI`的编码/解码

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191029110032.png)

来源: https://juejin.im/post/5835836361ff4b0061f38a5d



2. `escape`和`unescape`用于对字符串进行`十六进制`编码/解码

```javascript
escape('您')
// "%u60A8"

escape('nin')
// "nin"

unescape('%u60A8')
// "您"

unescape('nin')
// "nin"
```

