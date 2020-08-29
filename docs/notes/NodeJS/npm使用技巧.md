---
title: npm使用技巧
date: 2019-07-12
tags:
  - NodeJS
  - npm
categories:
  - NodeJS
---

```shell
npm config get registry  # 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像
```



```shell
# npm授权
# npm owner add <用户名> [包名]
npm owner add huangzhenming @dataexa/example
npm owner add zhangshan # 当前包根目录下发当前包，可省略包名
npm owner -h # 查看帮助
```



```shell
# 登录
npm login
# 输入用户名和密码（对应npm网站登录时所输的用户名和密码）
# ...
# 输入邮箱
```

