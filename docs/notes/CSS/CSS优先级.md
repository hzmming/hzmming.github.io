---
title: CSS优先级.md
date: 2020-01-21
tags:
  - CSS
categories:
  - CSS
---


*请先阅读 [CSS选择器.md](wiz://open_document?guid=b56d9062-bbfd-4a67-a7b7-fe1351166dac&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e) 这篇笔记理解`selector`与`combinator`相关知识*

### 一句话

当元素有多个CSS声明时，**权重**高的起作用，如果权重一样，则**最后声明**的起作用．

所以，**`优先级`只与两个因素有关：`权重`和`声明先后`**

而与`元素接近度`和`声明方式`都没有关系

样式的声明方式，不管是内部**style**还是外部**link**都无所谓（内联样式影响权重，不包括在内）

元素的接近度对优先级没有影响，如下解释

```html
<div>
    <p>
        <span></span>
    </p>
</div>
```

`p span`的优先级并不会因为`<p>`比`<div>`更接近而高于`div span`，二者的优先级比较只取决于先前说的两个因素：`权重`和`声明先后`



### 权重计算

以下权重递增

* **［0-0-0］** `*`、`+`、`>`、`~`等`combinator`符号权重为0表示不影响优先级（`:not(x)`本身权重为0但括号内部的选择器正常参与权重计算）
* **［0-0-1］**元素选择器和伪元素选择器
* **［0-1-0］**类选择器、属性选择器和伪类选择器
* **［1-0-0］**ID选择器
* **［1-0-0-0］**内联样式
* **［1-0-0-0-0］**!important

不管多少个**低位**相加，权重都无法超过**高位**（例如：0-1-0 > 0-0-16）

```css
/* 0-0-0 */
*

/* 0-0-1 */
div

/* 0-0-2 */
ul > li

/* 0-0-6 */
body div ul li p a

/* 0-1-0 */
.myClass

/* 0-1-0 */
* .myClass

/* 0-1-0 */
[type=checkbox]

/* 0-1-0 */
:only-of-type

/* 0-1-1 */
li.myClass

/* 0-1-1 */
li[attr]

/* 0-1-2 */
li:nth-of-type(3n)~li

/* 0-1-2 */
form input[type=email]

/* 0-2-1 */
li.class:nth-of-type(3n)

/* 0-2-1 */
input[type]:not(.class)

/* 0-4-0 */
.parent:nth-child(odd) .child[type]

/* 1-0-0 */
#myDiv

/* 1-2-2 */
#myDiv li.class a[href]

/* 2-0-1 */
#divitis #myDiv a

/* 1-0-0-0 */
style=""

/* 1-0-0-0-0 */
!important
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200121212445.png)

（图片来源 https://specifishity.com/）

*参考资料*

*https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity*

*https://specifishity.com/*