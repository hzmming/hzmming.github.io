---
title: currentColor
date: 2019-05-05
tags:
  - CSS
categories:
  - CSS
---

这是css的一个**关键字**，记录着当前元素的color值



比如 渐变

 

```css
.test{
  color: #3CAADB;
  background-image: linear-gradient(to right, #fff, currentColor 100%); /* currentColor 相当于指向 color 的一个变量，这样以后改颜色值就只要改一处就行了 */
}
```