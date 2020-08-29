---
title: PostCSS.md
date: 2018-09-07
tags:
  - 前端
categories:
  - 前端
---

#### 1. 基本

[`PostCSS`](https://github.com/postcss/postcss/blob/829cb8511175c7bf7f019fad7189a021ae3de4c0/README-cn.md)，一款CSS预处理器

更像是一个工具箱，提供多种多样的插件，如 自动添加前缀的 [Autoprefixer](https://github.com/postcss/autoprefixer)

#### 2. 使用

此处以`webpack`为例，更多详见[官网](https://github.com/postcss/postcss/blob/829cb8511175c7bf7f019fad7189a021ae3de4c0/README-cn.md#使用方法)

在 `webpack.config.js` 里使用 [`postcss-loader`](https://github.com/postcss/postcss-loader) :

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```

然后创建 `postcss.config.js`: *（官网写的名字，我没试过，但是 vue-cli 生成的项目文件是叫 .postcssrc.js）*

```
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}
```

使用了哪些插件就得先安装好，此处为

```shell
npm i precss autoprefixer -D
```

#####  不起作用？

不报错，一切正常，可为什么前缀没加上呢？（比如使用 flex，没有 webkit-flex 那些东西）

还差一样东西，[browserslist.md](wiz://open_document?guid=4f11b759-d8ae-47ba-ad98-5acf92742f77&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)

autoprefixer 需要知道自己要兼容哪些浏览器，如果不兼容 ie，那就可以不生成 ms-flex 之类的前缀

在 package.json 添加目标浏览器信息，或者创建 .browserslistrc 配置文件都行

**package.json**

```json
{
  // vue-cli 生成，所使用的
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```

**.browserslistrc**

```
> 1%
last 2 versions
not dead
```

为什么 postcss 官网没有提及到 browserlist 呢？因为 autoprefixer 只是它其中一款插件罢了，只是这款插件用到了 browserlist，其它插件不一定需要用到

##### 还是不起作用？？

明明配置了 browserslist ，怎么还不行？还是以 flex 为例，到上一步的配置为止，还是没出现 -ms-flex 前缀

**因为配置的目标浏览器，不包含需要此前缀的浏览器**

如何查看 autoprefixer 将会添加哪些前缀呢？

```shell
npx autoprefixer --info
```

```shell
loryhuang@DESKTOP-RVT1HEG:/mnt/f/demo/hello-world$ npx autoprefixer --info
# browser配置的表达式，最终匹配到的浏览器如下
Browsers:
  Chrome for Android: 84
  Firefox for Android: 68
  And_qq: 10.4
  UC for Android: 12.12
  Android: 81
  Baidu: 7.12
  Chrome: 84, 83, 81
  Edge: 84, 83, 18
  Firefox: 79, 78, 77
  IE: 11
  iOS: 13.4-13.5, 13.3, 12.2-12.4
  Kaios: 2.5
  Opera Mini: all
  Opera Mobile: 46
  Opera: 69, 68
  Safari: 13.1, 13
  Samsung: 12.0, 11.1-11.2
 
These browsers account for 90.31% of all users globally
 
# 需要添加前缀的，都在底下
At-Rules:
  @keyframes: webkit
  @resolution: webkit
  @viewport: ms, o
 
Selectors:
  ::backdrop: webkit
  ::placeholder: moz, -ms- old, ms
  ::selection: moz
  :any-link: webkit, moz
  :fullscreen: webkit, ms
  :placeholder-shown: moz, ms
  :read-only: moz
  :read-write: moz
 
Properties:
  animation-delay: webkit
  animation-direction: webkit
  animation-duration: webkit
  animation-fill-mode: webkit
  # 太多了。。。省略一大堆
  text-size-adjust: webkit, moz, ms
  text-spacing: ms
  user-select: webkit, moz, ms
  writing-mode: ms
 
Values:
  cross-fade: webkit
  element: moz
  fill-available: webkit, moz
  fill: webkit, moz
  # 太多了。。。省略一大堆
  plaintext: moz
  sticky: webkit
  stretch: webkit, moz
 
* - Prefixes will be added only on grid: true option.
 
```

将配置改成

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

就会发现 flex 相关前缀被加上去了

#### 3. 插件

可以搜索现有插件，也可以自己开发插件，详见[官网](https://github.com/postcss/postcss/blob/829cb8511175c7bf7f019fad7189a021ae3de4c0/README-cn.md#插件)