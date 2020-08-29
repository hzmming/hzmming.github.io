---
title: nuxt学习
date: 2018-07-21
tags:
  - Vue
  - nuxt
categories:
  - Vue
---

#### 第01节 安装及Hello World

1. 安装vue-cli

   ```bash
   npm install vue-cli -g
   ```

2. 使用vue安装nuxt

   ```bash
   vue init nuxt/starter
   ```

3. 安装依赖

   ```bash
   npm install
   ```

4. 启动服务

   ```bash
   npm run dev
   ```

5. 浏览器访问 localhost:3000

6. 显示HelloWorld

   找到 /pages/index.vue 文件，自行修改

#### 第02节 Nuxt目录结构

```javascript
|-- .nuxt                            // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                           // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components                       // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
|-- layouts                          // 布局目录，用于组织应用的布局组件，不可更改。
|-- middleware                       // 用于存放中间件
|-- pages                            // 用于存放写的页面，我们主要的工作区域
|-- plugins                          // 用于存放JavaScript插件的地方
|-- static                           // 用于存放静态资源文件，比如图片
|-- store                            // 用于组织应用的Vuex 状态管理。
|-- .editorconfig                    // 开发工具格式配置
|-- .eslintrc.js                     // ESLint的配置文件，用于检查代码格式
|-- .gitignore                       // 配置git不上传的文件
|-- nuxt.config.json                 // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json                     // npm包管理配置文件
```

#### 第03节 常用配置项

*更多配置信息查看官网*

*https://zh.nuxtjs.org/guide/configuration*

*https://zh.nuxtjs.org/faq*

1. 如何使用外部资源

   全局配置

   ```javascript
   // 在 nuxt.config.js 中配置你想引用的资源文件：
   module.exports = {
     head: {
       script: [
         { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
       ],
       link: [
         { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
       ]
     }
   }
   ```

   局部配置

   ```html
   <!-- pages 目录下对应 .vue文件中引用外部资源 -->
    
   <template>
     <h1>使用 jQuery 和 Roboto 字体的关于页</h1>
   </template>
    
   <script>
   export default {
     head: {
       script: [
         { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
       ],
       link: [
         { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
       ]
     }
   }
   </script>
   ```

2. 配置全局CSS

   ```javascript
   // 在 nuxt.config.js 中添加 CSS 资源
   module.exports = {
     css: [
       // 加载一个 node.js 模块
       'hover.css/css/hover-min.css',
       // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
       { src: 'bulma', lang: 'sass' },
       // 项目中的 CSS 文件（~assets为别名，帮助我们映射全路径）
       '~assets/css/main.css',
       // 项目中的 Sass 文件
       { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
     ]
   }
   ```

3. 修改主机和端口号

   通过环境变量

   ```javascript
   // package.json文件
   "scripts": {
       "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
   }
   ```

   通过在 `package.json` 中进行配置：

   ```javascript
   "config": {
   "nuxt": {
     "host": "0.0.0.0",
     "port": "3333"
   }
   },
   "scripts": {
   "dev": "nuxt"
   }
   ```

4. 配置wepack

   ```javascript
   // 在nuxt.config.js文件的build选项里进行配置
   build: {
        // 直接添加webpack配置
       loaders:[
         {
           test:/\.(png|jpe?g|gif|svg)$/,
           loader:"url-loader",
           query:{
             limit:10000,
             name:'img/[name].[hash].[ext]'
           }
         }
       ],
    
       ......
     }
   ```

#### 第04节 页面跳转及参数传递

1. 新建 pages/about/index.vue 文件，内容如下

```html
<template>
  <div>
    {{$route.params.hello}}
  </div>
</template>
```

2. 修改首页pages/index.vue文件

```html
<template>
  <div>
    <nuxt-link :to="{name: 'about', params: {hello: 'world'}}">About</nuxt-link>
  </div>
</template>
```

`nuxt-link`用法和`router-link`一样

#### 第05节 基础路由

Nuxt.js 依据 `pages` 目录结构自动生成 vue-router 模块的路由配置。

1. 一级文件

```bash
pages/
--| index.vue
--| hello.vue
```

自动生成的路由配置如下：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'hello',
      path: '/hello',
      component: 'pages/hello.vue'
    }
  ]
}
```

2. 二级文件（带目录）

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| student/
-----| one.vue
--| index.vue
```

自动生成的路由配置如下：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    // 1. user默认对应其文件夹下的index.vue文件
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    // 2. 目录下的除index.vue的其它文件，均采用短横拼接
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    },
    // 3. 目录下没有index.vue文件，但有其它文件，只生成其它文件对应路由配置
    {
      name: 'student-one',
      path: '/student/one?',
      component: 'pages/student/one.vue'
    }
  ]
}
```

#### 第06节 动态路由

1. 文件动态

```bash
pages/
--| users/
-----| _id.vue
--| index.vue
```

生成对应的路由配置表为：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

2. 目录动态

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| index.vue
```

生成对应的路由配置表为：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

#### 第07节 嵌套路由

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

自动生成的路由配置如下

```javascript
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

**parents/users.vue 父文件模板里 记得用`<nuxt-child/> `***（相当于`<router-view>`）*

#### 第08节 参数校验

使用`validate`方法，若返回`falsy`，访问该页面返回404

```html
<template>
    <div>
      id为：{{$route.params.id}}
    </div>
</template>
 
<script>
  export default {
    // 使用es6对象解构，可以猜出完整参数对象应该是$route
    validate ({ params }) {
      // 必须是数字
      return /^\d+$/.test(params.id)
    }
  }
</script>
 
<style scoped>
 
</style>
 
```

#### 第09节 过渡动效

Nuxt.js 使用 Vue.js 的&lt;transition&gt;组件来实现路由切换时的过渡动效。

1. 全局路由动效

   建立样式文件 /assets/css/main.css，内容如下

   ```css
   /*
       ??-enter-active、??-leave-active 和 Vue.js的<transition>动画是一样的
       ??为page，表示应用所有页面路由切换
   */
   .page-enter-active, .page-leave-active {
     transition: opacity 2s;
   }
   .page-enter, .page-leave-active {
     opacity: 0;
   }
   ```

   在nuxt.config.js里引入该全局的css文件

   ```javascript
   {
       css:['assets/css/main.css']
   }
   ```

2. 单独页面动效

   在相应的页面.vue文件编写即可

   ```html
   <script>
       export default {
           // 定义该页面所用的“过渡动效名称”
           transition: 'about'
       }
   </script>
    
   <style scoped>
     /*
       ??-enter-active、??-leave-active，??相应的变成about
     */
     .about-enter-active, .about-leave-active {
       transition: all 2s;
     }
     .about-enter, .about-leave-active {
       opacity: 0;
       font-size: 40px;
     }
   </style>
   ```

#### 第10节 视图

*更多内容查看官网 https://zh.nuxtjs.org/guide/views*

1. 默认模板

   定制化默认的 html 模板，在应用根目录下创建一个 `app.html` 的文件

   ```html
   <!DOCTYPE html>
   <html {{ HTML_ATTRS }}>
     <head>
       {{ HEAD }}
     </head>
     <body {{ BODY_ATTRS }}>
       {{ APP }}
     </body>
   </html>
   ```

   > 修改默认模板记得重启服务

2. 默认布局

   修改 `layouts/default.vue` 文件来扩展应用的默认布局。

   ```html
   <template>
     <nuxt/>
   </template>
   ```

   > `<nuxt/>` 相当于`<router-view>`加载内容区域的，必须有

3. 个性化布局

   部分页面使用特定的页面布局

   在`layouts/`目录下创建布局文件，如 other.vue

   ```html
   <template>
     <div>
       <div>这里是other布局</div>
       <nuxt/>
     </div>
   </template>
   ```

   为页面单独指定布局，比如 pages/user.vue

   ```html
   <script>
       export default {
           layout: 'other'
       }   
   </script>
   ```

4. 错误页面

   通过编辑 `layouts/error.vue` 文件来定制化错误页面

   ```html
   <template>
       <div>
         <div v-if="error.statusCode === 404">页面不存在</div>
         <div v-else>服务器错误</div>
       </div>
   </template>
    
   <script>
       export default {
           props: [
             // 使用props属性，将error参数传进来！！！！！！！！
             'error'
           ]
       }
   </script>
    
   <style scoped>
    
   </style>
    
   ```

5. 个性head

   `nuxt.config.js`配置了全局的head信息，但是如果我们想单独为某个页面配置呢？比如页面的`title`为每篇文章自己的标题，以及`meta`标签便于SEO搜索等

   以 pages/user/_id.vue 页面为例

   ```html
   <script>
       export default {
           // 很明显是nuxt规定的名字
           head() {
               // 这里的配置其实和nuxt.config.js是一样的了
               return {
                   title: this.$route.params.title,
                   meta: [
                       { hid: 'description', name: 'description', content: 'hello world' }
                   ]
               }
           }
       }
   </script>
   ```

   > 配置`meta`时，建议`hid`值保持一致以达到覆盖效果，不然会存在多个

#### 第11节 异步数据

1. vue.js建议使用axios进行交互，所以安装axios.js

   ```bash
   npm i axios --save
   ```

   > 使用 --save 是因为 axios 将运用在生产环境上

2. 组件内定义`asyncData`方法，并返回`部分data对象`

   示例 asyncData.vue 页面如下

   ```html
   <template>
     <div>
       <!-- title这个值来源于异步请求 --> 
       {{title}}
     </div>
   </template>
    
   <script>
     // 需安装vue.js建议用的axios，并引入
     import axios from 'axios'
    
     export default {
       data() {
         return {}
       },
       // params 来源于 route.params
       asyncData({params}) {
         // 这网址我瞎编的
         axios.get(`https://example.com/userInfo/${params.id}`) // 使用了es6的``反引号字符串
           .then(res => {
             /*
               返回对象将与data对象进行融合，返回给当前组件使用
               为什么不直接在data里定义title使用this访问，要搞这么特殊呢？？因为
               该方法是在组件文件之前执行，所以this还不能使用！！！！
             */
             return {
               title: res.data.title
             }
           })
       }
     }
   </script>
    
   ```

   > 切记，`asyncData`方法 是在 组件生成之前 执行的，所以其内部无法取到`this`

3. 使用 async 或 await 更优雅

   ```html
   <template>
       <div>
           <!-- title这个值来源于异步请求 --> 
           {{title}}
       </div>
   </template>
    
   <script>
       // 需安装vue.js建议用的axios，并引入
       import axios from 'axios'
    
       export default {
           data() {
               return {}
           },
           async asyncData({params}) {
               let res = await axios.get(`https://example.com/userInfo/${params.id}`);
               return {
                   title: res.data.title
               };
           }
       }
   </script>
   ```

#### 第12节 静态资源

1. 图片资源官方推荐放至`static`目录下

   将 money.png 放至如下

   ```bash
   pages/
   --| index.vue
   static/
   --| money.png
   ```

 

2. 以`pages/index.vue`为例

   ```html
   <template>
    
       <!-- 放到static目录下就可以直接使用绝对路径 -->  
       <img src="/money.png"><br>
    
       <!-- 使用相对路径，页面文件层级深就不好用 -->
       <img src="../static/money.png"><br>
    
       <!-- 官方提供 ~ 表示项目根路径 -->
       <img src="~/static/money.png"><br>
    
       <!-- ~static 官方提供的static目录路径 -->
       <img src="~static/money.png"><br>
    
   </template>
   ```


#### 第13节 打包

*更详细查看官方网站 https://zh.nuxtjs.org/guide/commands*

| 命令             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| npm run dev      | 启动一个热加载的Web服务器（开发模式） [localhost:3000](http://localhost:3000/)。 |
| npm run build    | 利用webpack编译应用，压缩JS和CSS资源（发布用）。             |
| npm start        | 以生成模式启动一个Web服务器 (`nuxt build` 会先被执行)。      |
| npm run generate | 编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。 |

*不是很懂 npm run build 和 npm run generate 的区别*