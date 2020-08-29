---
title: vue模板限制可用全局变量
date: 2019-09-28
tags:
  - Vue
categories:
  - Vue
---

有这样一个简单demo如下

```html
<div id="app">
    {{hello}}
    {{Math.PI}}
</div>
<script>
    window.hello = 'world'
    new Vue({
        el: '#app'
    })
</script>
```

渲染结果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190928150613.png)

`{{hello}}`并没有渲染，且控制台报错

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190928150723.png)

根据提示了解到，`hello`这个属性并没有在`vue实例`上定义，所以报错

那么问题来了，**vue是如何做到浏览器原生全局属性Math.PI识别，而用户自定义的全局属性就不起作用呢？**

超简略地说下，vue源码有如下方法

```javascript
updateComponent = function () {
    vm._update(vm._render(), hydrating);
};
```

```javascript
Vue.prototype._render = function () {
    // ...
    vnode = render.call(vm._renderProxy, vm.$createElement);
    // ...
}
```

此处的`render`，也就是我们的模板编译成的js方法，如下

```javascript
(function anonymous(
) {
    with(this){return _c('div',{attrs:{"id":"app"}},[_v("\n        "+_s(hello)+"\n        "+_s(Math.PI)+"\n    ")])}
})
```

使用`call`绑定`this`上下文，而`vm._renderProxy`来源如下

```javascript
initProxy(vm)
initProxy = function initProxy (vm) {
    if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
    } else {
        vm._renderProxy = vm;
    }
}
var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
);
var hasHandler = {
    has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) ||
            (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
        if (!has && !isAllowed) {
            if (key in target.$data) { warnReservedPrefix(target, key); }
            else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
    }
};
```

到这里就清楚了，`allowedGlobals`定义了可用的全局变量，通过`Proxy`定义属性拦截器

那如果浏览器不支持`Proxy`呢？

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20190928152944.png)

```html
<html>
    <head>
        <script>
            // 模拟不支持Proxy的浏览器（其实就是IE啦）
            window.Proxy = undefined
        </script>
        <script src="vue.js"></script>
    </head>
    <div id="app">
        {{hello}}
        {{Math.PI}}
    </div>
    <script>
        window.hello = 'world'
        new Vue({
            el: '#app'
        })
    </script>
</html>
```

![1569656020138](/home/loryhuang/.config/Typora/typora-user-images/1569656020138.png)

如果浏览器不支持`Proxy`，那就做不到拦截了，用户自定义的全局变量也被渲染出来了

> 小疑惑，那如果使用Object.defineProperty呢？这样不也行么？

