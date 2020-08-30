---
title: Typora使用
date: 2018-07-22
tags:
  - 文档
  - markdown
  - 工具
categories:
  - 文档
---

### 1. 配合为知使用

##### windows版

  为知 - 右上角菜单 - 选项 - 编辑 - 编辑器 - 添加 - 选择Typora - 勾选“UTF和文字编辑器”

  ![img](/img/0.6472109159286714.png)

##### linux版

随便打开某篇笔记，编辑，下拉Edit Options

![img](/img/7c121279-2b40-4d74-95a1-b9e0d52031dc.png)

（Arguments就不要动了，linux版和windows版不一样）

文件路径一般在：/usr/share/typora/Typora

### 2. 列表

  数字 加 点（.），按个空格 就自动成为列表

  列表回车，自动到下一项（比如2到3）

  若不想要下一项，想在上一项的缩进范围内编写，再按下 Backspace，否则使用 shift + Enter 进行换行

  若不想自动到下一项列表，想跳出来，再按下 Enter

### 3. 代码块

  使用 shift + tab 格式化代码（和为知的快捷键一样，我怀疑用的是同一款插件，没去研究）

### 4. 官方集成picgo

有人在github上提了issue，建议集成文件上传工具（picgo），而作者真的采纳了，nice！！！

https://github.com/typora/typora-issues/issues/2476

In newer version of Typora (≥ 0.9.9.32 on macOS or 0.9.84 on Windows / Linux), we added a “upload image” function to upload images to a cloud image storage via 3rd apps or scripts.

**Ubuntu 18.04**

![img](/img/48136060.png)

 

```
// 配置文件
{
  "picBed": {
    "current": "github",
    "github": {
      "branch": "master",
      "customUrl": "https://raw.githubusercontent.com/hzmming/myGraphBed/master",
      "path": "",
      "repo": "hzmming/myGraphBed",
      "token": "ece9aa7ce80ee26c4c0d7ed67684e37dbdea30f7"
    }
  },
  "picgoPlugins": {}
}
```

> 配置中的 token 已经失效了，没有安全问题。之前都是写在为知笔记上，最近才搬到 github 上，一不小心就传了上来，github 检测到自动删除掉对应 token，也是很给力了！！！ 

更多细节，可看官方说明

https://support.typora.io/Upload-Image/

**Windows 10**

使用command line一直失败，最后使用 app 模式成了

![img](/img/a13148c7-b056-4e2c-b8ca-dd4245799757.png)

缺点就是使用时，PicGo这款软件也要开着，但还能接受