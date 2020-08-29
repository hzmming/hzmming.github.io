---
title: Babel
date: 2019-10-23
tags:
  - 前端
categories:
  - 前端
---


### 一. Babel是什么

*编写此文档时，Babel最新版本为7.4.0*

**Babel 是一个 JavaScript 编译器**

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

```javascript
// Babel 输入： ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);
 
// Babel 输出： ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

 

### 二. 基本使用（Plugins）

1. 创建如下目录，并执行`npm init -y`初始化

```shell
babel-demo
  |- package.json
  |- /dist
  |- /src
    |- index.js
```

编辑`index.js`文件内容如下

```javascript
var hello = () => {
    console.log('我是es6的箭头函数')
}
```

2. 安装依赖

```shell
npm i -D @babel/core @babel/cli
```

3. 终端执行babel编译整个目录

```shell
./node_modules/.bin/babel src --out-dir dist
```

> 你可以利用 npm@5.2.0 所自带的 npm 包运行器将 `./node_modules/.bin/babel` 命令缩短为 `npx babel`

或者

```shell
npx babel src --out-dir dist
```

该命令中参数`--out-dir`表示将`/src目录`下的所有`js文件`进行`转译`并输出至`/dist目录`

`--out-dir`可以缩写为`-d`

若只想转译指定文件可以使用`--out-file`，如

```shell
npx babel src/index.js --out-file dist/index.js
```

同样，`--out-file`也可以缩写为`-o`

4. 查看生成的文件

```shell
babel-demo
  |- package.json
  |- /dist
+   |- index.js
  |- /src
    |- index.js
```

*dist/index.js*

```javascript
var hello = () => {
    console.log('我是es6的箭头函数')
}
```

完全没变化哈．Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 `const babel = code => code;` ，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加[插件](https://www.babeljs.cn/docs/plugins)。

5. 安装转译箭头函数的插件

```shell
npm i -D @babel/plugin-transform-arrow-functions
```

6. 使用插件

```shell
npx babel src -d dist --plugins=@babel/plugin-transform-arrow-functions
```

若有多个插件，使用`,`分隔

7. 查看生成的文件

*dist/index.js*

```javascript
"use strict";
 
var hello = function hello() {
  console.log('我是es6的箭头函数');
};
```

成功转换成es5语法了

8. 使用配置文件

Babel默认支持4种方式指定配置文件，将其置于根目录（和package.json同级）

* .babelrc
* .babelrc.js
* babel.config.js
* `package.json`的`babel`字段

随意选择一种，此处创建`babel.config.js`

```shell
babel-demo
  |- package.json
  |- babel.config.js
  |- /dist
    |- index.js
  |- /src
    |- index.js
```

*babel.config.js*

```javascript
// nodejs需要使用 module.exports导出
module.exports = {
    "plugins": [
        "@babel/plugin-transform-arrow-functions",
        // 若有多个插件使用 ＂,＂ 分隔，插件的执行顺序为＂从左到右＂
    ]
}
```

执行babel，得到相同结果

```shell
npx babel src -d dist
```

9. 使用npm脚本

修改`package.json`

```json
{
    "scripts": {
        "build": "babel src -d dist"
    },
}
```

执行babel命令，得到相同结果

```shell
npm run build
```

### 三. Presets

es6这么多语法，一个个添加插件不方便，而且也不知道插件的名字叫什么，所以`Presets`诞生了

`Presets`，中文翻译为＂预设＂，其实就是预设一组插件，用的时候就不用手动一个个安装

#### 1. 官方Preset

- [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env)
- [@babel/preset-flow](https://www.babeljs.cn/docs/babel-preset-flow)
- [@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)
- [@babel/preset-typescript](https://www.babeljs.cn/docs/babel-preset-typescript)

> 许多由社区维护的 preset 可以从 [npm](https://www.npmjs.com/search?q=babel-preset) 上获取！

#### 2. 安装Preset

因为我们需要转译es6语法，所以安装`@babel/preset-env`，这是一组es6转es5的插件集合

```shell
npm i -D @babel/preset-env
```

#### 3. 使用Preset

修改配置文件`babel.config.js`

```javascript
module.exports = {
    "presets": [
        "@babel/preset-env",
        // 若有多个preset使用 ＂,＂ 分隔．插件的执行顺序为＂从右到左＂（历史原因）
    ],
    "plugins": [
    ]
}
```

#### 4. 执行babel命令得到相同结果

```shell
npm run build
```

#### 5. 指定适配浏览器

**`建议采用下一节，整合 browserlist`**

假定用户使用的浏览器为IE10，那么就不必考虑IE9，IE8甚至更低版本的浏览器兼容问题，多余的转译也只是徒增代码量罢了.

修改配置文件`babel.config.js`

```javascript
module.exports = {
    "presets": [
        // 采用中括号＂[ ]＂括起来，数组第二个元素为参数对象
        ["@babel/preset-env", {
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

`targets`还支持以下配置，详情见[官网](https://www.babeljs.cn/docs/babel-preset-env#targets)

```javascript
{
    "targets": "> 0.25%, not dead"
}
```

```javascript
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

#### 6. 使用 browserlist 整合

[babel 官网介绍](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration)

因为整个生态很多工具都使用这个规范，像 [autoprefixer](https://github.com/postcss/autoprefixer), [stylelint](https://stylelint.io/), [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) 等等。更多见 [browserslist.md](wiz://open_document?guid=4f11b759-d8ae-47ba-ad98-5acf92742f77&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)

```javascript
module.exports = {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
    ]
}
```

**package.json**

```json
{
  "browserslist": "> 0.25%, not dead"
}
```

或者 **.browserslistrc**

```
> 0.25%
not dead
```

 

#### 7. 开启`debug`查看更多信息

开发时建议开启`debug`

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
+          "debug": true,
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

执行babel命令并查看终端输出log

```javascript
npm run build
```

```shell
loryhuang@loryhuang-TravelMate-P238-G2-M:~/桌面/DataExa/demo/babel-study$ npm run build
 
> babel-study@1.0.0 build /home/loryhuang/桌面/DataExa/demo/babel-study
> babel src -d lib
 
@babel/preset-env: `DEBUG` option
 
Using targets:
{
  "ie": "10"
}
 
Using modules transform: auto
 
Using plugins:
  transform-template-literals { "ie":"10" }
  transform-literals { "ie":"10" }
  transform-function-name { "ie":"10" }
  transform-arrow-functions { "ie":"10" }
  transform-block-scoped-functions { "ie":"10" }
  transform-classes { "ie":"10" }
  transform-object-super { "ie":"10" }
  transform-shorthand-properties { "ie":"10" }
  transform-duplicate-keys { "ie":"10" }
  transform-computed-properties { "ie":"10" }
  transform-for-of { "ie":"10" }
  transform-sticky-regex { "ie":"10" }
  transform-dotall-regex { "ie":"10" }
  transform-unicode-regex { "ie":"10" }
  transform-spread { "ie":"10" }
  transform-parameters { "ie":"10" }
  transform-destructuring { "ie":"10" }
  transform-block-scoping { "ie":"10" }
  transform-typeof-symbol { "ie":"10" }
  transform-new-target { "ie":"10" }
  transform-regenerator { "ie":"10" }
  transform-exponentiation-operator { "ie":"10" }
  transform-async-to-generator { "ie":"10" }
  proposal-async-generator-functions { "ie":"10" }
  proposal-object-rest-spread { "ie":"10" }
  proposal-unicode-property-regex { "ie":"10" }
  proposal-json-strings { "ie":"10" }
  proposal-optional-catch-binding { "ie":"10" }
  transform-named-capturing-groups-regex { "ie":"10" }
  transform-modules-commonjs { "ie":"10" }
  proposal-dynamic-import { "ie":"10" }
 
Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
Successfully compiled 1 file with Babel.
 
```

可以看到本次转译共使用了哪些转译插件

#### 8. 修改`src/index.js`尝试更多es6语法

*src/index.js*

```javascript
const hello = new Promise((resolve)=>{
    resolve()
})
```

执行babel命令查看结果

```javascript
var hello = new Promise(function (resolve){
    resolve()
})
```

`const`成功转译成`var`.这也是`Preset`的好处，不需要关心具体要使用哪些插件

然而细心的同学会发现，`Promise`并没有被转译，但IE可以不识别Promise的

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191024101757.png)

＂`Babel` 把 `Javascript` 语法 分为 `syntax` 和 `api`

先说 `api` , `api` 指那些我们可以通过 函数重新覆盖的语法 ，类似 `includes,map,includes,Promise`,凡是我们能想到重写的都可以归属到 `api`

啥子是 `syntax` ,像 箭头函数，`let,const,class, 依赖注入 Decorators`,等等这些，我们在 `Javascript` 在运行是无法重写的，想象下，在不支持的浏览器里不管怎么样，你都用不了 `let` 这个关键字

那 `Babel` 只负责 转换 `syntax` , `includes,map,includes` 这些 `API` 层面的 怎么办, `Babel` 把这个放在了 单独放在了 `polyfill` 这个模块处理

`Babel` 这个设计非常好, 把 `Javascript` 语法抽象成2个方面的, `syntax` 和 `polyfill` 独立开来，分而治理，`6to5` 一开始设计是把二者放在一起的，大家想想 `polyfill` 随着浏览器的不同，差异是非常大的,2个要是在一起 代码的耦合性就太大了，到处都是`if else`＂

*（上面这段解释来源于 https://zhuanlan.zhihu.com/p/58624930）*

### 四. Polyfill

关于`polyfill`的解释可以看我另一篇笔记，[shim和polyfill](wiz://open_document?guid=6c79b5de-0b53-44ea-a2d6-28ce82c1959b&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)

到此为止，项目内容如下

```shell
babel-demo
  |- package.json
  |- babel.config.js
  |- /dist
    |- index.js
  |- /src
    |- index.js
```

*src/index.js*

```javascript
const hello = new Promise((resolve)=>{
    resolve()
})
```

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

#### 加载全部polyfill

使用`@babel/polyfill`

```shell
# 因为是要直接在生产环境上运行的代码，所以用的是" -S"
npm i -S @babel/polyfill
```

需要结合`@babel/preset-env` 开启`polyfill`

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
        +  "useBuiltIns": "entry"
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

`useBuiltIns`有三种取值：`"entry"`，`"usage"`，`false`，默认为`false`

根据`useBuiltIns`和`targets浏览器环境`配置导入相应的`@babel/polyfill`

`entry`字面上意思＂入口＂，所以要在程序执行入口一开始导入`@babel/polyfill`，避免代码使用到未shim的api

使用`useBuiltIns: "entry"`将会导入目标环境(`targets`)所需的所有`polyfill`，不管代码需不需要用到

*src/index.js*

```javascript
require("@babel/polyfill")
//import "@babel/polyfill"  // 使用es导入或者commonjs取决于运行环境
 
const hello = new Promise((resolve)=>{
    resolve()
})
```

执行babel命令，查看生成文件

*dist/index.js*

```javascript
"use strict";
 
require("core-js/modules/es6.array.copy-within");
 
require("core-js/modules/es6.array.every");
 
require("core-js/modules/es6.array.fill");
 
require("core-js/modules/es6.array.filter");
 
// ... 省略 ...
 
require("core-js/modules/es6.promise");
 
require("core-js/modules/es7.promise.finally");
 
// ... 省略 ...
 
require("regenerator-runtime/runtime");
 
var hello = new Promise(function (resolve) {
  resolve();
});
```

可以看到加载了一大堆polyfill，多了好多可能不会用到的代码，所以我们应该使用`按需加载 (usage)`

#### 按需加载 (usage)

安装 core-js 依赖

```shell
npm i core-js@3
```

> 因为安装的是第3版，所以底下的配置 corejs 设置为3。
>
> 若想要设置成 2，可以安装 core-js@2

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
        +  "useBuiltIns": "usage"
        +  "corejs": "3"
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

使用`"usage"`需要指定`corejs`版本号，可选值为2和3.

[`corejs`](https://github.com/zloirock/core-js)，提供了 [ECMAScript up to 2019](https://github.com/zloirock/core-js#ecmascript): [promises](https://github.com/zloirock/core-js#ecmascript-promise), [symbols](https://github.com/zloirock/core-js#ecmascript-symbol), [collections](https://github.com/zloirock/core-js#ecmascript-collections), iterators, [typed arrays](https://github.com/zloirock/core-js#ecmascript-typed-arrays), 许多新特性, [ECMAScript proposals](https://github.com/zloirock/core-js#ecmascript-proposals), [some cross-platform WHATWG / W3C features and proposals](https://github.com/zloirock/core-js#web-standards) like [`URL`](https://github.com/zloirock/core-js#url-and-urlsearchparams)等polyfills.

`@babel/polyfill`底层也是引用了`corejs`这个开源库(library)

> 我现在还是没明白2版本和3版本有啥区别，如果只是单纯地版本更新，那为什么使用2版本时不提示已废弃，难道2版本不能平滑过度到3版本？？？**`待理解`**

使用`"usage"`就不用手动导入`@babel/polyfill`了，程序会按需导入

*src/index.js*

```javascript
// 无需手动导入额外的polyfill
const hello = new Promise((resolve)=>{
    resolve()
})
```

执行babel命令，查看生成文件

*dist/index.js*

```javascript
"use strict";
 
require("core-js/modules/es.object.to-string");
 
require("core-js/modules/es.promise");
 
new Promise(function (resolve) {
  resolve();
});
```

瞬间就清爽多了

> 若`useBuiltIns`没有配置或设为`false`，然后又导入了`@babel/polyfill`，则无视配置的浏览器兼容(`targets`)，引入所有的 `polyfill`。

### 五. 避免冗余

1. 先看个简单的demo

```javascript
class hello {
 
}
```

通过配置了`@babel/preset-env`的babel转译后

```javascript
"use strict";
 
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
 
var hello = function hello() {
  _classCallCheck(this, hello);
};
```

`_classCallCheck`是用来保证`class`必须当成构造函数通过`new`执行的．我们称这样的函数为`helper函数`

可以看到这个`help函数`是内嵌(inline)进去的，也就是说，如果我有100个`class`文件，那不就有100份重复的`help函数`，很显然是不合理的，所以下面这两个插件就派上用场了

`@babel/plugin-transform-runtime`，`@babel/runtime`

2. 安装

```shell
npm i -D @babel/plugin-transform-runtime
```

```shell
# 注意，@babel/runtime是＂ -S＂，一样的道理，因为它是被用于生产环境
npm i -S @babel/runtime
```

3. 配置文件

*babel.config.js*

```javascript
module.exports = {
    "presets": [],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

4. 执行babel命令，转译后的结果为

```javascript
"use strict";
 
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
 
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
 
var hello = function hello() {
  (0, _classCallCheck2["default"])(this, hello);
};
```

可以看到`_classCallCheck2`不再是内联方式，而是从外部导入，这样再多的class文件都可以共用一份`help函数`了

> 从require(...)导入的路径得出，@babel/runtime的第一个作用：存放`help函数`

### 六. 避免全局污染

回到`第四节`最后一部分，当前项目内容如下

```shell
babel-demo
  |- package.json
  |- babel.config.js
  |- /dist
    |- index.js
  |- /src
    |- index.js
```

*src/index.js*

```javascript
const hello = new Promise((resolve)=>{
    resolve()
})
```

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
            "useBuiltIns": "usage"
            "corejs": "3"
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": [
    ]
}
```

*dist/index.js*

```javascript
"use strict";
 
require("core-js/modules/es.object.to-string");
 
require("core-js/modules/es.promise");
 
new Promise(function (resolve) {
  resolve();
});
```

从生成的`dist/index.js`文件可以看出，babel `shim`了全局的api，因为`Promise`转译完后还叫`Promise`，说明全局上，`Promise`已经被支持了.

但这样其实是不好的，特别是开发库(library)时，你的代码被别的开发者依赖，他可能并不想要让你污染(pollute)全局环境，ok，`@babel/plugin-transform-runtime`，`@babel/runtime`又派上用场了

除了这两个包，还有一个重要的包`@babel/runtime-corejs3`

1. 安装

```shell
npm i -D @babel/plugin-transform-runtime
npm i -S @babel/runtime
```

```shell
# 同样使用＂ -S＂，因为用于生产环境
npm i -S @babel/runtime-corejs3
```

2. 修配配置文件

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
            "useBuiltIns": "usage"
            "corejs": "3"
            "targets": {
            "ie": "10"
        }
         }]
    ],
    "plugins": [
        ["@babel/plugin-transform-runtime", {
            corejs: '3',
        }]
    ]
}
```

需要指定`corejs`，**否则无效！！！**

`corejs`同样有2和3两个版本，对应安装依赖为`@babel/runtime-corejs2`和`@babel/runtime-corejs3`

3. 执行babel命令，查看生成文件

*dist/index.js*

```javascript
"use strict";
 
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
 
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
 
new _promise["default"](function (resolve) {
  resolve();
});
```

可以看到，babel将用户的代码`Promise`转为自定义的`_promise`，完美地避开了全局污染

> 从require(...)路径也可以看出，为什么需要安装`@babel/runtime-corejs3`

### 七. async

`async`这东西单独拿出来讲下

假定代码为

```javascript
async function f () {
 
}
```

若使用`@babel/preset-env`未开启polyfill

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
            // "useBuiltIns": "usage"
            // "corejs": "3"
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": []
}
```

转译后的代码为

```javascript
"use strict";
 
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
 
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
 
function f() {
  return _f.apply(this, arguments);
}
 
function _f() {
  _f = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _f.apply(this, arguments);
}
```

重点关注一个对象，`regeneratorRuntime`．可以看到，并没有定义该对象的代码，也就是说，这是个`全局对象`

之所以单独把`async`拎出来讲也是因为这个原因，正常转译（比如我们之前的例子Promise），在未用`polyfill`的情况下，生成的代码还是Promise，是我们认识的Api，而`async`没用`polyfill`生成的`regeneratorRuntime`是个啥呀，根本没见过！

那么，`regeneratorRuntime`到底是哪里来的呢？咱们把`polyfill`开起来

*babel.config.js*

```javascript
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "debug": true,
            "useBuiltIns": "usage"
            "corejs": "3"
            "targets": {
                "ie": "10"
            }
        }]
    ],
    "plugins": []
}
```

转译后的代码为

```javascript
"use strict";
 
require("core-js/modules/es.object.to-string");
 
require("core-js/modules/es.promise");
 
require("regenerator-runtime/runtime");
 
// ... 省略 ...
 
function _f() {
  _f = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _f.apply(this, arguments);
}
```

其实，`regeneratorRuntime`来源于`regenerator-runtime/runtime`

[`regenerator`](https://github.com/facebook/regenerator)其实是facebook的一个开源库，用于转译`迭代器generator`，让大家可以在不兼容的浏览器上使用`generator`，而`async`只是`generator`的语法糖，所以`async`也用到了`regenerator`这个库

> `@babel/polyfill`实际上就是个中间层，引入了两个依赖，一个`core-js`，另一个则是`regenerator`

**所以，如果我们要用`async`，记得`polyfill`**

### 八. @babel/register和@babel/node

`@babel/register`，会改写`require`函数，为它加上一个钩子，此后，每当使用 `require` 加载 `.js`、`.jsx`、`.es` 和 `.es6` 后缀名的文件，就会先用 babel 进行转码。

`@babel/node`= `@babel/polyfill`+`@babel/register`

用于替换`node 命令`，表示**带polyfill的node命令**，比如

*async.js*

```javascript
async function () {
 
}
```

使用未支持`async`的`node版本`执行它，会报错

```shell
node async.js
```

这时就可以使用`@babel/node`了

```shell
babel-node async.js
```

*（以上内容参考自 https://juejin.im/post/5c19c5e0e51d4502a232c1c6）*

**个人感觉，这两个插件毫无卵用**

### 九. 关于require

还是以`Promise`为例

```javascript
const hello = new Promise((resolve)=>{
    resolve()
})
```

转译后

```javascript
"use strict";
 
require("core-js/modules/es.object.to-string");
 
require("core-js/modules/es.promise");
 
new Promise(function (resolve) {
  resolve();
});
```

可以看出，`babel`默认采用`CommonJS`模块化，所以会输出require()，那浏览器又不识别`require`啊？

我能想到的是因为大家一般是用`webpack+babel`，而不是只用`babel`，而`webpack2` 开始，`webpack`已经内置了对 ES6、CommonJS、AMD 模块化语句的支持，所以我们可以肆无忌惮地在项目中使用

### 十. JSX

`JSX`是`facebook`提出的一种[js语法扩展](https://facebook.github.io/jsx/)，用于`react`

`vue`大部分情况下，使用`template`就足够了，但有时候用`render`会更灵活点，而`render`写多了不是很方便，因此`vue`也支持使用`JSX`来写`render`函数，具体见[官网](https://cn.vuejs.org/v2/guide/render-function.html#JSX)

以下内容为`vue`使用`jsx`的[教程](https://github.com/vuejs/jsx#installation)，*不同框架用的插件是不一样的*

简单地说下，概况为两点

* 在`js`上直接写`html`（没有引号哦）
* 在大括号`{}`里写`js表达式`（要自己使用`this`获取实例属性）

1. **安装插件**

```shell
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

编写本教程时的**版本号**为

```json
{
    "dependencies": {
        "@vue/babel-helper-vue-jsx-merge-props": "^1.0.0",
        "@vue/babel-preset-jsx": "^1.1.1",
    }
}
```

*（2019年10月25日）*

2. **配置文件**

*babe.config.js*

```javascript
{
    "presets": ["@vue/babel-preset-jsx"]
}
```

3. **输出文本**

```javascript
export default {
    render() {
        return <p>hello world</p>
    }
}
```

转译后为

```javascript
export default {
    render() {
        const h = arguments[0];
        return h("p", ["hello world"]);
    },
}
```

可以看出`jsx`最终还是会被转换成`render`函数，并没有什么神奇的地方，单纯写起来方便罢了

4. **插值表达式{{text}}**

```javascript
export default {
    data() {
       return {
           text: "hello world"
       }
    },
    render() {
        // 使用{}包裹js表达式，记得使用this调用
        return <p>{this.text}</p>
    }
}
```

转译后

```javascript
export default {
    data() {
        return {
            text: "hello world"
        }
    },
    render() {
        const h = arguments[0];
        return h("p", [this.text]); // 这也可以看出为什么要使用this调用
    },
}
```

5.  **v-bind**

```javascript
export default {
    data() {
       return {
           title: "hello world"
       }
    },
    render() {
        // 不知道是官方教程太久没更新还是咋的，官方说要改成＂驼峰法＂，但其实我用v-bind也行啊
        // 而且其它指令v-on，v-html都可以...（不过缩写符号@和:确实不能用）
        // return <p v-bind={this.title}></p>
        return <p vBind={this.title}></p>
    }
}
```

转译后

```javascript
export default {
    data() {
        return {
            title: "hello world"
        };
    },
 
    render() {
        const h = arguments[0];
        return h("p", {
            "directives": [{
                name: "bind",
                value: this.title
            }]
        });
    }
 
};
```

6. **v-html**

官方说使用`<p domPropsInnerHTML={html} />`，但我发现好像可以直接使用`v-html`啊

```javascript
export default {
    data() {
        text: "hello world"
    },
    render() {
        return <p v-html={this.text}></p>
    }
}
```

转译后

```javascript
export default {
  data() {
    text: "hello world";
  },
 
  render() {
    const h = arguments[0];
    return h("p", {
      "directives": [{
        name: "html",
        value: this.text
      }]
    });
  }
 
};
```

7. **v-on**

我发现可以直接用`onClick`或`onclick`．．．甚至都不用大写了．．．难道是官方文档没跟上插件的更新速度？？？

```javascript
export default {
    render() {
        // 注意：此处this.clkFunc不带括号，带了括号会被直接执行！！！
        return <button vOn:click={this.clkFunc}></button>
    },
    methods: {
        clkFunc() {
            alert('hello world')
        }
    }
}
```

转译后

```javascript
export default {
  render() {
    const h = arguments[0];
    return h("button", {
      "on": {
        "click": this.clkFunc
      }
    });
  },
 
  methods: {
    clkFunc() {
      alert('hello world');
    }
 
  }
};
```

修饰符

```html
<input vOn:click_stop_prevent={this.newTodoText} />
```

6. **v-model**

```javascript
export default {
    data() {
       return {
           text: "hello world"
       }
    },
    render() {
        return <input type="text" vModel={this.text} />
    }
}
```

转译后

```javascript
// 这就是为什么还要装@vue/babel-helper-vue-jsx-merge-props这个插件
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  data() {
    return {
      text: "hello world"
    };
  },
 
  render() {
    const h = arguments[0];
    return h("input", _mergeJSXProps([{
      "on": {
        "input": $event => {
          if ($event.target.composing) return;
          this.text = $event.target.value;
        }
      },
      "attrs": {
        "type": "text"
      },
      "domProps": {
        "value": this.text
      }
    }, {
      directives: [{
        name: "model",
        value: this.text,
        modifiers: {}
      }]
    }]));
  }
 
};
```

修饰符

```html
<input vModel_trim={this.newTodoText} />
```

7. **Slots**

`Slots`不是很懂，看[官网](https://github.com/vuejs/jsx#slots)吧

8. **class**

```javascript
export default {
    data() {
        return {
            className: 'content'
        }
    },
    render() {
        const h = arguments[0];
        return <div class="title"> // 像普通html一样添加类名即可
            // 使用js动态获取类名
            <span class={this.className}>hello world</span>
        </div>
    }
}
```

 

### 十一. 编写插件

To be continued

https://juejin.im/post/5d5bdb02e51d4561db5e3a52

https://juejin.im/post/5c03b85ae51d450c740de19c

### 十二. 编写presets

To be continued

### 十三. Webpack

1. 安装`babel-loader`

```shell
npm i babel-loader
```

2. 配置文件

```javascript
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [ 
            {     
                test: /\.js$/,       
                use: [          
                    'babel-loader'       
                ],
                // 默认npm包为都是转译过的（但难免遇到不守规矩的人...）
                exclude: '/node_modules/'
            }
        ]
    }
```

### 十四. monorepo

使用 yarn workspace 时遇到的问题

项目结构示意

```
babel-monorepo
  |- package.json
  |- babel.config.js
  |- /packages
      |- /one
        |- /src
        |- webpack.config.js
      |- /two
        |- /src
        |- webpack.config.js
        |- .babelrc.js
```

几个关键点：

1. babel 安装在 root 层级
2. 根目录使用 babel.config.js，放置通用配置，如转序 ES6。并指明各子项目使用各自的 .babelrc 配置
3. 各项目使用 .babelrc.js（印象中这个名字是有含义的，表示整合父级配置文件，就印象，有待考究）
4. 各项目的 babel-loader 配置往上级找配置文件进行整合

**babel.config.js**

```javascript
module.exports = {
  // 常用插件
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
  ],
  // 转译ES6
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
  // 子目录使用自己的配置文件 .babelrc.js/json
  babelrcRoots: [".", "packages/*"],
};
 
```

**.babelrc.js**

```javascript
// 放一些当前子项目的定制配置
// 如当前子项目使用了ElementUI,需要配置按需加载，则配置在这，而不是在顶层的babel.config.js
module.exports = {
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
 
```

**webpack.config.js**

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 向上找babel.config.js/json。也可以使用configFile自定义位置
              // 不配置这个将只使用本项目的 .babelrc 配置，而父级的 babel.config.js 不会起作用
              rootMode: "upward",
            },
          },
        ],
        exclude: /node_modules/,
      }
    ]
  }
}
```

 

### 十五. 源码

To be continued

https://juejin.im/post/5c21b584e51d4548ac6f6c99

 