---
title: HTTP Archive file（.har）
date: 2020-03-01
tags:
  - HTTP
categories:
  - HTTP
---

HTTP存档格式是一种JSON格式的存档文件格式，多用于记录网页浏览器与网站的交互过程。文件扩展名通常为.har





想以此解决离线开发offline develop问题

1. YApi支持导入har作为接口，但会失去原数据（可能动态数据很厉害，但我只想要原数据啊，有些bug就得那些数据触发）

2. 还找了好多npm工具，类似http-server的，用于单独启服务，以har文件为接口响应内容，如har-server（大文件挂了），har-express（就没成功过），而且都不支持多文件

3. 使用之前管理端项目的mock结构，自己用node解析har文件生成接口与响应内容，不知道webpack代理为什么没反应...，可能我还是没理解之前那个mock原理吧，急躁...

 

```javascript
const fs = require('fs')
const path = require('path')
// 直接用同步读取了，避免处理外层异步，缺点就是启动慢了点
const getHarObj = (src) => JSON.parse(fs.readFileSync(path.resolve(src), 'utf8'))
const loginHar = getHarObj('mock/login.har')
const mainHar = getHarObj('mock/main.har')
const operateHar = getHarObj('mock/operate.har')
const entries = [...loginHar.log.entries, ...mainHar.log.entries, ...operateHar.log.entries]
// 过滤了webpack的请求以及脚本和图片之外的请求（图片这里没处理好，把不必要的图片请求也包含进来了，只想要节点头像）
const result = entries.filter(item => !item.request.url.includes('sockjs-node') && item.request.url.includes('server-app') && ['scripts', 'image'].includes(item._resourceType))
.map(item => {
    const req = item.request, res = item.response; 
    return {
        url: req.url.replace('http://localhost:8080/server-app', ''), // 这个url替换写得很死啊...
        type: req.method.toLowerCase(), 
        response: item._resourceType === 'scripts' ? JSON.parse(res.content.text) : res.content.text
    }
})
fs.writeFile(path.resolve('mock/mock.js'), 'export default ' + JSON.stringify(result), 'utf8', () => {})
export default result;
```