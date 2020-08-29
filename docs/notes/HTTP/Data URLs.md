---
title: Data URLs
date: 2019-09-23
tags:
  - HTTP
categories:
  - HTTP
---

**Data URLs**，即前缀为 `data:` 协议的的URL，其允许内容创建者向文档中嵌入小文件

Data URLs 由四个部分组成：前缀(`data:`)、指示数据类型的MIME类型、如果非文本则为可选的`base64`标记、数据本身：

```html
data:[<mediatype>][;base64],<data>
```

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)上写得很详细，好像没啥补充的

