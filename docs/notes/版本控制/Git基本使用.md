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



### 配置 SSH-Key

#### 单个 key

```shell
# linux和mac系统自带ssh-keygen。windows系统请使用 git bash
ssh-keygen -t rsa -C '844155285@qq.com'
```

连续回车即可，如果不需要密码。

生成私钥 `id_rsa` 和公钥 `id_rsa.pub`。公钥名字就是私钥加个 pub 后缀名。

将公钥添加到 github 上

![image-20200830113134203](/img/image-20200830113134203.png)

![image-20200830113153150](/img/image-20200830113153150.png)

![image-20200830113220303](/img/image-20200830113220303.png)

![image-20200830114248618](/img/image-20200830114248618.png)

在终端测试下是否成功

```shell
ssh -T git@github.com
```



#### 多个 key

当我们要同时具备多个 git 账号时，就需要配置多个。

比如同时具备 github 和 gitee

```shell
# 给gitee用
ssh-keygen -t rsa -C '844155285@qq.com' -f ~/.ssh/gitee_id_rsa # 和单个key的区别就是，我这里指定了名称

# 给github用
ssh-keygen -t rsa -C '844155285@qq.com' -f ~/.ssh/github_id_rsa
```

生成 `gitee_id_rsa`、`gitee_id_rsa.pub`和`github_id_rsa`、`github_id_rsa.pub`两对

新增配置文件，指定哪对密钥对应哪个网站

```shell
# 新建一个无后缀的文件，名字叫 config
touch config
```

内容如下

```shell
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```



一样的道理，将公钥添加到对应的网站

github 的添加过程上面有了，这里再讲下 gitee 的添加过程

![image-20200830113952163](/img/image-20200830113952163.png)



![image-20200830114111152](/img/image-20200830114111152.png)

验证下是否成功

```shell
ssh -T git@gitee.com
ssh -T git@github.com
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

