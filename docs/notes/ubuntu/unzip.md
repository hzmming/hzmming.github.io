---
title: unzip
date: 2020-03-05
tags:
  - ubuntu
  - command
categories:
  - ubuntu
---

Ubuntu解压WIndows的压缩包，需要使用编码，否则乱码

``` shell
unzip -O CP936 [压缩包名字]

```

如果要带密码呢？

``` shell
unzip -O CP936 -P [密码] [压缩包名字]


```

更多参数见

```shell
unzip --help

man unzip

```