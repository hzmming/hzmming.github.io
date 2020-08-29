---
title: 调试Node
date: 2019-10-21
tags:
  - NodeJS
  - debug
categories:
  - NodeJS
---


### 一. 使用Webstorm

1. 打开webstorm，如下图

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021190946.png)

2. 点击工具栏的`Add Configuration`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/aaaaa.png)

3. 点击`+`，选择`Node.js`

   ![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021191933.png)

4. 修改名称，指定`node版本`，选择要调试的`js文件`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021192556.png)

5. `ok`保存使用

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571657219.png)

6. 在代码`行数`旁边点击添加`断点`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021192915.png)

7. 点击旁边的`甲壳虫`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021193005.png)

8. 现在可以开始调试了

面板

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571657636.png)

调试技巧

a. 直接点击`行数`，程序直接到对应行，相当于`Run to Cursor`（记住，是行数，行数旁边的空白处是用来下断的）

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021193610.png)

b. 堆栈回溯

使用场景：单步执行走过头了，想回到上一句，但又不想重新debug

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571658060.png)

鼠标放上去可以看到悬浮提示，`Drop Frame`，其实就是对当前栈`stack`执行一次`drop`，这样程序流程又回到了上一个`function`了

c. 条件断点

对已存在的断点`鼠标右键`，弹出对应面板

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021194502.png)

d. 查看及禁用断点

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571659006.png)

### 二. 使用Chrome

1. 项目根目录下，打开终端，执行命令

```shell
node --inspect-brk test
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021195910.png)

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021200043.png)

2. 打开chrome浏览器，输入`chrome://inspect`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021200332.png)

找到要高度的目标`Target`，点击`inspect`，弹出`devtool`开始调试

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021200533.png)

仔细看右下角`Breakpoints`面板，其实是没有断点的，而程序默认断在`第一行代码`上，这是因为我们使用了

```shell
node --inspect-brk test
```

其实要高度nodejs，最简单的命令是下面这条

```shell
node --inspect test
```

只要加上`--inspect`参数，node将以debugger模式执行test文件，但是这里的test.js只是处理某个任务，运行完就会终止，根本没有下断的机会，所以才使用`--inspect-brk`参数，让node自动断在第一条语句

如果是调试server服务脚本（即一直运行在后台的服务），就可以使用`--inspect`

3. 如果没有正确关闭node脚本，再次调试时，会遇到端口被占用问题

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021201444.png)

打开任务管理器，搜索`node`，手动关闭对应程序

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191021201637.png)

### 三. 使用VSCode

*对vscode不是很熟悉，但还是写下*

1. 打开vscode

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191022113350.png)

2. 点击左侧`甲壳虫`debugger

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571715325.png)

3. 点击上方`没有配置`以`添加配置`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191022113706.png)

4. 修改配置文件，指定想要调试的代码文件

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191022113804.png)

5. 添加断点

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191022113844.png)

6. 启动调试，如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1571715562.png)

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191022114015.png)

7. `launch.json`被存放在`.vscode/`目录下

 

> vscode新版调试node好像更便捷了，上面是之前的笔记，先放着

*2020年8月3日*

#### 快速调试单文件

额，github图床挂了，，，先不上图了

1. 选中要 debug 的文件
2. 下断
3. debug 面板
4. 启动（使用 F5 可以在源代码界面快速启动调试）

#### 使用配置项调试单文件

只要能用类似`node test.js`这样的方式执行的，就都可以

1. debug 面板

2. 创建 launch.json 文件

3. 选择 Node.js

4. 默认生成的配置为调试单文件配置

5. program 字段，如果 package.json 有 start 脚本，默认指向那个脚本，如果没有，则为 `${file}`

   `${file}`表示当前打开文件，更多预定义变量见[Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)

6. 举例，如果想要调试的是 “src/main.js”文件，设置 program 值为 `${workspaceFolder}/src/main.js`

7. 启动

#### 调试cli

场景：如果程序不是使用 `node test.js`之类方式启动，而是如下：

* webpack
* vue-cli-service serve
* jest test
* ...

调试步骤如下

1. debug 面板

2. 创建 launch.json 文件

3. 界面右下角“添加配置”

4. 选择“Node.js 通过 npm 启动”

5. 假设正常启动程序是 npm run serve

6. 设置 runtimeExecutable 为 npm（默认就是 npm，如果使用的是 yarn run serve，则改为 yarn）

   runtimeArgs 为 ["run-script", "serve"]

7. 启动

#### 参考

更多调试信息可直接见 [VSCode 官网](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)，写得挺详细的