---
title: Sass学习
date: 2018-08-22
tags:
  - 前端
categories:
  - 前端
---

#### 一. 什么是Sass

一种 CSS预处理语言，文件后缀为 .sass或.scss，浏览器并不识别，需编译成 CSS文件

（就像Typescript和Javascript的关系）

#### 二. 安装和使用

##### 1. 安装

SASS是Ruby语言写的，但是两者的语法没有关系。不懂Ruby，照样使用。只是必须先[安装Ruby](http://www.ruby-lang.org/zh_cn/downloads/)，然后再安装SASS。

假定你已经安装好了Ruby，接着在命令行输入下面的命令：

```bash
gem install sass
```

然后，就可以使用了。

##### 2. 使用（CLI）

注意，Sass是CSS的超集，支持直接使用原始CSS语法的

下面的命令，可以在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）

```bash
sass test.scss
```

如果要将显示结果保存成文件，后面再跟一个.css文件名。

```bash
sass test.scss test.css
```

SASS提供四个[编译风格](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style)的选项：

>   * nested：嵌套缩进的css代码，它是默认值。
>
>   * expanded：没有缩进的、扩展的css代码。
>
>   * compact：简洁格式的css代码。
>
>   * compressed：压缩后的css代码。

生产环境当中，一般使用最后一个选项。

```bash
sass --style compressed test.sass test.css
```

你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。

```bash
// watch a file
sass --watch input.scss:output.css
 
// watch a directory
sass --watch app/sass:public/stylesheets
```

SASS的官方网站，提供了一个[在线转换器](http://sass-lang.com/try.html)。你可以在那里，试运行下面的各种例子。

##### 3. webpack

**（1）安装**

安装`node-sass`、`sass-loader`

```bash
npm i --save-dev node-sass sass-loader
```

> 2020/8/10 更新

sass 官方介绍到，有两个包 dart-sass 和 node-sass，两者的区别我不是很理解，官方解释：

Both major Sass implementations support the same JavaScript API. [Dart Sass](https://sass-lang.com/dart-sass) is distributed as the pure-Javascript [`sass` package](https://www.npmjs.com/package/sass), and [LibSass](https://sass-lang.com/libsass) is distributed as a native extension in the [`node-sass` package](https://www.npmjs.com/package/node-sass).

还有 [stackoverflow](https://stackoverflow.com/questions/56150402/vue-cli-css-pre-processor-option-dart-sass-vs-node-sass) 也有相关讨论

没过多理解，不过 [sass-loader](https://github.com/webpack-contrib/sass-loader) 推荐用 dart-sass，解释如下：

This allows you to control the versions of all your dependencies, and to choose which Sass implementation to use.

> ℹ️ We recommend using [Dart Sass](https://github.com/sass/dart-sass).

> ⚠ [Node Sass](https://github.com/sass/node-sass) does not work with [Yarn PnP](https://classic.yarnpkg.com/en/docs/pnp/) feature.

所以 安装`dark-sass`、`sass-loader`

```shell
# dark-sass 的 npm 包名为“sass”
npm install sass-loader sass -D
```

 

**（2）配置**

```javascript
// webpack.config.js
 
module.exports = {
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};
```

**（3）Sass配置**

```javascript
    // webpack.config.js
 
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        'style-loader',
                        'css-loader',
+                       {
+                           loader: 'sass-loader',
+                           options: {
+                               outputStyle: 'expanded' // nested，expanded，compact，compressed
+                               // ...
+                           }
+                       }
                    ]
                }
            ]
        }
    };
```

**（4）SourceMap**

```javascript
    // webpack.config.js
 
    module.exports = {
 
+       devtool: 'source-map',
 
        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded' // nested，expanded，compact，compressed
+                               sourceMap: true
                            }
                        }
                    ]
                }
            ]
        }
    };
```

开启了 Sass 的 sourceMap 属性，别忘了 webpack 的 devtool 属性也要配置，不然不会生效

（挺神奇的，不知道webpack怎么实现的，其它的插件也一样，webpack的**`devtool总开关`**不开启是没用的！）

**（5）监听**

**package.json**

```json
{
  "name": "sass-demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "webpack --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "mini-css-extract-plugin": "^0.4.2",
    "node-sass": "^4.9.3",
    "sass-loader": "^7.1.0",
    "webpack": "^4.17.0",
    "webpack-cli": "^3.1.0"
  }
}
 
```

npm run dev 即可

#### 三. 基本用法

##### 1. 变量

`sass`使用`$`符号来标识变量，而且**变量还可以引用其它变量**

```scss
// 声明变量
$nav-color: #F90;
 
nav {
  $width: 100px;
  width: $width;
  color: $nav-color; // 使用变量
}
```

```scss
// 声明变量1
$highlight-color: #F90;
 
// 声明变量2
$highlight-border: 1px solid $highlight-color; // 使用变量1
 
.selected {
  border: $highlight-border; // 使用变量2
}
```

##### 2. 嵌套CSS

（1）嵌套CSS规则

```scss
#content {
  article {
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
  h1, h2, h3 {margin-bottom: .8em}
}
```

```css
/* 编译后 */
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
#content h1, #content h2, #content h3 { margin-bottom: .8em }
```

 

（2）标识符 &【指代父选择器】

**伪类使用**

```scss
article a {
  color: blue;
  &:hover { color: red }
}
```

*伪类如果没有使用`&`，生成 article a :hover { color: red } 明显不对！*

**更上级选择器**

```scss
#content aside {
  color: red;
  body.ie & { color: green }
}
```

```css
/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }
```

*关注点始终在 #content aside 这一级，使用`&`添加上级选择器及伪类，嵌套表示下级选择器*

（3）标识符 >、+和~【子组合选择器和同层组合选择器】

`>`直接子元素：#content > p 选择 #content 下一级所有 p结点，再下一级就不在匹配范围了

`+`同层相邻组合选择器：header + p 选择 header 元素后紧跟的 p 元素

`~`同层全体组合选择器：header ~ p 选择所有跟在 header 后的同层 p 元素，不管它们之间隔了多少其他元素

这3个选择器都是CSS原生的，Sass只做嵌套拼接而已，并无扩展其它功能

```scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

```css
/* 编译后 */
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

（4）嵌套CSS属性

```scss
nav {
    border: 1px solid #ccc {
        left: 0px;
        right: 0px;
    }
    margin: {
        left: 10px;
        right: 5px;
    }
}
```

```css
/* 编译后 */
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
 
  margin-left: 10px;
  margin-right: 5px;
}
```

##### 3. 导入SASS

导入 blue-theme.scss 文件；可以省略后缀名

**全局导入**

```scss
// test2.scss
@import "blue-theme"
```

**局部导入**

```scss
// test1.scss
.blue-theme {@import "blue-theme"}
```

使用嵌套导入，被导入的文件中定义的所有变量和混合器，只会在这个规则范围内生效。这些变量和混合器不会全局有效

**冲突解决**

```scss
$link-color: blue;
$link-color: red;
```

若导入后，存在声明冲突，和CSS一致，后声明覆盖先前的，即**越后声明优先级越高**

如果不希望自己的声明 被 导入的声明 覆盖呢？

```scss
$link-color: blue;
$link-color: red !default;
```

`!default`用于变量声明，如果该变量先前被声明过了，那就用先前的值，否则用现在声明的值

此处，\$link-color 已经先声明为 blue 了，所以 \$link-color 值为 blue，而非 red

##### 4. 注释

```scss
/*!
    在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常用于声明版权信息。
*/
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中（但压缩模式还是会去掉） */
}
```

##### 5. 混合器

变量是一条语句的替换，而混合器是多条语句的替换（个人理解）

`@mixin`定义    `@include`使用

```scss
// 定义 圆角混合器
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
 
// 消息框
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners; // 使用 圆角混合器
}
```

```css
/* 编译结果 */
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

 

（1）何时使用

想出一个有意义的名称，如“圆角、单行文字过长...截断显示”等等。**一般是功能上的集合，而非语义**

（2）与类名的区别

类名：语义化描述，在html中应用（.notice 表示消息，至于消息是怎样不管）

混合器：展示性描述，在css中应用（rounded-corners 混合器表示圆角，很多组件都可以是圆角，语义不明，展示明确）

（3）传参

类似 JavaScript的方法

```scss
// 定义参数
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
 
a {
  @include link-colors(blue, red, green); // 第一种 传递参数
  // @include link-colors($normal:blue, $hover:red, $visited：green) // 第二种 传递参数
}
```

```css
/* 编译结果 */
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

（4）参数默认值

```scss
// 注意参数
@mixin link-colors($normal, $hover:red, $visited:green) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
 
a {
  @include link-colors(blue); // 只传了一个！！
}
```

```css
/* 编译结果 */
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

##### 6. 继承

使用`@extend`继承

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

```css
/* 编译结果 */
.error, .seriousError {
  border: 1px solid red;
  background-color: #fdd;
}
 
.seriousError {
  border-width: 3px;
}
```

`.seriousError`继承`.error`，简单地理解为 将所有`.error`出现的地方，替换成`.error, .seriousError`

（1）何时使用

当一个类属于另一个类（语义关系），使用继承

eg：`.error`表示错误消息，`.seriousError`表示严重错误，属于`.error`的一种，此时就用`.seriousError`继承`.error`

（2）与混合器的区别

继承仅仅是重复选择器，而不会重复属性，所以继承往往比混合器生成的CSS体积更小