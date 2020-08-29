---
title: placeholder兼容IE9
date: 2019-05-12
tags:
  - JS
categories:
  - JS
---

### 基本

`placeholder`提示用户输入框的作用。用于提示的占位符文本不能包含回车或换行。仅适用于当type 属性为text, search, tel, url or email时; 否则会被忽略。`HTML5新属性`

### 兼容

兼容性：IE10+

使用插件 [**jquery-placeholder.js**](<https://github.com/mathiasbynens/jquery-placeholder>)解决

[在线demo](<https://mathiasbynens.be/demo/placeholder>)

### 原理

其实是直接设置input的value值，并调整样式以模仿placeholder，当input获取到焦点后，则清空value值

那提交表单时，会把模拟placeholder的value值给提交上去么？？？

**不会**，它对当前页面的所有提交按钮(submit)做了事件监听，当触发提交时，会先清空模拟placeholder的value值