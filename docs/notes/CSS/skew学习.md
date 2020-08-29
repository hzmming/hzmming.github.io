---
title: skew学习
date: 2019-04-08
tags:
  - CSS
categories:
  - CSS
---

skew() 这个CSS属性定义了在2D平面上一个对象的歪斜变换

skew的默认transform-origin是这个物件的中心点，坐标轴的中心点应该是在方块的中心。

**虚线框表示原始方块**

![img](/img/722223250.jpg)

  skewX(30deg)

![img](/img/722293250.jpg)

  skewY(10deg)

![img](/img/0bfc4a49f06867291c61e0e0e7c801f5_hd.jpg)

  skew(30deg, 10deg)

**skew所用的坐标系，纵向是X轴，横向是Y轴，与常见的坐标系是反着的**。比如：

skewX(30deg) 表示X轴朝逆时针方向旋转30deg，坐标系上的物体也会随着X轴旋转。

skewY(30deg) 表示Y轴朝顺时针方向旋转30deg，坐标系上的物体也会随着Y轴旋转。