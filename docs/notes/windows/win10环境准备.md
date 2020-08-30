---
title: win10环境准备
date: 2020-07-15
tags:
  - windows
  - environment
categories:
  - windows
---

## 1 家庭版升级至专业版

设置 - 激活 - 输入密钥升级至专业版

```shell
# https://www.jianshu.com/p/3f9e2368e546
J7QT3-3GCPG-9GVWT-CH2XR-GMRJM
```

> 如果提示**无法升级你的版本**，尝试这样解决
> https://jingyan.baidu.com/article/48206aea842f83216bd6b376.html

## 2 专业版 win10 激活

直接用的软件 **kms** 激活

## 3 升级系统安装补丁

设置 - 更新和安全 - Windows 更新

## 4 桌面添加我的电脑、控制面板等

桌面 - 右键 - 个性化 - （左侧）主题 - （右侧）桌面图标设置 - 勾选“计算机”、“控制面板”等

https://jingyan.baidu.com/article/200957616458118a0621b464.html

## 5 个人喜好

- 任务栏及整体 ui 采用黑色背景

  桌面 - 右键 - 个性化 - （左侧）颜色 - （右侧）选择颜色 - 深色

- 隐藏底部 win10 搜索栏

  底部任务栏 - 右键 - 搜索 - 隐藏/显示搜索图标

  https://jingyan.baidu.com/article/f0062228f1ff89bad2f0c860.html

- 隐藏 cortana 按钮

  底部任务栏 - 右键 - 显示 Cortana 按钮

- 打开删除确认框

  回收站 - 右键 - 属性 - 显示删除确认对话框

- 右下角时间显示星期几

  控制面板 - 更改日期、时间或数字格式 - 其它设置 - 日期 tab - 日期格式（短日期）- yyyy/M/d dddd

  （dddd 表示星期，注意看底下那行字，有解释各符号意义）

## 6 分区

默认就给我分了 C 盘和 D 盘，个人又给它加了 E 盘和 F 盘

桌面我的电脑 - 右键 - 管理 - 磁盘管理 - 选中 D 盘（要拆分的盘）右键 - 压缩卷 - 输入压缩空间量大小（单位 MB）- 确定并且底部多出一块分区 - 右键新建简单卷 - 下一步确定即可

## 7 修复蓝牙设备音量调整无效

通过蓝牙连接音箱，发现声音无法调整（调整到 0 到是可以静音~~）

> 1. win r，输入 regedit，打开注册表
> 2. 进入路径：计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Bluetooth\Audio\AVRCP\CT
> 3. 找到 DisableAbsoluteVolume 值，修改为 1，如果没有，右键新建 DWORD32 位，建立对应值为 1
> 4. 重启电脑, 即可
>
> https://zhuanlan.zhihu.com/p/40128073

## 8 输入法

微软五笔输入法，挺好用的，不装其它的了

## 9 安装 360

为什么要装 360 呢？举个简单例子，比如安装完微信，微信会自己添加到开机自启，而 win10 是一点提醒都没有的，不像手机会有授权提醒的过程，而 360 则会弹窗提醒是否禁用其开机自启权限

**自行禁用掉 360 的各种弹窗推广**

## 10 升级驱动

随便装了个 360 驱动大师，检测升级

## 11 触摸板设置

设置 - 设备 - 触摸板 - 高级手势配置

**配置三指手势**

点击：鼠标中键

向上：向前导航

向下：向后导航

向左：自定义快捷方式（Ctrl + Tab）

向右：自定义快捷方式（Ctrl + Shift + Tab）

**配置四指手势**

点击：想配置成 Ctrl + Shift + 鼠标左键，但不支持！！！

## 12 代理

小飞机上 github 搜**shadowsocksr**就能找到好多

https://github.com/shadowsocksr-backup/shadowsocksr-csharp

## 13 软件

- 压缩软件：随便选了 360 压缩
- 微信
- 为知笔记
- PicGo
- Typora（配置结合 PicGo）
- Snipaste（截图软件）
- 网易云音乐
- Chrome（插件：onetab 不支持云同步，需手动导出导入）
- VSCode（插件：Setting Sync 是真的不好用。。不过官方也快支持同步功能了）（安装：记得勾选添加到 PATH，我直接全勾了）

## 14 开发

> 参考自
>
> https://juejin.im/post/5df630e36fb9a016510da35f
>
> https://segmentfault.com/a/1190000021742880
>
> https://juejin.im/post/5cdcf930f265da03914d8820
>
> https://code.visualstudio.com/docs/remote/wsl

习惯了 linux 命令和其 sudo apt install 的便捷，实在不想放弃而采用 windows 的方式，cmd 命令不想学，毕竟服务器大部分都是用的 linux ，学习 linux 命令还比较有动力（powershell 不熟不表），所以采用了 WSL 实现 windows 和 linux 共存

**Windows Subsystem for Linux**，缩写 **WSL**，相比双系统或虚拟机，有着更明显的优势：

无论是双系统还是虚拟机，两套系统完全隔离，而 WSL 更像是 windows 上的一个进程（莫名有种 docker 的感觉，不过 docker 我也不懂啦~~），它和 windows 主系统直接**共用硬盘**和**端口**，可以达到这样的效果

1. 在 windows 文件夹管理器，右键打开 linux shell，使用 linux 命令操作 windows 文件夹内容！
2. linux 启用 web 服务，如 localhost:8080，在 windows 上的 chrome 浏览器能直接访问得到！

啧啧啧，就是拿来当终端用也是美滋滋^\_^

### 14.1 安装 WSL

**第一步**：

控制面板 - 程序 - 启用或关闭 Windows 功能 - 勾选“适用于 Linux 的 Windows 子系统

**第二步**：

打开应用商店，搜索 Ubunutu（个人只用过 Ubuntu），选择 Ubuntu 18.04（切记不要选 20.04，因为 vscode 的 wsl 插件连接 20.04 有 bug，会出现 cpu 占用过高问题，风扇转得贼响...）

> wsl 默认安装位置：C:\Users\84415\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows_79rhkp1fndgsc\LocalState\rootfs
>
> 放系统盘真的好么~~

**第三步**：

打开装好的 Ubuntu，按照提示配置好用户名、密码。

### 14.2 Ubuntu 环境配置

**替换软件源**

为什么要替换软件源呢？ 因为 Ubuntu 默认的软件源在国外，国内访问速度较慢，如果不介意，可以不替换。

> 有些包换源后好像找不到了，所以我又给换回去了，反正我可以使用代理^\_^

```shell
# 备份原来的软件源
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
# 替换软件源
sudo sed -i 's/security.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list
sudo sed -i 's/archive.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list
# 更新软件源数据库
sudo apt update
# 更新系统(这个视网络情况而定)
sudo apt upgrade
```

**安装 nvm**

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# 最新版安装查看：https://github.com/nvm-sh/nvm
```

**安装 node**

```shell
#安装最新稳定版 node（推荐用稳定的就好，新版容易出事）
nvm install stable
#安装最新版本 node
nvm install node
```

**安装 nrm**（NPM registry 管理工具）

```shell
npm install -g nrm
```

使用

```shell
# 以切换淘宝源为例
nrm ls
nrm use cnpm //switch registry to cnpm
# 添加源，如公司私仓
nrm add dataexa http://srv.dataexa.com:9250
```

**安装 http-server**

```shell
npm i http-server -g
```

**安装 proxychains4**

终端下的代理配置比较麻烦，curl、npm、apt 等 不会走 _export http_proxy_ （后来：curl 会走。。。），且没有一个统一配置代理的方法，每个都配下，一来麻烦，二来没法做到单次是否走代理的控制粒度，所以最终采用了 proxychains4

```shell
# 安装
sudo apt-get install proxychains4

# 配置
# nano 是 linux 自带的文本编辑器
# 将最底部的 socks4 那行改掉或注释掉，改成 socks5 127.0.0.1 1080
sudo nano /etc/proxychains4.conf

# 使用
proxychains4 curl www.google.com # 不走代理可是连接不上哦
```

如果想使用 export 的方式，如下

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

**安装 yarn**

```shell
# 小tip：“apt-key add -”，末尾的短横表示从stdin获取。查看apt-key帮助有说明
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn
```

还要配置下环境变量，不然 yarn global 全局安装的包会找不到

```shell
# 按如下步骤
# 1. cd （没有参数，默认到用户目录）
# 2. nano .bashrc
# 3. 最末尾，添加底下这句话
export PATH="$PATH:$(yarn global bin)
```

**安装 java**

有些软件的运行需要依赖 java

```shell
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

### 14.3 终端

系统自带的 **cmd** 输入 `bash`或`wsl` 即可进入 linux shell，而 linux shell 下输入带.exe 后缀的 windows 命令同样可行，如 ipconfig.exe

> 温馨提示：
>
> 按住 Shift 键，鼠标右键，可以直接**在此处打开 linux shell**
>
> 在`cmd`下输入`wsl ls`可直接执行 linux shell 命令

cmd 到现在还无法支持多标签页，可谓简陋至极（到是可以调整透明度了~~），网上一番搜选，找到了个 [cmder](https://github.com/cmderdev/cmder)，刚想要试下，又找到了 [Windows Terminal](https://github.com/microsoft/terminal)，而且还是官方出品，github 上星星数也多，不调研，就它了！

安装：应用商店，搜索 Windows Terminal

设置：竟然没有 gui 界面，硬核的采用 json 文件配置

```json
{
  // 修改成 Ubuntu 的 guid，这样每次打开默认会启用 Ubuntu shell
  "defaultProfile": "{c6eaf9f4-32a7-5fdc-b5cf-066e8a4b1e40}",
  "profiles": {
    "list": [
      {
        "guid": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
        "hidden": false,
        "name": "Ubuntu-20.04",
        "source": "Windows.Terminal.Wsl"
      },
      {
        // Make changes here to the powershell.exe profile.
        "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
        "name": "Windows PowerShell",
        "commandline": "powershell.exe",
        "hidden": false
      },
      {
        // Make changes here to the cmd.exe profile.
        "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
        "name": "命令提示符",
        "commandline": "cmd.exe",
        "hidden": false
      }
    ]
  }
}
```

美化：没法调整透明度，到是有个毛玻璃效果，但效果只在获取焦点时有效（无语~~），索性就没折腾了

### 14.4 wslconfig

在**cmd**下使用 wslconfig 进行 WSL 的相关配置

```shell
# 查看帮助
wslconfig

# 查看所有版本
wslconfig /l

# 设置默认系统（比如安装了多个ubuntu版本，默认启用哪个）
wslconfig /setdefault Ubuntu-18.04
```

### 14.5 VSCode 配置

安装有 WSL 的系统，打开 VSCode 会自动提示安装一款插件：Remote - WSL。安装就对了。

正常打开 VSCode，打开终端，发现变成了 wsl，即 linux shell。那这样就够了么？并不够，切换到**源代码管理面板**，提示没有检测到 git，这就是为什么要装 Remote - WSL 插件

进入 VSCode WSL 的几种方式

**第一种：正常进入 VSCode，再切换至 WSL 模式**

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/img20200717161033.png)

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200717162215.png)

再切到源代码管理上看，就是正常可用有 git 了

**第二种：从 wsl 命令行打开 VSCode**

有个前提就是，VSCode 安装时一定要勾选 添加 PATH，没有勾选也不用卸载，再次打开安装包，安装包会自动覆盖之前安装的目录，这一次安装过程勾选就是了

文件管理器打开到指定项目，Shift + 鼠标右键，在此处打开 linux shell

```shell
# 在打开的shell终端，输入并回车
code .
```

好像是刚好升级

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200717163429.png)

> 本来使用 RightMenuMgr 管理右键菜单，想添加**使用 wsl 模式打开 vscode**，最后失败告终

### 14.6 权限问题

出现了两个诡异的问题

1. ls 查看信息一片绿
2. 打开项目，明明还什么都没改，git 却提示版本变动

使用`ls`查看信息

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200720222425.png)

_（因为我本地已经解决了，所以直接借用的网上别人的图）_

一片绿油油的，bash 中 ls 查看的颜色是有含义的，具体看 ls 那篇笔记（其实我还没写，懒得写）

简单地说就是这些文件（夹）的权限全被改成**777**，而 777 在 bash 中表示为绿色，就酱，[点击了解更多信息](https://p3terx.com/archives/problems-and-solutions-encountered-in-wsl-use-2.html)

这不仅不美观，而且带来了实际影响，如 git 会识别为文件变动

> 如果不在乎终端这片绿油油问题，只想解决明明没修改文件，git 也提示改动的问题，可以直接配置让 git 忽视
>
> ```shell
> git config --global core.filemode false
> ```

比对工具（如 VSCode）上看，什么改动都没有，却会提示你改了，使用`git diff`查看变化

```shell
old mode 100755
new mode 100644
```

**解决方案**

在 `/etc/wsl.conf` 中添加以下配置：（没有该文件，自行创建）

```shell
[automount]
enabled = true
root = /mnt/
options = "metadata,umask=22,fmask=111"
mountFsTab = true
```

由于 `enabled`、`root`、`mountFsTab` 均为默认值，可以对其进行精简：

```shell
[automount]
options = "metadata,umask=22,fmask=111"
```

重启终端（不会重启直接重启电脑），ls 查看

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200720224157.png)

改完这个后，造成了个问题，VSCode 打开后 WSL 连接失败了，如下图

_图待续...Picgo 好像出了点问题_

简单地说是 C 盘要单独设置下

首先确认 `wsl.conf` 中的 `mountFsTab` 没有被设置为 `false`，然后编辑 `/etc/fstab`，添加如下内容：

```shell
C:\ /mnt/c drvfs rw,noatime,uid=1000,gid=1000,metadata,umask=22,fmask=11 0 0
```

重启电脑解决

**`遗留问题`**

看似解决了，实际上当我们在 WSL 中使用 mkdir 创建文件夹，其权限还是 777，按照[这篇文章](https://p3terx.com/archives/problems-and-solutions-encountered-in-wsl-use-2.html)的说法，配置完发现还是不行~~

就先不管了

### 14.7 升级至 WSL2

本来没想升级，怕太新了，有各种问题。在使用 cypress 时，出问题了，而网上给出的答案只要升级至 WSL2 可解决，也就弄了。

> 2020/8/23 我又退回 WSL1 了
>
> 首先，cypress 这种需要使用 GUI 软件的，WSL2 现在还不友好，使用的 XServer 曲线救国（未来官方会对 GUI 进行支持），但还是有好多坑。然后就是，改完代码 webpack 不会重新编译了~~ 不想折腾了，直接退回去，等 WSL2 再发展段时间吧
>
> `wsl --set-version Ubuntu-18.04 1`

官方链接

- https://docs.microsoft.com/zh-cn/windows/wsl/install-win10
- https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel

```shell
# 0. 判断 windows 版本是否支持
# 若不识别 set-default-version 参数
# 下载更新助手，https://www.microsoft.com/software-download/windows10。更新最新
wsl --set-default-version 2

# 1. 以管理员身份打开 PowerShell 并运行（必须启用“虚拟机平台”可选功能）
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 2. 重启

# 3. 设置默认版本为 WSL2
# 可能会报错，像我就报了个 0x1bc 的 error。需更新内核
# https://aka.ms/wsl2kernel。下载并运行安装即可
wsl --set-default-version 2

# 4. 查看当前版本状况。WSL1 就不识别该命令的（网上说的，我已经升级了，没试过）
wsl -l -v

# 5. 更新先前安装的旧版本 linux 子系统
# 这个过程可能要好几分钟，静静等待即可
wsl --set-version Ubuntu-18.04 2

```

> WSL2 的实现方式，好像是类似虚拟机，和 hype-v 啥的有关系，不懂，反正网上对 WSL2 褒贬不一

### 14.8 Windows 上的开发环境

WSL 始终不是真实的 linux 系统。对于我一个菜鸟前端来说，大部分情况都适用。但有种情况除外，就是**需要使用 GUI 程序**。

在做 e2e 测试时，无论是 cypress 还是 puppeteer，二者均需要启动浏览器执行测试用例。这时，问题就来了，puppeteer 安装在 WSL 里，而浏览器安装在 Windows 上，在 WSL 中的 puppeteer 试图在 WSL 中寻找浏览器，直接 error。安装网上的教程，使用 XServer 可以远程连接无界面的 linux。试过了，可行，浏览器被成功唤起（注意，是 WSL 中的浏览器，需在 WSL 中安装浏览器。这部分知识不在此处展开，并不属于 WSL 特有的）但只是表面可行，控制台一堆错误，还是有很多细节，

最终，选择妥协，Windows 上的开发环境也整下。尽量保持与 WSL 里的环境一致，避免版本不一啥的

**包管理器**

windows 上比较有名的有三个：[choco](https://github.com/chocolatey/choco)、[oneget](https://github.com/OneGet/oneget)、[scoop](https://github.com/lukesampson/scoop)

oneget 是微软官方提供的，而 scoop 因为 star 数比较多，我就选 `scoop` 了（就是这么肤浅）

```powershell
# 1. 设置安装路径，不设的话，默认装到c盘
$env:SCOOP='E:\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')

# 2. 安装
iwr -useb get.scoop.sh | iex
```

scoop 常用命令

```powershell
# 查看已安装的包
scoop list

# 搜索是否存在包名
scoop search <package_name>

# 查看软件信息
scoop info <package_name>

# 安装包
scoop install <package_name>

# 卸载包
scoop uninstall <package_name>

# 更多查看帮助
scoop help
```

> 有个东西好像有点意思，查看系统环境变量，发现 git、npm 等并未添加至环境变量中，只添加了一个 `E:\Scoop\shims`，打开此文件夹，发现所有程序都有对应的的 3 个文件，如 git.exe、git.psl、git.shim。应该是类似软链吧，不是很懂。

**安装 nvm**

使用 [nvm-windows](https://github.com/coreybutler/nvm-windows)，注意，这个程序和 linux 的 [nvm](https://github.com/nvm-sh/nvm) 两者完全没关系。nvm 只适用于 mac/linux，所以才有了后来的 nvm-window。

```powershell
scoop install nvm
```

**安装 node**

nvm-windows 虽然尽量和 nvm 一致，但还是有不一样的，比如没法直接安装稳定版（可能我不知道。。。）

```powershell
# 1. 安装指定版本
nvm install 14.8.0

# 2. 选择指定版本
nvm use 14.8.0

# 错误示例，这句话在 nvm-windows 是行不通的！！！
nvm install stable
```

> 小插曲：因为我 WSL 中装的是 14.5.0。想着尽量保持一致，没想到装完后，无法使用。。。在 cmd 中执行 node，提示“此应用无法在你的电脑上运行...”。换了最新版 14.8.0。发现可行，就没管了。

**安装 nrm**（NPM registry 管理工具）

npm 的使用方式和 Ubuntu 中一样，这里不做过多重复解释

```powershell
npm i nrm -g
```

**安装 http-server**

```powershell
npm i http-server -g
```

**代理**

cmd 代理这块，还没怎么了解。至少 http_proxy 还能用

```cmd
set http_proxy=http://127.0.0.1:7890 & set https_proxy=http://127.0.0.1:7890
```

powershell 的语句不一样

```powershell
$Env:http_proxy="http://127.0.0.1:7890";$Env:https_proxy="http://127.0.0.1:7890"
```

**安装 yarn**

安装 yarn 要在安装 node 之后。

```powershell
scoop install yarn
```

> scoop 的 yarn 会和 WSL 里的 yarn 冲突，把人家 WSL 里的 yarn 装包路径给改了
>
> `yarn global bin`查看会出一个 windows 路径和 liunx 路径结合的奇怪路径
>
> 没排查怎么解决，关键字可以搜下 scoop shim wsl，以后有机会再看吧，顺便用下另外一种包安装方式 
>
> ```powershell
> # 以管理员身份运行 powershell（以后用的时候也要以管理员身份，不然会警告）
> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
> 
> # 安装 yarn
> choco install yarn
> ```
>
>  chocolatey 安装的 yarn 不会和 WSL 里的冲突，完美