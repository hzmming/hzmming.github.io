---
title: npm scripts串行与并行
date: 2020-08-27
tags:
  - NodeJS
  - npm
  - yarn
categories:
  - NodeJS
---

*写自 2020年8月27日*

> 前提：yarn 与 npm 使用方式类似， yarn 更简洁，少写个 run，如 yarn build 等同于 npm run build。
>
> 而且终端执行 cli 工具，npm 需要使用 npx，而 yarn 会自动寻找到 node_modules 去。
>
> 所以我最近一直用 yarn，该文章则使用 yarn 讲解

 

npm scripts 本身不提供一条语句执行多个命令的功能，可采用以下几种方式解决

### 方式一 shell 脚本

#### linux

linux shell 脚本自带的 `&&`、`&`、`||`，使用如下

```json
{
    "scripts": {
        // 串行。前一条命令执行失败，则不执行后面的命令
        "serial": "yarn first && yarn secnod"
 
        // 并行。准确地说是前一条命令“后台执行”
        "parallel": "yarn first & yarn secnod"
 
        // 或。前一条命令执行失败，才执行后面的命令
        "or": "yarn first || yarn secnod"
    }
}
```

#### windows

印象中大家都说 windows 的 cmd 不支持这几个符号，可为什么我试了下，是可以的。。。而且还是 cmd 可以，powershell 不行，网上也没看到啥资料啊，我懵了~~

时间：2020/8/27，平台：win10 版本 2004（OS 内部版本 19041.450）

```cmd
# &&
> echo 3 && echo 4
3
4
 
# &
> echo 3 & echo 4
3
4
 
# ||
> echo 3 || echo 4
3
```

#### 问题

这个方式当然是首推的，但我使用的过程中遇到了个问题，我要执行两个命令，

先执行`webpack -w`，再执行`webpack-dev-server`，因为有先后逻辑，所以写了如下

```json
{
    "scripts": {
        "start": "first && second",
        "first": "webpack -w",
        "second": "webpack-dev-server"
    }
}
```

然后我发现它第一条命令执行完卡住了，没有再执行第二条命令，最终得出来的结论是使用了`-w`的 watch 模式，只要使用了这个参数，程序就一直在等待着、监听着工作区的变化，然后就不走了~~

### 方式二 npm-run-all

> 话说这包的 github 仓库都快有一年没动静了吧？2020/9/27

[官网](https://github.com/mysticatea/npm-run-all)，这个包有两个优点

1. 简洁
2. 通配符
3. 跨平台（我的cmd真的支持`&`啊。。。）

```shell
yarn add npm-run-all -D
```

使用

* `-p`表示并行，全称是`--parallel`
* `-s`表示串行，全称是`--serial`或者`--sequential`

```json
{
    "scripts": {
        // 串行（默认）
        "serial": "npm-run-all first second" // 连 yarn 都省了，简洁到爆啊！
 
        // 并行
        "parallel": "npm-run-all first -p second"
    }
}
```

还有两个缩写命令`run-s`、`run-p`分别表示串行和并行，因为 npm-run-all 还可以更灵活的组合，所以就不用这两个了

组合

```json
{
    "scripts": {
        // 第一, 串行执行 a 和 b
        // 第二, 并行执行 c 和 d
        // 第三, 串行执行 e 和 f
        // 最后, 并行执行 g、 h 和 i
        "start": "npm-run-all a b -p c d -s e f -p g h i"
    }
}
```

通配符

```json
{
    "scripts": {
        // 并行执行 watch:html，watch:js
        // 而 watch:js:sub 不会被执行，若要执行请使用 npm-run-all watch:**（两个*）
        "watch": "npm-run-all watch:*",
        "watch:html": "...",
        "watch:js": "...",
        "watch:js:sub": "..."
    }
}
```

`npm-run-all`怎么看都是深得我心，只可惜，前面提到的问题它也挂了~~

当同时执行 `webpack -w` 和 `webpack-dev-server`时，同样是卡在了第一条命令的 watch 模式

### 方式三 Concurrently

安装

```shell
yarn add concurrently -D
```

使用

```json
{
    "scripts": {
        // 串行（默认）
        "serial": "concurrently yarn:first yarn:second", // 使用yarn:<command>的形式，如果是npm则为npm:<command>
    }
}
```

为什么感觉 [README.md](https://github.com/kimmobrunfeldt/concurrently#readme) 写得不是很清楚。。甚至都没看明白，默认是串行还是并行~~

用得不多，这里就不继续下去了，哪天用了再说

虽然嫌弃它文档没写好，也没有 npm-run-all 简洁，**但是最开始提出的问题，concurrently 到是解决了**

```json
{
    "scripts": {
        "start": "concurrently yarn:first yarn:second",
        "first": "webpack -w",
        "second": "webpack-dev-server"
    }
}
```

程序不会卡在第一条命令的 watch 模式！