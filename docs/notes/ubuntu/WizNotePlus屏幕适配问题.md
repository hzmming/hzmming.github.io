---
title: WizNotePlus屏幕适配问题
date: 2019-12-03
tags:
  - ubuntu
  - tool
categories:
  - ubuntu
---

*整个解决过程记录在[issue](https://github.com/altairwei/WizNotePlus/issues/79)上*

### 问题

正常显示应该是这样

![img](/img/55608758.png)

但实际上却是

![img](/img/155709eb-d346-412e-99b9-ceb06fb9ab3a.png)

### 解决方案

为知笔记linux版本是基于qt开发的

![img](/img/55299031.png)

所以只要为qt配置相关参数就行

 

```shell
# 1. 打开配置文件
sudo gedit /etc/profile
```

 

```shell
# 2. 在末尾添加如下配置
export QT_AUTO_SCREEN_SCALE_FACTOR=0
export QT_SCALE_FACTOR=1
export QT_SCREEN_SCALE_FACTORS=1
```

保存，重启系统就行了