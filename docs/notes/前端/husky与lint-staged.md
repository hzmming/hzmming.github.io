---
title: husky与lint-staged
date: 2020-08-27
tags:
  - 前端
categories:
  - 前端
---

### 背景

git 提交代码之前，我们希望做一些校验，如 eslint 检验代码错误，如 commitlint 检验 commit 记录，等等。

git 原生的 hook 应该是不好用吧，没去了解，反正大家用的都是 [husky](https://github.com/typicode/husky)

### husky

```shell
npm i husky -D
```

**package.json**

```json
{
  "husky": {
    "hooks": {
      // 以 commitlint 为例
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

如果 commitlint 检验失败，将终止提交

### lint-staged

那么 lint-staged 又是干嘛的呢？

以 eslint 校验代码为例

```
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

#### 坑

lint-staged 的匹配模式有点bug，如下

```json
{
  "lint-staged": {
    // 错误示范！！！
    // 想着匹配js文件，结果啥都匹配不到
    "src/**/*.{js}": [ /*...*/ ],   
 
    // 正确匹配js文件
    "src/**/*.js": [ /*...*/ ],   
 
    // 正确匹配js、vue文件
    "src/**/*.{js,vue}": [ /*...*/ ],   
  }
}
```

 