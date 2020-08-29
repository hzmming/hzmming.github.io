---
title: browserslist
date: 2018-09-07
tags:
  - 前端
categories:
  - 前端
---

##### 1. 基本

[browserslist ](https://github.com/browserslist/browserslist) 是一个开源项目，表示该项目的浏览器兼容情况

在`package.json`配置如下参数

```json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "Android >= 3.2",
    "Firefox >= 20",
    "iOS 7"
  ]
```

以上参数表示 这个项目兼容绝大多数的，最新的和iOS7系统下的浏览器。不兼容Android 3.2系统以下和Firefox20以下的浏览器

像这些" [> 1%](http://browserl.ist/?q=%3E+1%25)", "[last 2 versions](http://browserl.ist/?q=last+2+versions)" 都是查询参数。

具体参数列表见[官方文档](https://github.com/browserslist/browserslist#queries)

可以到这个网站在线测试，了解浏览器使用情况  http://browserl.ist/

##### 2. 作用

单纯地在 package.json 里配置说我要兼容 IE8 等，其实是没啥用处的，需要和其它工具进行结合

正如其官网据说，

Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env

在不同的前端工具之间，像 Autoprefixer, Stylelint 和 babel-preset-env，共享目标浏览器（配置）

说白了，就是大家约定好了，以 package.json 里 browserslist字段 作为配置

> browserslist 并不是 (NodeJS) 配置文件 package.json 的预设字段

以 PostCSS 为例

```javascript
// .postcssrc.js
 
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
```

虽然 PostCSS 配置了 自动添加前缀 插件（autoprefixer），但具体是怎样一个添加规则？是否兼容 IE8 等等？？

autoprefixer 就需要获取 package.json 配置的 browserslist字段，以此作为规则

##### 3. 个人理解

`browserslist`和 其它插件，两者的配合关系：

`browserslist`的付出主要在于其海量的用户数据，如`> 1%`这样的模糊查询。

具体地 自动添加前缀 等其它功能交由 autoprefixer 之类的插件实际完成