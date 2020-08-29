---
title: js查询元素
date: 2019-09-24
tags:
  - JS
categories:
  - JS
---

```javascript
// Document
// 根据id查询元素（IE5.5+）
document.getElementById 
// 根据类型查询元素集合（IE9+）［返回HTMLCollection］
document.getElementsByClassName 
// ＂个人感觉这个不会用到＂
document.getElementsByName
// 
document.getElementsByTagName
// 获取所有元素
document.getElementsByTagName("*")
// 支持传入命名空间
document.getElementsByTagNameNS(NameSpace, name) 
// 支持css选择器查询一个元素（IE8+）
document.querySelector 
// 支持css选择器查询多个元素（IE8+）
document.querySelectorAll 
```

```javascript
// Element
const target = document.getElementById('target')
// （IE9+，且IE9只有HTMLElement API实现，像svg就不支持）
target.getElementsByClassName
// （IE5.5+）
target.getElementsByTagName
// 获取所有元素（IE6+）
target.getElementsByTagName("*")
// 支持传入命名空间
target.getElementsByTagNameNS
// 支持css选择器查询一个元素（IE9+，IE8只支持css2.1选择器）
target.querySelector
// 支持css选择器查询多个元素（IE9+，IE8只支持css2.1选择器）
target.querySelectorAll
```