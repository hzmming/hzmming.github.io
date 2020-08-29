---
title: Notification API
date: 2019-09-29
tags:
  - JS
categories:
  - JS
---

`Notification`允许用户发送系统级别的通知消息

> **Secure context**
> This feature is available only in [secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS), in some or all [supporting browsers](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#Browser_compatibility).

> 出于安全性考虑，只能用于https协议网站

#### 应用场景

bilibili番剧更新了，提示观看，点击内容更是可以打开新对应页面观看番剧

#### 用户权限

```javascript
Notification.permission
// default：默认
// denied：拒绝
// granted：允许
```

#### 请求权限

```javascript
Notification.requestPermission().then((result)=>{
    console.log(result)
// 可能值为：default，denied，granted
})
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190929153512.png)

#### 推送通知

```javascript
const notification = new Notification(title, options)
```

`title`：通知的标题

`options`：通知的设置选项（可选）

* body：通知的内容

* tag：代表通知的一个识别标签，相同tag时只会打开同一个通知窗口

* icon：要在通知中显示的图标的URL

* image：要在通知中显示的图像的URL

* data：想要和通知关联的任务类型的数据

* requireInteraction：通知保持有效不自动关闭，默认为false

#### 关闭通知

```javascript
const notification = new Notification(title, options)
setTimeout(()=>{
notification.close()
}, 4000)
```

#### 事件

* show：当通知被显示给用户时触发
* click：当用户点击通知时触发
* close：当通知被关闭时触发
* error：当通知发生错误的时候触发。这通常是因为通知由于某些原因而无法显示

这些事件可以通过事件处理跟踪 [`onshow`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification/onshow)、[`onclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification/onclick)、[`onclose`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification/onclose) 和 [`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification/onerror)。因为 [`Notification`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification) 同样继承自 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)，因此可以对它调用 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 方法

```javascript
const notification = new Notification('番剧更新了', {
    body: '点击跳转'
})
notification.onclick = (evt) => {
window.open('http://www.bilibili.com')
}
```

#### 兼容性

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190929155619.png)