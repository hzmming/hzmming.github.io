---
title: ESlint与Prettier
date: 2020-07-30
tags:
  - 前端
categories:
  - 前端
---

[TOC]

*写自2020年7月30日*

### 什么是 lint

> 在[计算机科学](https://zh.wikipedia.org/wiki/電腦科學)中，**lint**是一种工具程序的名称，它用来标记[源代码](https://zh.wikipedia.org/wiki/原始碼)中，某些可疑的、不具结构性（可能造成bug）的段落。它是一种[静态程序分析](https://zh.wikipedia.org/wiki/靜態程序分析)工具，最早适用于[C语言](https://zh.wikipedia.org/wiki/C語言)，在[UNIX](https://zh.wikipedia.org/wiki/UNIX)平台上开发出来。后来它成为通用术语，可用于描述在任何一种计算机程序语言中，用来标记源代码中有疑义段落的工具。by [维基](https://zh.wikipedia.org/wiki/Lint)

简单地说，有些代码符合语法，但实际上很有可能造成bug，而编译器只能识别语法错误，所以也就有了 lint 这样一种工具。

对于 JavaScript 而言，lint 就显得异常重要，毕竟它没有编译这个步骤，错误往往在代码运行时才被发现。

* 避免低级bug（使用未声明变量、修改const变量...）
* 提示删除多余代码（声明而未使用的变量...）
* ...

### JS lint 发展史

到目前为止，比较有名的三款工具，如下 ：

* JSLint
* JSHint
* ESLint

JSLinit最早，由 Douglas Crockford 开发，但其主观规则太多，可配置少，大家不是很满意。

后来 Anton Kovalyov 基于 JSLint 开发了 JSHint，提供了更多的配置项，灵活度高，且由社区进行驱动，发展十分迅速。

ESLint 由 Nicholas C. Zakas (《JavaScript 高级程序设计》作者) 于2013年6月创建，起因是作者想使用 JSHint 添加一条自定义规则，发现不支持，就自己开发了一个。ESlint一开始并没有大火，因为需要将源代码转成 AST，运行速度上输给了 JSHint ，并且 JSHint 当时已经有完善的生态（编辑器的支持）。真正让 ESLint 大火是因为 ES6 的出现。

ES6 发布后，因为新增了很多语法，JSHint 短期内无法提供支持，而 ESLint 只需要有合适的解析器就能够进行 lint 检查。这时 babel 为 ESLint 提供了支持，开发了 babel-eslint，让ESLint 成为最快支持 ES6 语法的 lint 工具。

### 代码风格

lint 工具只检查有潜在问题的代码，而代码风格这一块却不是其重点。也就是说，如果一段代码是正确的，1000个人可以有1000种写法，所以 Prettier 就派上用场了，而且 Prettier自己的介绍中，说其是 **An opinionated code formatter**。Opinionated 也就是说是强制的，必须按着它的规范走，所以其配置项也比较少，统统听他的（但好像说随着用的人变多，还是做出了妥协，忘记哪里看到的这句话）

### Prettier vs. Linters

Linters 通常包含两种规则：code quality rules（代码质量规则）和 stylistic rules/formatting rules（代码风格规则）

Prettier 只包含一种规则：stylistic rules/formatting rules（代码风格规则）

[Prettier 官方解释](https://prettier.io/docs/en/install.html)，简单一句话，就是 use **Prettier for formatting** and **linters for catching bugs!**

### ESlint 使用

#### 基本

```shell
# 安装依赖（windows版且装了eslint扩展的VSCode，会提示是否使用node_modules下的eslint）
npm i eslint -D
 
# 初始化配置文件
npx eslint --init
```

一般我的配置文件长这样，简简单单

```javascript
module.exports = {
  // 表明不再往上找了
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    "ecmaVersion": 11,
    // 表示代码是 ECMAScript 模块，默认是 "script"
    "sourceType": "module"
  },
  rules: {},
};
```

#### 配置含义

##### root

默认自动从被 lint 的文件所在文件夹查找**.eslintrc.*** and **package.json**（eslintConfig字段）文件读取配置，并往上依次逐级查找父目录配置，直至系统根目录，除非指定`root: true`，则以些为根配置，提前中止

> 往上逐级查找配置并**累加**，这样的设计是为了“在保证整个项目的统一配置下，还能让子级特殊定制”（个人理解）

##### env

```javascript
{
    "env": {
        "browser": true,
        "node": true,
        // ...
    }
}
```

被 lint 脚本所运行的环境，作用说白了就是识别对应环境的全局变量。如**browser**环境的 window、**node**环境的 global、**jest**环境的 it 等等。[查看更多环境变量](https://eslint.org/docs/user-guide/configuring#specifying-environments)

##### rules

顾名思义，代码应符合的规则，例如

```javascript
module.exports = {
    "rules": {
        "semi": "error"
    }
}
```

表示代码结尾如果没有分号则报错，`semi`表明了规则，而`error`则表示等级，更多等级如下

* `"off"` or `0` - 关闭规则
* `"warn"` or `1` - 启用规则，仅作为警告(即不阻断代码)
* `"error"` or `2` - 启用规则，且作为错误(当被触发时，exit code为1退出)

##### plugins

插件的用途是用于自定义规则，通过编写插件，可以让 eslint 支持更多的规则，而且，还有一点，只要是 eslint 支持的规则，就可以使用 `eslint --fix`修复*（最后这句话我说的，不知道绝不绝对~~）*。

插件的命名必须是 `eslint-plugin-`开头，使用第三方插件需先 npm 安装对应包

假设，要使用插件`eslint-plugin-example`

```shell
npm i eslint-plugin-example -D
```

```javascript
module.exports = {
    // 1. 配置插件
    "plugins": [
        // 一般省略前缀 eslint-plugin-
        "example",
        // 或者全写
        // "eslint-plugin-example"
    ],
    // 2. 使用插件中的规则
    "rules": {
        // 使用方式：“插件名/规则名: 等级”
        "example/rule1": "error"
        // 注意：当使用插件中的规则，就必须要使用去前缀的简写，不然 eslint 对不上。总的来说，写简写就对了，别找事。
    }
}
```

> 带有域名的 scoped package，缩写如下
>
> ```javascript
> module.exports = {
>  // 1. 插件缩写
>  "plugins": [
>      "@jquery/jquery", // means @jquery/eslint-plugin-jquery
>      "@foobar" // means @foobar/eslint-plugin
>  ],
>  // 2. 规则缩写
>  "rules": {
>      "jquery/rule1": "error",
>      "@foo/foo/rule2": "error",
>      "@bar/rule3": "error"
>  },
> }
> ```

 

以 prettier 为例，使用 `eslint-plugin-prettier`，让 eslint 识别 prettier 规则，并对不符合 prettier 规则的代码进行报错

```shell
npm i eslint-plugin-prettier -D
```

```javascript
module.exports = {
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
}
```

##### parserOptions

> 前置知识：eslint 的原理，是将代码转换至 AST，再遍历 AST 每个节点，执行相应规则逻辑，抛出错误或警告信息

eslint 的 解析 AST 的 parser 叫做 [espree](https://github.com/eslint/espree)，默认解析 es5 代码，若使用 es6 语法，需配置相关参数，例如

```javascript
module.exports = {
    "parserOptions": {
        // 支持解析 ES6 语法
        // 注意：仅仅是语法syntax，而新的全局变量如Set、Map等是不包含的，需额外指定{ "env": { "es6": true } }
        "ecmaVersion": 6,
        // 表明使用 es6 模块（说的应该是 import、export吧）。默认值：script
        "sourceType": "module",
        // 额外的一些特性，如 JSX
        "ecmaFeatures": {
            "jsx": true,
            // ...
        }
    }
}
```

> 扩展知识：eslint 最早用的 AST parser 是 [Esprima](http://esprima.org/)，具体版本为 1.2.2。后来 eslint 要开始支持 ES6，而 Esprima 还不支持 ES6，且近期也不会有相应功能的版本发布，一番调研，最终 eslint 决定基于 Esprima 自行开发一个 parser，就叫做 espree。
>
> 更多内容见：[Introducing Espree, an Esprima alternative](https://eslint.org/blog/2014/12/espree-esprima)

##### parser

eslint 只支持基本的es6（其实具体是到 es20xx我也没去理...），有一些比较新的特性 eslint 还不支持，但用上了 babel，我们可以提前享受这些新语法，那要如何让 eslint 支持呢？

要知道为什么 eslint 不支持新特性，因为**无法将新特性代码转译为 AST**，自然其规则也无法应用。

babel 提供了 [babel-eslint](https://github.com/babel/babel-eslint) 使其支持

> 随着 Babel 8的发布，这个库会被移到 Babel monorepo。新的包见[@babel/eslint-parser](https://github.com/babel/babel/tree/master/eslint/babel-eslint-parser)，在 Babel 8之前，先继续使用旧包

```shell
npm i babel-eslint -D
```

```javascript
module.exports = {
  parser: "babel-eslint"
}
```

更换 parser 后，官方的 parserOptions 将不再适用，而取决于对应 parser 各自的实现，更多见[官方介绍](https://github.com/babel/babel-eslint#additional-parser-configuration)

> babel-eslint 的文章提及到，还是需要`ecmaFeatures`字段使 eslint 正确运行。不是很理解，这属性不是非必须项么？？？

eslint 有些内置规则好像不能和 babel-eslint 完美配合，需要使用 [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel) 添加新的规则，我没用，所以就先不管了~~

typescript 也是一样的道理，默认 espree 无法识别，需要更换对应的 parser。因为我没用 typescript，一样还是先不管了。

> 关于 parser 字段的位置
>
> 看官网讲解，parser 都是在一层，但看有些人的代码写在第二层（parserOptions.parser），具体是什么原因不清楚，也不想清楚，但结论是：两个位置都可以，不过 eslint 会优先判断第一层的 parser，取不到才取 parserOptions 里的。
>
> 在 eslint 的源码中，node_modules/eslint/lib/init/config-initializer.js，写到
>
> ```javascript
> const parser = config.parser || (config.parserOptions && config.parserOptions.parser)
> ```
>
> **2020/8/9 更新**
>
> 遇到了个问题，class 为内部变量赋予初始值，报 Parsing error: Unexpected token 错误，相关 [issue](https://github.com/babel/babel-eslint/issues/312)
>
> 明明已经用了 babel-eslint 作解析器了，怎么还不行呢？最后发现把 parser 位置写到外层就没问题了~~
>
> **所以，建议 parser 还是写在外层，更何况人官网也没有写在第二层的例子**

##### extends

继承配置，说白了，就是继承其它配置文件，省点事，不用自己配置。其次也可以复用社区优秀的方案。

```typescript
module.exports = {
    // 很明显，单个可以简单地写字符串，多个就是字符串数组
    extends: String | Array
}
```

有4种继承方式

* 继承内置方案
* 继承第三方共享配置
* 继承插件里面的配置
* 继承项目源码中的配置文件

**内置方案**

```javascript
module.exports = {
    // eslint --init 生成的就是用的这个
    "extends": "eslint:recommended"
}
```

还有个`eslint:all`，意思明显就是所有规则

**第三方共享配置**

要想将自己的配置共享给别人，需要将自己的配置以 npm 包形式发布，且命名规则必须是 `eslint-config-`开头

以`eslint-config-prettier`为例

```shell
npm i eslint-config-prettier -D
```

```javascript
module.exports = {
  "extends": [
    // 同样写缩写，如果是 scoped packages，和 plugins 一样的缩写规则
    "prettier"
  ]
}
```

使用扩展后，发现都不用再`rules`里指定规则了，这是为什么呢？

因为 extends 继承的配置里都已经配置好了，**时刻记住**，共享配置共享的是一份完整的配置，是人家本地项目中一份完整可用的配置。

如 eslint-config-prettier，查看其源码，无非就是

```javascript
// https://github.com/prettier/eslint-config-prettier/blob/master/index.js
"use strict";
 
const includeDeprecated = !process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED;
 
module.exports = {
  rules: Object.assign(
    {
      // The following rules can be used in some cases. See the README for more
      // information. (These are marked with `0` instead of `"off"` so that a
      // script can distinguish them.)
      "arrow-body-style": 0,
      curly: 0,
      "lines-around-comment": 0,
      "max-len": 0,
      "no-confusing-arrow": 0,
      // 此处做大量删减
      // ...
    },
    includeDeprecated && {
      // Deprecated since version 4.0.0.
      // https://github.com/eslint/eslint/pull/8286
      "indent-legacy": "off",
      // Deprecated since version 3.3.0.
      // https://eslint.org/docs/rules/no-spaced-func
      "no-spaced-func": "off",
    }
  ),
};
```

**插件里面的配置**

有一点我先前就提到了，插件是用来添加自定义规则的，插件的规则作者往往也会整理出几套方案，如推荐和所有两种。如果按照前面介绍的共享配置的方式，那不还得再发一个包，搞两个包（eslint-plugin-example，eslint-config-example）很明显不合理，所以插件自然也可以提供配置方案（还是个人理解）

> 我觉得我这理解挺好的啊，为什么 prettier 真有两个包。。。eslint-plugin-prettier 和 eslint-config-prettier

以 eslint-plugin-react 为例

```shell
npm i eslint-plugin-react -D
```

```javascript
module.exports = {
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        // 1. 同样支持缩写，不再赘述
        // 2. 使用方式：“plugin:[插件包名]/[配置名称]”
        "plugin:react/recommended"
    ]
}
```

**项目源码中的配置文件**

场景大概是多个子文件夹共享一份配置吧，获取从其它项目拷贝了份配置文件过来，差不多就这样吧

```javascript
module.exports = {
    "extends": [
        "./config/eslintDefaults.js",
        "./config/.eslintrc-es6",
        "./.eslintrc-jsx"
    ]
}
```

很明显，不管 extends 的配置来自哪里，它们内容说白了还是一份配置罢了，所以此处的 eslintDefaults.js 内容可能是

```javascript
module.exports = {
    extends: [
        // 或者再去继承其它第三方的配置，很随意，就是套娃
    ],
    rules: {
        //...
    }
}
```

 

#### 忽略特定文件和目录

**.eslintignore**

```shell
node_modules
dist
```

#### 结合 Babel

```javascript
// 基于 eslint --init 生成的配置文件做的小调整
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    // 记得 npm i babel-eslint -D
    parser: "babel-eslint",
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {},
};
```

#### 结合 Vue

```javascript
/**
* 从 vue-cli 生成的项目中拷来的
* 版本：@vue/cli 4.4.6
* 时间：2020年8月2日
*/
{
    "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      // 自行安装 eslint-plugin-vue
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
       // 使用eslint-plugin-vue，自定义的parser要写到parserOptions里面，不然本身配置文件就会报错，module.export默认的画红线
      "parser": "babel-eslint"
    },
    "rules": {}
  }
}
```

这个默认生成的，感觉效果一般，有些 vue 良好代码风格的没添加上，我采用下面的

```javascript
{
    "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      // 自行安装 eslint-plugin-vue
      "plugin:vue/recommended", // recommended 里面已经包含了 essential
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  }
}
```

实际上我 eslint 和 prettier 往往一起使用，所以我的真实配置是

```javascript
{
    "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      // 自行安装 eslint-plugin-vue
      "plugin:vue/recommended",
      // 这个非常重要！！！不然 eslint-plugin-vue 的规则会与 prettier 冲突。如 img 标签，vue插件要求<img>，prettier要求<img />。真是 holy shit。
      "prettier/vue",
      "eslint:recommended",
      "plugin:prettier/recommended",
    ],
    // 这个 parser 我保留意见，加不加好像都没啥影响。没体会到用外。
    "parser": "vue-eslint-parser" // 加的话，记得自行安装依赖
    "parserOptions": {
      // 实际上，ecmaVersion 和 sourceType 我也会设置上
      "ecmaVersion": 11,
      "sourceType": "module",
      "parser": "babel-eslint"
    },
    "rules": {}
  }
}
```

 

### Prettier 使用

#### 基本

两个关键

* 为项目安装 prettier 依赖
* 为项目添加 .prettierrc 配置文件

项目安装依赖

```shell
npm i prettier -D
```

IDE（如VSCode）安装 Prettier插件

**好像项目不装 prettier，IDE装 Prettier 插件不是也行？**

其实 Prettier 插件会自动读取项目本地安装的 prettier，这样可以保证每个人使用的 prettier 版本一致，避免每个人安装的 IDE 插件版本不一致。这也就保证了大家使用相同版本的 prettier 里的内置规则。

**怎么建了个空 .prettierrc 文件？**

不管有没有配置规则，建议添加配置文件，因为如果 IDE 的 Prettier 扩展识别到项目中的配置文件，就会忽略掉扩展自身额外的配置。这也就去除了不同版本的 Prettier 扩展所带来的差异。

#### Why

为什么我会提及到上面两个关键点，是因为项目中遇到这样一个问题：

项目没有 .prettierrc 配置文件，但安装了 prettier 依赖，并且使用了 eslint-plugin-prettier 将 prettier 的规则也视为 eslint 规则。

原先都好好的，有一天习惯性的 prettier 格式化后，eslint 竟然报错了，报的还是 prettier/prettier 的规则，也就是 prettier 自己格式化完，自己的规则还过不去。。。

原因其实是：当初使用时，prettier 的版本为 1.x，eslint-plugin-prettier 会读取 prettier 1.x 里的规则作为 eslint 规则，而 IDE 的 prettier 扩展升级了，其使用的 prettier 升了个大版本，为 2.x。大版本的变动带来了规则上的变化，在没有 .prettierrc 配置文件的情况下，格式化代码时， prettier 扩展附带的配置被应用了上去，这就造成了 eslint 使用的 prettier 规则和 prettier 扩展使用规则不一样，因此，自相矛盾。

### ESlint 结合 Prettier

我们知道，eslint 包含了“代码质量规则”和“代码风格规则”，而 prettier 包含了“代码风格规则”，在代码风格上，二者产生了交集，并且**冲突**，当你用 prettier 格式化完后，eslint 出现了一些因为格式化导致的错误。对此，主要有两种解决方案：

* 方案一：**以 eslint 的 formatting rules 为准**。也就是“先 prettier 格式化，再使用 eslint --fix 格式化一次”
* 方案二：**以 prettier 的 formatting rules 为准**。 也就是“把 eslint 和 prettier 冲突的规则全部关掉，这样 prettier 格式化完，就不会出现eslint 错误 ”

#### 方案一

使用 [prettier-eslint](https://github.com/prettier/prettier-eslint)，prettier-eslint 会一次执行 prettier 和 eslint --fix 两个命令。

整个流程：Code ➡️ prettier ➡️ eslint --fix ➡️ Formatted Code ✨

```shell
# prettier-eslint 用于 js代码，如 require(prettier-eslint)
# prettier-eslint-cli，很明显，用于终端执行命令
npm install prettier-eslint prettier-eslint-cli -D
```

```shell
npx prettier-eslint "src/**/*.js"
```

> **缺点**：并不能和 IDE 的 prettier 扩展结合！！！
>
> 但可以在工作流中配置，提交代码时自动执行，还算 ok。

#### 方案二

使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 将 eslint 和 prettier 冲突的规则全关了。

再使用 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) 将 prettier 的规则作为 eslint 规则，这样只要执行一次 eslint --fix 就可以，不用再单独执行 prettier 格式化。

再配置个 eslint 扩展保存时自动 fix，得，按个 ctrl + s 就好了。

```shell
npm i eslint-config-prettier eslint-plugin-prettier -D
```

```javascript
// 更多信息见：https://github.com/prettier/eslint-plugin-prettier
module.exports = {
    // 再次不厌其烦地说下，extends继承的配置，如果不打开看下源码，你是无法知道的
    // 这里做了三件事：
    // 1. 开启 eslint-plugin-prettier
    // 2. 设置 prettier/prettier 规则为 "error"
    // 3. 继承 eslint-config-prettier 配置
    "extends": ["plugin:prettier/recommended"]
}
```

关于保存自动fix这个先放着

### 工作流

利用 git hooks 在提交代码时，自动执行 eslint 及 prettier。

原生的 git hooks 好像不好用，具体没去了解，大家用的都是 [husky](https://github.com/typicode/husky)

```shell
npm i husky -D
```

**package.json**

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint src/**/*.{js,vue}"
    }
  }
}
```

这样在代码 commit 时，会先执行下 eslint 校验，**但是**，每次提交都校验整个项目明显不合理，应该只校验提交的部分就行。

使用 [lint-staged](https://github.com/okonet/lint-staged)只校验提交的部分

> 使用 git add 后，文件则为 staged 状态，表示被暂存了，lint-staged顾名思义，就是 lint 被暂存的文件

```shell
npm i lint-staged -D
```

**package.json**

```json
{
  "husky": {
    "hooks": {
      // 将钩子命令改成调用 lint-staged
      "pre-commit": "lint-staged"
    }
  },
  // lint-staged 会读取 package.json 的 lint-staged字段
  "lint-staged": {
    "src/**/*.{js,vue}": [
      // 直接使用 --fix 自动修复，若遇到需手动修复的，将中止提交，并抛出错误信息
      "eslint --fix"
    ]
  }
}
```

#### 方案一

```shell
npm install prettier eslint prettier-eslint prettier-eslint-cli -D
```

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "prettier-eslint"
    ]
  }
}
```

#### 方案二

```shell
npm i prettier eslint husky lint-staged eslint-config-prettier eslint-plugin-prettier -D
```

```javascript
// eslint 配置
module.exports = {
    "extends": ["plugin:prettier/recommended"]
}
```

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix"
    ]
  }
}
```

 

### 参考

[JS Linter 进化史](https://zhuanlan.zhihu.com/p/34656263/)

[深入理解 ESLint](https://zhuanlan.zhihu.com/p/75531199)

[ESLint+Prettier代码规范实践](https://zhuanlan.zhihu.com/p/68026905)

[using-eslint-with-prettier.md](https://gist.github.com/yangshun/318102f525ec68033bf37ac4a010eb0c)

https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint]

[最全的Eslint配置模板，从此统一团队的编程习惯](https://juejin.im/post/6844903859488292871)

[用 husky 和 lint-staged 构建超溜的代码检查工作流](https://segmentfault.com/a/1190000009546913)

[Prettier看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012)