---
title: getBoundingClientRect
date: 2019-09-19
tags:
  - JS
categories:
  - JS
---

返回元素的大小及其相对于视口的位置

```html
<div id="test">
</div>
<script>
const test = document.getElementById('test')
console.log(test.getBoundingClientRect())
</script>
```

```javascript
// DOMRect
{
    bottom: 459
    height: 300	// 等价于offsetHeight
    left: 276.359375
    right: 576.359375
    top: 159
    width: 300	// 等价于offsetWidth
    x: 276.359375 // 等价于left（IE和Safari不支持，建议用left）
    y: 159	// 等价于top（IE和Safari不支持，建议用top）
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190919224010.png)

当元素位于可视区域之外，会出现负数

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190919224128.png)