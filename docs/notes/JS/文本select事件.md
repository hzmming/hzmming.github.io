---
title: 文本select事件
date: 2020-06-25
tags:
  - JS
categories:
  - JS
---


> 本文所有内容只适用chrome
>
> 当前时间：2020年6月25日
>
> 当前环境：Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

#### 1. select事件

绑定事件支持**onselect**和**addEventListener('select', () => {})**，为了省点事，以下内容只使用**onselect**

`select`事件只能在`<input type="text">`和`<textarea>`两个元素上起作用，且事件触发时机为文本选中结束

```html
<input value="hello world" id="test">

<script>
    const test = document.querySelector('test');
    test.onselect = evt => console.log(evt);
</script>
```

选中文本后，控制台输出事件。textarea也是一样。

由于事件冒泡，使用`window.onselect`可以监听到页面所有输入框的选中事件

##### 如何获取输入框选中文本呢？

**HTMLInputElement**和**HTMLTextAreaElement**实现了两个属性，分别是`selectionStart`和`selectionEnd`，可以获取到选中范围index

*demo: 选择文本，输出当前选择文本*

```html
<input value="Try selecting some text in this element.">
<p id="log"></p>

<script>
    function logSelection(event) {
        const log = document.getElementById('log');
        const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
        log.textContent = `You selected: ${selection}`;
    }

    const input = document.querySelector('input');
    input.addEventListener('select', logSelection);
</script>
```

那非输入框选中文本，要如何获取呢？这个专门再写篇文本吧，先不管



#### 2. selectstart事件

除了`input`和`textarea`输入框之外，适用于网页上任意文本选中

触发时机为选择文本的开始时候，而选择文本必须要先点击才能拖选，所以，其实当页面文本被点击时，事件就触发了

```html
<p id="test">
    hello world
</p>

<script>
const test = document.querySelector('#test');
    test.onselectstart = e => console.log(e)
</script>
```

同理，由于事件冒泡，使用`window.onselectstart`可以监听到页面所有文本的选中事件（输入框文本除外）



#### 3. selectionchange事件

当选中文本发生改变后，触发该事件，适用于网页上任意文本，包括`input`和`textarea`

当光标发生变化时，其实选中文本已经发生改变（想了下，比如选中起始位置发生变化），所以该事件触发的频率非常高，如下

1. 随意点击页面上的文本，触发事件
2. 点击输入框内的文本，触发事件
3. 输入框获取焦点状态下，输入内容，触发事件（光标一动，就触发）



*demo: 获取当前选中文本*

```javascript
let selection;

document.onselectionchange = function() {
  console.log('New selection made');
  selection = document.getSelection();
};
```

**注意**：`window.onselectionchange`是不起作用的，`window.addEventListener`同样不起作用，但捕获阶段起作用了，说明document接收到事件后，没有再冒泡到window上去了，mdn上没有关于这方面的内容

```javascript
window.onselectionchange = evt => console.log('window'); // 不起作用
window.addEventListener('selectionchange', evt => console.log('window')); // 不起作用
window.addEventListener('selectionchange', evt => console.log('window'), true); // 起作用

document.onselectionchange = evt => console.log('document'); // 起作用
document.addEventListener('selectionchange', evt => console.log('document')); // 起作用
```



#### 4. 如何禁用页面选中（不包括输入框文本）

##### 1.使用css

```css
html {
    user-select: none;
}
```



##### 2.使用js

```javascript
window.onselectstart = evt => false; // onxxx事件返回false起到阻止默认行为
// 或者
window.addEventListener('selectstart', evt => evt.preventDefault()) // addEventListener使用preventDefault()起到阻止默认行为
```