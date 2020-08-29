---
title: addEventListener
date: 2019-05-03
tags:
  - JS
categories:
  - JS
---

```javascript
document.addEventListener('dragover',evt => {
    evt.preventDefault()
}, true)
```

addEventListener 第三个参数**默认值**为**false**，

false 表示在“冒泡”阶段触发

true  表示在“捕获”阶段触发

浏览器的事件触发流程如下，

​      （捕获阶段）        （冒泡阶段）

`html` => `body` => ... `<div id=test>` => ... `body` => `html`

也就是从html开始，一层一层捕获，直至触发事件的dom，然后再一层一层的冒泡出去

（PS：有个方法叫event.preventPropagation()表示阻止事件传播，也就是捕获阶段阻止捕获，冒泡阶段阻止冒泡）

**测试例子**

 

```html
<p>该实例演示了在添加事件监听时冒泡与捕获阶段的不同。</p>
<div id="myDiv" class="box">
    <div id="myP" class="child">点击该方块， 我是冒泡</div>
</div><br>
<div id="myDiv2" class="box">
    <div id="myP2" class="child">点击该方块， 我是捕获</div>
</div>
<script>
document.getElementById("myP").addEventListener("click", function()
{
    alert("你点击了 粉色!");
}, false);
document.getElementById("myDiv").addEventListener("click", function()
{
    alert("你点击了 橙色!");
}, false);
document.getElementById("myP2").addEventListener("click", function()
{
    alert("你点击了 粉色!");
}, true);
document.getElementById("myDiv2").addEventListener("click", function()
{
    alert("你点击了 橙色!");
}, true);
</script>
```

![img](/img/20170502210420519.gif)

解释：

第一个方块，采用默认false冒泡方式，执行完自己的事件，再冒泡到父亲的事件

第二个方块，采用true值捕获方式，执行完父亲的捕获事件，再传播到自己的捕获事件

完整代码参考自：https://blog.csdn.net/c_kite/article/details/71103999