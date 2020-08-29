---
title: CSS选择器
date: 2020-01-21
tags:
  - CSS
categories:
  - CSS
---


CSS选择器分为以下五类：

* 简单选择器（Simple selector）
* 组合选择器（Combinator selector）
* 伪类选择器（Pseudo-class selector）
* 伪元素选择器（Pseudo-elements selector）
* 属性选择器（Attribute selector）

### 简单选择器（Simple selector）

#### 1. 元素选择器（Element selector）

```css
p {
    text-align: center;
    color: red;
}
```

#### 2. ID选择器（ID selector）

```css
#para1 {
    text-align: center;
    color: red;
}
```

> **Note：**ID名称不能以数字开头

#### 3. 类选择器（Class selector）

```css
.center {
    text-align: center;
    color: red;
}
```

> **Note：**类名称不能以数字开头

#### 4. 通用选择器（Universal selector）

```css
* {
    text-align: center;
    color: blue;
}
```

#### 5. 组选择器（Grouping selector）

```css
h1, h2, p {
    text-align: center;
    color: red;
}

/*或者*/
h1, 
h2, 
p {
    text-align: center;
    color: red;
}
```

### 组合选择器（Combinator selector）

> A combinator is something that explains the relationship between the selectors.
>
> （combinator用于解释selector之间的关系）

有4种`combinator`，如下：

* 后代选择器（**空格**）
* 子选择器（**>**）
* 相邻兄弟选择器（**+**）
* 一般兄弟选择器（**~**）

#### 后代选择器（Descendant selector）

```css
div p {
    background-color: yellow;
}
```



#### 子选择器（Child selector）

```css
div > p {
    background-color: yellow;
}
```



#### 相邻兄弟选择器（Adjacent sibling selector）

```css
div + p {
    background-color: yellow;
}
```



#### 一般兄弟选择器（General sibling selector）

```css
div ~ p {
    background-color: yellow;
}
```



### 伪类选择器（Pseudo-class selector）

伪类选择器（pseudo-class）用于匹配特定状态下的元素，例如：

* 设置元素鼠标悬浮状态下的样式
* 为访问过链接（visited links）和未访问过链接（unvisited links）设置不同样式
* 设置元素获取焦点下的样式

#### 语法

```css
selector:pseudo-class {
    property:value;
}
```

#### 实例

```css
/* 未访问链接（unvisited link） */
a:link {
    color: #FF0000;
}

/* 访问过链接（visited link） */
a:visited {
    color: #00FF00;
}

/* 鼠标悬浮链接（mouse over link） */
a:hover {
    color: #FF00FF;
}

/* 点击链接一瞬间 */
a:active {
    color: #0000FF;
}
```

> 定义样式时，`a:hover`要放在`a:link`和`a:visited`后面
>
> （个人理解：**a:hover**和**a:link、a:visited**优先级应该是一样的，所以在后定义的优先级高于先前定义的，如果**a:hover**放于**a:link**之前，那鼠标悬浮至元素上面，将没有任何效果，因为被**a:link**覆盖了）
>
> 同理，**a:active**要放置于**a:hover**之后
>
> 参考自：https://stackoverflow.com/questions/43118678/why-must-ahover-come-after-alink-and-avisited-in-the-css

更多实例

```css
/*伪类结合类名*/
a.highlight:hover {
    color: #ff0000;
}

div:hover {
    background-color: blue;
}

/*匹配所有<p>元素下的第一个<i>元素*/
p i:first-child {
    color: blue;
}

/*匹配任何元素下的第一个<p>元素（相当于匹配第一个p标签啦）*/
p:first-child {
    color: blue;
}

/*匹配任何元素下的第一个<p>元素下的所有<i>元素*/
p:first-child i {
    color: blue;
}
```

更多请参考 [w3school](https://www.w3schools.com/css/css_pseudo_classes.asp) 和 [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

### 伪元素选择器（Pseudo-elements selector）

伪元素选择器（pseudo-element）用于匹配元素的特定部分，例如：

* 设置元素首字母（::first-letter）、首行（::first-line）的样式
* 在元素内容之前（::before）或之后（::after）插入其它内容

#### 语法

```css
selector::pseudo-element {
    property:value;
}
```

> 双冒号（double colon）和单冒号（single colon）的**区别**
>
> **CSS1**、**CSS2**使用单冒号同时表示伪元素和伪类，**CSS3**规定使用双冒号表示伪元素，用以区分伪元素和伪类

需要注意的是，**IE8不支持CSS3，所以双冒号在IE8上是不识别的**，如需兼容请使用单冒号

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200121173651.png)

（图片来源：[mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)）

#### 实例

```css
/*匹配段落中的首字母*/
p::first-letter {
    color: #ff0000;
    font-size: xx-large;
}
```

> **Note：**伪元素**::first-letter**只能被用于块级元素

```css
/*匹配段落首行*/
p::first-line {
    color: #0000ff;
    font-variant: small-caps;
}
```

> **Note：**伪元素**::first-line**只能被用于块级元素

```css
/*在匹配元素前面插入指定内容*/
h1::before {
    content: url(smiley.gif);
}

/*在匹配元素后面插入指定内容*/
h1::after {
  content: url(smiley.gif);
}
```

```css
/*页面上选中部分*/
::selection {
    color: red;
    background: yellow;
}
```

更多请参考 [w3school](https://www.w3schools.com/css/css_pseudo_elements.asp) 和 [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

### 属性选择器（Attribute selector）

匹配拥有指定属性或属性值的元素

#### [attr]

匹配拥有属性名**attr**的元素

```html
<style>
    a[hello] {
        color: purple;
    }
</style>

<a hello></a>
```



#### [attr=value]

匹配拥有属性名**attr**且其值为**value**的元素（**全等**）

```html
<style>
    a[hello="world"] {
        color: purple;
    }
</style>

<a hello="world"></a>
```



#### [attr~=value]

匹配拥有属性名**attr**且其值是**以空格分隔**的值列表，并且其中至少一个值匹配**value**（**空格分隔，包含**）

```html
<style>
    a[hello~="world"] {
        color: purple;
    }
</style>

<a hello="world"></a>
<a hello="world nihao"></a>
<a hello="nihao world"></a>
```

#### [attr|=value]

匹配拥有属性名**attr**且其值是**value**（**全等**）或以**value-**为前缀开头（**包含**）

```html
<style>
    a[hello|="world"] {
        color: purple;
    }
</style>

<!-- 满足 -->
<a hello="zh"></a>
<a hello="zh-"></a>
<a hello="zh-CN"></a>
<a hello="zh-TW"></a>
<a hello="zh-world"></a>
<a hello="zh- world"></a>
<a hello="zh-TW world"></a>

<!-- 不满足 -->
<a hello="zh world"></a> <!-- 只能匹配zh一个 -->
<a hello="world zh"></a> <!-- 只能匹配zh一个 -->
<a hello="world zh-"></a> <!-- zh- 必须在开头 -->
<a hello="world zh-CN"></a> <!-- zh-* 必须在开头 -->
```

#### [attr^=value]

匹配拥有属性名**attr**且其值是**value**开头（**包含**）

```html
<style>
    a[hello^="world"] {
        color: purple;
    }
</style>

<a hello="world"></a>
<a hello="worldddd"></a>
<a hello="world nihao"></a>
```

#### [attr$=value]

匹配拥有属性名**attr**且其值是**value**结尾（**包含**）

```html
<style>
    a[hello$="world"] {
        color: purple;
    }
</style>

<a hello="world"></a>
<a hello="wwwworld"></a>
<a hello="nihao world"></a>
```

#### [attr*=value]

匹配拥有属性名**attr**且其值含有**value**（**包含**）

```html
<style>
    a[hello*="world"] {
        color: purple;
    }
</style>

<a hello="world"></a>
<a hello="wwwworld"></a>
<a hello="worldddd"></a>
<a hello="nihao world"></a>
<a hello="world nihao"></a>
<a hello="nihao world hello"></a>
```

更多请参考 [w3school](https://www.w3schools.com/css/css_attribute_selectors.asp) 和 [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

