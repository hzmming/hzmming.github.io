---
title: bookmarklet
date: 2019-09-23
tags:
  - JS
categories:
  - JS
---

保存javascript代码为书签，便捷操作dom或往全局空间window添加工具函数

 

```javascript
javascript:alert(3)
```

 

```javascript
javascript:(function(){ /*闭包不污染*/ })()
```

切记语句后面要接分号;

因为代码保存成书签后没有换行，如果没有分号，容易报声明变量错误