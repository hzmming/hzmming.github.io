---
title: 安装软件has install-snap change in progress错误
date: 2019-09-03
tags:
  - ubuntu
  - error
categories:
  - ubuntu
---

其实就是软件之前安装了一次，只是没安装完。

**解决方案**

```shell
snap changes
```

![image-20200829124458313](/img/image-20200829124458313.png)

终止对应任务，通过ID终止

可以看到ID=5是我之前安装失败的。
现在我们终止它

```shell
sudo snap abort 5
```

