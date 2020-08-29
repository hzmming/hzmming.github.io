---
title: minipack
date: 2020-07-30
tags:
  - 前端
categories:
  - 前端
---

手写一个简单的webpack，对理解 webpack 打包很有帮助

官方代码 [minipack]( https://github.com/ronami/minipack )

 

[官方40分钟教你写webpack]( https://www.youtube.com/watch?v=Gc9-7PBqOC8&list=LLHK1mTHpwrUeYgF5gu-Kd4g ) （官方视频，只可惜没有中文字幕，不过跟着敲代码，到也还ok）

已经跟着敲了一遍代码，不知道记啥，简单地说下，

1. 使用`babylon`将代码转换成 AST
2. 使用`babel-traverse`遍历 AST，并收集依赖（import）
3. 使用`babel-core`将代码转译至 CommonJS规范的 es5
4. createAsset() 输出模块module（包括 id, filename, dependencies, code）
5. createGraph() 递归调用 createAsset，最终生成完整的依赖树dependency graph
6. bundle() 实现简单的 CommonJS 并将依赖树打包成浏览器可执行的代码