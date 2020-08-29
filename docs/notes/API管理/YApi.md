---
title: YApi
date: 2020-01-29
tags:
  - API管理
categories:
  - API管理
---

### 安装

可视化安装过程会出错，直接使用命令行安装（除非官方之后更新了脚本）

```shell
mkdir yapi
cd yapi
git clone https://gitee.com/mirrors/YApi.git vendors //或者下载 zip 包解压到 vendors 目录（clone 整个仓库大概 140+ M，可以通过 `git clone --depth=1 https://github.com/YMFE/yapi.git vendors` 命令减少，大概 10+ M）
cp vendors/config_example.json ./config.json //复制完成后请修改相关配置
cd vendors
# 修改 vendors/server/utils/db.js 内，mongosse连接参数
# 原代码：let options = {useNewUrlParser: true, useCreateIndex: true};
# 修改为： let options = {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true };
npm install --production --registry https://registry.npm.taobao.org
npm run install-server //安装程序会初始化数据库索引和管理员账号，管理员账号名可在 config.json 配置
node server/app.js //启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候
```

（参考自 https://github.com/YMFE/yapi/issues/1605 ）

### 意外

如果已经使用可视化界面安装了，才发现出问题（像我...），做如下步骤解决

###### 第一步

 

```shell
# 修改 vendors/server/utils/db.js 内，mongosse连接参数
# 原代码：let options = {useNewUrlParser: true, useCreateIndex: true};
# 修改为： let options = {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true };
```

###### 第二步

删除mongodb中已添加的 YApi 数据库

 

```shell
# 登录mongodb
mongo
# 查看所有数据库
show dbs
# 切换数据库
use yapi
# 删除数据库
db.dropDatabase()
```

###### 第三步

 

```shell
# 只要执行命令行安装步骤的后两步即可
npm run install-server //安装程序会初始化数据库索引和管理员账号，管理员账号名可在 config.json 配置
node server/app.js //启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候
```