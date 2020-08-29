---
title: fusuma触摸板增强
date: 2020-03-15
tags:
  - ubuntu
categories:
  - ubuntu
---

github地址：https://github.com/iberianpig/fusuma

#### 需求

ubuntu18只支持两指滚动、鼠标右键，而三指只支持三指鼠标中键，并不支持三指手势，怎么办？

#### fusuma

##### 安装

```shell
# 1. 最重要一点，先将当前用户添加进input组，并重启系统
sudo gpasswd -a $USER input

# 2. 安装libinput
sudo apt-get install libinput-tools

# 3. 安装ruby（先前安装过ruby可以跳过）
sudo apt-get install ruby

# 4. 安装Fusuma
sudo gem install fusuma

# 5. 安装xdotool（模拟按键和鼠标操作用的）
sudo apt-get install xdotool
```

默认以下属性应该是开启的，如果没有，打开它

```shell
# gsettings get org.gnome.desktop.peripherals.touchpad send-events 可以查看是否开启
gsettings set org.gnome.desktop.peripherals.touchpad send-events enabled
```

##### 配置

```shell
mkdir -p ~/.config/fusuma        # create config directory
touch ~/.config/fusuma/config.yml
```

`config.yml`内容如下

```yaml
swipe:
  3:
    left:
      command: 'xdotool click 9' # 三指左滑，前进
    right:
      command: 'xdotool click 8' # 三指右滑，后退
    up:
      command: 'xdotool key super' # 三指上滑，任务列表
    down:
      command: 'xdotool key super+d' # 三指下滑，桌面
  4:
    left:
      command: 'xdotool key ctrl+Tab' # 四指左滑，向右切tab
    right:
      command: 'xdotool key ctrl+Shift+Tab' # 四指右滑，向左切tab
    up:
      command: 'xdotool key alt+Shift+Tab' # 四指上滑，逆时针循环切换应用
    down:
      command: 'xdotool key alt+Tab' # 四指下滑，两应用之间切换
pinch:
  in:
    command: 'xdotool keydown ctrl click 4 keyup ctrl' # 缩小
    threshold: 0.1
  out:
     command: 'xdotool keydown ctrl click 5 keyup ctrl' # 放大
     threshold: 0.1

threshold:
  swipe: 1
  pinch: 1

interval:
  swipe: 1
  pinch: 1
```

官网有模板：https://github.com/iberianpig/fusuma/wiki/

##### 使用

```shell
fusuma
```

##### 开机自启

```shell
# 首先查看程序位置
loryhuang@loryhuang-TravelMate-P238-G2-M:~/桌面$ which fusuma
/usr/local/bin/fusuma
```

添加开机启动项，我另一篇笔记[添加开机自启](wiz://open_document?guid=ff0e1c9d-9ec3-4c98-88e5-555bb54a7bc2&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)有讲，不赘述了

##### 缺点

只支持`swipe`和`pinch`，想自定义**四指敲击**就不行...

#### xdotool

`fusuma`做触摸板多指支持，`xdotool`做按键鼠标模拟

`xdotool`很强大，用法可以查看其自带的手册

```shell
man xdotool
```

#### xev

使用`xdotool`可以模拟各种按键，那有些按键不知道其键值咋办？**比如鼠标的两个侧键值是多少呢？**

`xev`，表示`X events`，输出所有鼠标、键盘事件，查看事件中的键值即可

```shell
# 终端输入xev，打开软件
xev
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200317002443.png)

在打开的**白色小窗口**上面进行操作，终端会显示出其对应的事件

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200317002716.png)

得出**鼠标后退侧键键值为8**，同理得出**鼠标前进侧键键值为9**

所以使用`xdotool`时，就可以这样写到

```shell
# 执行鼠标后退侧键
xdotool click 8
```



