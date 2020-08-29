---
title: margin与auto
date: 2019-07-14
tags:
  - CSS
categories:
  - CSS
---

本文前提，书写方式为ltr（left to right）

### 一. BFC模式下

 

```html
<div class="wrapper">
  <div class="item">hello world</div>
</div>
```

 

```css
.wrapper {
  background: pink;
  width: 300px;
  height: 200px;
}
.item {
  width: 100px;
  margin-left: auto;
}
```

效果图

![img](/img/6f64cbf3-c8d8-48d9-b2ef-62bec54a9012.png)

margin-left: auto，此处auto值表示“除了自己的剩余空间”（达到了右浮动的效果）

BFC模式下，margin-top、margin-bottom的auto值无效，效果值为0

### 二. FFC模式下（Flex Formatting context）

 

```html
<div class="wrapper">
  <div class="item">hello world</div>
</div>
```

 

```css
.wrapper {
  display: flex;
  background: pink;
  width: 300px;
  height: 200px;
}
.item {
  width: 100px;
  margin-left: auto;
  margin-top: auto;
}
```

![img](/img/42c5b3a7-d498-4012-8e5c-c458cd356333.png)

FFC模式下，margin-left、margin-right、margin-top、margin-bottom的auto值均有效！

auto值同样还是表示“除了自己的剩余空间”

 

```
.item {
  width: 100px;
  margin: auto; 
}
```

当margin的4个方向均被设为auto值，便可实现水平、垂直居中

![img](/img/eb5278b6-7bd0-4839-ab69-dcd3543333ad.png)

扩展阅读：[探秘 flex 上下文中神奇的自动 margin](wiz://open_document?guid=a4a7083e-236f-4bac-873b-baadee070c14&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)