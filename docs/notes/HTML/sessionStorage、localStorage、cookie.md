---
title: sessionStorage、localStorage、cookie
date: 2019-02-17
tags:
  - HTML
categories:
  - HTML
---

sessionStorage    临时数据（session关闭后消失）

localStorage    永久数据

cookie    默认内存cookie，设置expire过期时间，在客户端生成cookie文件，到期删除

在 sessionStorage 中存储的数据会在当前浏览器的同一网站的多个标签页中共享，并在此网站的最后一个标签页被关闭后清除

注意：通过点击链接（或者用了 `window.open`）打开的新标签页之间是属于同一个 session 的，但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session。