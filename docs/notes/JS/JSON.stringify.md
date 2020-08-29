---
title: JSON.stringify
date: 2019-07-16
tags:
  - JS
categories:
  - JS
---

循环引用

 

```javascript
var o = {};
o.o = o;
// 声明cache变量，便于匹配是否有循环引用的情况     
var cache = [];
var str = JSON.stringify(o, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // 移除
            return;
        }
        // 收集所有的值
        cache.push(value);
    }
    return value;
});
cache = null; // 清空变量，便于垃圾回收机制回收
```

关于JSON.stringify更多可以看mdn，非常详细

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

函数处理

 

```javascript
// 大概写下，之后完善
JSON.stringify(bc, (key, val) => typeof val === 'function' ? val.toString() : val)
```