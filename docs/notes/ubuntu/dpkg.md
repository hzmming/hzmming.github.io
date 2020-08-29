---
title: dpkg
date: 2020-01-10
tags:
  - ubuntu
  - command
categories:
  - ubuntu
---

*参考自 [dpkg命令](https://man.linuxde.net/dpkg)*

`dpkg`是`Debian package`的简写，是Debian Linux系统用来安装、创建和管理软件包的实用工具。

### 语法

```shell
dpkg(选项)(参数)
```



### 选项

```shell
-i：安装软件包；
-r：删除软件包；
-P：删除软件包的同时删除其配置文件；
-L：显示于软件包关联的文件；
-l：显示已安装软件包列表；
--unpack：解开软件包；
-c：显示软件包内文件列表；
--confiugre：配置软件包。
```



### 实例

#### 安装包

```shell
dpkg -i package.deb     #安装包
```

#### 删除包（包括配置文件）

```shell
dpkg -P package         #删除包（包括配置文件）
```

#### 删除包

```shell
dpkg -r package         #删除包
```

#### 显示该包的版本

```shell
dpkg -l package         #显示该包的版本
```

#### 列出当前已安装的包

```shell
dpkg -l                    #列出当前已安装的包
```

#### 模糊查找已安装的包

```shell
dpkg -l | grep deepin # 查看名字上有deepin的软件包
```

#### 列出与该包关联的文件

```shell
dpkg -L package         #列出与该包关联的文件
```



