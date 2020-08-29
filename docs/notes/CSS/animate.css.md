---
title: animate.css
date: 2019-11-01
tags:
  - CSS
categories:
  - CSS
---

基于`css3`的`animation`提供各种动画动效

官方提供了在线demo

 https://daneden.github.io/animate.css/

使用方法非常简单

```html
<h1 class="animated infinite bounce delay-2s">Example</h1>
```

使用各种独立的`css class`组合效果，每个`class`代表一种效果

必须加上`animated`，否则无效，其实这个`class`无非是声明了动画周期`duration`

```css
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
```

本例表示＂延迟2秒后，无限抖动(bounce)＂

其实样式代码也很简单

```css
.animated.infinite {
  animation-iteration-count: infinite; /*动画执行次数*/
}

.animated.delay-2s {
  animation-delay: 2s; /*动画延迟多久后执行*/
}
```

更多内容见[github](https://github.com/daneden/animate.css)