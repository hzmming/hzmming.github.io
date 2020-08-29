---
title: Specified、Computed、Used、Actual and Resolved Value
date: 2020-01-13
tags:
  - CSS
categories:
  - CSS
---

一旦浏览器解析文档（`document`）并构建DOM树（`document tree`），它就必须为树中每个元素响应目标媒体类型（`media type`）的所有属性分配一个值．

属性的最终值是（`Final Value`）`四个步骤`计算的结果：

1. 通过规范决定值（规范具体见下面解释），称为`Specified Value`
2. `Specified Value`被解析为DOM树继承时使用的值，称为`Computed Value`
3. `Computed Value`在必要时会被转换为一个绝对值，称为`Used Value`
4. 最后`Used Value`由于本地环境的限制转换成`Actual Value`（限制见下面解释）

### Specified Value

浏览器按照以下的机制为每个元素分配一个`Specified Value`（按照优先级排序）

1. 如果级联（`cascade`）产生一个值，使用它

   > 简单地说：如果样式表为属性显示地指定一个值，使用它
   >
   > 复杂地说：CSS的全称是`Cascading Style Sheets`，CSS同样会被解析成`css tree`，也就是一棵级联层叠的样式树，根据匹配器和优先级，最终决定使用的值

2. 否则，如果属性是可继承的（`inherited`）并且元素不是DOM树（`document tree`）的根节点，使用父元素的`Computed Value`

3. 否则使用属性的初始值（`Inival Value`）

### Inival Value

每个属性的初始值（`Inival Value`）由属性的定义规定表明

### Computed Value

`Specified Value`在级联阶段（`during the cascade`）被解析为`Computed Value`，按如下操作处理

1. 处理特殊值：[`inherit`](https://developer.mozilla.org/en-US/docs/Web/CSS/inherit), [`initial`](https://developer.mozilla.org/en-US/docs/Web/CSS/initial), [`unset`](https://developer.mozilla.org/en-US/docs/Web/CSS/unset), and [`revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)

2. 按照各自属性定义的`Computed value`部分处理

   > 例如：`url()`中的相对路径转为绝对路径（URIs are made absolute）、`em`和`ex`单位转为`px`或者绝对值

**举例**

(1) `line-height`的`Computed value`部分如下：

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115151652.png)

翻译过来：对于百分比和长度值，转成绝对值，否则直接取`Specified Value`．比如`font-size: 18px; line-height: 2em`，则`line-height`的`Computed value`值为`36px`

> 引申下，那百分比如何转呢？以谁为百分比呢？看`Percentages`那一栏．其实这个属性面板并没有并不完整，比如`line-height`还可以支持数字`number`（注意，长度值是带单位的，如`em`、`px`，而数字就真的就是个数字），那`number`又是怎么取值呢？还是得具体见[mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)或[w3c](https://www.w3.org/TR/CSS2/visudet.html#propdef-line-height)

(2) `color`的`Computed value`部分如下：

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115152759.png)

翻译过来：如果值是透明的，转为`rgba()`，如果不是，则转为`rgb()`．`transparent`转为`rgba(0,0,0,0)`

(3) `font-size`的`Computed value`部分如下：

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115153336.png)

(4) `background`的`Computed value`部分如下：

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115153505.png)

翻译过来：`background`属性作为很多`background-*`属性集体的简写，其`Computed Value`由其`background-*`属性集的`Computed Value`组合而成

这个处理过程叫`Computing`，`Computing`不要求浏览器渲染文档（Computing a value never requires the user agent to render the document），这也意味着有些值是无法在`Computing`过程推导出来．比如`width`, `margin-right`, `text-indent`, and `top`等属性的百分比值需要布局`layout`后才能决定，所以这些百分比值并没有转换为绝对值而是直接作为其`Computed Value`（percentage-specified values turn into percentage-computed values）．

这些相对值会在下个阶段`Used Value`确定后转换为绝对值

### Used Value

属性的 Computed Value 尽可能在文档渲染前计算得出，然而，有些值必须等到元素渲染出来后才能得知，比如：我们为某个元素的 width 属性设置一个百分比值，那么这个元素的 width 就必须等到它的的 Containing Block 的 width 值确定后才能计算得出。所以 Used Value 就是一个等待 Computed Value 和任何存在依赖都处理完后得到的那个绝对值。

### Actual Value

原则上来讲，Used Value 就是元素渲染时使用的值，但是并不是所有的用户代理都能直接把 Used Value 用在当前环境下。比如：有些浏览器只能使用整型像素值来渲染元素的 border-width 属性，那么这些浏览器就会对浮点类型的 Used Value 进行一些近似处理。所以 Actual Value 就是 Used Value 在进行近似处理后的值。

### Resolved Value

CSS属性的`Resolved value`是[`getComputedStyle()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)的返回值．

对于大多数属性来说，它就是`Computed Value`值，但有一部分属性（包括`width`和`height`）取的是`Used Value`

到底哪些属性是取`Compute Value`，哪些属性是取`Used Value`，见[W3C](https://drafts.csswg.org/cssom/#resolved-values)

> 个人理解：感觉不管是取`Computed Value`还是`Used Value`，其实都是取**绝对值**啦！因为有些属性在`Computing`阶段无法转换为绝对值，所以直接用相对值作为`Computed Value`，这个时候，`Resolved Value`取`Used Value`就可以保持一致取绝对值了．

*参考资料*

*[Assigning property values, Cascading, and Inheritance](https://dancon.gitbooks.io/git-books/content/css/concept/assigning_value_cascading_and_inheritance.html)*

*[Specified, Computed, Used, and Resolved Value](https://www.cyj.me/programming/2013/04/26/specified-computed-used-and-resolved-value/)*

https://drafts.csswg.org/cssom/#resolved-values

*https://www.w3.org/TR/CSS2/cascade.html#specified-value*



### CSS3规范

唉，看了这么多资料是CSS2的，CSS3有变动，没精力看了，就记录下

参考自 https://drafts.csswg.org/css-cascade-4/#declared-value

从 **4. Value Processing** 开始看

Once a user agent has parsed a document and constructed a document tree, it must assign, to every element in the tree, and correspondingly to every box in the formatting structure, a value to every property that applies to the target media type.

The final value of a CSS property for a given element or box is the result of a multi-step calculation:

1. First, all the [declared values](https://drafts.csswg.org/css-cascade-4/#declared-value) applied to an element are collected, for each property on each element. There may be zero or many declared values applied to the element.
2. Cascading yields the [cascaded value](https://drafts.csswg.org/css-cascade-4/#cascaded-value). There is at most one cascaded value per property per element.
3. Defaulting yields the [specified value](https://drafts.csswg.org/css-cascade-4/#specified-value). Every element has exactly one specified value per property.
4. Resolving value dependencies yields the [computed value](https://drafts.csswg.org/css-cascade-4/#computed-value). Every element has exactly one computed value per property.
5. Formatting the document yields the [used value](https://drafts.csswg.org/css-cascade-4/#used-value). An element only has a used value for a given property if that property applies to the element.
6. Finally, the used value is transformed to the [actual value](https://drafts.csswg.org/css-cascade-4/#actual-value) based on constraints of the display environment. As with the [used value](https://drafts.csswg.org/css-cascade-4/#used-value), there may or may not be an actual value for a given property on an element.

摘抄一部分，以后有心情再整理吧

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200115165848.png)