---
title: rollup学习
date: 2020-07-27
tags:
  - 前端
categories:
  - 前端
---

*2020年7月27日，主要是跟着 rollup 官方 Tutorial 过一遍*

### 是什么及为什么

rollup是一个 JavaScript 模块打包器，主要用于 library 打包。虽然也支持应用程序的构建，但好像大型应用程序，大家一般还是选择了 webpack。

webpack 也可以打包 library，但因为其混入了过多的自身代码（如自己实现的简单的commonjs），导致打包后源码可读性差，所以一般都会选择 rollup。像 [Vue](https://github.com/vuejs/vue) 就是采用的 rollup。

### 创建第一个 bundle

最简单地方法使用 rollup 就是通过命令行CLI。只为简单演示，我们这一节使用全局方式安装 rollup

```shell
npm i rollup -g
```

命令行中不带参数，直接 rollup 可以查看帮助信息

```shell
rollup
# rollup -h 或者 rollup --help 均可
```

创建第一个 demo

```shell
mkdir demo/src -p
# -p 表示父目录不存在时，自动创建
```

**src/main.js**

```javascript
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

**src/foo.js**

```javascript
export default 'hello world!';
```

现在，创建我们的第一个 bundle

```shell
rollup src/main.js -f cjs
```

`-f`（全写为 `--format`）表明创建哪种类型的 bundle，`cjs`表示`CommonJS`

> 如果没有指明，默认为`es`，即 ecmascript module

因为没有指明输出文件，默认输出至 stdout

```javascript
'use strict';
 
const foo = 'hello world!';
 
const main = function () {
  console.log(foo);
};
 
module.exports = main;
```

> 我的控制台一直都会有下面这样一个警告，官方教程没提及到，很可能是后来版本的变动。因为没有影响，我就先不管了。
>
> (!) Entry module "src/main.js" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". For many tools, such CommonJS output will not be interchangeable with the original ES module. If this is intended, explicitly set "output.exports" to either "auto" or "default", otherwise you might want to consider changing the signature of "src/main.js" to use named exports only.
> https://rollupjs.org/guide/en/#outputexports

指明具体的文件

```shell
rollup src/main.js -o bundle.js -f cjs
```

尝试在 node 中执行该代码

```shell
node
> require('./bundle')()
hello world # 如预期输出 hello world
```

> node 可以直接执行字符串，如 node -e "require('./bundle')()"。-e 表示 eval 的意思

### 使用配置文件

在根目录下创建文件 **rollup.config.js**

```javascript
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

使用 `-c`表示读取配置文件（全称 --config）

```shell
# 默认读取根目录下的 rollup.config.js。"-c" 之后可指定配置文件
# 即使读取的是默认的配置文件，也要加 -c !!! 或者不会读取
rollup -c
```

 

### 使用插件

es6 的 import 不支持 json 文件，要使我们的 library 支持 import json，可以添加 @rollup/plugin-json 插件支持

> 在 vue-cli 构建的项目中，我们很自然地使用 import 导入 json 文件，实际上都是底层 webpack 处理好了

创建项目结构如下，并使用`npm init -y`生成 package.json 文件

```
demo2
|- package.json
|- rollup.config.js
|- /src
  |- main.js
```

安装相关依赖

```shell
npm i rollup @rollup/plugin-json
```

添加 scripts

```json
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

修改配置文件 rollup.config.js

```javascript
import json from "@rollup/plugin-json";
 
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
  ],
  // rollup 的插件都是返回一个 function 
  plugins: [json()],
};
```

**src/main.js**

```javascript
import { version } from "../package.json";
 
export default function() {
  console.log(version);
}
```

终端执行 `npm run build`生成 bundle.js 文件

```javascript
'use strict';
 
var version = "1.0.0";
 
function main() {
  console.log(version);
}
 
module.exports = main;
```

仔细一看，明明 package.json 里的其它信息并没有被打包到我们的 bundle.js，而只有我们解构用到的 version 字段。这就是所谓的 Tree-Shaking。

> 其实在 rollup.config.js 里 import 导入 json 文件是可行的，而且也不用添加 json 插件，这是因为 rollup.config.js 是由 rollup 解析的，其内部对此做了支持。而我们 src 下的源代码，要想 import json 文件，还是要加 json 插件的。

### 代码压缩与Sourcemap

#### 压缩

使用`rollup-plugin-terser`插件进行代码压缩（在上一个 demo 的基础上做修改）

> rollup-plugin-terser 看这名字，我都能猜到不久地将来肯定会改名成 @rollup/plugin-terser

安装插件

```shell
npm i rollup-plugin-terser -D
```

修改配置文件 rollup.config.js

```javascript
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
 
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
    // 添加一个output，用于输出压缩版 
    {
      file: "bundle.min.js",
      // 采用iife格式（立即执行函数） 
      format: "iife",
      // 需要给定一个名称，一会看bundle.min.js就知道为什么了 
      name: "myLib",
      // plugins 位置很灵活的，此处表示只作用于 当前output 
      plugins: [terser()],
    },
  ],
  plugins: [json()],
};
```

`npm run build`生成文件 bundle.js 和 bundle.min.js。

**bundle.min.js**

```javascript
// 此处这里的 myLib 就是我们配置文件指定的
var myLib=function(){"use strict";return function(){console.log("1.0.0")}}();
```

#### Sourcemap

修改配置文件 rollup.config.js

```javascript
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
 
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
    {
      file: "bundle.min.js",
      format: "iife",
      name: "myLib",
      plugins: [terser()],
      // 开启 sourcemap 
      sourcemap: true
    },
  ],
  plugins: [json()],
};
```

执行 `npm run build`生成文件 bundle.js、bundle.min.js、bundle.min.js.map

**bundle.min.js**

```javascript
var myLib=function(){"use strict";return function(){console.log("1.0.0")}}();
//# sourceMappingURL=bundle.min.js.map
```

bundle.min.js.map 则为生成的 sourcemap 文件

`sourcemap`还支持**inline**和**hidden**两个属性

* inline 顾名思义，就是将 sourcemap 以 data URI 的形式内嵌至 bundle.min.js中
* hidden，效果和 sourcemap: true 类似，同样是单独生成 sourcemap 文件，但不会在 bundle.min.js 末尾添加 //# sourceMappingURL=bundle.min.js.map 这样的说明。
  （使用别人库时，经常控制台报找不到 sourcemap 文件，如果是以 hidden 形式，就可以避免这种问题）

### 依赖 npm 包

使用到一个第三方库是很常见的，此处以官方的一个示例包 the-answer 为例。

然而，rollup 并没有开箱即用地支持加载第三方依赖，往下看就知道这句的意思了

项目结构如下

```
demo4
|- package.json
|- rollup.config.js
|- /src
  |- main.js
```

安装所需依赖

```shell
npm i rollup -D
npm i the-answer
```

**main.js**

```javascript
// the-answer其实就只是就只是导出个数字而已 (export default 42)
import answer from "the-answer";
 
export default function () {
  console.log("the answer is " + answer);
}
```

**rollup.config.js**

```javascript
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
  ],
};
```

执行打包，控制台输出信息

```
(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
the-answer (imported by src/main.js)
```

再一看生成的 bundle.js

```javascript
'use strict';
 
function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
 
// 此处保留了 require(...)
var answer = _interopDefault(require('the-answer'));
 
function main () {
  console.log("the answer is " + answer);
}
 
module.exports = main;
```

the-answer 包并没有被正确解析，而是保留了 require(...) 的形式，此时如果我们用 node 执行下，发现是正常的

```shell
node
> require('./bundle')()
the answer is 42
```

**那为什么我们说它没有解析不对呢？**因为，此处之所谓能正常输出，是我们本地安装了 the-answer 这个包，而当我们的 library 开发完发布至 npm 上，别人使用时，根本就不会去装这个 the-answer，那时就会报找不到了

使用 `@rollup/plugin-node-resolve` 解决

```shell
npm i @rollup/plugin-node-resolve -D
```

**rollup.config.js**

```javascript
import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
  ],
  plugins: [resolve()],
};
```

重新打包，查看 bundle.js

```javascript
'use strict';
 
// the-answer 成功被解析
var index = 42;
 
function main () {
  console.log("the answer is " + index);
}
 
module.exports = main;
```

那如果我们就不想解析它呢？比如 lodash 这样的工具包，我们希望提示用户自行安装要咋整？看下一节

### Peer 依赖 Peer dependencies

#### external

在上一节的基础上，安装依赖

```shell
npm i lodash
```

**src/main.js**

```javascript
import answer from "the-answer";
import _ from "lodash";
 
export default function () {
  console.log("the answer is " + answer);
  // 示例而已，查看 lodash 的版本号 
  console.log(_.VERSION); 
}
```

如果我们打包输出，会发现 lodash 整份代码都被整合进我们的 bundle 了，如何剔除掉它并提示用户自行安装呢？

**rollup.config.js**

```javascript
import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
  ],
  plugins: [resolve()],
  external: ['lodash'],
};
```

再次打包，查看

```javascript
'use strict';
 
function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
 
// 只以 require(...) 形式引入 lodash，并未将其代码全部整合进来
var _ = _interopDefault(require('lodash'));
 
var index = 42;
 
function main () {
  console.log("the answer is " + index);
  // 示例而已，查看 lodash 的版本号
  console.log(_.VERSION);
}
 
module.exports = main;
```

`external`不支持 glob 模式匹配，但支持 function，可在函数内部使用正则匹配

```javascript
external: (id) => /lodash/.test(id)
```

#### peer

使用 Peer dependencies 提示用户安装

手动将原本安装在 dependencies 的 lodash 挪至 peerDependencies

**package.json**

```json
{
  "peerDependencies": {
    "lodash": "^4.17.19"
  }
}
```

当用户尝试安装你的包时，便会出现提示

### 代码分割 Code Splitting

#### 默认

只要使用 import() 动态引入文件，rollup 自动将其单独打包成 chunk

> bundle 和 chunk 的区别我已经在 webpack 教程中讲过了，这里再重申下：
> 主入口文件生成的 bundle，其余额外打包的就 chunk（如懒加载）

项目结构如下

```
demo3
|- rollup.config.js
|- /src
  |- foo.js
  |- main.js
  |- main2.js
```

内容分别如下

**foo.js**

```javascript
export default "hello world";
```

**main.js**

```javascript
export default async function () {
  const { default: foo } = await import("./foo.js");
  console.log(foo);
}
```

**main2.js**

```javascript
import foo from "./foo"; // 此处我忽略了后缀.js，照样可行
export default function () {
  console.log(foo);
}
```

执行打包命令（省点事，此处直接用 cli）

```shell
# -d 指明输出目录，没指明的话又会输出至终端 stdout 哦
# -d 全称是 --dir
rollup src/main.js src/main2.js -f cjs -d dist
```

生成 dist 目录，其下3个文件：main.js、main2.js、foo-e17f2b22.js（其实是 foo-hash.js，每次hash都不一样）

测试下

```shell
node
> require('./dist/main')()
hello world # 如预期输出 hello world
 
> require('./dist/main2')()
hello world # 如预期输出 hello world
```

#### 手动

没有实操过，不多说了，点击查看官方介绍，[output.manualChunks](https://rollupjs.org/guide/en/#outputmanualchunks)

### 结合 Babel

项目结构

```
demo5
|- package.json
|- rollup.config.js
|- /src
  |- .babelrc
  |- main.js
```

安装 rollup 相关依赖

```shell
npm i -D rollup @rollup/plugin-babel @rollup/plugin-node-resolve
```

**rollup.config.js**

```javascript
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
 
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};
```

**.babelrc**

```json
{
  "presets": [
    [
      "@babel/env",
      {
        // 阻止 babel 将代码转成 CommonJS，因为转换这一步将交由我们的 rollup 来完成
        "modules": false
      }
    ]
  ]
}
```

安装 babel 相关依赖

```shell
npm i -D @babel/core @babel/preset-env -D
```

还是以 the-answer 包为例

```shell
npm i the-answer
```

**src/main.js**

```shell
import answer from 'the-answer';
 
export default () => {
  console.log(`the answer is ${answer}`);
}
```

**package.json**

```json
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

执行命令 `npm run build`生成 bundle.js

```javascript
'use strict';
 
var index = 42;
 
var main = (function () {
  console.log('the answer is ' + index);
});
 
module.exports = main;
```

 

### 官方模板

从官方模板入手是非常好的一种学习及使用方式，当初学完 webpack 的基本知识，没有找些 官方 example 或 template，导致很多知识没有串起来，甚至直接遗忘，等到了项目中真正需要用到时，又才恍然大悟，原来自己当初早接触过。

[rollup-starter-lib](https://github.com/rollup/rollup-starter-lib)，用于 library 开发的快速启动。不过这个模板有点过时了，我基于此模板，写自己的插件 [tree-with-array](https://github.com/hzmming/tree-with-array)时，改了好多就是了。