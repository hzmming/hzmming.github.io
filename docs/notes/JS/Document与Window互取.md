---
title: Document与Window互取
date: 2019-10-10
tags:
  - JS
categories:
  - JS
---

### 1. 基本

 

```javascript
document.defaultView === window
window.document === document
```

### 2. iframe

 

```javascript
const iframeDom = document.getElementsByTagName('iframe')[0]
// 获取iframe对应的document，如果cross-origin，会报错.
iframe.contentDocument
// cross-origin，还是可以获取的
iframe.contentWindow
// 但是通过window获取cross-origin的document，依然报错
iframe.contentWindow.document
// 其实通过这个跨域window访问任何属性都会报错
iframe.contentWindow.xxx // 还是error
```