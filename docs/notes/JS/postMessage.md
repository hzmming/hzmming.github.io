---
title: postMessage
date: 2019-12-15
tags:
  - JS
categories:
  - JS
---

*（更多信息查看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)）*

`postMessage`用于安全地解决跨域问题

### 语法

```javascript
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

* `message`：要传递的数据［**必填项**］，字符串、数字、布尔、对象、数组、null、undefined都可以．

  经测试`symbol`、`函数`以及任何含有symbol和函数的`对象`或`数组`都不行

  > VM1340:1 Uncaught DOMException: Failed to execute 'postMessage' on 'Window': function(){} could not be cloned.
  > at `<anonymous>`:1:1

* `targetOrigin`：用于指明可以接收该消息的域名`origin`，保证通信安全．

  若无需指定域名，可以设置为字符串`"*"`

* `transfer`：不懂...先放着，反正没用到

### 场景一

在`页面A`上使用`iframe`嵌入了`页面B`，如下

```html
<!-- 页面A，当前域名localhost:9527 -->
<iframe src="localhost:9528/pageB.html" id="pageB"> <!-- 即使只有端口不一样，也已经不是同一个域了 -->
</iframe>

<script>
const pageBDom = document.getElementById('pageB');
    const targetWindow = pageBDom.contentWindow;
    
     // 访问跨域window的任何属性或方法都会报错
    // targetWindow.xxx
    
    // 使用postMessage正确解决
    targetWindow.postMessage('hello', '*')
</script>
```

```html
<!-- 页面B -->
<div>
    大家好，我是页面B
</div>
<script>
window.addEventListener('message', evt => {
        // 接收消息并触发回调
        // evt，事件类型为 MessageEvent
        // do operation
        console.log(evt.data === 'hello')
    })
</script>
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215151728.png)

原型链如下

```shell
 MessageEvent <= Event <= Object <= Null
```

### 场景二

在当前页面使用`window.open`打开新的页面（且域名不同）

*如果不跨域，想了下，直接用`localStorage`就能解决*

```javascript
// 当前域名：localhost:9527/pageA.html
const pageBWindow = window.open("localhost:9528/pageB.html");
pageBWindow.postMessage('hello', '*')
```

```javascript
// 页面B
window.addEventListener('message', evt => {
    console.log(evt.data === 'hello')
})
```

### 兼容性

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215152946.png)