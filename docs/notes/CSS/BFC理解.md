---
title: BFC理解
date: 2019-02-19
tags:
  - CSS
categories:
  - CSS
---

*原文：http://www.cnblogs.com/dojo-lzz/p/3999013.html* 

**BFC：Block Formatting Context 块级格式化上下文**

CSS2.1中规定满足下列CSS声明之一的元素便会**生成BFC**。

- 根元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed

有把display：table也认为可以生成BFC，其实这里的主要原因在于Table会默认生成一个匿名的table-cell，正是这个匿名的table-ccell生成了BFC

BFC**约束规则**如下：

- 内部的Box会在垂直方向上一个接一个的放置
- 垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠，与方向无关。）
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

**表现**出来的**特征**就是：

- Block元素会扩展到与父元素同宽，所以block元素会垂直排列
- 垂直方向上的两个相邻DIV的margin会重叠，而水平方向不会(此规则并不完全正确)
- 浮动元素会尽量接近往左上方（或右上方）
- 为父元素设置overflow：hidden或浮动父元素，则会包含浮动元素
- 等等

**BFC使用**

\1. 取消图片文字环绕

  此处在p标签上设置overflow属性，p标签形成BFC容器后，由于BFC与浮动元素不能重叠，故取消了图片文字环绕效果

 

```
<div>
    <img style="float:left; height:100px;">
    <p style="overflow:hidden;">
        你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</p>
</div>
```

\2. 块级元素之间的上下margin重叠

 （不知道是不是最佳方法）

  margin之所以会重叠是因为同一个BFC容器下的块级元素上下margin会重叠，只要将两个div分别放置两个BFC容器下即可（注意，不是让两个div形成BFC，而是它们自己被BFC包裹，BFC影响的是内部margin）

  此处同样使用 overflow:hidden 形成BFC容器

 

```
<div style="overflow:hidden;">
    <div>你好。这是一个 div 元素。</div>
</div>
<div style="overflow:hidden;">
    <div>你好。这是一个 div 元素。</div>
</div>
```

\3. ul 更特殊点的margin重叠

 

```
<!DOCTYPE html>
<html>  
<head> 
  <style> 
    html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
    .first{
      margin:20px;
      background:lightgreen;
      width:100px;
      height:100px;
    }
    ul{
      /* overflow:hidden; */ /*将注释打开可解决ul内部的li标签margin穿透问题*/
      margin:10px;
      background:lightblue;
    }
    li{
      margin:25px;
    }
  </style> 
  
  
</head> 
<body class="claro"> 
  <div class="first"></div>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</body> 
</html>
```


  ul 与 div 两个块级元素间的margin重叠后，垂直距离最终取决于“div的margin、ul的margin、li的margin”三者中的最大值

  （一）div的margin值大，如下

​    ![img](/img/98d20c52-4209-4e3c-a74d-dcc6718e491b.png)

  （二）ul的margin值大，如下

​    ![img](/img/3dc44126-bbfe-43c2-a1cb-5b9cb7ff1c01.png)

  （三）li的margin值大，如下

  ![img](/img/06941169-930f-4fb1-b591-65a035160a1d.png)

\4. 块级元素内部的margin穿透问题

  形成BFC容器后，内部的margin便会撑开父容器，而不是直接穿透

  

 

```
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<style>
    li{
        margin:25px;
    }
</style>
```

  ul容器盒模型，如下

  ![img](/img/9958c2ff-70c6-4a1b-a4b1-fff6ccecc013.png)

  但是li的margin竟然不撑开ul，而是穿透至外面，如下

  ![img](/img/46a2ffc6-35ca-40c3-8a92-fb40b9cd6b95.png)

  打开代码中的注释，ul形成BFC容器后，内部的margin不再穿透，ul被撑开了，如下

  ![img](/img/52ef1ae6-8c12-4278-abd0-aeb8fe2f5c9c.png)

\5. 解决浮动元素的高度坍塌问题

 

```
<div class="first">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>
<style>
    .first{
        margin:20px;
        background:lightgreen;
        border: 2px solid lightgreen;
        /*display:inline-block;*/
        /*overflow:hidden;*/
        /*float: left;*/
        /*position: absolute;*/
    }
    ul{
        overflow:hidden;
        margin:10px;
        background:lightblue;
        width:100px;
        height:200px;
        float: left;
    }
    li{
        margin:25px;
    }
</style>
```

![img](/img/1e1a29b7-ee40-4a2a-8b60-8691c0162962.png)

如上图所见，由于ul使用了浮动，致使其父容器高度坍塌，没有将其包裹住

解决方法：将注释中的4条语句 任意开放一条即可，如下图所示，ul被div包裹住了

![img](/img/d811143d-9032-440a-b78b-ef744f953d37.png)

此处去除浮动的原理是 “使父容器形成BFC”，应用了“计算BFC容器高度时，其浮动子元素也会参与计算”的特性（其它清浮动方法不在这里展开）

\6. 三栏布局

特点：左、右宽度固定，中间自适应

 

```
<div>
    <div class="left">
        <pre>
  .left{
    background:pink;
    float: left;
    width:180px;
  }
      </pre>
    </div>
    <div class="right">
        <pre>
  .right{
    background:lightblue;
    width:180px;
    float:right;
  }
      </pre>
    </div>
    <div class="center">
        <pre>
  .center{
    background:lightyellow;
    overflow:hidden;
    height:116px;
  }
      </pre>
    </div>
</div>
<style> 
    html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
    .left{
        background:pink;
        float: left;
        width:180px;
    }
    .center{
        background:lightyellow;
        overflow:hidden; /* 形成 BFC */
    }
    .right{
        background: lightblue;
        width:180px;
        float:right;
    }
</style> 
```

效果如下

![img](/img/026934cf-e0bf-48e4-acf6-e14a8af74b2e.png)

中间区域center 使用了 overflow: hidden形成BFC，利用了 “BFC与float元素区域不能重叠” 这一特性

若不形成BFC，中间center区域将延伸至左右两侧填满整行，并与float元素重叠在一起，如下

![img](/img/97728192-9794-48e5-8c64-9015cf9049cf.png)