---
title: content
date: 2019-09-17
tags:
  - CSS
categories:
  - CSS
---

遇到了先记下，content与attr()结合的场景，更多关于content的内容以后再整理

```html
<div xxx="hello world">
</div>
<style>
    div:before{
        content: attr(xxx)
    }
</style>
```

使用`attr(<attribute_name>)`可以在css中获取到dom节点上的属性！！！

`attr()`还有好多高级用法，但浏览器都不支持，而且目前也只能用在`content`属性上，更多信息见[mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)

