---
title: vue实例与dom如何互转
date: 2018-09-09
tags:
  - Vue
categories:
  - Vue
---

**vue实例与dom如何互转？？**

```html
<div id="app">
    <span ref="title">Title</span>
    <child-detail ref="child"></child-detail>
</div>
```

`<child-detail>`为我定义的一个组件

`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；

如果用在子组件上，引用就指向组件实例：

```javascript
this.$refs.title        // <span>Title</span>节点
this.$refs.child        // <child-detail>组件实例
this.$refs. child .$el    // <child-detail>组件所渲染的dom节点
```

 