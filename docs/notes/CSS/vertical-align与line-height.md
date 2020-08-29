---
title: vertical-align与line-height
date: 2019-07-23
tags:
  - CSS
categories:
  - CSS
---

参考：https://juejin.im/post/5a7d6b886fb9a06349129463

## 前置知识

（1）**基线**：字母x的下边缘（线）就是基线

## ![img](/img/0.6849054653486155.png)

只有内联元素才有基线，因为基线是用于内联元素放在一行上对齐用的，块级元素自起一行，没有基线这一说

（2）**line-height**：两条baseline的间距（刚好也是top line和bottom line之间的间距）

（3）**四种内联盒子**

1. **containing box** 外层盒子模型，由一个个line boxes组成
2. **line boxes** 由一个个inline boxes组成，单个line box的高度由其包含的所有inline boxes中，高度最大的那个决定（实际上是line-height起作用）
3. **inline boxes** 并排显示在一行组成line boxes，如span、a、em等标签以及匿名inline boxes（即不包含标签的裸露文字）
4. **content area** 围绕文字看不见的box，其大小与font-size有关，其高度可以认为鼠标选中文字时背景色的高度

 

```html
<div>
    这里是一个div，里面包含了独立的文字，
    <span>span标签</span>
    <em>em标签</em>，
    以及其他的一些文字。
</div>
```

![img](/img/0.6767131475781281.png)

（4）line-height与line boxes的高度关系

line boxes的高度是由line-height决定，而不是想当然地由文字撑开

 

```html
<div class="div div1">我是一行文字大小为100px,但是line-height为0的文字</div>
<div class="div div2">我是一行文字大小为0,但是line-height为100px的文字</div>
<div class="div div3">我是一行文字大小和line-height都为100px的文字</div>
<style>
    .div {
        background: #f0f0f0;
        border:  1px solid #e0e0e0;
        margin: 10px;
    }
    .div1 {
        font-size: 16px;
        line-height: 0;
    }
    .div2 {
        font-size: 0;
        line-height: 100px;
    }
    .div3{
        font-size: 16px;
        line-height: 100px;
    }
</style>
```

![img](/img/0.40832135231057554.png)

\1. 当文字的行高为0时，就算它的字号大小很大，line box的高度为0

\2. 即使字体大小为0或没有字体，但如果行高不为0，仍然会撑开标签的高度。

（5）文本间距

加入文本的font-size为16px，但实际上文本的高度却不止16px，这是因为文本的上下有一定间隔，这个间隔由line-height决定，等于 (line-height - font-size)/2，上下间隔相等（应该吧），所以利用line-height可以达到“类似”垂直居中的效果

（6）line-height值为1.5、1.5em、150%有什么区别？

首先，line-height属性具有继承性，3种写法对自身都是一样的效果，但对子级却有着不一样的影响

1.5表示，子级继承父亲的1.5后，会根据自身的font-size计算出自身的line-height属性值（实际常用）

1.5em、150%表示自身的line-height为font-size*1.5，算出的值原封不动直接赋予子级（实际少用）

## vertical-align

\1. 作用范围：元素为inline水平元素或table-cell元素，包括span、img、input、button、td以及设置了display为inline水平或table-cell的元素，默认情况下，p、div等元素设置vertical-align无效

（inline水平元素包含inline、inline-block，不再赘述）

注意：即使是inline元素，但是浮动和定位，会使其vertical-align失效

\2. inline-block基线

在css2可视化格式文档中，指出了inline-block的基线是，

  \1. 正常流中最后一个line box的基线

  \2. 如果line box里面没有inline boxes或者有但是其overflow属性值不是visible，那么基线是其margin bottom的边缘

![img](/img/0.44946078389266764.png)

\3. vertical-align: middle对齐方式

![img](/img/0002d58b-1e9b-43b0-b8f3-bfdd76906a1f.jpg)

\4. 文字下沉

仔细看上面的middle对齐黄线和实际的垂直居中线，并没有在同一水平线上，而是middle对齐线稍微偏下些。这也就是为什么说line-height可以达到  “近似”垂直居中的效果，不同字体的文字下沉的幅度不同，同时，文字大小越大，下沉越明显。

## 千奇百怪

 

```html
<div class="wrap">
    <img src="xxx.png" />
</div>
<div class="wrap">
    <span></span>
    <span>我有内容</span>
</div>
<div class="wrap" style="height:200px;">
    <img src="xxx.png" class="middle" />
</div>
<style>
    .wrap {
        background: #249ff1;
    }
    span {
        display: inline-block;
        width: 100px;
        height: 100px;
        border: 1px solid #f00;
    }
    img {
        width: 100px;
    }
    .middle {
        vertical-align: middle;
    }
</style>
```

以上代码最后结果如下

![img](/img/0.17296960695837016.png)

\1. 图片的下方有一点间隙

看似只有一个img标签，实际上有一个看不见的**空白节点。**这个空白节点和普通的文本节点一样，具有文字大小、行高，我们用普通文本代替，在图片后输入一段文本，如下

![img](/img/0.6984191643857949.png)

接着，我们再用一个inline-block化的span标签将文字包裹并设置文字背景色

![img](/img/0.6845331609958165.png)

图片和inline boxes默认是按照baseline对齐的，也就是x的底部，此处合情合理。而xxxx下方多出的间隙，主要是由line-height引起的（line-height会在文字的上下两侧填充空白间隙）

因此，解决办法有如下几种

（1）将图片设置成display: block（使vertical-align失效）

（2）将图片的vertical-align设置为top、bottom、middle等非baseline值

（3）将line-height设置为0（line box没有高度，所有线合并为一条线，造成基线上移）

（4）将font-size设置为0（如果line-height为相对值，如1.5，这样实际的line-height=0*n=0，也就和第3条一样效果）

（5）将img设置浮动或绝对定位（使vertical-align失效）

![img](/img/0.5810334383528171.png)

\2. 两个inline box错开

（左侧）对于有内容的inline-block，其基线为最后一行文本基线所在的位置

（右侧）而对于空白的inline-block，其基线为margin bottom边缘所在位置，即底部边缘

默认情况下基线对齐，这两条基线对齐后就形成这种错位现象

解决：修改对齐方式为 top、middle、bottom等非baseline值任何一种

![img](/img/0.536031421126387.png)

\3. 设置行高line-height与height相等，达到对其效果

![img](/img/0.21587296174541648.png)

## 应用

\1. 实现（近似）垂直居中

 

```html
<div class="wrap">
    <img src="./images/xx.png" class="middle"/>
</div>
<style>
    .wrap {
        background: #249ff1;
        margin: 10px;
    }
    .wrap {
        line-height: 200px;
        text-align: center;
    }
    .middle {
        vertical-align:  middle;
    }
</style>
```

![img](/img/0.3191900681902844.png)

\2. 绝对垂直居中

前面讲过，middle线和垂直居中线有一定偏差（文字下沉特性），使用font-size: 0让所有线合并，达到基线上移，就可以实现绝对居中

\3. 任意父亲高度的垂直居中

line-height == height，可以达到近似垂直居中，但如果父级height是变化的呢？是随着内容变化而变化呢？此时不能设置固定值，也不能使用百分比，因为line-height的百分比是根据字体大小来计算的。换个角度想，空白节点我们看不见，但是如果可以给它设置一个高度，让它与父级高度一致，就解决了这个问题。怎么给高度呢？答案是借助辅助元素，我们可以在父级最后面增加一个inline-block化的span标签,高度为100%，font-size为0，接着让居中的元素居中对齐即可。

 

```html
<div class="wrap" style="height:200px;text-align:center;">
  <img src="../../images/zhuyin.png" alt="" class="middle">
  <span style="display:inline-block;height:100%;vertical-align:middle;font-size:0;"></span>
</div>
```

当然，这个span标签也可以通过伪元素的来实现