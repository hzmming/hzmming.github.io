---
title: 浏览器Event
date: 2019-09-11
tags:
  - JS
categories:
  - JS
---


> 本笔记仅代表chrome浏览器，其它浏览器未测试


#### 1. 如何绑定事件

第一种：addEventListener

```javascript
const clickFn = function(){
    console.log('click')
}
const el = document.getElementById("btn");
if(el.addEventListener)
    el.addEventListener("click",clickFn,false); // 第三个参数，默认false，若为true，表示＂捕获阶段＂
else if(el.attachEvent) // Internet Explorer 6-8 不支持addEventListener
    el.attachEvent("onclick",clickFn); // 而且事件名要带on
```

第二种：onclick

onclick同名事件只能监听一个，后面的事件会覆盖前面的，只留最后一个

```html
<button id="test" onclick="alert(2)">测试</button>
<script>
const testBtn = document.getElementById('test')
    testBtn.onclick = function(){
alert(3)
    }
    testBtn.onclick = function(){
alert(4)
    }
</script>
```

#### 2. 阻止默认行为

场景：例如各大网站的复制限制如何做到？

第一种：addEventListener

```javascript
window.addEventListener('copy', evt => evt.preventDefault());
```

第二种：oncopy

```javascript
window.oncopy = evt => false;
```



#### 3. 事件上下文

```html
<input oninput="debugger;" />
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190912103851.png)

通过chrome控制台可以看出，当前作用域(Scope)下有两个可用变量，`event`和`this`

`event`顾名思义表示当前事件

`this`表示当前事件所在的`dom节点`，即`input输入框`

再仔细看，上一个作用域`With Block input`（chrome调整工具不管是Scope还是Stack都是从上往下看）

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190912104634.png)

上一个作用域把当前dom节点（即input输入框）完全暴露出现，也就是说我们可以直接获取到`input`的所有属性，包括当前输入值`value`

```html
<input oninput="console.log(value)" /> <!-- 控制台会实时输出当前输入框所输入的值-->
<!--等价于-->
<input oninput="console.log(this.value)" />
```

> 常见用途：限制输入框只能输入数字

```html
<!--只能监听input事件，其它事件都有点问题，-->
<input oninput = "value=value.replace(/[^\d]/g,'')">

<!--以下方案均不行！！！-->
<!--会看到＂字符被输入又一瞬间被删除的丑态＂，而且中文输入法状态下，按回车 字符还是被输上去了-->
<input onkeyup = "value=value.replace(/[^\d]/g,'')"> 
<!--change事件只有失去光标后才会触发，没有实时性-->
<input onchange = "value=value.replace(/[^\d]/g,'')">
<!--keydown事件太早了，值还没被填上去，此时修改value值没有意义，之后还是会被真实填写字符覆盖上
最终表现出：只能输入一个非数字字符
-->
<input onkeydown = "value=value.replace(/[^\d]/g,'')">
```

#### 4. 事件流（Event Flow）

Window => Document => HTMLHtmlElement => ... => target => ... => HTMLHtmlElement => Document => Window

更多内容，看[规范](https://www.w3.org/TR/uievents/#event-flow)

![flow](https://www.w3.org/TR/uievents/images/eventflow.svg)

#### 5. 键盘事件

```html
<input type="text"
       onfocus="console.log('focus')"
       onclick="console.log('click')"
       ondblclick="console.log('dblclick')"
       oncontextmenu="console.log('contextmenu')"
       onkeydown="console.log('keydown')"
       onkeypress="console.log('keypress')"
       oninput="console.log('input')"
       onkeyup="console.log('keyup')"
       onchange="console.log('change')"
       onblur="console.log('blur')"
       >
```

`focus`事件一定在最前，`blur`事件一定在最后

focus又好像不一定在最前．．．当我没说～～

**场景一：输入字母**

```shell
# 输出顺序如下
keydown
keypress
input
keyup
```

**场景二：输入字母，点击空白处使其失去光标**

```shell
# 输出顺序如下
keydown
keypress
input
keyup
#失去光标后
change
blur
```

`change`事件只在值发生变化且失去光标触发

**场景三：获取焦点的情况下，按ctrl键**

```shell
# 输出顺序如下
keydown
keyup
```

只有`可打印字符`(Printable keys)才会触发`keypress`，如字母，数字，空格等字符

**场景四：按住字母d，一直不放**

```shell
# 输出顺序如下
keydown
keypress
input
keydown
keypress
input
... # 不断循环
```

**场景五：按住ctrl，一直不放**

```shell
# 输出顺序如下
keydown # 只会输出一个keydown，并不会一直触发下去
```

**场景六：获取焦点的情况下，按下`tab`**

```shell
# 输出顺序如下
keydown
blur
```

`tab`使控件失去焦点，当松开`tab`键时，由于该控件未获焦，也就不触发`keyup`事件

这也说明了，`keydown`和`keyup`并不一定成对出现，这种场景下，就只有`keydown`事件，而因为按下`tab`键而获取到焦点的控件将触发`keyup`事件，虽然它没有先触发`keydown`事件，照样可以触发`keyup`事件

#### 6. 键盘事件对象

*更多信息见[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)*

```javascript
// KeyboardEvent {isTrusted: true, key: "a", code: "KeyA", location: 0, ctrlKey: false, …}
{
    altKey: true, // 是否按了alt键
    bubbles: true, // 是否冒泡
    cancelBubble: false, // 可用于阻止冒泡，event.cancelBubble = true 等价于 event.stopPropagation()
    cancelable: true, // 是否可以被取消默认行为，若为false，event.preventDefault()将报错
    charCode: 0, // 返回unicode编码．用于keydown和keyup事件，返回值总为0
    code: "KeyA",
    composed: true, // ［实验属性］
    ctrlKey: false, // 是否按了ctrl键
    currentTarget: null, // 监听事件者，由于子节点事件冒泡而间接触发的事件才会有值
    defaultPrevented: false, // 表明当前事件是否调用了event.preventDefault()
    detail: 0, // 继承自UIEvent，UIEvent.detail，鼠标事件用到
    eventPhase: 0, // 事件阶段：捕获(1)，当前target(2)，冒泡(3)
    isComposing: false, // unknown
    isTrusted: true, // 是否真实事件，若为javascript触发，则值为false
    key: "a",
    keyCode: 65, // unicode编码
    location: 0, // unknown
    metaKey: false, // 是否按了meta键，针对mac电脑
    path: (6) [input, div, body, html, document, Window],
    repeat: false, // 按键是否被一直按住
    returnValue: true,  //［已废弃］设为false可阻止默认行为，等价于event.preventDefault()
    shiftKey: false, // 是否按住shift键
    sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}, // ［实验属性］
    srcElement: input, //［非标准属性］只适用于IE，等价于event.target
    target: input, // 事件发出者，也就是当前输入字符的input dom节点
    timeStamp: 302630.03000000026, // 事件发生时间戳，好像不准确，没深究，不确定
    type: "keydown", // 事件类型
    view: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …},
    which: 65 // ［已废弃］
}
```

**问题：`charCode`，`keyCode`，`which`三者啥关系？**

`charCode`，`keyCode`，`which`三者表示的值都是字符对应的unicode编码，只是因为各个浏览器兼容问题才有这么多个，

`mdn`上建议使用`key`替代上面3个，但是keyCode感觉还是好多人在用，至少`vue`源码里就还有，不是很懂

**问题：`path`不兼容怎么办？**

```javascript
var path = event.path || (event.composedPath && event.composedPath());
if (path) {
    // You got some path information
} else {
    // This browser doesn't supply path information
}
```



监听常用组合键`ctrl+s``ctrl+f`

#### 7. 鼠标事件

```javascript
<input type="text"
       onfocus="console.log('focus')"
       onmousedown="console.log('mousedown')"
       onmouseup="console.log('mouseup')"
       onclick="console.log('click')"
       ondblclick="console.log('dblclick')"
       oncontextmenu="console.log('contextmenu')"
       onblur="console.log('blur')"
       >
```

**场景一：鼠标左键点击输入框（控制台信息）**

```shell
# 输出顺序如下
focus
mousedown
mouseup
click
```

**场景二：鼠标左键点击输入框，按住不放**

```shell
# 输出顺序如下
focus
mousedown
```

鼠标未松开，所以`mouseup`未触发，那`click`呢？原因是，如果一个dom节点的`mousedown`和`mouseup`没有被完整地触发，那么`click`也不会被触发

**场景三：鼠标右键点击输入框**

```shell
# 输出顺序如下
focus
mousedown
contextmenu
```

可以发现，即使是右键点击，`mousedown`照样被触发

**场景四：鼠标左键双击输入框**

```shell
# 输出顺序如下
focus
mousedown
mouseup
click
mousedown
mouseup
click
dblclick
```

可以发现，双击照样会触发`mousedown`，`mouseup`，`click`事件，并且会触发两次

#### 8. 鼠标事件对象

```javascript
// MouseEvent {isTrusted: true, screenX: 1616, screenY: 216, clientX: 84, clientY: 20, …}
{
    altKey: false, // 同KeyboardEvent，不再重复赘述
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,,
    clientX: 84,
    clientY: 20,
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 2,
    eventPhase: 0,
    fromElement: null, // IE用于替代relatedTarget的属性， 以mouseover为例，表示从哪个节点进入到当前节点
    isTrusted: true,
    layerX: 84, // ［非标准］
    layerY: 20, // ［非标准］
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: 74,
    offsetY: 8,
    pageX: 84,
    pageY: 20,
    path: (6) [input, div, body, html, document, Window],
    relatedTarget: null, // 对于不同事件有不一样的值，mouseover表示从哪里来(fromElement)，mouseout表示出去到哪(toElement)
    returnValue: true,
    screenX: 1616,
    screenY: 216,
    shiftKey: false,
    sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false},
    srcElement: input, // 等价于 target，用于兼容老版本IE678
    target: input,
    timeStamp: 57307.6749999891,
    toElement: input, // IE用于替代relatedTarget的属性， 以mouseout为例，表示从当前节点出去到哪个节点
    type: "click",
    view: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: global, …},
    which: 1, // ［非标准属性］
    x: 84, // ［实验属性］
    y: 20 // ［实验属性］
}
```



**问题：detail有什么用？**

不知道！！！

对 `click` 或者 `dblclick` 事件, `UIEvent.detail` 是当前点击数量。

对 `mousedown` 或者 `mouseup` 事件, `UIEvent.detail是1加上当前点击数。`

对所有的其它[`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) 对象, `UIEvent.detail` 总是零.

 疯狂点击，输出事件和detail值为

```shell
mousedown 1
mouseup 1
click 1
mousedown 2
mouseup 2
click 2
dblclick 2
mousedown 3
mouseup 3
click 3
mousedown 1
mouseup 1
click 1
mousedown 2
mouseup 2
click 2
dblclick 2
# 好像上不到4
```

**问题：clientX，clientY，layerX，layerY，movementX，movementY，offsetX，offsetY，pageX，pageY，screenX，screenY，x，y的区别**

> 前置知识：浏览器的X，Y坐标轴是以左上角为原点(0,0)，往右为X正向，往下为Y正向

`clientX，clientY`：鼠标位置相对浏览器可视区域的坐标［**不包含滚动**］，可视区域受iframe影响，更像是以document为准

`layerX，layerY`：鼠标位置相对第一个position非static的dom元素的坐标（类似absolute定位基准）［**包括滚动**］

`movementX，movementY`：［mousemove事件有用］鼠标位置相对上一个鼠标位置的偏移量，本质上currentEvent.movementX = currentEvent.screenX - previousEvent.screenX

`offsetX，offsetY`：［只针对chrome76］鼠标点击位置，在以当前事件触发dom左上角为原点的坐标位置．更准确地说，是相对于内border边框左上角，所以有两个特点

1. 当点击在border上就可能出现负数
2. padding也会影响坐标值

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1568426996.png)

`pageX，pageY`：鼠标位置相对于整个页面左上角原点坐标系的坐标［**包括滚动**］．`整个页面`的含义，如果document出现滚动条（准确来说应该是html出现的全局滚动条）以实际页面大小计算坐标，即包括看不见的滚动长度

`screenX，screenY`：鼠标位置相对于显示屏左上角原点坐标系的坐标．感觉已经跳脱出浏览器，就是物理屏幕上的点坐标

`x，y`：［实验属性］clientX，clientY的别名

**问题：`fromElement`，`toElement`，`relatedTarget`关系**

没有ie浏览器进行测试，嫌麻烦～～

网上说`fromElement`，`toElement`是IE用于兼容`relatedTarget`属性的，但我看mdn上写着IE支持`relatedTarget`．．．

**问题：`mouseenter`，`mouseover`，`mouseleave`，`mouseout`的区别**

`mouseenter`，`mouseover`：表示鼠标进入dom元素一瞬间

`mouseleave`，`mouseout`：表示鼠标离开dom元素一瞬间

区别：`mouseenter`，`mouseleave`不会冒泡，`mouseover`，`mouseout`会冒泡

特点：父元素监听`mouseover`事件，从父元素移动鼠标至子元素（如ul到li），子元素触发`mouseover`，并冒泡给父元素，父元素间接触发`mouseover`，这就很不合理，明明还在父元素内部移动，所以应该用`mouseenter`避免冒泡引起的多余触发

#### 9. 拖拽事件

```html
<ul>
    <li id="item1" draggable="true" ondragstart="dragstart(event)" ondrag="drag(event)" ondragend="dragend(event)">
        Drag Item 1 to the Drop Zone
    </li>
    <li id="item2" draggable="true" ondragstart="dragstart(event)" ondrag="drag(event)" ondragend="dragend(event)">
        Drag Item 2 to the Drop Zone
    </li>
</ul>
<div id="target" ondragenter="dragenter(event)" ondragover="dragover(event)" ondragleave="dragleave(event)"  ondrop="drop(event)">
    Drop Zone
</div>
<script>
function dragstart(event){
        // 记录当前拖拽项的id
         // key/val随便设，val值会自动调用toString()，所以其实只能传字符串
        event.dataTransfer.setData('id',event.target.id)
        // 还是没明白设置这个有啥用，写成"move"也没有真的移动过去
        event.dataTransfer.effectAllowed = "move"
    }
    function drag(event){
        console.log('不断输出，我正被拖动着...')
    }
    function dragend(event){
        console.log('拖动结束')
    }
    function dragenter(event){
        console.log('有拖拽项进入到Drop Zone了') // 只输出一次，进入边界一瞬间
    }
    function dragover(event){
        console.log('不断输出，有拖拽项正在我上方移动...')
        // 默认情况下，是不允许拖拽至其它dom上的，需要阻止其默认事件
        // 说白了就是，默认情况下不会触发ondrop事件，这里必须preventDefault事件才会继续传递下去吧
        event.preventDefault()
        // dropEffect至少要和effectAllowed保持一致，同样不理解这属性有啥用
        event.dataTransfer.dropEffect = "move"
    }
     function dragleave(event){
        console.log('有拖拽项离开Drop Zone了') // 只输出一次，离开边界一瞬间
    }
    function drop(event){
        // 有些浏览器，拖拽行为会默认打开新标签页（例如国产的360），阻止它
        event.preventDefault()
        // 获取被拖拽项id，手动将其挂载至目标容器
        const id = event.dataTransfer.getData('id')
        event.target.appendChild(document.getElementById(id)) // 这也是我无法理解dropEffect设成move有啥用
        // dataTransfer.types 保存着所有传输数据的key值（即：dataTransfer.setData(key,val)的key）
        event.dataTransfer.types && event.dataTransfer.types.forEach((type,index)=>{
            console.log(type)
        })
        // dataTransfer.items 保存着所有传输数据的kind 和 type（总觉得kind就只有一种string）
        event.dataTransfer.items.forEach((item,index)=>{
            console.log(item)
            // item: {kind, type}
        })
    }
</script>
```

| 针对对象     | 事件名称  | 说明                                                         |
| ------------ | --------- | ------------------------------------------------------------ |
| 被拖动的元素 | dragstart | 在元素开始被拖动时候触发                                     |
|              | drag      | 在元素被拖动时反复触发                                       |
|              | dragend   | 在拖动操作完成时触发                                         |
| 目的地对象   | dragenter | 当被拖动元素进入目的地元素所占据的屏幕空间时触发             |
|              | dragover  | 当被拖动元素在目的地元素内时触发                             |
|              | dragleave | 当被拖动元素没有放下就离开目的地元素时触发                   |
|              | drop      | 当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为 |

**问题：哪些可以拖拽？**

`draggable`属性设为true的元素可以拖动

`文本`，`图片`，`链接`是默认可以拖动的，它们的draggable属性默认为true

语法：`<element draggable="true | false | auto" >`

- true：可以拖动
- false：禁止拖动
- auto：默认值，是否可拖动取决于浏览器定义

#### 10. 滚轮事件（Wheel）

| 事件类型                                                     | 事件对象(原型)                                               | 是否标准                                                     | 兼容性            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| [mousewheel](https://developer.mozilla.org/zh-CN/docs/DOM/DOM_event_reference/mousewheel) | [MouseWheelEvent](https://developer.mozilla.org/zh-CN/docs/DOM/MouseWheelEvent)（好像变了） | 非标准                                                       | 只有Firefox不支持 |
| [DOMMouseScroll](https://developer.mozilla.org/zh-CN/docs/DOM/DOM_event_reference/DOMMouseScroll) | [MouseScrollEvent](https://developer.mozilla.org/zh-CN/docs/DOM/MouseScrollEvent) | 非标准                                                       | 只有Firefox支持   |
| [wheel](https://developer.mozilla.org/zh-CN/docs/DOM/DOM_event_reference/wheel) | [WheelEvent](https://developer.mozilla.org/zh-CN/docs/DOM/WheelEvent) | [DOM Level 3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel) | Firefox 17+ ie9+  |

使用`wheel`定义滚轮事件，官方标准，当然，我也会顺便记录下旧有的实现

```html
<div onwheel="wheel(event)" id="target">
</div>
<script>
function wheel(event) {
        // 原型为：WheelEvent
        event instanceof WheelEvent === true
        console.log('滚轮在滚动中...')
        console.log(event.deltaX) // ［只读］横向滚动量
        console.log(event.deltaY) // ［只读］纵向滚动量
        console.log(event.deltaZ) // ［只读］z轴方向滚动量
        console.log(event.deltaMode) // ［只读］上述各delta的滚动单位．0: px，1: 行，2: 页
    }
    // 同样支持下面两种方式
    document.getElementById('target').onwheel = wheel
    document.getElementById('target').addEventListener('wheel', wheel)
</script>
```

**了解下旧版事件，只作了解，不要使用**

`DOMMouseScroll`：只有火狐支持（Gecko内核）

```html
<div id="target">
</div>
<script>
function wheel(event) {
        // 原型为：MouseScrollEvent
        event instanceof MouseScrollEvent === true
        console.log('滚轮在滚动中...')
        console.log(event.axis) // ［只读］滚轮滚动方向．1: 横向，2: 纵向
        // 滚动量暂时不知道怎么获取．．．
    }
    // 只支持addEventListener，不支持onDOMMouseScroll
    document.getElementById('target').addEventListener('DOMMouseScroll', wheel)
</script>
```

`mousewheel`：非火狐支持（非Gecko内核）

```html
<div onmousewheel="mousewheel(event)" id="target">
</div>
<script>
function mousewheel(event) {
        // 原型为：WheelEvent，是不是chrome新版原型对象变了．．．说好的MouseWheelEvent呢？IE调试工具太难用了，不想测了
        event instanceof WheelEvent === true
        console.log('滚轮在滚动中...')
    }
    // 同样支持下面两种方式
    document.getElementById('target').onmousewheel = mousewheel
    document.getElementById('target').addEventListener('mousewheel', mousewheel)
</script>
```

wheelDelta，wheelDeltaX，wheelDeltaY这3个属性好像是mousewheel的，不懂，先这样吧，详见[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousewheel_event)

#### 11. 滚动事件（Scroll）

`element`的`scroll`事件不冒泡, 但是document的defaultView的scroll事件冒泡

> 顺便一提，`document.defaultView` === `window`

```html
<html>
    <body onscroll=myScroll()>
    </body>
</html>
<script>
    const myScroll = (evt) => {console.log('scroll...')}
    document.onscroll = myScroll
    document.documentElement.onscroll = myScroll // 不起作用！！！
document.body.onscroll = myScroll
    window.onscroll = myScroll
    
    document.addEventListener('scroll', myScroll)
    document.documentElement.addEventListener('scroll', myScroll) // 不起作用！！！
    document.body.addEventListener('scroll', myScroll) // 不起作用！！！
    window.addEventListener('scroll', myScroll) 
</script>
```

*还有一件很神奇的事*

```javascript
document.body.onscroll === window.onscroll // true，这两者竟然是指向同一地址～～
```

**场景一：获取当前页面滚动距离**

```javascript
// 1. 使用DOM对象document
document.documentElement.scrollTop // 声明了DTD
document.body.scrollTop // 未声明DTD

// 2. 使用BOM对象window
window.pageYOffset
window.scrollY
```

**场景二：滚动至指定位置**

```javascript
// 1. 使用DOM对象document
// 1.1 声明了DTD
document.documentElement.scroll(0, 0) 
document.documentElement.scrollTo(0, 0) // scollTo()与上面scoll()等价
document.documentElement.scrollTop = 0
// 1.2  未声明DTD
document.body.scroll(0, 0) 
document.body.scrollTo(0, 0) // scollTo()与上面scoll()等价
document.body.scrollTop = 0

// 2. 使用BOM对象window
window.scroll(0,0)
window.scrollTo(0,0)
window.pageYOffset = 0 // 无效！！！
window.scrollY = 0 // 无效！！！
window.scrollBy(100, 100) // 表示滚动距离［注意兼容性］
window.scrollBy({ // ［注意兼容性］
top: 100,
    left: 100,
    behavior: 'smooth' // 表示滚动行为，支持参数：smooth (平滑滚动)，instant (瞬间滚动)，默认值 auto，效果等同于 instant
}) 
// 非标准属性，看看就好
window.scrollByLines(1) // 指定行数滚动
window.scrollByPages(1) // 指定页数滚动
```

**场景三：文档的实际高度（包括滚动长度）**

```javascript
document.documentElement.scrollHeight
// 注意，document.documentElement.scrollHeight 不一定等于 document.body.scrollHeight
// body有margin以及body子元素的margin穿透，都会造成document比body长
```

#### 12. 自定义并触发事件

```javascript
// 1. 创建自定义事件
const myEvt = new Event('hello') // 接收一个参数，＂事件名＂
// 2. 监听事件
document.addEventListener('hello', (evt) => {console.log('事件hello被触发了')})
// 3. 触发事件
const result = document.dispatchEvent(myEvt) // 此处参数是＂事件变量(myEvt)＂，而不是＂事件名(hello)＂
// 4. 返回结果取非，表示是否阻止默认行为，即：是否执行event.preventDefault()
const cancelled = !result // 默认为false，只有执行了event.preventDefault()才为true
```

```javascript
{
    bubbles: false, // 默认不冒泡
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …},
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    path: (2) [document, Window],
    returnValue: true,
    srcElement: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …},
    target: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …},
    timeStamp: 340201.51500000793,
    type: "hello",
}
```

**自定义事件属性**

```javascript
const myCustomEvt = new CustomEvent('customEvt', {
    detail: 'hello world',  // 要传递的参数
    bubbles: true, // 设置冒泡
    customKey: '自定义key' // 自定义属性只能添加到detail属性，其它都会丢失掉
})
```

```javascript
{
    bubbles: true, // 被修改为true了
    cancelBubble: false
    cancelable: false
    composed: false
    currentTarget: null
    defaultPrevented: false
    detail: "hello world" // 要传递的参数保留在此
    eventPhase: 0
    isTrusted: false
    path: []
    returnValue: true
    srcElement: null
    target: null
    timeStamp: 3129867.234999998
    type: "customEvt"
}
```

