---
title: 原生select禁用样式调整
date: 2019-05-12
tags:
  - HTML
categories:
  - HTML
---

select支持disabled属性，表示禁用

但其样式不是很明显，可做如下调整

 

```css
select[disabled] {} 
/* 上面的选择器和下面的选择器 是一样的*/
select:disabled {
    background-color: rgb(235, 235, 228); /* copy from chrome "input:disabled" user agent stylesheet */
    cursor: not-allowed; /* 鼠标改成禁用 */
}
```