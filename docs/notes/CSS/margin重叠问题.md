---
title: margin重叠问题
date: 2019-05-05
tags:
  - CSS
categories:
  - CSS
---


所有毗邻的两个或多个盒元素的 margin 将会合并为一个 margin 共享。 

毗邻的定义为：同级或者嵌套的盒元素，并且它们之间没有非空内容、Padding 或 Border 分隔。

（这句话有点岐义，Padding、Border只能解决嵌套元素的margin问题，同级是不行的）

**1. 同级相邻div的上下margin重叠**

```html
<body>
    <div class="bro1">
    </div>
    <div class="bro2">
    </div>
</body>
<style>
.bro1 {
  margin-bottom: 20px; width: 100px; height: 100px; background: pink;
}
.bro2 {
  margin-top: 20px; width: 100px; height: 100px; background: green;
}
</style>
```

![image-20200829165916820](/img/image-20200829165916820.png)

使用BFC解决，待续hzm_lazy



**2. 父子嵌套div的上下margin重叠**

```html
<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>
<style>
.parent {
  margin-top: 20px; width: 200px; height: 200px; background: pink;
}
.child {
  margin-top: 20px; width: 100px; height: 100px; background: green;
}
</style>
```

![image-20200829170033902](/img/image-20200829170033902.png)

正确的效果应该是儿子在父亲内部顶开，**如下**

![image-20200829170022097](/img/image-20200829170022097.png)



**解决方案**

**第一种：伪元素**

在父元素上添加伪元素，记住是before，且display值有要求，为什么这个值可以那个值不行，这问题我还没搞懂

 

```css
.parent:before {
  content: '';
  display: inline-block;
}
```

**第二种：Border**

 

```css
.parent {
  border: 1px solid pink;
}
```

**第三种：Padding**

 

```css
.parent {
  padding: 1px;
}
```