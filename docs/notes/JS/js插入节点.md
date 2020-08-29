---
title: js插入节点
date: 2019-09-23
tags:
  - JS
categories:
  - JS
---

#### 一. Node.appendChild

`Node.appendChild`，将一个节点（[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象）添加到指定父节点的子节点列表末尾

```javascript
const target = document.createElement('div')
// 插入文本
target.appendChild(document.createTextNode('hello world'))
// 插入节点
document.body.appendChild(target)
```

`appendChild`有几个特性

1. 兼容性好（IE5+）
2. 只能接收`Node`类型元素作为参数
3. 参数只能一个，即：一次只能添加一个元素
4. 返回插入的元素
5. 如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）

> Element节点继承自Node，以常见的div为例，其原型链如下
>
> "HTMLDivElement <= HTMLElement <= Element <= Node <= EventTarget <= Object"

#### 二. ParentNode.append

`ParentNode.append`，将一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象添加到指定父节点的子节点列表末尾

被插入的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象等价为 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点（`DOMString`就是普通的字符串罢了）

```javascript
const target1 = document.createElement('div')
const target2 = document.createElement('div')
// 插入文本（支持多个）
target1.append('hello world', 'target1')
target2.append('hello world', 'target2')
// 插入节点（支持多个）
document.body.append(target1, target2)
```

`append`有几个特性

1. 兼容性不好（不支持IE）［实验属性］
2. 可以接收`Node`类型元素，也可以接收`字符串`（字符串等价于`Text`文本节点）
3. 参数可以多个
4. 无返回值
5. 如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）

#### 三. Node.insertBefore

`Node.insertBefore`，将一个节点（[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象）添加到指定父节点的子节点列表中指定节点前面

```javascript
const referenceElement = document.getElementById('referId')
const parentNode = referenceElement.parentNode
const target = document.createElement('div')
// 将target添加到指定节点referenceElement前面
parentNode.insertBefore(target, referenceElement)
// 将target添加到父节点parentNode子节点列表末尾
parentNode.insertBefore(target, null)
// 将target添加到父节点parentNode子节点列表前面
parentNode.insertBefore(target, parentNode.firstChild)
```

> 第二个参数referenceElement如果不存在，要传null，不提供或者传入无效值，不同浏览器会有不同的表现

`insertBefore`有几个特性

1. 兼容性一般（IE9+）
2. 只能接收`Node`类型元素作为参数
3. 参数只能一个，即：一次只能添加一个元素
4. 返回插入的元素
5. 如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）

#### 四. ParentNode.prepend

`ParentNode.prepend`，将一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象添加到指定父节点的子节点列表前面

被插入的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象等价为 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点（`DOMString`就是普通的字符串罢了）

```javascript
const target1 = document.createElement('div')
const target2 = document.createElement('div')
// 插入文本（支持多个）
target1.prepend('hello world', 'target1')
target2.prepend('hello world', 'target2')
// 插入节点（支持多个）
document.body.prepend(target1, target2)
```

`prepend`有几个特性

1. 兼容性不好（不支持IE）［实验属性］
2. 可以接收`Node`类型元素，也可以接收`字符串`（字符串等价于`Text`文本节点）
3. 参数可以多个
4. 无返回值
5. 如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）