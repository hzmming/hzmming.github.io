---
title: rar解压缩文件
date: 2019-04-24
tags:
  - ubuntu
  - environment
categories:
  - ubuntu
---

一般通过默认安装的ubuntu是不能解压rar文件的，只有在安装了rar解压工具之后，才可以解压

```shell
#压缩功能

#安装 
sudo apt-get install rar
#卸载
sudo apt-get remove rar

#解压功能

#安装
sudo apt-get install unrar
#卸载
sudo apt-get remove unrar
```