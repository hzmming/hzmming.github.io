---
title: yarn workspace
date: 2020-08-26
tags:
  - NodeJS
  - yarn
categories:
  - NodeJS
---


*写于 2020年8月27日。本文只是适用过后的一个简单记录，没有过多深入*

### 一 monorepo

关于 monorepo 与 multirepo，谁好谁坏，就不说了，而且我也不知道~~

monorepo，简单地说就是一个仓库里面存放了多个 npm 包，像 Babel、React、Vue 都有使用 monorepo。

举个简单的场景，比如一套系统有前端、后端两个部分，就可以构建如下项目结构

```shell
monorepo
  |- package.json
  |- /packages
    |- /front
      |- package.json
    |- /backend
      |- package.json
```

 

### 二 yarn workspaces

#### 初始化

使用 yarn 初始化项目，并构建如上项目结构

```shell
# 初始化并生成package.json
yarn init -y
```

**/package.json**

```json
{
  // 表明私有包（json中不能有注释，自己去掉）
  "private": true,
  "workspaces": [
    "packages/*"
  ],
}
```

**front/package.json**

```json
{
  "name": "font",
  "version": "1.0.0",
 
  "dependencies": {
    "cross-env": "5.0.5",
  }
}
```

**backend/package.json**

```shell
{
  "name": "backend",
  "version": "1.0.0",
 
  "dependencies": {
    "cross-env": "5.0.5",
  }
}
```

安装依赖

```shell
yarn install
```

最终项目结构为

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- /node_modules
  |- /packages
    |- /front
      |- /node_modules
      |- package.json
    |- /backend
      |- /node_modules
      |- package.json
```

仔细一看，front 和 backend 都依赖了 cross-env，但 cross-env 只被安装在 根目录的 node_modules，并不会被多次安装于各个依赖的 package里。子项目的 node_modules 就一些 bin 之类的。

当然如果版本不一样，还是会各自安装自己的，只有一致了，才能提取至根目录

#### 添加依赖

代码构建的公共部分放置根目录，业务及特有部分放置子项目目录

##### 子项目

使用 yarn workspace 为子项目添加依赖，格式为`yarn workspace <workspace_name> <command>`

```shell
yarn workspace front add lodash uuid
```

 

##### 根目录

如果直接向根目录添加依赖会报错，yarn 默认当作用户手误操作。使用 `-W`明确表示安装至根目录

```shell
yarn -W add lodash
```

 

#### 依赖内部包

新建一个内部 package，名叫 shared，用于放置一些公共代码，如 util.js

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- /node_modules
  |- /packages
+   |- /shared
+     |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- package.json
    |- /backend
      |- /node_modules
      |- package.json
```

**shared/package.json**

```json
{
  "private": true,
  "name": "shared",
  "version": "0.0.0"
}
```

 

```shell
yarn workspace front add shared@0.0.0
```

此处有个坑，**安装内部包一定要指明版本号**。如果不指明，yarn 会跑到 npm 市场去搜索

#### 配置 git 忽略文件

```shell
monorepo
  |- package.json
  |- yarn.lock
+ |- .gitignore
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- package.json
    |- /backend
      |- /node_modules
      |- package.json
```

**.gitignore**

```
node_modules
packages/front/dist
packages/backend/dist
```

#### 使用 webpack

```shell
yarn -W add webpack webpack-cli -D
```

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
      |- package.json
    |- /backend
      |- /node_modules
+     |- webpack.config.js
      |- package.json
```

> 只做示意，如安装在根目录或子目录，会遇到哪些问题，更具体的 webpack 相关依赖、相关知识并不在此展开

#### 配置 eslint 与 prettier

```shell
yarn -W add eslint prettier -D
```

eslint 配置文件会自动往上找，所以放置根目录即可

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
+ |- .eslintignore
+ |- .eslintrc.js
+ |- .prettierrc.js
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
      |- package.json
    |- /backend
      |- /node_modules
      |- webpack.config.js
      |- package.json
```

**.eslintignore**

```shell
# TODO vscode的eslint插件会读取该配置文件，但eslint-loader却不会~~
node_modules
packages/front/dist
packages/backend/dist
```

**有个问题，package里结合 webpack 使用 eslint-loader，虽然能读取到外层的 .eslintrc.js，但却不会读取 .eslintignore，尚未解决**

所以此处配置的 eslint 忽略文件是不起作用的，先配着，以后说不定就解决了

#### 使用 husky 和 lint-staged

[lint-staged-multi-pkg](https://github.com/sudo-suhas/lint-staged-multi-pkg)介绍了3种方法，我采用了将 husky 和 lint-staged 安装至根目录

```shell
yarn -W add husky lint-staged -D
```

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- .eslintignore
  |- .eslintrc.js
  |- .prettierrc.js
+ |- .lintstagedrc.js
  |- /node_modules
  |- /packages
    |- /shared
    |- util.js
    |- package.json
  |- /front
    |- /node_modules
    |- webpack.config.js
    |- package.json
  |- /backend
    |- /node_modules
    |- webpack.config.js
    |- package.json
```

**.lintstagedrc.js**

```javascript
module.exports = {
  "packages/front/**/*.{js,vue}": ["eslint --fix"],
  "packages/backend/**/*.{js,vue}": ["eslint --fix"],
};
```

**package.json**

```json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ],
+ "husky": {
+   "hooks": {
+     "pre-commit": "lint-staged"
+   }
+ }
}
```

#### 使用 postcss

配置文件放置根目录？这个还没验证，To be continued

#### 使用 commitizen

放置根目录，结合 husky 使用

```shell
# ui交互形式的commit
yarn -W add commitizen cz-conventional-changelog -D
# 校验commit message
yarn -W add @commitlint/cli @commitlint/config-conventional -D
# 生成CHANGELOG.md
yarn -W add conventional-changelog-cli -D
```

创建配置文件

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- .eslintignore
  |- .eslintrc.js
  |- .prettierrc.js
  |- .lintstagedrc.js
+ |- commitlint.config.js
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
      |- package.json
    |- /backend
      |- /node_modules
      |- webpack.config.js
      |- package.json
```

**commitlint.config.js**

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

**package.json**

```json
{
  "private": true,
  "scripts": {
    "cz": "git cz"
  },
  "workspaces": [
    "packages/*"
  ],
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      +     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

#### 使用 babel

同样是安装在顶级，一样，只做示意

```shell
yarn -W add @babel/core @babel/preset-env @babel/runtime-corejs3 -D
```

创建配置文件

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- .eslintignore
  |- .eslintrc.js
  |- .prettierrc.js
  |- .lintstagedrc.js
+ |- babel.config.js
  |- commitlint.config.js
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
      |- package.json
    |- /backend
      |- /node_modules
      |- webpack.config.js
      |- package.json
```

**babel.config.js**

```javascript
module.exports = {
  plugins: [
    // 公共部分
    // ...
  ],
  presets: [
    // 公共部分
    // ...
  ],
  // here: 子目录使用自己的配置文件 .babelrc.js/json
  babelrcRoots: [".", "packages/*"],
};
 
```

子项目创建特有配置文件。比如我 front 使用了 ElementUI，很明显 backend 不需要，所以我不能放置在根目录

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- .eslintignore
  |- .eslintrc.js
  |- .prettierrc.js
  |- .lintstagedrc.js
  |- babel.config.js
  |- commitlint.config.js
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
+     |- .babelrc.js
      |- package.json
    |- /backend
      |- /node_modules
      |- webpack.config.js
      |- package.json
```

**front/.babelrc.js**

```javascript
module.exports = {
  // 子项目特有配置
  plugins: [
    // ...
  ],
};
```

配置 babel-loader 整合父级配置文件

**front/webpack.config.js**

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

#### 使用 jest

子项目 front 使用 jest 进行单元测试和 e2e 测试

```shell
yarn workspace front add jest
```

```shell
monorepo
  |- package.json
  |- yarn.lock
  |- .gitignore
  |- .eslintignore
  |- .eslintrc.js
  |- .prettierrc.js
  |- .lintstagedrc.js
  |- babel.config.js
  |- commitlint.config.js
  |- /node_modules
  |- /packages
    |- /shared
      |- util.js
      |- package.json
    |- /front
      |- /node_modules
      |- webpack.config.js
+     |- /test
+       |- .babelrc.js
+       |- xxx.spec.js
+       |- jest.config.js
      |- .babelrc.js
      |- package.json
    |- /backend
      |- /node_modules
      |- webpack.config.js
      |- package.json
```

**front/jest.config.js**

```javascript
module.exports = {
  testEnvironment: "node",
  verbose: true,
  // 指定 babel 配置文件
  // https://github.com/facebook/jest/issues/3845#issuecomment-582511237
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./test/.babelrc.js" }], // 路径相对 pwd()
  },
};
 
```

#### 结合 lerna（待续）

省点事，没有用上，以后用上再补充

https://zhuanlan.zhihu.com/p/71385053

https://github.com/hardfist/monorepo-starter

### 三 参考

[int-staged-multi-pkg](https://github.com/sudo-suhas/lint-staged-multi-pkg)

https://classic.yarnpkg.com/en/docs/workspaces/

[Yarn Workspace 使用指南](https://www.jianshu.com/p/990afa30b6fe)