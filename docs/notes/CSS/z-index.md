---
title: z-index
date: 2019-05-19
tags:
  - CSS
categories:
  - CSS
---

*本文为张鑫旭课程的笔记整理（https://www.imooc.com/learn/643）*

### 基本

表示当元素发生重叠时，谁的层级更高，谁盖在上面

**z-index只适用于定位元素（css2.1，css3有些特殊属性）**

有3种值

- auto (自动，默认值)
- (整数)
- inherit (继承)

整数值可以是正值，负值，或0。数值越大，元素也就越靠近观察者。 数值越小，元素看起来也就越远。

### 层叠上下文(stacking context)

每一个网页都有一个默认的层叠上下文。 这个层叠上下文（桌子）的根源就是html元素

层叠顺序只在当前层叠上下文有效，两个层叠上下文之间的元素，不具有可比性，比的是其层叠上下文的层叠顺序

什么意思呢？其层叠上下文本身也是作为一个元素在某个层叠上下文内，至少还有个最顶级的根层叠上下文html元素不是么？

 

```
<div style="z-index=1">
    <div style="z-index=9999"></div>
</div>
<div style="z-index=2">
    <div style="z-index=-1"></div> <!--虽然是-1，但我还是能盖在你9999上面，哼-->
</div>
```

3种情况，会生成层叠上下文

- html元素（根层叠上下文）
- z-index为数值的定位元素
- 其他属性【看最后的css3特殊】

inherit不知道会不会形成，有点忘了，看视频确认下！！！

### 层叠顺序(stacking order)

![img](/img/52256796.jpg)

（注意：此处的z-index:auto或0是生效的z-index，如定位元素）

为什么是这个顺序呢？可以看红字，内容当然要在布局之上，再在装饰之上

同一层级当然是后者居上

题外话：平常我们说，使用absolute定位，元素会脱离文档流，并盖在其它元素之上，本质上是什么决定了其覆盖顺序？答案是因为absolute使得z-index（默认值auto）生效，使其跑到位于正z-index之下的第二高位置

### 定位元素

 

```
<div style="position: relative;"></div>
<div></div>
```

div变成定位元素后，就可以反盖在“后者居上”的div，这是为什么呢？

z-index默认值为auto，设了定位后，z-index就生效了

相当于在**7层层叠顺序**的**第2层**，当然比block块级元素层级高

### z-index: auto 与 z-index: 0的区别

相同：在同一层叠上下文中，这两个的层叠顺序是一样的，也就是符合后者居上

区别在于，z-index: 0会形成层叠上下文（注意：是生效的z-index，不管你是用定位还是css3新特性）

### 父亲想要盖过儿子

 

```
<div>
    <div style="position: relative; z-index: -1"></div>
</div>
```

父亲只要不设置z-index，儿子设置z-index为-1，并使其生效，儿子就会跑到父亲下面

为什么呢？

父亲z-index默认为auto不生成层叠上下文，所以父亲只是个普通元素，儿子设了z-index，那儿子的层叠顺序是在哪个层叠上下文呢？往上找（有点像absolute定位），直至根元素html，默认的层叠上下文

### css3特殊

无需定位，也可以生成层级上下文，层级顺序和z-index:auto/0平级

![img](/img/53464031.jpg)

1. z-index值不为auto的flex项（父元素display:flex|inline-flex）
2. 元素的opacity值不是1
3. 元素的transform值不是none
4. 元素的mix-blend-mode值不是normal
5. 元素的filter值不是none（此处指的时css3的filter）
6. 元素的isolation值是isolate
7. position: fixed声明（部分浏览器，比如chrome。如果是firefox好像还是要和z-index值结合）
8. will-change指定的属性值为上面任何一个
9. 元素的-webkit-overflow-scrolling设为touch（这个是移动端的）

具体可看张鑫旭视频教程https://www.imooc.com/video/11629 第六章《其它css属性与层叠上下文》