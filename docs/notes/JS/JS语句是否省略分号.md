---
title: JS语句是否省略分号
date: 2020-01-07
tags:
  - JS
categories:
  - JS
---

没有深究，先记录一下


这种情况下，不能省略分号`;`

当下一句语句开头是`括号`（如`表达式`或者`自执行函数`）时，不能省略，浏览器会认为下一条语句`(...)`是当前语句的参数

```javascript
console.log(1)
(1+2) === 3

// 或者
console.log(1)
(() => 42)
```

报`Uncaught TypeError: console.log(...) is not a function`

这也让我联想到，之前看别人写的插件，有些人喜欢在前面写个分号`;`，应该就是这个原因

```javascript
;(function(){
// ...
}())
```

