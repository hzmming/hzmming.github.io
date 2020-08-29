---
title: $nextTick源码
date: 2019-05-04
tags:
  - Vue
categories:
  - Vue
---

简单的跟了一遍，做个简略的记录

#### 前置知识

宏任务(macrotask)：setTimeout、setInteravl、setImmediate

微任务(microtask)：Promise、MutationObserver

**event loop**的过程：

​     清空微任务队列             执行一个宏任务               清空微任务队列       循环

（empty microtask queue => execute one of macrotask queue => empty microtask queue => loop）

1. 执行完同步代码(js stack)

2. 将微任务队列(先进先出)依次push进栈，直至清空微任务队列

3. 从宏任务队列(先进先出)取一个push进栈

4. 回到第二步，继续执行微任务直至清空队列

**In short**

微任务(microtask)在宏任务(macrotask)之前执行

默认情况下，task指的是宏任务(macro) task，微任务会清楚写明microtask

#### 测试代码

 

```javascript
// Vue.version === 2.6.10
new Vue({
  el: '#app',
  created() {
    this.$nextTick(function(){
      console.log('hello world')
    })
  }
})
```

#### 跟踪

以下代码有删减改动，便于阅读

 

```javascript
// this.$nextTick调用
Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
};
// Vue.nextTick调用
Vue.nextTick = nextTick
```

 

```javascript
var callbacks = [];              // 一次nextTick要执行的回调函数列表
// 多次执行$nextTick只需触发一次异步任务，之后的回调往callbacks数组push就行，到时会一并处理这些回调
var pending = false;  
function nextTick (cb, ctx) {
    callbacks.push(function () {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        } 
    });
    if (!pending) {
        pending = true;
        // 添加异步任务至任务队列
        // 是微任务还是宏任务取决于浏览器
        timerFunc();
    }
}
```

 

```javascript
var isUsingMicroTask = false;    // 是否使用microTask（微任务）           
// 触发回调，并清空callbacks
function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
// 用于添加异步任务至任务队列，是微任务还是宏任务取决于浏览器
var timerFunc;
// 1. 首选原生Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
        p.then(flushCallbacks);
    };
    isUsingMicroTask = true;
} 
// 2. 使用MutationObserver代替 在 不支持原生Promise的情况（e.g. PhantomJS, iOS7, Android 4.4）
// (#6466 MutationObserver在IE11里 不可靠的，所以不包括IE)
else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    // 以下代码生成一个dom节点并使用MutationObserver监听它，改变dom内容，达到microTask的效果
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = function () {
        // 这里其实就是人家随便写的，只要保证生成一个不一样的counter，
        // 使其修改textNode的内容，触发MutationObserver即可
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
    isUsingMicroTask = true;
} 
// 3. 回退到 setImmediate
// 虽然它使用的是（宏）任务队列[macro task queue]，但对比setTimeout它还是个更好的选择
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = function () {
        setImmediate(flushCallbacks);
    };
} 
// 4. 回退到setTimeout
else {
    timerFunc = function () {
        setTimeout(flushCallbacks, 0);
    };
}
```

$nextTick所使用的异步任务，是微任务还是宏任务，大致的判断过程如下

1. 首选**原生**Promise

2. 使用MutationObserver代替 在 不支持原生Promise的情况（MutationObserver在IE11里不可靠的，所以不包括IE）

3. 回退到 setImmediate

4. 回退到setTimeout