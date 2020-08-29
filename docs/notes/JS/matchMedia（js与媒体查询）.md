---
title: matchMedia（js与媒体查询）
date: 2019-09-27
tags:
  - JS
categories:
  - JS
---

### 基本

使用`js`判断`媒体查询`

```javascript
window.matchMedia('(max-width: 600px)')
```

返回值为`MediaQueryList`类型

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215113107.png)

```javascript
MediaQueryList.matches // 表示是否符合媒体查询
```

其原型链如下

```shell
MediaQueryList <= EventTarget <= Object <= Null
```

### 监听媒体查询

```javascript
const mediaQuery = window.matchMedia('(max-width: 600px)')
mediaQuery.onchange = evt => {
    // do opertaion
}
```

调整浏览器窗口，当屏幕宽度小于600px，达到媒体查询条件，会执行**一次**回调.

再调整浏览器窗口，当屏幕宽度大于600px，不满足媒体查询条件，也会再执行**一次**回调