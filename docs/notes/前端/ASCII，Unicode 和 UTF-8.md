---
title: ASCII，Unicode 和 UTF-8
date: 2019-12-19
tags:
  - 前端
categories:
  - 前端
---

> 阮一峰的[文章](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)写得很好了，本篇只是看完粗略地做下笔记

### 一、ASCII 码

**ASCII**（发音： [/ˈæski/](https://zh.wikipedia.org/wiki/Help:英語國際音標) [*ASS-kee*](https://zh.wikipedia.org/wiki/Wikipedia:發音重拼)[[1\]](https://zh.wikipedia.org/wiki/ASCII#cite_note-1)，**A**merican **S**tandard **C**ode for **I**nformation **I**nterchange，**美国信息交换标准代码**

使用1个字节表示字符，首位固定为0，二进制为**1XXXXXXX**，可以表示128个字符（2的7次方）

### 二、非 ASCII 编码

英语用128个字符是够了，但其它语言不够．各个国家都设计了自己的编码方式，在1个字节即ASCII范围内保持一致，但超出其范围的，同一个编码值在不同国家表示不同的值，也就造成了乱码

### 三、Unicode

为了解决各国各自的编码不统一，使用一种编码系统容纳全世界各国的字符．，比如，`U+0639`表示阿拉伯字母`Ain`，`U+0041`表示英语的大写字母`A`，`U+4E25`表示汉字`严`。

### 四、UTF-8

#### 1. unicode与utf-8的关系

`unicode`只是一种编码方式，从0开始递增，00表示某某字符，01表示某某字符，02表示某某字符，不断增加，这样一个意思．但它并没有规定计算机如何存储．计算机存储会有什么问题呢？

第一个问题，编码靠前的字符，比如大写字母`A`，编码为41，编码靠后的字符，比如汉字`严`，编码为4E25，如果直接用2个字节存储，那么对于英语为母语的国家不是很浪费空间么？他们只需一个字节就够，其余全部补0．而且由于容纳全世界的字符，汉字`严`的编码根本不算多靠后，还有XXYYZZ呢（举个例子），难道要全部用3个字节？

所以`定长存储`是行不通的，那就采用`变长存储`喽？新的问题又来了，

字符的存储长度不一，那计算机怎么知道识别当前字符要读取一个字节还是两个字节呢？

`UTF-8`解决了上面两个问题，请记住：**UTF-8 只是 Unicode 的实现方式之一**

#### 2. utf-8存储

> 本节内容直接复制摘抄阮大神的文章

UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。

UTF-8 的编码规则很简单，只有二条：

1. 对于单字节的符号，字节的第一位设为`0`，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。

2. 对于`n`字节的符号（`n > 1`），第一个字节的前`n`位都设为`1`，第`n + 1`位设为`0`，后面字节的前两位一律设为`10`。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

下表总结了编码规则，字母`x`表示可用编码的位。

```
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

> **个人理解**：以这张表的第二行为例：
>
> ( 0000 0080 - 0000 07FF )这个字符编码范围共表示 (7FF-80)+1 = 1920个字符
>
> ( 110x xxxx 10xx xxxx ) 共有11个x，能表示的字符个数总共为 2的11次方 = 2048个符
>
> 可能会有疑惑，这不还可以再放一百多个字符么，为什么2个字节的Unicode编码只到`07FF`呢？
>
> 我觉得，这就是个规定而已，从第129个字符开始的1920个字符，规定使用两个字节表示，就这样，没有为什么，所以，其实 ( 110xxxxx 10xxxxxx ) 还剩了些编码没被用上，或者说对于UTF-8来说，那个编码是无效的

跟据上表，解读 UTF-8 编码非常简单。如果一个字节的第一位是`0`，则这个字节单独就是一个字符；如果第一位是`1`，则连续有多少个`1`，就表示当前字符占用多少个字节。

下面，还是以汉字`严`为例，演示如何实现 UTF-8 编码。

`严`的 Unicode 是`4E25`（`100111000100101`），根据上表，可以发现`4E25`处在第三行的范围内（`0000 0800 - 0000 FFFF`），因此`严`的 UTF-8 编码需要三个字节，即格式是`1110xxxx 10xxxxxx 10xxxxxx`。然后，从`严`的最后一个二进制位开始，依次从后向前填入格式中的`x`，多出的位补`0`。这样就得到了，`严`的 UTF-8 编码是`11100100 10111000 10100101`，转换成十六进制就是`E4B8A5`。