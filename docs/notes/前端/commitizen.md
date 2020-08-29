---
title: commitizen
date: 2020-08-26
tags:
  - 前端
categories:
  - 前端
---

*github作图床，好像有好几个月一直上传失败了...先不放图了*

### 一 git commit  message 规范

*（这部分就是摘抄，别人写得很好，不画蛇添足了）*

此处说的规范，是 AngularJS 提出的，[**AngularJS Git Commit Message Conventions**](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y)

*此处放一张 vue 项目的截图，突出 commit 信息的作用*

提交说明可分为三个部分：`Header`、`Body`和`Footer`

```
<Header> <Body> <Footer>
```

#### Header

`Header`部分包括三个字段`type`（必需）、`scope`（可选）和`subject`（必需）

```
<type>(<scope>): <subject>
```

##### type

`type`用于说明 `commit` 的提交性质。

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增一个功能                                                 |
| fix      | 修复一个Bug                                                  |
| docs     | 文档变更                                                     |
| style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
| refactor | 代码重构                                                     |
| perf     | 改善性能                                                     |
| test     | 测试                                                         |
| build    | 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）   |
| ci       | 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等 |
| chore    | 变更构建流程或辅助工具（*这个我还需理解*）                   |
| revert   | 代码回退                                                     |

##### scope

影响范围。较为主观，视各自项目而定，如 transition、security。**我直接省略**

##### subject

commit 的简短描述，原先 commit -m 的消息就写这了

#### Body

commit 的详细描述。**我直接省略**

#### Footer

`Breaking changes`和 `Referencing issues`，翻译过来就是`不兼容变更`和`相关issue`

看我上面那张截图，commit 消息后面那个链接就是相关 issue

一些工具如 lerna 将视 Breaking changes 为大版本变动

### 二 规范 message

使用 ui 交互的形式，更友好地编写 commit message 以遵守规范

使用步骤如下图，一步一步，清晰明了

![](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

#### 安装 commitizen

##### 自动

照着[官网](https://github.com/commitizen/cz-cli#installing-the-command-line-tool)走就是了

```shell
# 核心
yarn add commitizen -D
```

```shell
# 安装适配器。什么意思呢，就是再换个xx适配器，那么上图的使用界面就不一样了，选项也不一样，适配器决定了这些
# 此处安装“cz-conventional-changelog”适配器
yarn commitizen init cz-conventional-changelog --yarn --dev --exact
```

第二条命令做了如下几件事：

1. 安装 cz-conventional-changelog 适配器，并添加 dev 依赖
2. 在 package.json 中新增 config.commitizen 字段信息，配置了 cz 所使用的适配器

##### 手动

因为我的项目结构是 yarn workspace，而我又要在根目录添加 cz，此时上面的第2条命令就是加`-W`都不好使，就手动添加了

```shell
# 核心
yarn add commitizen -D
 
# 适配器
yarn add cz-conventional-changelog -D
```

在 package.json 添加如下

```json
{
    "config": {
        "commitizen": {
            "path": "cz-conventional-changelog"
        }
    }
}
```

#### 使用 commitizen

commitizen 注册了几个命令，`git cz`、`git-cz`、`cz`

如果是全局安装的可直接使用，本地安装的可添加 scripts

```json
{
    "scripts": {
        // 其实终端直接 yarn cz 就行，但还是显示写清楚比较好吧
        "cz": "git cz"
    }
}
```

### 三 强制规范

#### 安装 commitlint

使用 commitizen 只是让我们遵守规范更容易，如果人家不遵守，还是可以提交，使用 `commitlint` 校验

```shell
# 核心
yarn add @commitlint/cli -D
```

既然规范可以好多种，校验当然也可以好多种，安装和我们使用的 Angular 风格一至的校验规则

```shell
# Angular 风格的核验规则
yarn add @commitlint/config-conventional -D
```

在根目录新建`commitlint.config.js`，指定 commitlint 所使用的校验规则

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

 

#### 使用 commitlint

使用 husky 挂载钩子

```shell
yarn add husky -D
```

package.json 添加如下

```json
"husky": {
    "hooks": {
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

当 commit 时，git 会执行 commitlint 进行校验，失败则终止 commit

### 四 生成 CHANGELOG.md

基于前几步，commit 记录已经符合一定规范，只需使用工具提取出来即可

```shell
yarn add conventional-changelog-cli -D
# 别装成了 conventional-changelog，这个只适用于 node 编程调用，有cli结尾的才能在命令行使用
```

添加 scripts

```json
{
    "log": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
}
```

`yarn log`即可生成日志，因为我没用上，就先不写了

> 但我有个疑惑，生成的 CHANGELOG.md 要怎么提交，单独提交一次？亦或是随着正常改动提交？
>
> 如果这回改了个 bug，随着这次提交，那这次的 commit message 哪去了？还得等下次提交才能添加上？？？

### 五 参考

[Cz工具集使用介绍 - 规范Git提交说明](https://juejin.im/post/6844903831893966856)