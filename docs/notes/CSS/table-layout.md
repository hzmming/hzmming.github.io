---
title: table-layout
date: 2019-05-20
tags:
  - CSS
categories:
  - CSS
---

## 基本

​    table-layout CSS属性**定义了用于布局表格单元格，行和列的算法**

**2种取值**

1. **auto：**表格及单元格的宽度取决于其包含的内容
2. **fixed：**表格和列的宽度通过表格的宽度来设置，某一列的宽度仅由该列首行的单元格决定

## 实例

**默认情况（table-layout: auto）**

 

```html
<table>
    <tr>
        <td>hellohellohellohellohellohellohello</td>
        <td>world</td>
    </tr>
</table>
<style>
    table {
        width: 100%;
    }
    td {
        padding: 10px 20px;
        border: 1px solid #ccc;
    }
</style>
```

![img](/img/b99166aa-45b5-476a-95fc-46b26a029487.png)

表格各列的宽度完全有其内容决定，自适应

**使用fixed**

 

```css
table {
    width: 100%;
    table-labout: fixed;
}
```

![img](/img/153a2f50-54b3-418a-94c9-7ee2c68cc30a.png)

表格各列均等分表格，各列宽度一致

**fixed基础上设置列宽**

*其实table-layout: auto默认的情况下，width就会生效了，但有点奇特，没搞懂，先忽略了*

 

```html
<table>
    <tr>
        <td style="width: 20%;">hellohellohellohellohellohellohello</td>
        <td>world</td>
        <td>dsdsf</td><!--故意多加一列-->
    </tr>
</table>
<style>
    table {
        width: 100%;
        table-labout: fixed;
    }
    td {
        padding: 10px 20px;
        border: 1px solid #ccc;
    }
</style>
```

![img](/img/e1af3ef1-8691-4c31-9d15-f148c84ba68a.png)

可以看出第一列被设为20%定宽，并且之后的列均分剩余空间

**设置列宽只能在第一列**

 

```html
<table>
    <tr>
        <td>hellohellohellohellohellohellohello</td>
        <td>world</td>
    </tr>
    <tr>
        <!--在第二行的列上设置 宽度，其实是无效的，只要不是在第一行设置-->
        <td style="width: 20%;">hellohellohellohellohellohellohello</td> 
        <td>world</td>
    </tr>
</table>
<style>
    table {
        width: 100%;
        table-labout: fixed;
    }
    td {
        padding: 10px 20px;
        border: 1px solid #ccc;
    }
</style>
```

![img](/img/8af496af-bf40-4354-85c1-a30c3235494d.png)

**无效**，表格各列表现为均等分

在线例子，写得还不错，可以一看：https://codepen.io/hzmming/pen/EzvrYR