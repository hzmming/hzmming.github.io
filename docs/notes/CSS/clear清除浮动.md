---
title: clear清除浮动
date: 2019-05-12
tags:
  - CSS
categories:
  - CSS
---

## 基本

​**clear 属性指定一个元素是否必须移动到在它之前的浮动元素下面（或后面）。clear 属性适用于浮动和非浮动元素**

mdn有个超赞的例子：https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear

我自己的例子：https://codepen.io/hzmming/pen/RmRogz

## 例子

 

```
<div>
    <div class="first"></div>
    <div class="second"></div>
</div>
<style>
    .first {
        float: left;
        width: 100px;
        height: 100px;
        background: pink; /* 粉色 */
    }
    .second {
        width: 200px;
        height: 200px;
        background: yellowgreen; /* 黄绿色 */
    }
</style>
```

**效果**

![img](/img/ca84d6f1-af3f-4256-a4be-761ac5a3db88.png)

first块 左浮动后，不占位置，造成first块和second块重叠在一起

 

```
<div>
    <div class="first"></div>
    <div class="second" style="clear:left;"></div> <!-- 在此处添加clear:left -->
</div>
```

![img](/img/94c11241-78a1-4e6d-8296-d24b2dcd8adc.png)

second块 挪到了first块 下面

 

```
clear: left; /* 清除左浮动 */
clear: right; /* 清除左浮动 */
clear: both; /* 清除左浮动和右浮动 */
```

**second作为块级元素挪到了下一行可以理解，但如果second是行级元素呢？**

 

```
<div>
    <div class="first"></div>
    <div class="second" style="clear:left; display: inline-block"></div> 
    <!-- 在此处添加display: inline-block -->
</div>
```

![img](/img/9e9f6807-5de4-445e-850d-bd96e7030de1.png)

second块 挪到了first块 后面

## 扩展

恢复浮动造成的父容器高度坍塌

 

```
.clearfix:after {
    display: block;
    content: '';
    clear: both;
}
```

display支持block、table等，但就是不支持inline、inline-block，那是因为如果使用行级元素的方式，用于清除浮动的伪元素顶多只是跟**浮动元素**放一行，这样父容器还是没有正确地包裹住**浮动元素**，高度自然没有正确还原

 

```
<div class="parent">
    <div class="child"></div>
</div>
<style>
    .parent {
        width: 200px;
        background: pink;
    }
    .child {
        width: 100px;
        height: 50px;
        background: yellowgreen;
    }
</style>
```

![img](/img/271b6acf-3867-4a40-835d-1a63d94a1579.png)

父容器（粉色）本身有宽度但没高度，是由儿子（绿色）撑起来的，50px

添加浮动，查看崩塌效果

 

```
<div class="parent">
    <div class="child float"></div>
</div>
<style>
    .float { float: left; }
</style>
```

![img](/img/cd62c768-0476-441e-91cc-7a0c6cc71a0c.png)

解决它

 

```
<div class="parent clearfix">
    <div class="child float"></div>
</div>
<style>
    .clearfix:after {
        display: block; /*block、table等另起一行的块级方式均行*/
        content: '';
        clear: both;
    }
</style>
```

![img](/img/def4216f-5d7f-4319-b881-18083b0d9357.png)

如果用了**inline-block**会怎样？

 

```
.clearfix:after {
    display: inline-block;
    content: '';
    clear: both;
}
```

![img](/img/8723ea02-55da-44ab-ab60-9b3691509738.png)

由于inline-block清除浮动后，元素会在同一行跟在浮动元素之后，不会另起一行，就会这样

线上demo：https://codepen.io/hzmming/pen/wbWmze 