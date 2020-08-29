---
title: v-model
date: 2019-05-05
tags:
  - Vue
categories:
  - Vue
---


#### 基本使用

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部使用不同的属性为不同的输入元素并抛出不同的事件：

- text 和 textarea 元素使用 `value` 属性和 `input` 事件；
- checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

> 对于需要使用[输入法](https://zh.wikipedia.org/wiki/输入法) (如中文、日文、韩文等) 的语言，你会发现 `v-model` 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 `input` 事件。

 

#### 原理

**首先**，父组件通过`props`传递给子组件的参数，使用的是`浅拷贝`（我猜的），所以在子组件里直接修改prop值，是无法修改到父组件的值

子组件修改父组件的方法：父组件`$on`监听，子组件`$emit`发布消息触发

详情参考[属性修饰符.sync.md](wiz://open_document?guid=f45a1f30-94d7-4380-b032-4cdd537daf72&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)

 

`v-model`其实就是个语法糖，本质上是子组件某个事件（如 input）发生变化后，`$emit`发送消息，父组件`$on`接受消息回调，并修改父亲的值

 

#### 源码

```javascript
function model ( el,dir,_warn){
    if (el.component) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false
    } else if (tag === 'select') {
        genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false
    } else {
        // ...
    }
 
    // ensure runtime directive metadata
    return true
}
```

 

#### 自定义组件的`v-model`

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的**`消息`**

```javascript
// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'；
 
    // ...
}
```

如果自己封装个`input`组件，可以这样

```html
<div id="app">
    <base-input v-model="text"></base-input>
</div>
<script>
    Vue.component('base-input',{
        props: {
            value: String
        },
        template: '<input type="text" :value="value" @input="$emit('input',$event.target.value)"/>'
    })
    new Vue({
        el: '#app',
        data: {text: 'hello world'}
    })
</script>
```

 

使用`model`属性，可以自定义`prop`属性和`消息名`

```html
<div id="app">
    <base-input v-model="text"></base-input>
</div>
<script>
    Vue.component('base-input',{
        model: {
            prop: 'text',    // 改用text字段
            event: 'hzmMessage'    // 自定义消息名
        },
        props: {
            text: String
        },
        template: '<input type="text" :value="text" @input="$emit('hzmMessage',$event.target.value)"/>'
    })
    new Vue({
        el: '#app',
        data: {text: 'hello world'}
    })
</script>
```

####   v-for与v-model

看这个例子

```html
<div id="app">
    <template v-for="(item,index) in list">
        <input v-model="item" placeholder="测试"/>
    </template>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            list: [
                'ddf'
            ]
        }
    })
</script>
```

控制台报错

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/微信图片_20191228134902.png)

正如提示所说的，`v-model`不能绑定`v-for`循环出来的变量

可以使用如下方式解决

```html
<div id="app">
    <template v-for="(item,index) in list">
        <input v-model="list[index]" placeholder="测试"/>
    </template>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            list: [
                'ddf'
            ]
        }
    })
</script>
```

