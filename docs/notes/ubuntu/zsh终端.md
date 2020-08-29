---
title: zsh终端
date: 2020-01-14
tags:
  - ubuntu
  - tool
categories:
  - ubuntu
---

说是很好用，没怎么了解，反正跟风装了下

### 安装

*参考：https://zhuanlan.zhihu.com/p/19556676*

```shell
# 1. 安装zsh
sudo apt-get install zsh

# 2. 切换至zsh
chsh -s /bin/zsh

# 3. 安装 oh my zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

### 优点

目前就用了一个**向上翻历史记录时，会根据已输入字母过滤**

### 坑

#### 第一个

`help`命令没了，因为echo的特殊性，`echo --help`会直接输出`--help`，所以要使用`help echo`，然而

```shell
# zsh: command not found: help
help echo
```

暂未寻找解决方案

#### 第二个

查找时（比如通配），会出现`no matches found`

```shell
# no matches found
apt list zlib*
```

解决方案：在`~/.zshrc`中加入`setopt no_nomatch`，然后在终端上执行`source .zshrc`命令

### 弃坑

发现`compgen`命令竟然用不了，不知道还有多少问题，暂时不想用了

```shell
# 1. 查看已有终端（也可以忽略）
cat /etc/shells

# 2. 切换回bash
chsh -s /bin/bash
```

