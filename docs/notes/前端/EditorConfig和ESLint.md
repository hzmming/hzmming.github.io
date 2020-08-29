---
title: EditorConfig和ESLint
date: 2018-09-11
tags:
  - 前端
categories:
  - 前端
---

**基本**
EditorConfig 最常见的用途是：统一文件的编码字符集以及缩进风格
Eslint  是静态代码检查工具



**比较**

1. Eslint 确实包含 .editorconfig 中的一些属性，如缩进等，但并不全部包含，如 .editorconfig 中的 insert_final_newline 属性 Eslint 就没有。
2. Eslint 更偏向于对语法的提示，如定义了一个变量但是没有使用时应该给予提醒。而 .editorconfig 更偏向于代码风格，如缩进等。
3. Eslint 仅仅支持对 js 文件的校验，而 .editorconfig 不光可以检验 js 文件的代码风格，还可以对 .py（python 文件）、.md（markdown 文件）进行代码风格控制。


**总结**
根据项目需要，Eslint 和 .editorconfig 并不冲突，同时配合使用可以使代码风格更加优雅。