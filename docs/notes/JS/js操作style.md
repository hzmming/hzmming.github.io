---
title: 操作style
date: 2020-01-09
tags:
  - JS
categories:
  - JS
---

### 获取整个style文本

```html
<div style="background: red;" id="target">
</div>

<script>
const targetDom = document.querySelector('#target')
    console.log(targetDom.style.cssText) // "background: red;"
    console.log(targetDom.getAttribute('style')) // "background: red;"
</script>
```



### 设置整个style文本

```html
<div style="background: red;" id="target">
</div>

<script>
const targetDom = document.querySelector('#target')
    // 第1种
    targetDom.setAttribute('style', 'background: red; font-size: 24px;')
    // 第2种
    targetDom.style.cssText = 'background: red; font-size: 24px;'
    // 第3种（不建议：仅管chrome和firefox可以）
    targetDom.style = "background: red; font-size: 24px;"
</script>
```



### 获取css属性

```html
<div style="background: red;" id="target">
</div>

<script>
const targetDom = document.querySelector('#target')
    const inlineStyle = targetDom.style
    const computedStyle = getComputedStyle(targetDom)
    console.log(inlineStyle.background) // red
    console.log(computedStyle.background) // rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box
</script>
```

`targetDom.style`与`getComputedStyle(targetDom)`均返回`CSSStyleDeclaration`对象，类似下图

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200109144200.png)

两者的区别也很好理解，`targetDom.style`只包括在元素内联`style`属性上声明的`css属性`，而`getComputedStyle(targetDom)`包括所有作用于当前元素的`css属性`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200109151634.png)



### 追加css属性

```html
<div style="background: red;" id="target">
</div>
<script>
const targetDom = document.querySelector('#target')
    // 第1种
    targetDom.style.fontSize = '16px' // 注意驼峰法
    // 第2种
    targetDom.style.cssText += 'color: #fff'
</script>
```



### 修改css属性

```html
<div style="background: red;" id="target">
</div>
<script>
const targetDom = document.querySelector('#target')
    // 第1种
    targetDom.style.background = 'green'
    // 第2种（强行）
    targetDom.style.cssText = targetDom.style.cssText.replace(/background:.*;/, 'background: blue;')
</script>
```



### 删除css属性

```html
<div style="background: red;" id="target">
</div>
<script>
const targetDom = document.querySelector('#target')
    // 第1种
    targetDom.style.background = null // 设成空字符串''对于chrome和firefox可以，但ie不行！
    // 第2种（强行）
    targetDom.style.cssText = targetDom.style.cssText.replace(/background:.*;/, '')
</script>
```

