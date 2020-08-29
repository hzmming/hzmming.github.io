---
title: wget
date: 2020-01-02
tags:
  - ubuntu
  - command
categories:
  - ubuntu
---

### 声明

参考自 [每天一个linux命令（61）：wget命令](https://www.cnblogs.com/peida/archive/2013/03/18/2965369.html)

### wget下载单个文件

```shell
wget http://www.minjieren.com/wordpress-3.1-zh_CN.zip
```

从网络下载一个文件并保存在当前目录，在下载的过程中会显示进度条，包含（下载完成百分比，已经下载的字节，当前下载速度，剩余下载时间）。



### wget -O下载并以不同的文件名保存

```shell
wget -O wordpress.zip http://www.minjieren.com/download.aspx?id=1080
```

`wget`默认会以最后一个符合`/`后面的字符来命令，对于动态链接的下载通常文件名会不正确。

**错误**：下面的例子会下载一个文件并以名称`download.aspx?id=1080`保存

```shell
wget http://www.minjieren.com/download?id=1
```

即使下载的文件是`zip格式`，它仍然以`download.php?id=1080`命名。

**正确**：为了解决这个问题，我们可以使用参数`-O`来指定一个文件名：

```shell
wget -O wordpress.zip http://www.minjieren.com/download.aspx?id=1080
```



### wget -O - 下载并输出至终端标准流

```shell
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O -
```

`-O -`等价于`-O /dev/stdout`

上面语句等价于下面这句

```shell
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O /dev/stdout
```



### wget -O - | sh下载并运行（不保存）

这样的好处就是不会保存文件，运行完就没有了

原理：无非是把`shell`脚本直接管道输出至`sh`运行罢了

```shell
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```



### wget –limit -rate限速下载

```shell
wget --limit-rate=300k http://www.minjieren.com/wordpress-3.1-zh_CN.zip
```

当你执行`wget`的时候，它默认会占用全部可能的宽带下载。但是当你准备下载一个大文件，而你还需要下载其它文件时就有必要限速了。



### wget -c断点续传

```shell
wget -c http://www.minjieren.com/wordpress-3.1-zh_CN.zip
```

使用`wget -c`重新启动下载中断的文件，对于我们下载大文件时突然由于网络等原因中断非常有帮助，我们可以继续接着下载而不是重新下载一个文件。需要继续中断的下载时可以使用-c参数。



### wget -b后台下载

```shell
wget -b http://www.minjieren.com/wordpress-3.1-zh_CN.zip
```

对于下载非常大的文件的时候，我们可以使用参数`-b`进行后台下载。

```shell
wget -b http://www.minjieren.com/wordpress-3.1-zh_CN.zip

Continuing in background, pid 1840.
Output will be written to `wget-log'.
```

你可以使用以下命令来察看下载进度：

```shell
tail -f wget-log
```



### 伪装代理名称下载

```shell
wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" http://www.minjieren.com/wordpress-3.1-zh_CN.zip
```

有些网站能通过根据判断代理名称不是浏览器而拒绝你的下载请求。不过你可以通过`–user-agent`参数伪装。



### wget –spider测试下载链接

```shell
wget --spider URL
```

当你打算进行定时下载，你应该在预定时间测试下载链接是否有效。我们可以增加`–spider`参数进行检查。

```shell
wget --spider URL
```

如果下载链接**正确**，将会显示

```shell
wget --spider URL

Spider mode enabled. Check if remote file exists.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [text/html]
Remote file exists and could contain further links,
but recursion is disabled -- not retrieving.
```

这保证了下载能在预定的时间进行

但当你给错了一个链接，将会显示如下**错误**

```shell
wget --spider url

Spider mode enabled. Check if remote file exists.
HTTP request sent, awaiting response... 404 Not Found
Remote file does not exist -- broken link!!!
```

你可以在以下几种情况下使用`spider参数`：

* 定时下载之前进行检查
* 间隔检测网站是否可用
* 检查网站页面的死链接



### wget –tries增加重试次数

```shell
wget --tries=40 URL
```

如果网络有问题或下载一个大文件也有可能失败。`wget`默认重试`20次`连接下载文件。如果需要，你可以使用`–tries`增加重试次数。



### wget -i下载多个文件

```shell
wget -i filelist.txt
```

首先，保存一份下载链接文件

```shell
cat > filelist.txt

url1
url2
url3
url4
```

接着使用这个文件和参数`-i`下载



### wget –mirror镜像网站

```shell
wget --mirror -p --convert-links -P ./LOCAL URL
```

下载整个网站到本地。

* `–miror`：开户镜像下载
* `-p`：下载所有为了html页面显示正常的文件
* `–convert-links`：下载后，转换成本地的链接
* `-P ./LOCAL`：保存所有文件和目录到本地指定目录



### wget –reject过滤指定格式下载

```shell
wget --reject=gif URL
```

下载一个网站，但你不希望下载图片，可以使用以下命令。



### wget -o把下载信息存入日志文件

```shell
wget -o download.log URL
```

不希望下载信息直接显示在终端而是在一个日志文件，可以使用



### wget -Q限制总下载文件大小

```shell
wget -Q5m -i filelist.txt
```

当你想要下载的文件超过5M而退出下载，你可以使用。**注意：这个参数对单个文件下载不起作用，只能递归下载时才有效。**



### wget -r -A下载指定格式文件

```shell
wget -r -A.pdf url
```

可以在以下情况使用该功能：

* 下载一个网站的所有图片
* 下载一个网站的所有视频
* 下载一个网站的所有PDF文件



### wget FTP下载

```shell
wget ftp-url

wget --ftp-user=USERNAME --ftp-password=PASSWORD url
```

可以使用`wget`来完成`ftp链接`的下载。

使用`wget匿名ftp`下载：

```shell
wget ftp-url
```

使用`wget用户名和密码认证的ftp`下载

```shell
wget --ftp-user=USERNAME --ftp-password=PASSWORD url
```

