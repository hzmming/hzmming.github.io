---
title: 前后分离之cookie认证
date: 2019-05-03
tags:
  - 前端
categories:
  - 前端
---


\1. 后端session认证

后端session默认会在响应头里设置cookie信息，如下

 

```shell
set-cookie: JESSIONID=XXXXXXXXXXX; Path=/后端域名/; HttpOnly
```

浏览器识别到set-cookie字段，会自动将{JESSIONID: XXXXX}设置到cookie里

浏览器每次发请求都会带上cookie，也就是说每次发请求都会带上JESSIONID，后端服务器只需验证下JESSIONID便行

\2. 前后分离（cookie丢失）

webpack-dev-server使用的是http-proxy-middleware代理转发插件

请求流程如下：

  浏览器   =》   前端服务器   =》   后端服务器

后端服务器还是会在响应头里设置cookie信息，但是前端服务器不具备浏览器的自动设置cookie的功能，造成前端服务器第二次请求时没有带上JESSONID，后端服务器没有拿到JESSIONID，认定其没有登陆，所以再次返回了未登录的信息（我猜的，现在这篇笔记只是因为帮实习生解决问题，顺便记录下，以后有机会搞清楚下）

\3. 解决办法

![img](/img/798385338.png)

a. 从上面的请求可以看出，后端服务器的域名地址是“ budiu2 ”

  并且Result Headers信息里的Cookie并没有带上 JESSIONID

b. 修改webpack代理配置

 

```javascript
{
    proxy: {
      "/api": {
        target: "http://localhost:8000",
            
        // 添加下面这些代码！！！！！！！！！！！！
            
        changeOrigin: true,  
        pathRewrite: {"^/api" : ""},
          onProxyRes: function(proxyRes, req, res) {
          var cookies = proxyRes.headers['set-cookie'];
          var cookieRegex = /Path=\/XXX\//i;    // 此处XXX修改为后端域名，我这里为budiu2！！！！！！！
          //修改cookie Path
          if (cookies) {
            var newCookie = cookies.map(function(cookie) {
              if (cookieRegex.test(cookie)) {
                return cookie.replace(cookieRegex, 'Path=/');
              }
              return cookie;
            });
            //修改cookie path
            delete proxyRes.headers['set-cookie'];
            proxyRes.headers['set-cookie'] = newCookie;
          }
        }
      }
    }
}
```

（记得修改成正确的后端域名）

c. 搞定