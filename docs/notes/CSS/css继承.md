---
title: css继承
date: 2020-01-09
tags:
  - CSS
categories:
  - CSS
---

### 继承属性（Inherited properties）

当元素的一个继承属性 （`inherited property`）没有指定值（`Specified Value`）时，则取父元素的同属性的计算值（`Computed Value`）

> 根元素（`root`）由于没有父元素，所以在没有指定值（`Specified Value`）的情况下，其值为初始值（`Initial Value`）

每个属性定义面板都有一个`Inherited`属性表示是否为继承属性，如下为`color`的属性面板

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115164900.png)

最后罗列一下默认为 `inherited: Yes` 的属性：

- 所有元素可继承：visibility 和 cursor
- 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction
- 块状元素可继承：text-indent和text-align
- 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
- 表格元素可继承：border-collapse

### 非继承属性（Non-inherited properties）

当元素的一个非继承属性没有指定值时，则取属性的初始值（`Initial Value`）



*参考资料*

*https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance*

*https://www.cnblogs.com/coco1s/p/6733022.html*