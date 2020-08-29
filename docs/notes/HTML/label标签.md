---
title: label标签
date: 2019-05-12
tags:
  - HTML
categories:
  - HTML
---

### 一. 基本使用

经常用于和`input`搭配使用 

(1) `label`包裹`input`

```html
<label>
    <input type="checkbox"> Remember me
</label>
```

```html
<label>
    <input type="radio"> Remember me
</label>
```

**点击文字也可以触发到checkbox、radio**

(2) `label`与`input`没有包裹

`label`没有包裹`input`，又想达到关联效果，**可以给`input`一个`id`属性，给`label`一个`for`属性，且值要和`id`一样才能匹配得上**

```html
<form>
    <label for="cheese">Do you like cheese?</label>
    <input type="checkbox" id="cheese">
</form>
```

> 顺带一提，`input`的`name`属性是给`form`表单用的，表明要提交的属性

参考自[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label)

### 二. 事件

```html
<label onclick="console.log('click')">
    <input type="radio"> Remember me
</label>
```

点击文本，控制台输出

```shell
click
click
```

为什么会触发两次`click`呢？

因为点击`<label>`同时会触发其包裹的`<input type="radio">`的`click`事件，所以触发了两个`click`事件

* label.click()
* input.click()，然后`click冒泡`，再次触发label.click()

那在`label`上应该怎么正确监听事件呢？

使用`onchange`事件

```html
<label onchange="console.log('change')">
    <input type="radio"> Remember me
</label>
```

点击文本，控制台输出

```shell
change
```

没有任何一种`ui操作`可以触发`label`的`change事件`

而`input`的`change`事件会冒泡，因此`label`的`change事件`被触发