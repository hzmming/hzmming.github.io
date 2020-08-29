---
title: 安装rpm包
date: 2019-11-27
tags:
  - ubuntu
categories:
  - ubuntu
---

Step 1: Add the Universe Repository
```shell
sudo add-apt-repository universe
```

Step 2: Update apt-get
```shell
sudo apt-get update
```


Step 3: Install Alien package
```shell
sudo apt-get install alien
```


Step 4: Convert .rpm package to .deb
```shell
sudo alien <name of package>.rpm
```


Step 5: Install the Converted Package
```shell
# 其实deb包双击即可安装了
sudo dpkg -i <name of package>.deb
```