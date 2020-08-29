---
title: polyfill各种数组方法
date: 2019-09-19
tags:
  - JS
categories:
  - JS
---

**forEach**（IE9+）

```javascript
Array.prototype.forEach = function(callbackfn, thisArg){
    // callbackfn类型判断
    if(Object.prototype.toString.call(callbackfn).slice(8,-1) !== 'Function'){
        throw new TypeError(callbackfn + ' is not a Function')
    }
    var array = this;
    var hasThisArg = false
    if(arguments.length > 1){
        hasThisArg = true
    }
    for(var i=0; i<array.length; i++){
        hasThisArg ? callbackfn.call(thisArg,array[i],i) : callbackfn(array[i],i)
    }
}
```

**map**（IE9+）

```javascript
Array.prototype.map = function(callbackfn, thisArg){
    // callbackfn类型判断
    if(Object.prototype.toString.call(callbackfn).slice(8,-1) !== 'Function'){
        throw new TypeError(callbackfn + ' is not a Function')
    }
    var array = this
    var resultArr = []
    var hasThisArg = false
    if(arguments.length > 1){
        hasThisArg = true
    }
    for(var i=0; i<array.length; i++){
        var tmp = hasThisArg ? callbackfn.call(thisArg, array[i], i) : callbackfn(array[i], i)
        resultArr.push(tmp)

    }
    return resultArr
}
```



**filter**（IE9+）

```javascript
Array.prototype.filter = function(callbackfn, thisArg){
    // callbackfn类型判断
    if(Object.prototype.toString.call(callbackfn).slice(8,-1) !== 'Function'){
        throw new TypeError(callbackfn + ' is not a Function')
    }
var array = this
var resultArr = []
    var hasThisArg = false
    if(arguments.length > 1){
        hasThisArg = true
    }
for(var i=0; i<array.length; i++){
if(hasThisArg ? callbackfn.call(thisArg, array[i], i) : callbackfn(array[i], i)){
resultArr.push(array[i])
        }
    }
return resultArr
}
```



**reduce**（IE9+）

```javascript
Array.prototype.reduce = function(callbackfn, initialValue){
    // callbackfn类型判断
    if(Object.prototype.toString.call(callbackfn).slice(8,-1) !== 'Function'){
        throw new TypeError(callbackfn + ' is not a Function')
    }
    var array;
    if(arguments.length > 1){
        var tmp = this.slice() // shallow copy
        tmp.unshift(initialValue)
        array = tmp
    }else {
        array = this
    }
    var length = array.length
    // 0个直接报错
    if(!length) throw new TypeError('Reduce of empty array with no initial value')
    else if(length === 1) return array[0] // 只有一个，直接返回
    var i = 1
    var sum = array[0]
    while(i < length){
        sum = callbackfn(sum, array[i])
        i++
    }
    return sum
}
```