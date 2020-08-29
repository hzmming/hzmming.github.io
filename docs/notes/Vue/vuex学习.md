---
title: vuex学习
date: 2018-07-18
tags:
  - Vue
  - vuex
categories:
  - Vue
---

（可运行vuex-demo配合学习）

#### 第一节：快速使用

\1. 安装vuex

 

```shell
npm install vuex --save
```

\2. （在src/vuex/下）新建store.js文件，引入vue、vuex

 

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
```

\3. 使用vuex

 

```javascript
Vue.use(Vuex);
```

\4. 编写store.js文件如下

 

```javascript
const state={
    // 所有共享状态值就定义在这个state对象里！！！
    count:1
}
export default new Vuex.Store({
    // 所需Key值就是state！！！
    state
})
```

\5. 导入store.js并使用它

  a. 在vue实例中引用store对象，key值就是 store

  b. 在模板中使用 $store 来引用状态数据

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
    </div>
</template>
<script>
    //@是vue-cli提供的src全路径别名，我store路径为src/vuex/store.js
    import store from '@/vuex/store'
    export default{
        data(){
            return{
            }
        },
        store
    }
</script>
```

\6. 修改state

  a. 不直接通过 $store.state.count 来修改，而是 在store.js里定义 mutations 供外部触发

 

```javascript
// store.js
const mutations={
    // 传入参数就是 state
    add(state){
        state.count++;
    }
}
```

  b. 外部触发 mutations

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
        <button @click="$store.commit('add')">+</button>
    </div>
</template>
```

#### 第二节：访问状态对象

\1. 模板直接通过$state访问

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
    </div>
</template>
```

\2. computed计算属性赋值

 

```vue
<template>
    <div>
        <h3>{{count0}}</h3>
    </div>
</template>
<script>
    export default {
        computed: {
            count0() {
                return this.$store.state.count;
            }
        }
    }
</script>
```

\3. mapState

  a. 改名字的情况

 

```vue
<template>
    <div>
        <h3>{{count1}} - {{count2}}</h3>
    </div>
</template>
<script>
    // es6对象解构
    import {mapState} from 'vuex'
    export default {
        computed: mapState({
            // 1. count1则为别名，value为回调方法，传入参数则为state
            count1: state => state.count,
            // 2. 上面回调方法无非就是写个return state.xxx，直接省略，写个字符串'count'默认则为state.count
            count2: 'count'
      })
    }
</script>
```

  b. 不改名字的情况

 

```vue
<template>
    <div>
        <h3>{{count}}</h3>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        computed: mapState([
            // 若不改名字，直接给数组最简单；映射this.count 为 store.state.count
            'count'
        ])
    }
</script>
```

  c. 想用mapState又想保留原先的计算属性呢？

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}} - {{count}} - {{count0}} - {{count1}} - {{count2}}</h3>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
          count0() {
            return this.$store.state.count;
          },
          // 使用对象展开运算符来与局部计算属性混合
          ...mapState({
            count1: state => state.count,
            count2: 'count'
          }),
          ...mapState([
            // 若不改名字，直接给数组最简单；映射this.count 为 store.state.count
            'count'
          ])
        }
    }
</script>
```

#### 第三节：Mutations同步修改状态

\1. 在store.js上定义mutations，并在外部使用

 

```javascript
// store.js文件
const mutations={
    // 传入参数就是 state
    add(state){
        state.count++;
    }
}
```

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
        <button @click="$store.commit('add')">+</button>
    </div>
</template>
```

\2. 支持传递参数（往往使用对象包裹所需参数）

 

```javascript
// store.js文件
const mutations={
    // 传入参数就是 state
    add(state, n){
        state.count = state.count + n;
    }
}
```

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
        <!-- 传参 -->
        <button @click="$store.commit('add', 5)">+</button>
    </div>
</template>
```

\3. methods及对象提交commit

 

```vue
<template>
    <div>
        <h3>{{$store.state.count}}</h3>
        <button @click="$store.commit('reduce')">-</button>
        <button @click="reduce">-</button>
    </div>
</template>
<script>
    export default {
        methods() {
            reduce() {
                this.$store.commit('reduce');
                // 也可用对象形式提交，需注意，接收参数变为一整个对象！！！即 {type: 'reduce', n: 5}
                this.$store.commit({
                    type: 'reduce',
                    n: 5
                });
            }    
        }
    }
</script>
```

\4. mapMutations

  a. 若不改变名字，传递数组

 

```javascript
import {mapMutations} from 'vuex'
export default {
    methods() {
        ...mapMutations([
            'reduce'
        ])   
    }
}
```

  b. 若改变名字，传递对象

 

```javascript
import {mapMutations} from 'vuex'
export default {
    methods() {
        ...mapMutations({
            // 使用别名
            reduce1: 'reduce'
      })   
    }
}
```

  c. mapMutations支持传递参数，默认传递鼠标事件

 

```vue
<template>
    <!-- 传递参数为5 -->
    <button @click="reduce(5)">-</button>
    <!-- 传递参数为MouseEvent -->
    <button @click="reduce">-</button>
</template>
<script>
    import {mapMutations} from 'vuex'
    export default {
        methods() {
            ...mapMutations([
                'reduce'
            ])   
        }
    }
</script>
```

#### 第四节：getters统一加工

假设：我们的数据仓库store存放着 “待办事项” 数组，

目的：如果有多个地方要获取 “剩余待办事项的个数”（此处为简单假设，实际项目中往往更复杂），

方案：我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

getter就为你提供了统一加工的地方（就像vue实例的computed计算属性），返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

\1. 修改store.js，添加getter

 

```javascript
const state = {
  count: 1
};
const getters = {
  // 回调方法传入参数为 state 对象
  countWithUnit: state => state.count + '个',
  // 定义成方法，支持传参
  countWithUnitFn: state => unit => state.count + unit
};
export default new Vuex.Store({
  state,
  mutations,
  // 所需key值就是getters  
  getters
})
```

\2. 模板中获取getters值

 

```vue
<template>
    <div>{{$store.getters.countWithUnit}}></div>
    <div>{{$store.getters.countWithUnitFn('元')}}</div>
</template>
```

\3. computed获取getter值

 

```vue
<template>
    <div>{{countWithUnit}}></div>
    <div>{{countWithUnitFn('元')}}</div>
</template>
<script>
    export default {
        computed: {
            // 使用起来简单，又可以改名字
            countWithUnit() {
                return this.$store.getters.countWithUnit;
            },
            countWithUnitFn() {
                return this.$store.getters.countWithUnitFn;
            }
        }
    }
</script>
```

\4. mapGetters

 

```vue
<template>
    <div>{{countWithUnit2}}></div>
    <div>{{countWithUnitFn('元')}}</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            // 改名字，传对象
            ...mapGetters({
                countWithUnit2: 'countWithUnit'
            }),
            // 不改名字，传数组
            ...mapGetters([
                'countWithUnitFn'
            ])
        }
    }
</script>
```

#### 第五节：actions异步修改状态

\1. actions 类似于 mutations，不同的是

  a. action不直接变更状态，而是通过提交mutation

  b. action可以包含异步操作

  （其实就是个异步操作罢了，官方起了个名字action而已）

\2. 注册 actions，修改 store.js 如下

 

```javascript
const state = {
  count: 1
};
const mutations = {
  add(state) {
      state.count++;
  },
  reduce(state) {
      state.count--;
  }
};
const actions = {
  addAsync: context => {
    setTimeout(() => context.commit('add'), 3000)
  },
  // ({commit})，使用了es6的对象解构(此时括号不能省略)
  reduceAsync: ({commit}) => {
    setTimeout(() => commit('reduce'), 3000)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  // 所需key值就是actions
  actions
})
```

\2. 模板中调用action

 

```vue
<template>
    <div>
        <button @click="$store.dispatch('addAsync')">异步+</button>
    </div>
</template>
```

\3. methods调用action

 

```vue
<template>
    <div>
        <button @click="$store.dispatch('addAsync')">异步+</button>
        <button @click="addAsync">异步+</button>
    </div>
</template>
<script>
    export default {
        methods() {
            addAsync() {
                this.$store.dispatch('addAsync');
            }  
        }
    }
</script>
```

\4. mapActions

 

```vue
<template>
    <div>
        <button @click="reduceAsync">异步-</button>
        <button @click="reduceAsync2">异步-</button>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        methods() {
            // 若不改名字，传递数组
            ...mapActions([
                'reduceAsync'
            ]),
            // 若改名字，传递对象
            ...mapActions({
                reduceAsync2: 'reduceAsync'
            })  
        }
    }
</script>
```

\5. 多个异步action结合

 

```javascript
// store.js 文件
const actions = {
    addAsync: context => {
        setTimeout(() => context.commit('add'), 3000)
    },
    reduceAsync: ({commit}) => {
        setTimeout(() => commit('reduce'), 3000)
    },
    // 和上面 addAsync 唯一的区别就在于返回了Promise！！！！！！！！！！！！！
    addPromise: context => {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                context.commit('add');
                // commit之后记得解决掉该Promise
                resolve();
            }, 3000)
        }))
    },
    // 异步action结合调用！！！！！！！！！！！！！！！！！！！！！！！！！！
    // 作用是：先加后减
    mixAction: ({dispatch}) => {
        dispatch('addPromise').then(() => {
            // addPromise这个action一定要返回Promise，否则出问题！！！！！！
            dispatch('reduceAsync');
        });
    }
}
```

#### 第六节：module模块组

\1. 很复杂的样子。。。要不先这样吧，遇到了再学 （https://vuex.vuejs.org/zh/guide/modules.html）