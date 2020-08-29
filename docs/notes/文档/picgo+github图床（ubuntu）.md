---
title: picgo+github图床（ubuntu）
date: 2019-09-12
tags:
  - 文档
  - markdown
  - 工具
categories:
  - 文档
---

### 1. 下载picgo

https://github.com/Molunerfinn/PicGo/releases

选择相应版本下载，ubuntu用户选择AppImage文件

### 2. github配置

选择github是因为免费，虽然国内访问可能有点慢，本来七牛云都注册好了，但要实名认证又不想要了～～

**新增仓库**

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190912112038.png)

**获取token**

右上角头像 - Settings - Developer settings - Personal access tokens - Generate new token

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1568258705.png)

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1568258938.png)

 

### 3. 图床配置

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190912111801.png)

**指定存在路径**：如果不填默认存放至项目根目录

**设定自定义域名**：https://raw.githubusercontent.com/<替换成自己的仓库名>/master

### 4. 安装xclip（ubuntu用户）

```shell
sudo apt-get install xclip
```

### 5. 截图上传

ubuntu可使用自带快捷键截图（第三方工具还没找）

```shell
Shift + Ctrl + Print  # 截图至剪切版
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190912113626.png)

打开picgo主界面

![1568259534418](/home/loryhuang/.config/Typora/typora-user-images/1568259534418.png)

或者使用小图标快捷入口

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/2名字不要有空格.png)

### 6. 结合为知笔记

使用为知笔记保存md笔记，用为知客户端浏览发现图片没有加载出来？？但用网页版却可以正常打开

原来，`https://raw.githubusercontent.com`这个域名要用代理才可以正常访问

还好，为知笔记提供了代理功能，不然就尴尬了（WiznotePlus提供，官方原版没用windows不清楚）

菜单栏：**工具 - 偏号设置**

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211113305.png)

点击**代理设置**

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211113402.png)

以后记得开代理软件`ShadowSocksR`

### 7. 结合Typora

见[Typora使用](wiz://open_document?guid=7e6185e1-1352-4622-82e6-87fb0311f952&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)