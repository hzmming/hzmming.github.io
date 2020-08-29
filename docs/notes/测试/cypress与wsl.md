---
title: cypress与wsl
date: 2020-08-18
tags:
  - 测试
categories:
  - 测试
---

> tl;dr wsl目前对 GUI 程序支持还不友好，请直接使用 windows 上的cypress

需要对自己写的 chrome extension 做测试，因为看 vue-devtools 使用了 cypress ，所以对其做了解

一开始就遇到了坎，而且还是因为在 WSL 中使用 cypress 造成的。（WSL你真是让人又爱又恨啊...）

基本的安装过程这里就不说了，看官网即可。这里提下，linux要额外装包，官网都有说。

最开始启动，先报了个错：

```
The display compositor is frequently crashing
```

相关[issue](https://github.com/cypress-io/cypress/issues/5918)，一样的问题，最后人家说升级至 WSL2 即可解决（我是 WSL1)，升级后，确实解决了。

然后再次启动，这回没报错，直接卡死在 `opening cypress`。这破问题实在是折腾我够久

```shell
# 改用这样启动可输出日志信息
DEBUG=cypress:* cypress open
```

输出日志信息大概一看，说的是没找着可用的浏览器，一番思索，

答案：我的浏览器是装在宿主机 win10 上，而 cypress 是在子系统 linux 上。很明显，linux 里面是找不到相关浏览器的。

解决办法：[Using Graphical User Interfaces like Cypress' in WSL2](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress)

> 扩展知识：
>
> Linux下执行一个GUI程序通常需要两个部分来协调完成，X server与X client。X server是专门负责显示用户界面的，它管理你的显示器，键盘以及鼠标，通常你看到的桌面系统即是由它在背后驱动的，X client则负责程序的逻辑，如果需要使用用户界面，则通过给X server发送请求来完成。通常情况下，X server与X client都运行在同一台机器上，例如我们在Ubuntu上运行任何GUI程序都是这样的。但因为X系统当初设计成是通过socket在X server与X client之间通信的，所以它们也可以运行在不同的机器上。
>
> 来源：https://www.jianshu.com/p/24663f3491fa

第一步：安装 XServer

作者选用了 [VcXsrc](https://sourceforge.net/projects/vcxsrv/)，下载对应安装包，安装即可。会在桌面上生成  XLaunch 快捷方式。运行它。

**注意！！！**第一次运行 XLaunch，win10会有网络授权弹框，**允许公共网络！！！**

> 这一步非常重要，如果没有的话，一会启动 cypress 还是会报错：`can not open display ...`。我就是这一步没细看，漏了。如果已经选错了，还可以在改。
>
> 控制面板 - 系统安全 - 允许应用通过 Windows 防火墙 - 更改设置。往下翻，找到 VcXsrv windows xserver，有两个，还有防火墙这里的复杂框实在是没搞懂，反应我全给它勾上了。保存即可

界面引导选项，前两步默认就“Multiple windows” 和“Start no client”即可，第个引导页，**注意！！！** **勾选 Disable access control**

第二步：配置 WSL

这一步，主要是配置将 WSL 中运行的 GUI 程序输出到我们安装的 VcXsrc 上。也就是为 XClient 指定一个 XServer。

**设置 DISPLAY 变量**

```shell
# 1. 进入用户目录
cd
# 2. 修配.bashrc
nano .bashrc
```

在 `.bashrc `最末尾添加以下内容

```shell
# set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
```

保存，重启终端

```shell
echo $DISPLAY
# 172.23.32.1:0.0
# 输出内容，说明配置正确
```

**自动启用 dbus**

还是修改 .bashrc 文件，在刚刚加的那句话后，再补一句

```shell
sudo /etc/init.d/dbus start &> /dev/null
```

> 不重启终端，想让其生效，可以执行 `source ~/.bashrc`

因为使用了 sudo，我们不想输入密码，就需要做如下设置

```shell
# 1. 此命令会以 nano 编辑器打开
sudo visudo -f /etc/sudoers.d/dbus
 
# 2. 在打开的编辑中输入如下内容
# <your_username>替换成自己的用户名，不知道自己用户名，可以用 whoami 命令查看
# 所以此处我输入的，实际上是 loryhuang ALL = (root) NOPASSWD: /etc/init.d/dbus
<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus
 
# 3. 保存、退出。
# nano 的使用方式
# ctrl x： 离开
# Y： 保存
# enter：回车使用原先的名字
```

第三步：安装浏览器

要知道，XServer 只是显示，核心还是得 XClient，也就是我们的 WSL 里面要有可执行的浏览器。

> 不安装浏览器 cypress 也可以运行，默认使用 headless 模式，并启用自带的 electron

安装chrome

```shell
# 1. 下载chrome安装包
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
 
# 2. 安装
sudo apt install ./google-chrome-stable_current_amd64.deb
 
# 3. 修复中文乱码
# 参考自：https://github.com/QMonkey/wsl-tutorial
sudo apt-get install fonts-noto-cjk
```

这下，wsl 中执行 google-chrome 便可以打开谷歌浏览器（借助 XServer）。

而 cypress 启动过程中，会尝试使用 chrome、google-chrome、google-chrome-stable 关键字检测谷歌浏览器，这样便可被检测到。

看似都解决了，但很不幸的是，有些背地里运行的服务，还是有问题

启动 cypress 后，控制台其实有抛出错误，

```shell
[11846:0818/185653.087080:ERROR:edid_parser.cc(102)] Too short EDID data: manufacturer id
[11846:0818/185654.840662:ERROR:bus.cc(393)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
[11846:0818/185654.898473:ERROR:bus.cc(393)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
```

本来想忽略掉，不管，但它却是有影响的。。。

在 vscode 中创建 spec 文件，发现 cy 窗口时的文件没有自动更新，人家官网可说了，它会一直检测得~~

结论：在 WSL 不支持 GUI 程序之前，除非在 windows 上安装 cypress，否则我不用了。。。