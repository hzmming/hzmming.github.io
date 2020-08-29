---
title: vue-router学习
date: 2018-07-15
tags:
  - Vue
  - vue-router
categories:
  - Vue
---

### 一. 基本

 

```vue
<div id="app">
    <h1>Basic</h1>
    <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
    </ul>
    <router-view class="view"></router-view>
</div>
```

 

```javascript
    const Home = {template: `<div>home</div>`};
    const Foo = {template: `<div>foo</div>`};
    const Bar = {template: `<div>bar</div>`};
    // 定义路径及其对应组件（其实就一个template模板属性，但在Vue的世界里一切皆组件）
    const routes = [
        { path: '/', component: Home},
        { path: '/foo', component: Foo},
        { path: '/bar', component: Bar}
    ];
    // 创建路由对象
    const router = new VueRouter({
        routes  // 注意属性名是“routes”啊，不是“routers”
    });
    new Vue({
        router  // 将路由对象传给 Vue构造器
    }).$mount('#app');
```

### **二. 嵌套路由**

 

```javascript
const routes = [
        { path: '/', redirect: '/parent'},
        { path: '/parent', component: Parent,
            children: [
                // 注意这里用的是“相对路径”，访问路径 需 嵌套父路径，即 /parent/xxx
                { path: '', component: Default},
                { path: 'foo', component: Foo},
                { path: 'bar', component: Bar},
                // 注意这里用的是“绝对路径”，访问路径 无需 嵌套父路径，即 /xxx
                {path: '/baz', component: Baz}
            ]
        }
    ];
```

### **三. 命名路由**

 

```vue
<p>Current route name: {{ $route.name }}</p>
<ul>
    <!-- :为v-bind的缩写，不用绑定传的是字符串，绑定传的是变量（此处为对象）-->
    <li><router-link :to="{ name: 'home' }">home</router-link></li>
    <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
    <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
</ul>
<router-view class="view"></router-view>
```

 

```javascript
const routes = [
        { path: '/', name: 'home', component: Home },
        { path: '/foo', name: 'foo', component: Foo},
        // 这种写法id必须给，不给识别不了，跳转失败
        { path: '/bar/:id', name: 'bar', component: Bar}
    ];
```

### **四. 命名视图**

 

```vue
<div id="app">
    <h1>Named Views</h1>
    <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">/other</router-link></li>
    </ul>
    <router-view class="view one"></router-view>
    <!-- 使用name属性表示对应视图，没写则对应default -->
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
</div>
```

 

```javascript
const routes = [
    {
        // 一个路由下，可以有多个视图（组件）在同一个层级
        path: '/',
        components: {
            default: Foo,
            a: Bar,
            b: Baz
        }
    },
    {
        path: '/other',
        components: {
            default: Baz,
            a: Bar,
            b: Foo
        }
    }
];
```

### **五. 路由匹配**

 

```javascript
const routes = [
        { path: '/' },
        // params 用冒号 ":" 表示（参数写上去就必须传，否则会报错无法跳转，或者像下面加个?表示可选）
        { path: '/params/:foo/:bar' },
        // 添加 "?" 表示 param 可选
        { path: '/optional-params/:foo?' },
        // 添加 "(正则表达式)" 过滤 param
        // 只有在 id为全数字 的情况下，才会匹配此路由（如果你不传id字段，直接跳转失败，如果你传了id，但id不是全数字，那么跳转是成功了，但router-view标签不会渲染
        { path: '/params-with-regex/:id(\\d+)' },
        // "*" 匹配所有（key值为“0”）
        // eg：/asterisk/foo，则 $route.params 为 { "0": "foo"}
        { path: '/asterisk/*' },
        // 使用 “() 和 ?” 表示 path 的部分为可选
        // eg: /optional-group/foo/bar，则 $route.params 为 { "0": "foo/" }
        { path: '/optional-group/(foo/)?bar' }
    ];
```

### **六. 活动链接**

**active-class**

- 类型: `string`

- 默认值: `"router-link-active"`

  设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 `linkActiveClass` 来全局配置。

**[#](https://router.vuejs.org/zh/api/#exact)exact**

- 类型: `boolean`

- 默认值: `false`

  "是否激活" 默认类名的依据是 **inclusive match** (全包含匹配)。 举个例子，如果当前的路径是 `/a` 开头的，那么 `<router-link to="/a">` 也会被设置 CSS 类名。

  按照这个规则，每个路由都会激活`<router-link to="/">`！想要链接使用 "exact 匹配模式"，则使用 `exact` 属性：

  ```vue
  <!-- 这个链接只会在地址为 / 的时候被激活 -->
  <router-link to="/" exact>
  ```

**exact-active-class**

- 类型: `string`

- 默认值: `"router-link-exact-active"`

  配置当链接被精确匹配的时候应该激活的 class。注意默认值也是可以通过路由构造函数选项 `linkExactActiveClass` 进行全局配置的。

### **七. 重定向**

 

```javascript
const routes = [
    { path: '/', component: Home,
     children: [
         { path: '', component: Default },
         { path: 'foo', component: Foo },
         { path: 'bar', component: Bar },
         { path: 'baz', name: 'baz', component: Baz },
         { path: 'with-params/:id', component: WithParams },
         // 兄弟路由重定向，使用相对路径
         { path: 'relative-redirect', redirect: 'foo' }
     ]
    },
    // 绝对路由 重定向
    { path: '/absolute-redirect', redirect: '/bar' },
    // 支持回调函数，参数为目标路由对象
    // 函数必须返回重定向路由(string/object)
    { path: '/dynamic-redirect/:id?',
     redirect: to => {
         const { hash, params, query } = to
         if (query.to === 'foo') {
             return { path: '/foo', query: null }
         }
         if (hash === '#baz') {
             return { name: 'baz', hash: '' }
         }
         if (params.id) {
             return '/with-params/:id'
         } else {
             return '/bar'
         }
     }
    },
    // 指定路由名称 重定向
    { path: '/named-redirect', redirect: { name: 'baz' }},
    // 带参数重定向
    // 注意：参数名要一致才取得到，
    // eg：{ path: '/xx/:hello'，redirect: '/yy/:world' }，原路由只有hello这个参数，重定向路由获取world参数将失败
    { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },
    // 捕获所有路由跳转至“/”（一般放到最后面，将不存在的路由跳转至指定路由）
    { path: '*', redirect: '/' }
];
```

### **八. 路由别名**

 

```javascript
var routes = [
    {
        path: '/home', component: Home,
        children: [
            // “绝对路径”别名
            // eg：用“/foo”代替“/home/foo”
            { path: 'foo', component: Foo, alias: '/foo'},
            // “相对路径”别名
            // eg：用“/home/bar-alias”代替“/home/bar”
            { path: 'bar', component: Bar, alias: 'bar-alias'},
            // “数组”多个别名
            // eg：用“/baz”、“/home/baz-alias”代替“/home/baz”
            { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias']}
        ]
    }
];
```

### **九. 过渡动画**

 

```vue
<!-- 添加transition支持过渡动画 -->
<!-- 默认生成css前缀为“v-”，支持name属性，定义自己的前缀（便于和第三方动画库结合） -->
<!-- mode 好像是表示“先出后进”啊。。。如果去掉mode或改成“in-out”，会看到重叠，自行测试-->
<transition name="fade" mode="out-in">
    <router-view class="view"></router-view>
</transition>
```

### **十. 数据获取**

通过监听路由变化，实现 “导航完成后获取数据”

 

```javascript
watch: {
    '$route': 'fetchData'
},
```

具体见vue-router-demo

### **十一. 导航守卫**

有3种，全局守卫、路由守卫、组件守卫

**完整的导航解析流程**

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。
13. 

更详情运行vue-router-demo及查看官方文档（https://router.vuejs.org/zh/guide/advanced/navigation-guards.html）

 

```javascript
var routes = [
    { path: '/', component: Home },
    // “路由守卫”
    { path: '/foo', component: Foo, beforeEnter: guardRoute },
    // meta 路由元信息
    { path: '/bar', component: Bar, meta: { needGuard: true }},
    // Baz 实现了 “组件守卫” beforeRouteLeave钩子
    { path: '/baz', component: Baz },
    // Qux 实现了 “组件守卫” beforeRouteEnter钩子
    { path: '/qux', component: Qux },
    // 为 异步组件 实现 “组件守卫” beforeRouteEnter钩子
    {
        path: '/qux-async', component: resolve => {
            // setTimeout模拟异步
            setTimeout(() => {
                resolve(Qux);
            }, 0)
        }
    }
];
var router = new VueRouter({
    routes
});
// 注册一个 “全局守卫”
router.beforeEach((route, from, next) => {
    if (route.matched.some(m => m.meta.needGuard)) {
        guardRoute(route, from, next)
    } else {
        next()
    }
})
```

### **十二. 滚动行为**

 

```vue
<div id="app">
    <h1>Scroll Behavior</h1>
    <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
    </ul>
    <router-view class="view"></router-view>
</div>
```

 

```javascript
// 注意: 这个功能只在支持 history.pushState 的浏览器中可用
// scrollBehavior 该属性 默认为 无滚动行为（将该属性去掉，访问本例子中的'/bar#anchor'，就会发现 无滚动）
// 返回 “falsy”，或者是一个空对象，不会发生滚动（滚动轴在哪就在哪，可能在页面中间了）
var scrollBehavior = (to, from, savedPosition) => {
    // 只有在按下 后退/前进 按钮时，savedPosition才有值，直接返回，保留浏览器的原生表现
    if(savedPosition){
        return savedPosition;
    }else{
        const position = {};
        // 比如路由为 '/bar#anchor'，则此时 to.hash 值为 '#anchor'
        if(to.hash){
            // selector 属性表示“锚点”，值为　“#某个dom的id”
            position.selector = to.hash;
        }
        // 感觉 scrollToTop 这属性名是可以随便改的啊。。。只要和 routes 定义时保持一致就行，不是么？？
        if(to.matched.some(m => m.meta.scrollToTop)){
            // x、y 指定滚动轴位置（很明显是指滚动轴的顶端坐标为x,y）
            position.x = 0;
            position.y = 0;
        }
        /*
                position: {
                    selector: String
                    x: Integer
                    y: Integer
                }
                若同时指定 selector和(x,y)，selector优先级比较高
            */
        return position;
    }
};
var routes = [
    { path: '/', component: Home, meta: { scrollToTop: true } },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar, meta: { scrollToTop: true }}
];
var router = new VueRouter({
    scrollBehavior,
    routes
});
```

### **十三. 懒加载**

[官网](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#路由懒加载)主要是和 webpack 进行结合介绍

 

```javascript
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

\1. webpack 以 import动态加载 作为代码分割点

\2. vue 的 component组件本身就支持异步 Promise

下面这种写法也是可以的，效果一样，就是多写了点代码（可能是早期版本的vue吧）

 

```javascript
const Foo = (resolve) => {
    import('./Foo.vue').then((module) => {
        resolve(module);
    })
}
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

### **十四. 认证流程**

一个很完整的demo，运行vue-router-demo例子查看

### **十五. 路由name获取url**

 

```javascript
const { href } = this.$router.resolve({
    name: "envConfig"
});
window.open(href);
```