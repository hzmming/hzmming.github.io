---
title: js操作class
date: 2019-11-01
tags:
  - JS
categories:
  - JS
---

#### 1. getAttribute和setAttribute

```html
<div class="my-class" id="test1">
</div>

<div id="test2">
</div>

<div class id="test3">
</div>
```

```javascript
const test1 = document.getElementById('test1')
test1.getAttribute('class') // 'my-class'
test1.setAttribute('class', 'hello') 
test1.getAttribute('class') // 'hello' ［粗暴覆盖操作］

const test2 = document.getElementById('test2')
test2.getAttribute('class')  // null［若没有'class'属性，返回null］

const test3 = document.getElementById('test3')
test3.getAttribute('class') // '' ［有'class'属性，但没值，则返回空字符串''］
```



#### 2. className

和`getAttribute/setAttribute`类似

```html
<div class="my-class" id="test1">
</div>

<div id="test2">
</div>

<div class id="test3">
</div>
```

```javascript
const test1 = document.getElementById('test1')
test1.className // 'my-class'
test1.className = 'hello'
test1.className // 'hello' ［粗暴覆盖操作］

const test2 = document.getElementById('test2')
test2.className // ''［若没有'class'属性，也是返回空字符串''］

const test3 = document.getElementById('test3')
test3.className // '' ［有'class'属性，但没值，则返回空字符串''］
```



#### 3. classList

能够更便捷地操作`css class`

```html
<div class="my-class" id="test1">
</div>
```

```javascript
const test1 = document.getElementById('test1')
console.log(test1.classList)

// DOMTokenList ["my-class", value: "my-class"]
{
    0: "my-class"
    length: 1
    value: "my-class"
    __proto__: DOMTokenList
}
```

[`DOMTokenList`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)，类数组格式，表示一组空格分隔的标记（tokens），实现该接口的值主要有 Element.classList、HTMLLinkElement.relList、HTMLAnchorElement.relList 或 HTMLAreaElement.relList 返回的一组值

*（此时的token则为一个个css class）*

```javascript
// 1. 获取单个类名
test1.classList[0]				// my-class
test1.classList.item(0)	  // my-class

// 2. 添加类名
test1.classList.add('hello') // 'my-class hello'，叠加而不是覆盖
// Uncaught DOMException 报错！！！类名不能有空格，添加多个类名不是这样操作的
test1.classList.add('hello world') 
test1.classList.add('hello', 'world') // 'my-class hello world'，支持一次性添加多个

// 3. 是否包含类名［注意是'contains'，带了个s］
test1.classList.contains('my-class') // true
test1.classList.contains('hello') // false
test1.classList.contains('hello world') //永远返回 false，没有意义，不支持同时判断多个类名

// 4. 删除类名
test1.classList.remove('my-class') // ［没有返回值］
test1.classList.remove('hello') // ［删除不存在的类名也不会报错，依然没有返回值］
test1.classList.remove('my-class', 'hello') // 支持一次性删除多个

// 5. 切换类名
// a. 已有该类名则删除，返回 false
// b. 没有该类名则添加，返回 true
test1.classList.toggle('my-class') 
// c. 明确添加类名，返回true［等价于add()，不过只有一个参数］
test1.classList.toggle('my-class', true) 
// d. 明确删除类名，返回false［等价于remove()］
test1.classList.toggle('my-class', false) 

// 6. 替换类名
test1.classList.replace('my-class', 'hello') // 返回 true 表示替换成功
test1.classList.replace('abc-defg', 'hello') // 返回 false 表示替换失败，没有找到可替换内容

// 7. 获取所有类名
test1.classList.value // 'my-class'，返回空格隔开的所有类名字符串
test1.classList.toString() ===  test1.classList.value // 与上面等价

// 8. 覆盖类名
test1.classList.value = 'hello world' // 等价于 Element.className

```

**兼容性问题**

**IE10+ 部分支持**，不支持部分如下

1.SVG or MathML 元素不支持`classList`

2.不支持 `toggle`方法的第二个参数

3.不支持`add()` & `remove()` 方法多个参数

4.不支持`replace()`方法 

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191101204158.png)

Chrome28+、Firefox26+、Edge12+ 全面支持

#### 4. Jquery

jquery不仅解决了各浏览器api不统一的问题，同时带来了更便捷的dom操作

```html
<div class="hello world" id="test1">
</div>
```

```javascript
// 1. 添加类名
$('#test1').addClass('ni')
$('#test1').addClass('ni hao') // 以空格分隔表示添加多个类名

// 2. 是否包含类名
$('#test1').hasClass('hello') // true，表示存在
$('#test1').hasClass('ni') // false，表示不存在
$('#test1').hasClass('hello world') // true，支持同时判断多个类名！！！

// 3. 删除类名
$('#test1').removeClass()  // 不给参数，表示删除所有类名
$('#test1').removeClass('hello')
$('#test1').removeClass('hello world') // 同时删除多个类名

// 4. 切换类名
$('#test1').toggleClass()  // 删除所有类名，再执行一次，还原所有类名（jq内部保留了类名）
$('#test1').toggleClass('hello') // 有则删除，无则添加
$('#test1').toggleClass('hello world') // 同时切换多个类名
$('#test1').toggleClass('hello', true) // 指定添加，等价于addClass()
$('#test1').toggleClass('hello', false) // 指定删除，等价于removeClass()
$('#test1').toggleClass('hello world', true) // 支持多个
```

值得注意，如果同时切换多个类名，而dom上已存在其中一个类名，则变成多个轮流选中一个

```html
<div class="hello" id="test1">
</div>
```

```javascript
$('#test1').toggleClass('hello world') // 类名变成：world，再执行一次，类名变成：hello，再执行一次，又变成：world，如此循环往复
```

