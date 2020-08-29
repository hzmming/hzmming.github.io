---
title: initial、inherit、unset 和 revert
date: 2020-01-15
tags:
  - CSS
categories:
  - CSS
---

*参考自ChokCoco的[谈谈一些有趣的CSS题目（十五）-- 谈谈 CSS 关键字 initial、inherit 和 unset](https://www.cnblogs.com/coco1s/p/6733022.html)*

*（人家写得很好了，我可以说就是摘抄了下...）*

### initial

`initial` 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（**IE 不支持该关键字**）

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115162003.png)

### inherit

**兼容性：IE8+**

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115163611.png)

### unset

名如其意，`unset` 关键字我们可以简单理解为不设置。其实，它是关键字 `initial` 和 `inherit` 的组合。（**IE 不支持该关键字**）

什么意思呢？也就是当我们给一个 CSS 属性设置了 `unset` 的话：

1. 如果该属性是默认继承属性，该值等同于 `inherit`
2. 如果该属性是非继承属性，该值等同于 `initial`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115163744.png)

### revert

兼容性还不行，不做学习

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115163828.png)