---
title: favico.ico
date: 2020-03-15
tags:
  - HTML
categories:
  - HTML
---

浏览器标签页和书签面板都会使用**favico.ico**这个图标

如果`<head>`头没有指定图标，默认从服务根目录取，即**/favic.ico**（使用http-server便捷启服务时经常报这个找不到）

有点不想理解了...记录下，想看再看吧

[张鑫旭](https://www.zhangxinxu.com/wordpress/2019/06/html-favicon-size-ico-generator/)

[mdn](https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)



几个网站的设置

**mdn**

```html
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://developer.cdn.mozilla.net/static/img/favicon144.a6e4162070f4.png">
<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://developer.cdn.mozilla.net/static/img/favicon114.0e9fabd44f85.png">
<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://developer.cdn.mozilla.net/static/img/favicon72.8ff9d87c82a0.png">
<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="https://developer.cdn.mozilla.net/static/img/favicon57.a2490b9a2d76.png">
<!-- basic favicon -->
<link rel="shortcut icon" href="https://developer.cdn.mozilla.net/static/img/favicon32.e02854fdcf73.png">
```

**掘金**

掘金写得有点复杂，不看...

