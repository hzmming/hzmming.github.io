---
title: APT
date: 2020-01-14
tags:
  - ubuntu
  - command
categories:
  - ubuntu
---

**高级打包工具**（英语：**Advanced Packaging Tools**，缩写为**APT**）是[Debian](https://zh.wikipedia.org/wiki/Debian)及其派生的[Linux软件包](https://zh.wikipedia.org/wiki/软件包)管理器。

APT最早被设计成[dpkg](https://zh.wikipedia.org/wiki/Dpkg)的前端，用来处理[deb](https://zh.wikipedia.org/wiki/Deb)格式的软件包。现在经过APT-RPM组织修改，APT已经可以安装在支持[RPM](https://zh.wikipedia.org/wiki/RPM套件管理員)的系统管理[RPM](https://zh.wikipedia.org/wiki/RPM套件管理員)包。

### 构成

APT由以下的几个主要的命令构成：

* apt
* apt-get
* apt-cache

### 安装源

APT的软件安装来源在[Debian](https://zh.wikipedia.org/wiki/Debian)安装的时候即可进行初始[设置](https://zh.wikipedia.org/wiki/設置)，除了Debian官方的网络安装来源之外，也可以使用Debian的安装[光盘](https://zh.wikipedia.org/wiki/光碟)，甚至可以从非官方的安装来源中下载非官方的软件。APT同时也可以从一些安装来源中下载源代码软件，并且自行编译、安装。

安装源可通过`/etc/apt/sources.list`查看

### 实例

*若没有权限，请自行添加`sudo`*

#### apt update

```shell
# 从软件源服务器获取最新的软件信息并缓存到本地。
# 因为很多apt的其他命令都是要通过比对版本信息来进行操作的，如果每次都去对比线上的版本信息效率肯定不理想，也没必要，所以做了一个缓存的机制。
apt update
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114155124.png)

#### apt upgrade

```shell
# 从本地仓库中对比系统中所有已安装的软件，如果有新版本的话则进行升级
apt upgrade
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114155457.png)

#### apt list（包名）

```shell
# 列出本地仓库中所有的软件包名
apt list
```

图略

```shell
# 从本地仓库中查找指定的包名，支持通配符
apt list nginx
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114160648.png)

```shell
# 支持通配符
apt list nginx*
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114160809.png)

```shell
# 列出系统中所有已安装的包名
apt list --installed
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114161105.png)

`[已安装，自动]`应该就是作为依赖自动安装的意思

```shell
# 查看可升级的软件
apt list --upgradable
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114155333.png)

#### apt search（包描述）

与`apt list`的区别：搜索的是包描述（包描述可以通过`apt show [package]`查看`Description`字段）

```shell
# 从本地仓库中查找指定的包描述
apt search nginx
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114161544.png)

#### apt show

```shell
# 列出指定包的详细情况（支持通配符，显示所有匹配到的包详情）
apt show nginx
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114161825.png)

```shell
# 显示所有匹配到的包
apt show nginx*
```

图略

#### apt install

```shell
# 安装指定的包，并同时安装其依赖的其他包
apt install nginx
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114162145.png)

下载的软件包存放在`/var/cache/apt/archives/`（不是很确定哈）

```shell
# 安装指定版本的包（没有实操，网上说的）
apt install vim=2:8.0.1453-1ubuntu1

# 安装本地的 deb 包文件
apt install name.deb
```

#### apt remove

```shell
# 卸载包，但不删除相关配置文件。包名支持通配符
apt remove deepin-screenshot
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114162445.png)

#### apt purge

```shell
# 卸载包，同时删除相关配置文件。包名支持通配符
apt purge deepin-screenshot
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200114162806.png)

#### apt autoremove

```shell
# 卸载因安装软件自动安装的依赖，而现在又不需要的依赖包
apt autoremove
```

#### apt clean

```shell
# 删除所有已下载的软件包
apt clean
```



### apt 与 apt-get 关系

简单来说 `apt` 命令就是 `apt-get`、`apt-cache` 和 `apt-config` 中最常用命令选项的集合，`apt`相当于一个统一的入口

### apt-get 与 dpkg 关系

`apt-get`内部使用`dpkg`，`apt-get`做了封装，最明显的一点：`apt-get`自动安装依赖包，而`dpkg`不会！

> 更多信息查看：[What is the difference between dpkg and aptitude/apt-get?](https://askubuntu.com/questions/309113/what-is-the-difference-between-dpkg-and-aptitude-apt-get)

### 参考

https://zh.wikipedia.org/wiki/APT

https://en.wikipedia.org/wiki/APT_(software)

https://www.cnblogs.com/sparkdev/p/11357343.html

https://blog.csdn.net/aqtata/article/details/80277659

[What is the difference between dpkg and aptitude/apt-get?](https://askubuntu.com/questions/309113/what-is-the-difference-between-dpkg-and-aptitude-apt-get)

