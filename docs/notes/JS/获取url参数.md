---
title: 获取url参数
date: 2019-09-11
tags:
  - JS
categories:
  - JS
---

#### 一. URLSearchParams

```javascript
const urlParams = new URLSearchParams('?post=1234&action=edit');
console.log(urlParams.get('action')); // "edit"
```

> IE完全不支持

#### 二. 字符串解析split

```javascript
function getUrlParams(param){
    // 有赖于浏览器环境， window.location.search 是浏览器函数
    // 意思是:设置或返回从问号 (?) 开始的 URL（查询部分）。
    const query = window.location.search.substring(1);       
    const vars = query.split("&");       
    for (var i=0;i<vars.length;i++) {               
        var pair = vars[i].split("=");               
        if(pair[0] == param){return pair[1];}       
    }       
    return(false);
}
```

#### 三. 正则表达式

```javascript
function getQueryString(name){
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
```

都是从网上收集的，以后遇到再补充