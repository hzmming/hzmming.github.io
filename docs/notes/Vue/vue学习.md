---
title: vue学习
date: 2018-09-09
tags:
  - Vue
categories:
  - Vue
---

### 2-1 自定义指令

**html**

```html
<div id="app">
    <div v-hzm="color" id="demo">
        {{num}}
    </div>
</div>
```

**javascript**

```javascript
// 默认带有 v- 前缀
Vue.directive('hzm', function (el, binding, vnode) {
    console.log(el);
    console.log(binding);
    console.log(vnode);
    el.style.color = binding.value;
});
```

或者

```javascript
Vue.directive('hzm', {
    bind:function(el, binding){//被绑定
        console.log('1 - bind');
        el.style.color = binding.value;
    },
    inserted:function(){//绑定到节点
        console.log('2 - inserted');
    },
    update:function(){//组件更新
        console.log('3 - update');
    },
    componentUpdated:function(){//组件更新完成
        console.log('4 - componentUpdated');
    },
    unbind:function(){//解绑
        console.log('5 - unbind');
    }
});
```

 

### 2-3 Vue.set全局操作

```html
<div id="app">
    <ul>
        <li v-for=" aa in arr">{{aa}}</li>
    </ul>
    <button @click="modify">修改</button>
</div>
 
<script type="text/javascript">
 
    var app=new Vue({
        el:'#app',
        data: {
            arr: ['aaa','bbb','ccc']
        },
        methods: {
            modify(){
                console.log('修改数组');
                this.arr[1] = 'eee';        // 无效（其实是页面未实时响应，但数据已变）
                Vue.set(this.arr,1,'eee');    // 有效
                this.$set(this.arr,1,'eee'); // 有效
            }
        }
    })
</script>
```

个人理解，Vue.set 主要用于两个方面

（1）**修改数组元素** 实时响应

如代码所示，通过下标修改数组元素，页面未实时响应到。但是如果整个数组覆盖的话，就会被正常监测到并实时响应

（2）**添加对象新属性** 实时响应

修改对象属性会实时响应，但添加新对象属性却不会

**注意**，不管是数组还是对象，都只是页面未实时响应，实例内部的数据其实已经变了，若同时有其它属性变化被正常监测，或者手动强制触发更新界面，新数据同样会被正常响应

### 2-4 生命周期

本小节学习 **构造器**、**组件**、**子组件** 三者 生命周期钩子 运行时间对比

生命周期其实就是几个动作，如下：

**创建（之前）、挂载（之前）、更新（之前）、激活（之前）、销毁（之前）**

也就是 动作、动作之前，合起来5\*2=10个动作（又叫钩子hook）

**html**

```html
<div id="app">
    {{message}}
    <p>
        <button @click="modify">修改</button>
        <child>
 
        </child>
    </p>
</div>
<button onclick="app.$destroy()">销毁</button>
```

**javascript**

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 1
    },
    methods: {
        modify: function () {
            this.message++;
        }
    },
    beforeCreate: function () {
        // 此时 this.message 还是 undefined
        //      this.modify  还是 undefined
        //      this.$el     还是 undefined
        console.log('1-beforeCreate 初始化之前');
    },
    created: function () {
        // 此时 this.message 有值了
        //      this.modify  有值了
        //      this.$el     还是 undefined
        console.log('2-created 创建完成');
    },
    beforeMount: function () {
        // 此时 this.message 有值了
        //      this.modify  有值了
        //      this.$el     有值了
        console.log('3-beforeMount 挂载之前');
    },
    mounted: function () {
        // 此时页面 <div id="app">...</div> 内容被正确解析替换了（也就是界面上的{{}}变成实际的值了）
        console.log('4-mounted 被挂载');
    },
    beforeUpdate: function () {
        console.log('5-beforeUpdate 数据更新前');
    },
    updated: function () {
        console.log('6-updated 被更新后');
    },
    activated: function () {
        // 使用 <keep-alive> 组件切换时不会销毁，而是“激活”状态的切换，
        // 有利用保留数据状态（用户操作，如表格翻页）
        console.log('7-activated');
    },
    deactivated: function () {
        console.log('8-deactivated');
    },
    beforeDestroy: function () {
        console.log('9-beforeDestroy 销毁之前');
    },
    destroyed: function () {
        console.log('10-destroyed 销毁之后')
    },
 
    // --------------------组件 -----------------------
    components: {
        child: {
            template: `<div>{{word}}<grand></grand></div>`,
            data(){
                return {
                    word: 'hello world'
                }
            },
            beforeCreate: function () {
                console.log('[child]1-beforeCreate 初始化之前');
            },
            created: function () {
                console.log('[child]2-created 创建完成');
            },
            beforeMount: function () {
                console.log('[child]3-beforeMount 挂载之前');
            },
            mounted: function () {
                console.log('[child]4-mounted 被挂载');
            },
            beforeUpdate: function () {
                console.log('[child]5-beforeUpdate 数据更新前');
            },
            updated: function () {
                console.log('[child]6-updated 被更新后');
            },
            activated: function () {
                console.log('[child]7-activated');
            },
            deactivated: function () {
                console.log('[child]8-deactivated');
            },
            beforeDestroy: function () {
                console.log('[child]9-beforeDestroy 销毁之前');
            },
            destroyed: function () {
                console.log('[child]10-destroyed 销毁之后')
            },
 
            // -------------------子组件------------------------
            components: {
                grand: {
                    template: `<div>{{grand}}</div>`,
                    data(){
                        return {
                            grand: 'grand'
                        }
                    },
                    beforeCreate: function () {
                        console.log('[grand]1-beforeCreate 初始化之前');
                    },
                    created: function () {
                        console.log('[grand]2-created 创建完成');
                    },
                    beforeMount: function () {
                        console.log('[grand]3-beforeMount 挂载之前');
                    },
                    mounted: function () {
                        console.log('[grand]4-mounted 被挂载');
                    },
                    beforeUpdate: function () {
                        console.log('[grand]5-beforeUpdate 数据更新前');
                    },
                    updated: function () {
                        console.log('[grand]6-updated 被更新后');
                    },
                    activated: function () {
                        console.log('[grand]7-activated');
                    },
                    deactivated: function () {
                        console.log('[grand]8-deactivated');
                    },
                    beforeDestroy: function () {
                        console.log('[grand]9-beforeDestroy 销毁之前');
                    },
                    destroyed: function () {
                        console.log('[grand]10-destroyed 销毁之后')
                    }
                }
            }
        }
    }
 
})
```

构造器、组件、子组件 三者生命周期 运行顺序如下

```markdown
1-beforeCreate 初始化之前
2-created 创建完成
3-beforeMount 挂载之前
[child]1-beforeCreate 初始化之前
[child]2-created 创建完成
[child]3-beforeMount 挂载之前
[grand]1-beforeCreate 初始化之前
[grand]2-created 创建完成
[grand]3-beforeMount 挂载之前
[grand]4-mounted 被挂载
[child]4-mounted 被挂载
4-mounted 被挂载
```

最后挂载看似是从最里层的组件往上挂载，其实是一次性 构造器、组件、子组件 全部挂载，因为Vue采用虚拟Dom技术，子组件的挂载不过是数据挂载而已

### 2-5 template

三种方式

```html
<div id="app">
    {{message}}
</div>
 
<template id="tpl2">
    <h2>第二种：我是tempalte标签模板</h2>
</template>
 
<script type="x-template" id="tpl3">
    /* 也可在script标签上用src引入远程模板 */
    <h2>第三种：我是script标签模板</h2>
</script>
 
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            message: 1
        },
 
        // template: `
        //     <h2>第一种：我是选项模板</h2>
        // `
 
        // template: '#tpl2',
 
        template: '#tpl2'
    })
</script>
```

 

### 2-6 组件：注册

```html
<div id="app">
    <hzm></hzm>
    <lory></lory>
</div>
 
<script type="text/javascript">
    //注册全局组件
    Vue.component('hzm',{
        template:`<div style="color:red;">全局化注册的hzm标签</div>`
    })
    var app=new Vue({
        el:'#app',
        // 注册局部组件
        components: {
            lory: {
                template:`<div style="color:green;">局部注册的lory标签</div>`
            }
        }
    })
</script>
```

### 2-7 组件：参数传递

```html
<div id="app">
 
    <lory fromHere="China"></lory>
    <!-- 不能正常显示，因为浏览器大小写不敏感，所以DOM中的模板要用“短横线分隔命名”！
    但如果是字符串模板就没这个限制！ -->
 
    <lory from-here="China"></lory>
    <lory :from-here="place"></lory>
    <lory v-bind:from-here="place"></lory>
</div>
```

```javascript
var app=new Vue({
    el:'#app',
    data: {
        place: 'FuJian'
    },
    components: {
        lory: {
            template:`<div style="color:green;">lory from {{fromHere}}</div>`,
            props: [
                'fromHere'
            ]
        }
    }
})
```

使用`props`属性表示参数，还可定义参数的类型，详见[官网](https://cn.vuejs.org/v2/guide/components-props.html)

**使用数据绑定的作用是**：传递的是实例属性，而不是纯字符串

> v-bind 用 冒号`:` 表示缩写

### 2-8 组件：动态组件

```html
<div id="app">
    <component :is="who"></component>
    <button @click="changeComponet">change</button>
</div>
```

```javascript
var componentA = {
    template: `<div style="color: blue;">我是componentA</div>`
};
var componentB = {
    template: `<div style="color: green;">我是componentB</div>`
};
var componentC = {
    template: `<div style="color: red;">我是componentC</div>`
};
 
var app=new Vue({
    el:'#app',
    data: {
        who: 'componentA'
    },
    components: {
        componentA,
        componentB,
        componentC,
    },
    methods: {
        changeComponet(){
            if(this.who == 'componentA'){
                this.who = 'componentB';
            }else if(this.who == 'componentB'){
                this.who = 'componentC';
            }else{
                this.who = 'componentA';
            }
        }
    }
})
```

组件切换后，我们希望保留组件的状态，而不是重新销毁、生成，那么可以这样

```html
<keep-alive>
    <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

理解不了的话，[官网](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)有更详细的解释

### 2-9 组件：自定义事件

个人理解：其实就是组件内部调用外部方法（话说，这和方法传递有啥不一样？）

```html
<my-component @my-event="doSomething"></my-component>
```

```javascript
Vue.component('my-component', {
    // ...
 
    methods: {
        abc() {
            this.$emit('my-event');
        }
    }
})
```

上面代码表示，在`my-component`组件内部 调用 外部方法 `doSomething()`

### 2-10 组件：与指令的区别

组件通常都有对应的html代码，表示一快具有特定样式、逻辑和功能的实体，可以为组件添加指令来实现想要的功能；

一个应用通常会被切分为各个小的组件。

指令通常用于给某已存在DOM添加相应的行为，例如v-if、v-for等，定义指令的时候一般不需要特定的视图；

**个人觉得指令更像是动作的抽象，是定义在标签上的属性使用，而组件则是连同“模板”，定义为标签使用**



### 2-11 过滤器

vue过滤器取不到vue实例，即this为undefined，这是因为filter应该是个纯函数，不应该依赖this这种上下文环境

```shell
# Evan You 亲自解释：
This is intentional in 2.x. Filters should be pure functions and should not be dependent on this context. If you need this you should use a computed property or just a method e.g. $translate(foo)
```



### 3-1 propsData

暂不理解

### 3-2 computed 计算选项

个人理解：在不污染原始数据的情况下，对数据进行加工（排序、添加文字等），以满足用户需要

```html
<div id="app">
    <p>原始数据：{{price}} --------------后端传送过来，便于存储计算的数值</p>
    <p>加工数据：{{newPrice}}----------添加文字提示，用户体验更好</p>
</div>
```

```javascript
var app=new Vue({
    el:'#app',
    data:{
        price:100
    },
    computed:{
        newPrice:function(){
            return '￥' + this.price + '元';
        }
    }
})
```

### 3-3 methods 方法选项

（1）基本使用

```html
<div id="app">
    <button @click="add">add</button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        methods: {
            add: function () {
                // ...
            }
        }
    })
</script>
```

（2）默认传参

```html
<div id="app">
    <!--如果只写个函数名，那么默认传参$event（即原生js事件对象）-->
    <button @click="add">add</button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        methods: {
            add: function (event) {
                console.log(event);
            }
        }
    })
</script>
```

（3）手动传参

```html
<div id="app">
    <!--支持传参、以及js原生事件-->
    <button @click="add(2)">add</button>
    <button @click="add(2, $event)">add</button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        methods: {
            add: function (num, event) {
                console.log(num);
                console.log(event);
            }
        }
    })
</script>
```

（4）组件事件

```html
<div id="app">
 
    <!-- 正常生效 -->
    <my-btn @click.native="add"></my-btn>
 
    <!--
        class类、style样式可直接写在组件标签上，vue会将其保留，但事件就不行了
        组件绑定事件时，需使用.native（表明使用vue实例构造器methods里的方法）
    -->
    <my-btn @click="add"></my-btn>    <!-- 失效 -->
 
    <!--普通html标签，若使用.native修饰符，click事件将失效（审查元素发现没有绑定click事件）-->
    <button @click.native="add">add</button> <!-- 失效 -->
 
</div>
<script>
    var app = new Vue({
        el: '#app',
        components: {
            myBtn: {
                template: '<button>add组件</button>'
            };
        },
        methods: {
            add: function () {
                // ...
            }
        }
    })
</script>
```

### 3-4 watch 监听选项

**watch选项用于监听某个属性变化后执行相应的联动动作，无返回值**

**computed主要是用于加工原始数据，所以computed必须有返回值，即加工后的数据**

```javascript
var app = new Vue({
    el: '#app',
    data: {
        abc: 'hello'
    },
    methods: {
        modify(){
            this.abc = 'world'
        }
    },
    watch: {
        // 监听abc变化
        abc(newVal, oldVal) {
            // 执行相应操作，无返回值
            console.log(newVal);
            console.log(oldVal);
        }
    }
})
```

### 3-5 mixins 混入选项

用于扩展组件

```javascript
// 全局混入部分
Vue.mixin({
    updated(){
        logger('全局混入的updated方法');
    },
    methods:{
        testMethod(){
            logger('全局混入的method方法');
        },
    }
});
 
// 构造器混入部分
var mixinsPart={
    updated(){
        logger("构造器混入的updated方法");
    },
    methods:{
        testMethod(){
            logger('构造器混入的method方法');
        },
    }
};
 
// 原生构造器
var app=new Vue({
    el:'#app',
    data:{
        num:1
    },
    methods:{
        add(){
            this.num++;
        },
        testMethod(){
            logger('构造器里的method方法')
        }
    },
    updated(){
        logger("构造器里的updated方法。")
    },
    mixins:[mixinsPart]//混入，注意！！此处传递的是 数组！！
})
```

（1）生命周期钩子，重名方法`共存`，`执行顺序`为 `全局混入 > 构造器混入 > 构造器原生`

（2）methods方法，重名方法`覆盖`，`覆盖优先级`为`构造器原生 > 构造器混入 > 全局混入`

> 其实，想想也知道，钩子这东西肯定是共存的，又有全局钩子，又有内部钩子啥的，往往还是初始处理；
>
> method作为业务逻辑方法的存在，那必须是唯一的

### 3-6 extends 扩展选项

用于扩展组件（与mixins混入的区别暂未知）

```javascript
// 构造器扩展部分
var extendsPart={
    updated(){
        logger("构造器扩展的updated方法");
    },
    methods:{
        testMethod(){
            logger('构造器扩展的method方法');
        },
    }
};
 
// 原生构造器
var app=new Vue({
    el:'#app',
    data:{
        num:1
    },
    methods:{
        add(){
            this.num++;
        },
        testMethod(){
            logger('构造器里的method方法')
        }
    },
    updated(){
        logger("构造器里的updated方法。")
    },
    extends:extendsPart//扩展，注意！！此处与mixins不一样，传递的是 对象！！
})
```

（1）生命周期钩子，重名方法`共存`，`执行顺序`为 `构造器扩展 > 构造器原生`

（2）methods方法，重名方法`覆盖`，`覆盖优先级`为`构造器原生 > 构造器扩展`

（3）**没有全局扩展**，Vue.extend 是创建组件的构造函数，为了复用。当你需要继承一个组件时，可以使用。详细内容不在此讨论

### 3-7 mixins & extends 共同作用

mixins 和 extends 都可以达到相同的目的
**区别：mixins接收数组arry，extends接收对象object**

如果同时使用 mixins 和 extends，那么会怎样呢？？

```javascript
// 全局混入部分
Vue.mixin({
    updated(){
        logger('全局混入的updated方法');
    },
    methods:{
        testMethod(){
            logger('全局混入的method方法');
        }
    }
});
 
// 构造器混入部分
var mixinsPart={
    updated(){
        logger("构造器混入的updated方法");
    },
    methods:{
        testMethod(){
            logger('构造器混入的method方法');
        }
    }
};
 
// 构造器扩展部分
var extendsPart={
    updated(){
        logger("构造器扩展的updated方法");
    },
    methods:{
        testMethod(){
            logger('构造器扩展的method方法');
        }
    }
};
 
// 原生构造器
var app=new Vue({
    el:'#app',
    data:{
        num:1
    },
    methods:{
        add(){
            this.num++;
        },
        testMethod(){
            logger('构造器里的method方法')
        }
    },
    updated(){
        logger("构造器里的updated方法。")
    },
    mixins:[mixinsPart],//混入
    extends:extendsPart//扩展
}
```

（1）生命周期钩子，重名方法`共存`，`执行顺序`为 `全局混入 > 构造器扩展 > 构造器混入 > 构造器原生`

*其实就是两点：“全局>构造器额外>构造器原生” 以及 “扩展>混入”*

（2）methods方法，重名方法`覆盖`，`覆盖优先级`为`构造器原生 > 构造器混入 > 构造器扩展 > 全局混入`

*其实还是两点：“构造器原生>构造器额外>全局” 以及 “混入>扩展”*

> 个人认为，这个执行顺序没有必要死记硬背，这可能只是源代码里 两个调用语句 无关痛痒的先后顺序罢了
>
> 有心探究它们的共同作用结果，已经很积极了，最怕程序员死记知识点了，重点是你曾经有过并能在需要时候取出来，这才是最重要的

### 3-8 delimiters 选项

重新定义插值符号

```html
<div id="app">
    <div>
        {{num}} <!-- {{num}} 不再识别 -->
        ${num}  <!-- ${num}  新的插值符号 -->
    </div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            num: 10,
        },
        delimiters: ['${', '}']
    })
</script>
```

### 4-1 Vue与第三方库

第三方插件 往往用在`mounted`、`updated`钩子里，因为它要保证dom节点已经渲染完成

**举个例子**：使用`jquery.niceScroll`优化滚动轴

若组件尚未完成dom渲染挂载，计算高度将会出错，此时需要mounted钩子，表示dom节点已经渲染完成

若dom动态变化，高度又变了，需手动调用`jquery.niceScroll`的resize方法，此时需要updated钩子

### 4-2 updated & $nextTick 区别

**相同点**：都是在实例发生变化时调用

**异同点**：

| 调用者                                                     | 运行次数                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| updated为Vue系统自动调用<br />nextTick为代码编写者手动调用 | updated可运行n次，只要实例发生变化就调用<br />nextTick只运行1次，代码编写者手动指定的下一次实例变化时调用，之后就没了~~ |

 

### 4-3 slot内置组件

```html
<div id="app">
    <jspang>
        <span slot="bolgUrl">{{jspangData.bolgUrl}}</span>
        <span slot="netName">{{jspangData.netName}}</span>
        <span slot="skill">{{jspangData.skill}}</span>
    </jspang>
</div>
<template id="tmp">
    <div>
        <p>博客地址：<slot name="bolgUrl"></slot></p>
        <p>网名：<slot name="netName"></slot></p>
        <p>技术类型：<slot name="skill"></slot></p>
    </div>
</template>
<script type="text/javascript">
 
    var jspang = {
        template: '#tmp'
    };
 
    var app = new Vue({
        data: {
            jspangData:{
                bolgUrl:'http://jspang.com',
                netName:'技术胖',
                skill:'Web前端'
            }
        },
        components: {
            jspang
        }
    }).$mount('#app');
 
</script>
```

### 4-4 $refs

Vue 建议使用双向数据绑定，只关注数据状态，不直接对dom进行操作，那如果真要获取dom呢？？

```html
<!-- `vm.$refs.p` will be the DOM node -->
<p ref="p">hello</p>
 
<!-- `vm.$refs.child` will be the child component instance -->
<child-component ref="child"></child-component>
```

`ref`用于普通html标签，将获取到该dom元素；用于 vue组件，将获取该组件实例

### 4-5 transition

**（一） 基本使用**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>transition</title>
    <script src="../dist/vue.js"></script>
    <style>
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
 
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
        {
            opacity: 0;
        }
    </style>
</head>
<body>
<div id="demo">
    <button @click="show = !show">
        Toggle
    </button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
</div>
<script>
    new Vue({
        el: '#demo',
        data: {
            show: true
        }
    })
</script>
</body>
</html>
```

`name`属性定义生成CSS过渡类名，默认为 “v”，如“v-enter”，“v-enter-active”

几个过渡类名的使用

| 类名           | 作用                          |
| -------------- | ----------------------------- |
| v-enter        | 节点进入 初始状态             |
| v-enter-active | 节点进入 过渡效果             |
| v-enter-to     | 节点进入 结束状态（一般没用） |
| v-leave        | 节点离开 初始状态（一般没用） |
| v-leave-active | 节点离开 过渡效果             |
| v-leave-to     | 节点离开 结束状态             |

官网图片，可能会挂

![Transition Diagram](https://cn.vuejs.org/images/transition.png)

**（二）适用场景**

1. 单个节点
2. 同一时间渲染多个节点中的一个（多个节点的切换，如开关按钮）

如果要同时渲染多个节点呢？如ul列表，使用`<transition-group`

**（三）javascript钩子**

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
 
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

更详细内容见[官网](https://cn.vuejs.org/v2/guide/transitions.html)

**（四）过渡模式**

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

更详细内容见[官网](https://cn.vuejs.org/v2/guide/transitions.html)

### 4-6 transition-group

适用于一次性渲染多个节点，如整个列表

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>transition</title>
    <script src="../dist/vue.js"></script>
    <style>
        .list-complete-item {
            transition: all 1s;
            display: inline-block;
            margin-right: 10px;
        }
        .list-complete-enter, .list-complete-leave-to
            /* .list-complete-leave-active for below version 2.1.8 */ {
            opacity: 0;
            transform: translateY(30px);
        }
        .list-complete-leave-active {
            position: absolute;
        }
    </style>
</head>
<body>
<div id="list-complete-demo" class="demo">
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group name="list-complete" tag="p">
    <span
            v-for="item in items"
            :key="item"
            class="list-complete-item"
    >
      {{ item }}
    </span>
    </transition-group>
</div>
<script>
    new Vue({
        el: '#list-complete-demo',
        data: {
            items: [1,2,3,4,5,6,7,8,9],
            nextNum: 10
        },
        methods: {
            randomIndex: function () {
                return Math.floor(Math.random() * this.items.length)
            },
            add: function () {
                this.items.splice(this.randomIndex(), 0, this.nextNum++)
            },
            remove: function () {
                this.items.splice(this.randomIndex(), 1)
            }
        }
    })
</script>
</body>
</html>
```

看例子吧，理解得不是很深详见[官网](https://cn.vuejs.org/v2/guide/transitions.html)

与`transition`区别：

1. `transition`不生成实际html标签，`transition-group`默认生成 **span标签**，设置`tag`属性可修改
2. `<transition-group>` 的子节点必须有 **独立的 key**

###  5-1 对不同构建版本的解释

```javascript
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
```

控制台报错，内容如下

```javascript
vue.runtime.esm.js:620
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
(found in <Root>)
 
/*
     翻译：
     [vue 警告]：您使用的是vue的仅运行时版本，模板编译器不可用。或者将模板预编译为render函数，或者使用包含编译器的版本。
*/
```

这是因为`vue`默认加载的是生产环境版本`vue-runtime.esm.js`

`esm`表示`ecmascript module`，因为我用的是`es6`的`import`语法，如果用`nodejs`的`require()`，我猜加载的版本是`vue-runtime.common.js`（我没测试~~）

```javascript
import vue from 'vue'
```

如果要使用`template`选项，必须使用带编译器版本

修改webpack配置文件，添加别名指定版本

```javascript
// webpack.config.js
 
module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
```

| &nbsp;                        | UMD                | CommonJS              | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) |
| ----------------------------- | ------------------ | --------------------- | ---------------------------- | -------------------------- |
| **完整版**                    | vue.js             | vue.common.js         | vue.esm.js                   | vue.esm.browser.js         |
| **只包含运行时版**            | vue.runtime.js     | vue.runtime.common.js | vue.runtime.esm.js           | -                          |
| **完整版 (生产环境)**         | vue.min.js         | -                     | -                            | vue.esm.browser.min.js     |
| **只包含运行时版 (生产环境)** | vue.runtime.min.js | -                     | -                            | -                          |

更多详情见[官网](https://cn.vuejs.org/v2/guide/installation.html#对不同构建版本的解释)

 