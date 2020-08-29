---
title: npm command
date: 2019-10-23
tags:
  - NodeJS
  - npm
categories:
  - NodeJS
---

#### 1. npm ls

全称`npm list`，查看当前项目`node_modules`所有安装的包

```shell
# 查看所有安装包依赖（一棵庞大的树）
npm ls

# 只查看一级安装包
npm ls --depth=1

# 查看n级安装包
npm ls --depth=n

# 只查看某个包，若安装多个则结果有多个
npm ls @babel-core 
```

