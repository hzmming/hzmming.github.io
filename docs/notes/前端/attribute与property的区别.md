---
title: attribute与property的区别
date: 2020-06-22
tags:
  - 前端
categories:
  - 前端
---

vue的v-bind，有个修饰符.prop表示作为DOM property绑定而不是attribute绑定

https://cn.vuejs.org/v2/api/#v-bind

提到了这个区别



给出了参考链接

https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html



大概说下就是三种情况

1. prop与attr完全一一对应（如id）

2. prop没有对应的attr

3. attr没有对应的prop

4. prop与attr一定限制下对应

    比如input type="foo"，随便乱写type，其prop会取正确的text值，而attr还是foo

    比如input type="text" value="3"，一开始value的prop与attr一致，但当值变化后，prop为变化后的值，而attr还是初始值（html上静态写的值）



更详细可以看规范：https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflect



顺便说下，input type="text"的 setAttribute('value', 333)在一开始有用，使用setAttribute修改value，值也会跟着改，但当通过ui或代码修改prop的value值后，setAttribute将不再起作用，只修改element上的attr而已

