---
title: Easing functions
date: 2020-01-26
tags:
  - CSS
categories:
  - CSS
---

`Easing functions`（缓动函数）指定参数随时间变化的速率．

现实中的物体不会立即开始和结束，而且大多也不会以固定速度移动．当我们打开抽屉，先是快速地打开它，然后随着它出来速度放缓．把东西掉在地上，它会先向下加速，然后在落地后反弹．

下面展示常见的缓动函数

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200126150101.png)

来源于 https://easings.net/

这个网站非常人性化，鼠标悬浮至图表上，会有动画效果展示

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/Peek2020-01-2615-08.gif)

*（gif录制得不是很好，自行体验）*

这幅图的意思是，纵坐标`x`随着横坐标`t`按图中曲线运动变化

* **easein**：缓进（刚开始慢）
* **easeout**：缓出（最后慢）
* **easeinout**：缓进缓出（开始慢，最后也慢）

同样是缓进，实现方式却可以有多种方式（以easein为例，只要曲线前段平缓，后段变陡，就可以算作easein）

* **Sine**：sin函数（sinusoidal）
* **Quad**：二次方（quadratic）
* **Cubic**：三次方
* **Ｑuartic**：四次方
* **Quint**：五次方（quartic）
* **Expo**：指数（exponential）
* **Circ**：开平方根（circle？？没搞懂开平方根为什么是这缩写）

还有几种是以表现效果命名

* **Back**：会先回下再前进
* **Elastic**：弹性（eg：弹簧？瞎猜的不是很清楚）
* **Bounce**：回弹（eg：自由落体）

**总结**：

1. **easing**（缓动）使动画感觉更自然
2. 避免**easein**（缓入）或**easeinout**（缓入缓出）动画，除非可以使其保持简短，不然可能会让用户感觉很迟钝