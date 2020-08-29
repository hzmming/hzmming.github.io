---
title: table列过长缩略
date: 2019-05-18
tags:
  - CSS
categories:
  - CSS
---


**背景**：在table{width: 100%}的情况下，想要让某一列定宽，过长省略...



**最佳方案**

来源：https://stackoverflow.com/questions/9789723/css-text-overflow-in-a-table-cell 

To clip text with an ellipsis when it overflows a table cell, you will need to set the max-width CSS property on each td class for the overflow to work. No extra layout div's are required



 

```css
td {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

For responsive layouts; use the max-width CSS property to specify the effective minimum width of the column, or just use max-width: 0; for unlimited flexibility. Also, the containing table will need a specific width, typically width: 100%;, and the columns will typically have their width set as percentage of the total width



 

```css
table {
    width: 100%;
}
td {
    max-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
td.columnA {
    width: 30%;
}
td.columnB {
    width: 70%;
}
```

Historical: For IE 9 (or less) you need to have this in your HTML, to fix an IE-specific rendering issue



 

```css
<!--[if IE]>
<style>
    table {
        table-layout: fixed;
        width: 100px;
    }
</style>
<![endif]-->
```

次要方案

 

```html
<td style="position: relative; width: 25%;">
    <div class="text-overflow" style="position: absolute; left: 0; width: 100%;">hello world省略一万字</div>
</td>
```