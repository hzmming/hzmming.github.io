---
title: callee和caller
date: 2019-10-29
tags:
  - JS
categories:
  - JS
---

> `这两个属性已经废弃！！！`

### 一. `callee`

`callee`，作为`arguments`的参数，`arguments.callee`表示当前正在运行的函数引用

*以下内容参考自*

*http://s0developer0mozilla0org.icopy.site/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee*

*https://stackoverflow.com/questions/103598/why-was-the-arguments-callee-caller-property-deprecated-in-javascript*

1. **起源**

早期版本的JavaScript不允许使用命名函数表达式，因此，您无法创建递归函数表达式

例如，此语法有效：

```javascript
function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}

[1, 2, 3, 4, 5].map(factorial);
```

但是：

```javascript
[1, 2, 3, 4, 5].map(function(n) {
    return !(n > 1) ? 1 : /* what goes here? */ (n - 1) * n;
});
```

没有. 为了解决这个问题`arguments.callee`被添加，所以你可以做

```javascript
[1, 2, 3, 4, 5].map(function(n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

2. **缺点**

```javascript
function test(flag){
    console.log(this)
    // “flag”用于只递归一次
    if(flag) return;
    arguments.callee(true)
}

test()
```

输出结果

```shell
Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

可以看到`arguments.callee`执行的方法，内部的`this`不等于正常执行方法的`this`（非严格模式下：`gloabl`变量，严格模式下：`undefined`）

3. **弃用**

ECMAScript 3 resolved these issues by allowing named function expressions. For example:

```javascript
[1, 2, 3, 4, 5].map(function factorial(n) {
    return !(n > 1) ? 1 : factorial(n - 1)*n;
});
```



### 二. `caller`

`caller`，指向**调用当前方法**的`方法`，若没有（即在全局使用域被调用），返回`null`

`arguments.caller`已经不可使用了，但`Function.caller`还被保留下来（但实际上也不建议使用）

`Function.caller`

```javascript
// chrome78依然能跑，但不建议使用
function whoCalled() {
    if (whoCalled.caller == null)
        console.log('I was called from the global scope.');
    else
        console.log(whoCalled.caller + ' called me!');
}
```

`arguments.caller`

```javascript
//浏览器已经不支持了
function whoCalled() {
   if (arguments.caller == null)
      console.log('该函数在全局作用域内被调用.');
   else
      console.log(arguments.caller + '调用了我!');
}
```

