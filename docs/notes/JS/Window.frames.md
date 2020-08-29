---
title: Window.frames
date: 2019-10-10
tags:
  - JS
categories:
  - JS
---

一个很神奇的属性...



```javascript
// 1. 直接访问这个属性，等同于当前窗口window
window.frames === window

// 2. 类数组对象.通过下标获取当前窗口的直接子窗口
// 当前窗口拥有的所有直接子窗口个数
window.frames.length
// 获取第一个直接子窗口
window.frames[0]
// 获取所有直接子窗口
for(let i=0; i<window.frames.length; i++){
    // 若cross-origin，直接报错
    console.log(window.frames[i])
}
```