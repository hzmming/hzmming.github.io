---
title: Git基本使用
date: 2019-04-15
tags:
  - 版本控制
  - Git
categories:
  - 版本控制
---



### 安装

ubuntu安装git很简单

```shell
# Ubuntu内置git
sudo apt install git
```

添加源安装最新稳定版本

```shell
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```



### 设置个人信息

 

```shell
git config --global user.name LoryHuang
git config --global user.email 844155285@qq.com
```

### 创建自己的分支

 

```shell
git checkout -b hzm        # 创建自己的分支 并切换过去
git push -u origin hzm    # 提交分支，远程无当前分支自动创建新分支
# 也可以这样 git push origin hzm:hzm
git branch     # 查看本地所有分支及当前所属分支
git branch -a  # 查看本地及远程的所有分支
git fetch      # 若git branch -a看不到所有分支，是因为有些分支是在你拉取代码之后再建的，要先fetch下信息
```

### 更新代码至自己的分支

 

```shell
git pull origin developer  # 拉取其它分支代码至当前分支（本地代码）【merge是用于将当前分支合并到指定的远程分支】
# 如果冲突的话
git commit # 合并冲突后需要使用git commit结束合并（合并冲突时可以不用填信息），没有冲突就会自动合并不用git commit
git push # 将本地合并提交至远程
```

### 提交代码至自己的分支

 

```shell
git add .
git commit -m '修改 xx bug'
git push origin hzm    # 在分支提交不指定好像不行
```

### 解冲突

 

```shell
# 1. 解决冲突
# 2. 提交
git add .
git commit
git push
```

### 合并代码至主分支

 

```shell
1. 登录git网站
2. 切换到自己的分支
3. 左侧提交记录
4. 创建合并请求
5. change分支至指定分支
6. compare
7. submit
8. merge
```

