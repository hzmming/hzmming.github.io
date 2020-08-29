---
title: window.open
date: 2019-12-15
tags:
  - JS
categories:
  - JS
---

`window.open`打开新的窗口，并且返回新窗口的`window`对象

新窗口`window`的`opener`属性指向打开它的原页面`window`对象

```javascript
const targetWindow = window.open('localhost:9528/hello.html');

targetWindow.opener === window // true
```

