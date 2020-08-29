---
title: webpack学习
date: 2018-07-14
tags:
  - 前端
categories:
  - 前端
---


#### 一. 起步

##### 1. 基本

本地安装`webpack`、`webpack-cli`（webpack-cli用于在命令行运行webpack）

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

创建如下项目结构

```
  webpack-demo
  |- package.json
  |- index.html
  |- /src
    |- index.js
```

> 传统的`<script>`标签引入依赖文件管理JavaScript项目存在以下问题
>
> * `<script>`标签存在隐式依赖先后顺序（即谁先谁后还有个讲究）
> * `<script>`标签引入的全局变量，若该全局变量不存在则依赖页面执行出错
> * `<script>`引入了没被使用的脚本，浏览器下载无用代码

以 `lodash`为例，安装并在`src/index.js`中引入

```bash
npm install lodash --save
```

*使用 --save 是因为 lodash 将用于生产环境*

```javascript
// src/index.js
import _ from 'lodash'
```

*作为测试引用 lodash 即可，无需编写多余代码*

执行 `npx webpack `（Node 8.2+提供的 npx 命令，用于取代 ./node_modules/.bin/webpack 路径调用）

得到文件 `dist/main.js`

```bash
  webpack-demo
  |- package.json
  |- index.html
+ |- /dist
+   |- main.js
  |- /src
    |- index.js
```

`webpack`默认入口文件为`src/index.js`，默认输出路径为`dist/`，默认输出`bundle`名称为`main`

##### 2. 配置文件

还可以使用**配置文件**

```bash
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- index.html
  |- /src
    |- index.js
```

`webpack.config.js`内容如下

```javascript
const path = require('path');
 
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};
```

* `entry`：定义入口文件，使用`相对路径`

  > *基本路径为`package.json`所在位置【项目根路径】，而不是`webpack.config.js`*

* `filename`：定义输出文件名【bundle名】

* `__dirname`：当前文件所在目录全路径

  > *此处，当前文件是`webpack.config.js`，所在目录为根目录，所以`__dirname`刚好是根目录*

* `path`：定义输出文件夹，需要`全路径`

  > *`path.resolve` 这方法好处支持文件夹运算，如 path.resolve(__dirname, '../../dist')等等*

执行命令

```bash
npx webpack --config webpack.config.js
```

> 如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。这里使用 `--config` 选项只是表明，可以传递任何名称的配置文件。

得到如下结果

```bash
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- index.html
+ |- /dist
+   |- bundle.js
  |- /src
    |- index.js
```

##### 3. NPM脚本

修改`package.json`的`scripts`字段

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.16.1",
    "webpack-cli": "^3.1.0"
  },
  "dependencies": {
    "lodash": "^4.17.10"
  }
}
 
```

*此处 --config 同样只是示意而已，webpack默认执行根路径下的 webpack.config.js 配置文件*

执行 NPM 脚本得到相同结果

```bash
npm run build
```

> scripts脚本执行方式
>
> 正常脚本均使用 `npm run xxx` 方式执行，如 npm run dev、npm run build 之类的
>
> 特殊脚本：`npm start`和`npm test`。当然，你还是可以 `npm run start`

#### 二. 管理资源

##### 1. 加载css

安装相应`loader`

```bash
npm install --save-dev style-loader css-loader
```

修改`webpack.config.js`添加规则

```javascript
  const path = require('path');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

> webpack 一条规则内执行多个 loader 的顺序是 从右到左
>
> css-loader 放右边先执行，因为它的作用是解析css文件，而style-loader作用是将css-loader解析后的css代码append至head标签里

##### 2. 加载图片

如果 css 里用到图片怎么办？

```css
  .hello {
    color: red;
    background: url('./icon.png');
  }
```

css-loader 只是处理css代码的，对于图片需要使用 `file-loader`结合处理

安装 file-loader

```bash
npm install --save-dev file-loader
```

修改`webpack.config.js`添加规则

```javascript
  const path = require('path');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

我们不用担心编译后图片的路径以及名称发生变化，造成样式找不到图片，因为

样式中 url 所指的图片路径，会被自动处理为 最终输出路径+输出图片名称

而且有了 file-loader， 在javascript代码中，可以这样操作图片

```javascript
  import Icon from './icon.png';
 
  function component() {
    var element = document.createElement('div');
 
+   // 将图像添加到我们现有的 div。
+   var myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);
 
    return element;
  }
 
  document.body.appendChild(component());
```

##### 3. 加载字体

css文件中的字体怎么办

```css
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }
 
  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

`css-loader`还是需要和 `file-loader`配合

修改`webpack.config.js`添加规则

```javascript
  const path = require('path');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

css 中使用的字体路径同样会被处理为 “最终输出路径 + 最终输出名称”

##### 4. 加载数据

`webpack`默认支持`json`文件的加载，即无需做任何配置便可加载json文件

```javascript
import Data from './data.json'
```

如果要导入 `CSV`、 `TSV`、`XML`呢？？

安装相应loader

```bash
npm install --save-dev csv-loader xml-loader
```

修改`webpack.config.js`添加规则

```javascript
  const path = require('path');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

现在就支持了

```js
import Data from './data.xml'
```

> 在使用 d3 等工具来实现某些数据可视化时，预加载数据会非常有用。我们可以不用再发送 ajax 请求，然后于运行时解析数据，而是在构建过程中将其提前载入并打包到模块中，以便浏览器加载模块后，可以立即从模块中解析数据。

#### 三. 管理输出

##### 1. 动态生成 index.html

安装`html-webpack-plugin`插件

```bash
npm install --save-dev html-webpack-plugin
```

修改`webpack.config.js`

```javascript
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
 
  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

自动生成`dist/index.html`文件如下

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Output Management</title>
  </head>
  <body>
  <script type="text/javascript" src="app.bundle.js"></script><script type="text/javascript" src="print.bundle.js"></script></body>
</html>
```

更多配置，查看官网 https://webpack.docschina.org/plugins/html-webpack-plugin

##### 2. 清理 /dist 文件夹

在每次`build`项目前，把之前残留文件清理干净

安装`clean-webpack-plugin`插件

```bash
npm install clean-webpack-plugin --save-dev
```

配置`webpack.config.js`

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
 
  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### 四. 开发

##### 1. 使用 source-map

编译过后的代码不好调试，所以开发的时候可以使用`source-map`解决，请不要在生产环境使用

修改`webpack.config.js`

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
 
  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

更多配置，查看官网 https://webpack.docschina.org/configuration/devtool *（挺复杂的，，没看懂）*

**inline-source-map**：sourceMap内容直接附加在生成文件后面，如下

```css
/*
test.css 文件，由 test.scss编译而来
*/
 
nav {
  width: 100px;
  color: #F90;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64, ...... NlUm9vdCI6IiJ9*/
```

**source-map**：sourceMap内容单独生成文件，如下

```bash
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- index.html
+ |- /dist
+   |- test.css
+   |- test.css.map
  |- /src
    |- test.scss
    |- index.js
```

```css
/*
test.css 文件，由 test.scss编译而来
*/
 
nav {
  width: 100px;
  color: #F90;
}
```

```text
/* test.css.map */
 
{"version":3,"sources":["webpack:///./src/css/test1.scss"],"names":[],"mappings":"AAAA;AACA ... }
```

##### 2. 开发工具

1. **观察模式（watch）**

   ```json
     {
       "name": "development",
       "version": "1.0.0",
       "description": "",
       "main": "webpack.config.js",
       "scripts": {
   +     "watch": "webpack --watch",
         "build": "webpack"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       ......
     }
   ```

   在命令行中运行 `npm run watch`，就会看到 webpack 编译代码，然而却不会退出命令行。

   这是因为 script 脚本还在观察文件

   保存文件并检查终端窗口。应该可以看到 webpack 自动重新编译修改后的模块！

   **缺点**：为了看到修改后的实际效果，你需要手动刷新浏览器

 

2. **使用 webpack-dev-server**

   解决了`watch`模式的缺点，能够实时自动重新加载（live reloading）

   安装`webpack-dev-server`

   ```bash
   npm install --save-dev webpack-dev-server
   ```

   修改`webpack.config.js`

   ```javascript
     const path = require('path');
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     const CleanWebpackPlugin = require('clean-webpack-plugin');
    
     module.exports = {
       entry: {
         app: './src/index.js',
         print: './src/print.js'
       },
       devtool: 'inline-source-map',
   +   devServer: {
   +     contentBase: './dist'
   +   },
       plugins: [
         new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({
           title: 'Development'
         })
       ],
       output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist')
       }
     };
   ```

   `contentBase`表示将`dist`目录作为服务器的根路径

   默认端口号为`8080`，访问`localhost:8080`即可

   修改`package.json`

   ```json
     {
       "name": "development",
       "version": "1.0.0",
       "description": "",
       "main": "webpack.config.js",
       "scripts": {
         "watch": "webpack --watch",
   +     "start": "webpack-dev-server --open",
         "build": "webpack"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       ......
     }
   ```

   在命令行中运行 `npm start`，就会看到浏览器自动打开页面（-- open 的作用）。

   如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码，且浏览器自动刷新

   **需注意，并不会真的生成`dist`文件夹及相应编译后的文件，全部都在内存中模拟，这样速度更快，便于开发**

3. **使用 webpack-dev-middleware**

   `webpack-dev-middleware`可以把 webpack 处理后的文件传递给一个服务器（server）

   *（webpack-dev-server 内部也是用了这个）*

   看一个 webpack-dev-middleware 配合 express server 的示例吧

   安装 `express` 和 `webpack-dev-middleware`

   ```bash
   npm install --save-dev express webpack-dev-middleware
   ```

    `webpack.config.js`

   ```javascript
     const path = require('path');
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     const CleanWebpackPlugin = require('clean-webpack-plugin');
    
     module.exports = {
       entry: {
         app: './src/index.js',
         print: './src/print.js'
       },
       devtool: 'inline-source-map',
       plugins: [
         new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({
           title: 'Output Management'
         })
       ],
       output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist'),
         // publicPath 并不是webpack的关键字，其实是在 server.js 文件里，直接引用 config.output.publicPath获取的。。别看名字这么专业
   +     publicPath: '/'
       }
     };
   ```

   创建`server.js`文件

   ```bash
     webpack-demo
     |- package.json
     |- webpack.config.js
   + |- server.js
     |- /dist
     |- /src
       |- index.js
       |- print.js
     |- /node_modules
   ```

   内容如下

   ```javascript
    
   // server.js
    
   const express = require('express');
   const webpack = require('webpack');
   const webpackDevMiddleware = require('webpack-dev-middleware');
    
   const app = express();
   const config = require('./webpack.config.js');
   const compiler = webpack(config);
    
   // 告诉 express 使用 webpack-dev-middleware 和 webpack.config.js
   // publicPath 指定根路径
   app.use(webpackDevMiddleware(compiler, {
       publicPath: config.output.publicPath
   }));
    
   // 在 3000端口 启动服务
   app.listen(3000, function () {
       console.log('Example app listening on port 3000!\n');
   });
   ```

   修改 package.json

   ```json
     {
       "name": "development",
       "version": "1.0.0",
       "description": "",
       "main": "webpack.config.js",
       "scripts": {
         "watch": "webpack --watch",
         "start": "webpack-dev-server --open",
   +     "server": "node server.js",
         "build": "webpack"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       ......
     }
   ```

   执行 `npm run server`，并访问 `localhost:3000`

   **需注意，并不会真的生成`dist`文件夹及相应编译后的文件，全部都在内存中模拟，这样速度更快，便于开发**

   > publicPath：表示服务访问根路径
   >
   > 如果我配置为 publicPath: '/hello'，那么需访问地址：localhost:3000/hello ，并以此为基准

#### 五. 模块热替换

就是在页面不刷新的情况下，替换掉Javascript、CSS代码

##### 1. 启用HMR

修改 webpack.config.js

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');
 
  module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

现在修改 Javascript、CSS代码，将自动热替换

#### 六. tree shaking

字面意思：**摇晃树**，使其没用的东西掉落

实际：删除无用的代码（Dead Code）

**Dead Code** 包含以下几个特征

* 代码不会被执行，不可到达
* 代码执行的结果不会被用到
* 代码只会影响死变量（只写不读）

##### 1. 深入理解

[Tree-Shaking性能优化实践 - 原理篇 - 掘金](wiz://open_document?guid=ab7f6bf6-1949-4b75-b395-8d403c264085&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)

##### 2. 结合webpack

不知道是不是版本不一样的问题，我配置了`sideEffects`并没有起作用，而且

默认，`mode`为**生产模式**下，就会删除掉 Dead Code

*Version: webpack 4.16.2*

#### 七. 生产环境构建

在**开发环境**中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server 。

而在**生产环境**中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。

由于要遵循逻辑分离，我们通常建议为每个环境编写**彼此独立的 webpack 配置**。

遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 `webpack-merge`的工具。

```bash
npm install --save-dev webpack-merge
```

 

##### 1. 配置

**project**

```bash
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

**webpack.common.js**

```javascript
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**webpack.dev.js**

```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
 
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
});
```

**webpack.prod.js**

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
 
module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});
```

 

##### 2. NPM脚本

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "scripts": {
+   "start": "webpack-dev-server --open --config webpack.dev.js",
+   "build": "webpack --config webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.1",
    "style-loader": "^0.21.0",
    "webpack": "^4.16.3",
    "webpack-cli": "^3.1.0",
    "webpack-merge": "^4.1.3"
  },
  "dependencies": {}
}
 
```

 

##### 3. 指定环境

**webpack.prod.js**

```javascript
+ const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');
 
  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
+     new webpack.DefinePlugin({
+       'process.env.NODE_ENV': JSON.stringify('production')
+     })
    ]
  });
```

 

##### 4. 分离CSS

**`extract-text-webpack-plugin`插件适用于webpack 4.0以前，从webpack 4.0 开始废弃使用**

若报如下错误，就要注意是不是版本不兼容了

```text
(node:9852) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
F:\test\webpack-demo\example07\node_modules\_webpack@4.16.3@webpack\lib\Chunk.js:824
                throw new Error(
                ^
 
```

使用[`mini-css-extract-plugin`](https://www.npmjs.com/package/mini-css-extract-plugin)进行 CSS 分离

```bash
npm i --save-dev mini-css-extract-plugin
```

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
 
                /*
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                      publicPath: '../'
                    }
                  },
                  "css-loader"
                ]
                */
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
            // filename: "[name].css"
            // filename: "[name].[hash].css"
 
            // chunkFilename: "[id].css"
            // chunkFilename: "[id].[hash].css"
        })
    ]
 
}
```

 

##### 5. CLI选项

**Command Line Interface 命令行接口**

`--optimize-minimize` 等价于 `UglifyJSPlugin`

`--define process.env.NODE_ENV="'production'"` 等价于 `DefinePlugin` 

`webpack -p` 将自动地调用上述这些标记，从而调用需要引入的插件。

#### 八. 代码分离

##### 1. 多个入口

```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};
```

 

##### 2. 提取重复

如果多个模块依赖了同一模块，那么为了避免重复打包，应将重复模块提取出来，形成`chunk`

> chunk 和 bundle 其实没啥特殊区别，从 entry 入口开始进行打包生成的叫 bundle，不是从入口，而是如“提取重复、动态加载”而生成的就叫 chunk

**从 webpack4.0 开始，CommonsChunkPlugin 被废弃了**（官方文档又没更新，气死俺了）

取而代之的是 `optimization.splitChunks`

**project**

```bash
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
  |- another-module.js
|- /node_modules
```

**index.js**

```javascript
import _ from 'lodash'
 
...
```

**another-module.js**

```javascript
import _ from 'lodash'
 
...
```

index.js 和 another-module.js 同时引用了 lodash 模块，按理来说，webpack4.0默认就会将 lodash 单独提取出来，但是没有，**我也不知道为什么**。。

**webpack.config.js**

```javascript
    module.exports = {
        entry: {
            index: './src/index.js',
            another: './src/another-module.js'
        },
+       optimization: {
+           splitChunks: {
+               chunks: 'all'
+           }
+       },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, 'dist')
        }
    };
```

`chunks`有3个可选值：`initial`(初始块)、`async`(按需加载块)、`all`(全部块)

加了上面这配置，就奇迹般地生效了，生成的名字有点奇葩，修改下

```javascript
optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        }
    }
```

> 提取重复，生成单个chunk，就说明浏览器要多发一次请求，这样性能是上去了还是下降了呢？
>
> webpack默认有一套判断机制，具体见官网[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

##### 3. 动态导入

webpack 4.0，默认只要是动态导入均会单独生成`chunk`，无需配置额外选项

当然 chunk 名称可以统一配置下

**webpack.config.js**

```javascript
  module.exports = {
      entry: {
          dynamic: './src/dynamic.js'
      },
      output: {
          filename: "[name].bundle.js",
+         chunkFilename: "[name].bundle.js",
          path: path.resolve(__dirname, 'dist')
      }
  };
```

**project**

```bash
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- dynamic.js
|- /node_modules
```

**dynamic.js**

```javascript
function getComponent() {
    return import('lodash').then(_ => {
 
        var element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
        return element;
 
    }).catch(error => 'Error')
}
 
getComponent().then(component => {
    document.body.appendChild(component);
})
 
```

也可以使用 async 更优雅地写异步

**dynamic.js（async版）** *和上面是等价的，只不过更优雅*

```javascript
async function getComponent() {
    var element = document.createElement('div');
    const _ = await import('lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}
 
getComponent().then(component => {
    document.body.appendChild(component);
});
```

针对某一个 chunk 取名的话，可以在 import 的时候定制

```javascript
async function getComponent() {
    const _ = await import( /* webpackChunkName: "lodash" */ 'lodash');
｝
```

##### 4. bundle分析

*这块没有研究。。。*

[官方分析工具](https://github.com/webpack/analyse)

社区支持的可选工具：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

#### 九. 懒加载

动态导入就是懒加载

**project**

```bash
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

**print.js**

```javascript
console.log('The print.js module has loaded! See the network tab in dev tools...');
 
export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
}
```

**index.js**

```javascript
function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    button.innerHTML = 'Click me and look at the console!';
    element.appendChild(button);
 
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        var print = module.default;
 
        print();
    });
 
    return element;
}
 
document.body.appendChild(component());
```

**只有当点击按钮 button 时，才会加载 print.js 文件（准确地说是对应 chunk 文件）**

 

许多框架和类库对于如何用它们自己的方式来实现（懒加载）都有自己的建议。这里有一些例子：

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Lazy Load in Vue using Webpack's code splitting](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/)
- AngularJS: [AngularJS + Webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd) by [@var_bincom](https://twitter.com/var_bincom)

*（我没研究，，官网直接贴过来的，也不知道过时了没有。。）*

#### 十. 缓存

客户端（通常是浏览器）访问服务器的资源，是比较耗费时间的，浏览器会使用一种名为 [缓存](https://searchstorage.techtarget.com/definition/cache) 的技术。

可以通过命中缓存，以降低网络流量，使网站加载速度更快.

然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。

##### 1. 文件名

使用 `[chunkhash]` ，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。

**webpack.config.js**

```javascript
module.exports = {
    entry: './src/index.js',
    output: {
+     filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

webpack 官方教程说，在代码未做修改的情况下，多次 build 得到的 chunkhash名 可能会变

*（但是我测试了，发现不会变啊。。是不是又是因为版本不一样？？webpack4.0 改进了这问题？）*

##### 2. 提取模板

提取模板：将 global.js、module.js 以及 webpack启动器 这些不变的公用代码取出来 （个人理解，不准）

当然，为了进一步优化，像第三方库这种通常不会变的模块，也单独提取出来

**webpack.config.js**

```javascript
    module.exports = {
        entry: './src/index.js',
+       optimization: {
+           splitChunks: {
+               chunks: 'all',
+               name: 'vendors'        // 改个名字，不是必要
+           },
+           runtimeChunk: {
+               name: 'manifest'
+           }
+       },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    };
```

经测试，发现 第三方库（此处为 vendors）的 chunkhash 还是会变，但其实我们根本就没改它的代码

可以使用两个插件来解决这个问题

第一个插件是 [`NamedModulesPlugin`](https://webpack.docschina.org/plugins/named-modules-plugin)，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。

第二个选择是使用 [`HashedModuleIdsPlugin`](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)，推荐用于生产环境构建：

```javascript
    module.exports = {
        entry: './src/index.js',
        plugins: [
+            new webpack.HashedModuleIdsPlugin(),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'vendors'
            },
            runtimeChunk: {
                name: 'manifest'
            }
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    };
```

详情介绍查看 [官网](https://webpack.docschina.org/guides/caching/#模块标识符-module-identifiers-)

#### 十一. 创建 library

##### 1. 目标

写一个简单的插件为例，功能是求两数之和，就叫**sum**

使用方式如下

- **ES2015 module import:**

```js
import sum from 'sum';
// ...
sum(1, 2); // output 3
```

- **CommonJS module require:**

```javascript
const sum = require('sum');
// ...
sum(1, 2); // output 3
```

- **AMD module require:**

```js
require(['sum'], function (sum) {
  // ...
  sum(1, 2); // output 3
});
```

* **Loading via script tag:**

```html
<!doctype html>
<html>
    ...
    <script src="https://unpkg.com/sum"></script>
    <script>
        // ...
        // Global variable
        sum(1, 2) // output 3
        // Property in the window object
        window.sum(1, 2) // output 3
        // ...
    </script>
</html>
```

注意，我们还可以通过以下配置方式，将 library 暴露为：

- global 对象中的属性，用于 Node.js。
- `this` 对象中的属性。

完整的 library 配置和代码，请查看 [webpack-library-example](https://github.com/kalcifer/webpack-library-example)。

##### 2. 实现

**project**

```bash
webpack-demo
|- package.json
|- webpack.config.js
|- example.html
|- /src
  |- index.js
|- /node_modules
```

**index.js**

```javascript
function sum(a, b) {
    return a + b;
}
export default sum;
```

**webpack.config.js**

```javascript
const path = require("path");
 
module.exports = {
    entry: "./src/index.js", // 相对路径
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "sum.js",
        // library作用：如果是用script引用，则挂载为window.sum
        library: "sum",
        // 兼容ES module、CommonJS、AMD、script标签引入
        libraryTarget: "umd",
    },
};
```

**example.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>测试</title>
        <script src="./dist/sum.js"></script>
    </head>
    <body>
        <script>
            const a = window.sum(1,2);
            console.log(a)
        </script>
    </body>
</html>
```

控制台打开，报错！！！sum is not a function，输出 sum 发现它是个 object，而其 default 属性才是 sum 方法

> 如果本来就要导出对象，使用的是 export 导出多个成员方法，是不会遇到这问题的。

**解决方案**

1. 使用 module.exports 导出

   ```javascript
   function sum(a, b) {
       return a + b;
   }
   module.exports = sum;
   ```

2. 配置 **libraryExport** 解决

   第一种方法，实际上用的是 CommonJS的语法了，如果就只想用 es6 呢？就用 [libraryExport](https://webpack.docschina.org/configuration/output/#outputlibraryexport)

   ```javascript
   const path = require("path");
    
   module.exports = {
       entry: "./src/index.js",
       output: {
           path: path.resolve(__dirname, "dist"),
           filename: "sum.js",
           library: "sum",
           // 该值默认undefined，设这个值主要因为使用 export default xxx 导出的模块，在浏览器使用时变成了 xxx.default
           libraryExport: "default",
           libraryTarget: "umd",
       },
   };
   ```

   其实 libraryExport 这个属性没有多神奇，无非就是帮咱们**做个取值动作**罢了

   分析 dist 目录下生成的代码

   **未使用 libraryExport**

   ```javascript
   !(function(e,t){
       // ...
   })(window, function() {
       return (function(e) {
           // ...
       })([
           function(e,t,n){
               "use strict";
               n.r(t),
                   // 咱们的sum方法被挂载在default上了
                   (t.default = function (e, t) {
                   return e + t;
               });
           }
       ])
   })
   ```

   **使用 libraryExport**

   ```javascript
   !(function(e,t){
       // ...
   })(window, function() {
       return (function(e) {
           // ...
       })([
           function(e,t,n){
               "use strict";
               n.r(t),
                   // 咱们的sum方法被挂载在default上了
                   (t.default = function (e, t) {
                   return e + t;
               });
           }
       ]).default // 上面挂载在default上，这里，再把它取出来，这样就不会多包一层default了
   })
   ```

   也就是说，libraryExport 设置成什么值，就取什么值，随便设个 abc

   ```javascript
   !(function(e,t){
       // ...
   })(window, function() {
       return (function(e) {
           // ...
       })([
           function(e,t,n){
               "use strict";
               n.r(t),
                   (t.default = function (e, t) {
                   return e + t;
               });
           }
       ]).abc // 很显示，abc肯定没值，此处只做测试
   })
   ```

   如果我们用 export 导出呢？

   ```javascript
   export function sum(a, b) {
       return a + b;
   }
   ```

   > 首先，我们要知道，export 导出，可以理解成 module.exports.xxx = ...（个人理解）

   将 libraryExport  设置成 sum 即可解决

   ```javascript
   !(function(e,t){
       // ...
   })(window, function() {
       return (function(e) {
           // ...
       })([
           function (e, t, n) {
               "use strict";
               function r(e, t) {
                   return e + t;
               }
               // 此处将咱们的方法，挂载在 sum 属性上了
               n.r(t), n.d(t, "sum", function () {
                   return r;
               });
           },
       ]]).sum // 时刻记住，libraryExport 无非是帮咱们做了个取值动作
   })
   ```

##### 3. package.json

```javascript
{
  ...
  "main": "dist/num.js",
  ...
}
```

关于 package.json 里的 module 字段还不是很清楚，先放着，更多见[官网](https://webpack.js.org/guides/author-libraries/#final-steps)

##### 4. 发布

To be continued

[官网](https://webpack.docschina.org/guides/author-libraries/)

#### 十二. shimming（兼容）

##### 1. 兼容早期代码

**（1）全局变量shimming**

**index.js**

```javascript
function component() {
    var element = document.createElement('div');
 
    // 早期lodash直接在全局变量上绑一个 _ 变量
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
    //
+   element.innerHTML = join(['Hello', 'webpack'], ' ');
 
    return element;
}
 
document.body.appendChild(component());
```

**webpack.config.js**

```javascript
  const path = require('path');
+ const webpack = require('webpack');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash',
          // 甚至可以直接指定到 某个具体方法，此处表示用 lodash.join =》join
+       join: ['lodash', 'join']
+     })
+   ]
  };
```

 

**（2）细粒度shimming**（就是比上面那个功能这强的意思）

安装`imports-loader`

```bash
npm install --save-dev imports-loader
```

一般传统模块，浏览器 this 指向的是 window 对象，当模块运行在 CommonJS 环境下，this 就指向 module.exports，这就会出问题

```javascript
  function component() {
    var element = document.createElement('div');
 
+   // Assume we are in the context of `window`
+   this.alert('Hmmm, this probably isn\'t a great idea...')
 
    return element;
  }
 
  document.body.appendChild(component());
```

使用 imports-loader 解决

**webpack.config.js**

```javascript
  const path = require('path');
  const webpack = require('webpack');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   }
    ]
  };
```

若使用 this=>window，则不能用 es6 的 import 静态引进模块，会出问题，因为使用 this=>window ，效果就是将 目标文件代码（此处为index.js） 包裹至 `(function () { ... }).call(window)`;

若 目标文件代码 含有 es6 语法 import ，则报错，因为 import 必须放在最顶层，而此时外围包了个立即执行函数

```javascript
// 错误信息如下
//////////////////////////////////////////////////////////////////////////////////
Module parse failed: 'import' and 'export' may only appear at the top level (4:0)
You may need an appropriate loader to handle this file type.
| (function() {
|
> import {file, parse} from './globals.js';
|
| function component() {
//////////////////////////////////////////////////////////////////////////////////
```

 

imports-loader功能很强大，[官网](https://webpack.docschina.org/loaders/imports-loader/)

| loader 查询值     | 含义                                |
| ----------------- | ----------------------------------- |
| angular           | var angular = require("angular");   |
| \$=jquery         | var $ = require("jquery");          |
| define=>false     | var define = false;                 |
| config=>{size:50} | var config = {size:50};             |
| this=>window      | (function () { ... }).call(window); |

**（3）全局exports**

早期代码，没有使用 exports 导出，直接全局变量，如何在外部调用该模块呢？

使用 [`exports-loader`](https://webpack.docschina.org/loaders/exports-loader/)

```bash
npm install exports-loader --save-dev
```

**global.js**

```javascript
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

**webpack.config.js**

```javascript
  const path = require('path');
  const webpack = require('webpack');
 
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
+       {
+         test: require.resolve('globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    }
  };
```

现在可以顺利 import 了

**index.js**

```javascript
import { file, parse } from './src/globals.js';
 
...
```

 

##### 2. 兼容早期浏览器

*这块感觉官网教程写得不好，有更好的资料再写吧*

#### 十三. 渐进式网络应用程序

渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的网络技术来实现的。

##### 1. 注册 Service Worker

安装 workbox-webpack-plugin 插件

```bash
npm install --save-dev workbox-webpack-plugin
```

**webpack.config.js**

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');
 
  module.exports = {
    entry: {
      app: './src/index.js'
    },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application'
    }),
+   new WorkboxPlugin.GenerateSW({
+     // 这些选项帮助 ServiceWorkers 快速启用
+     // 不允许遗留任何“旧的” ServiceWorkers
+     clientsClaim: true,
+     skipWaiting: true
+   })
  ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

这里使用 `http-server` 作服务器演示

```bash
npm install http-server --save-dev
```

**package.json**

```json
{
    "scripts": {
        "build": "webpack",
        "start": "http-server dist"
    }
}
```

**npm start** 启动服务以后，正常返回并没有什么特殊，**关闭服务**，刷新页面，发现，**依然可以访问**！

***（我之前做过一次是可以的。。。不知道为什么现在不行了~~不想管了，以后再说）***

##### 2. 卸载 Service Worker

不用了记得卸载，否则下次启动另一个用了相同端口的服务，将无法正常访问，因为会跳到当前的离线应用

chrome浏览器 访问 `chrome://serviceworker-internals/`，对应卸载

#### 十四. TypeScript

[TypeScript](https://www.typescriptlang.org/) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。

*我没有深入地学习，等真的需要时再学习，并且完善此笔记*

##### 1. 配置

1. 安装 TypeScript 编译器(compiler)和 loader

   ```bash
   npm install --save-dev typescript ts-loader
   ```

2. 修改目录结构和配置文件

   ```bash
     webpack-demo
     |- package.json
   + |- tsconfig.json
     |- webpack.config.js
     |- /dist
       |- bundle.js
       |- index.html
     |- /src
       |- index.js
   +   |- index.ts
     |- /node_modules
   ```

   **tsconfig.json**

   ```json
   {
     "compilerOptions": {
       "outDir": "./dist/",
       "noImplicitAny": true,
       "module": "es6",
       "target": "es5",
       "jsx": "react",
       "allowJs": true
     }
   }
   ```

   查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)了解更多关于 `tsconfig.json` 的配置选项

   **webpack.config.js**

   ```javascript
   const path = require('path');
    
   module.exports = {
     entry: './src/index.ts',
     module: {
       rules: [
         {
           test: /\.tsx?$/,
           use: 'ts-loader',
           exclude: /node_modules/
         }
       ]
     },
     resolve: {
       extensions: [ '.tsx', '.ts', '.js' ]
     },
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     }
   };
   ```

3. source map

   **tsconfig.json**

   ```json
     {
       "compilerOptions": {
         "outDir": "./dist/",
   +     "sourceMap": true,
         "noImplicitAny": true,
         "module": "commonjs",
         "target": "es5",
         "jsx": "react",
         "allowJs": true
       }
     }
   ```

   **webpack.config.js（开发配置）**

   ```javascript
     const path = require('path');
    
     module.exports = {
       entry: './src/index.ts',
   +   devtool: 'inline-source-map',
       module: {
         rules: [
           {
             test: /\.tsx?$/,
             use: 'ts-loader',
             exclude: /node_modules/
           }
         ]
       },
       resolve: {
         extensions: [ '.tsx', '.ts', '.js' ]
       },
       output: {
         filename: 'bundle.js',
         path: path.resolve(__dirname, 'dist')
       }
     };
   ```

##### 2. 第三方库

当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 [TypeSearch](http://microsoft.github.io/TypeSearch/) 中找到并安装这些第三方库的类型声明文件。

举个例子，如果想安装 lodash 这个库的类型声明文件，我们可以运行下面的命令：

```
npm install --save-dev @types/lodash
```

想了解更多，可以查看[这篇文章](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。

#### 十五. 环境变量

一般使用`NODE_ENV`指定运行应用程序的环境，例如**development**, **staging**, **production**, **testing** 等。

##### 1. 起源

查看`process.env`

windows打开cmd，并进入node模式

```bash
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。
 
C:\Users\Administrator>node
```

```bash
> process.env
```

```bash
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。
 
C:\Users\Administrator>node
> process.env
 
{ ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: 'C:\\Users\\Administrator\\AppData\\Roaming',
  CLASSPATH: 'E:\\environment\\jdk1.7.0_67\\lib\\dt.jar;E:\\environment\\jdk1.7.
0_67\\lib\\tools.jar',
  CommonProgramFiles: 'C:\\Program Files\\Common Files',
  'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
  CommonProgramW6432: 'C:\\Program Files\\Common Files',
  COMPUTERNAME: 'USER-20180411PG',
  ......太多了，省略点......
  windir: 'C:\\Windows',
  windows_tracing_flags: '3',
  windows_tracing_logfile: 'C:\\BVTBin\\Tests\\installpackage\\csilogfile.log',
  _DFX_INSTALL_UNSIGNED_DRIVER: '1' }
>
```

**并没有 NODE_ENV 的值，那 NODE_ENV 是哪来的呢？？？**

NODE_ENV是由Express框架推广的环境变量。

记住，process.env.NODE_ENV 默认是没有值的，只不过 Express 框架将其视为环境变量的关键字，加之 Express 框架的流行，大家就默认使用 NODE_ENV 来表示环境变量

##### 2. 使用

```bash
webpack --env.NODE_ENV=local
```

可以在命令行启动中添加，也可以在 package.json 的 script 脚本中启动添加

#### 十六. 构建性能

*待完善*

#### 十七. 别名

为了避免过多的`../`，常常会给 src 路径定义别名

```shell
webpack-demo
|- package.json
|- webpack.config.js
|- /src
  |- index.js
  |- /components
    |- test.js
```

**webpack.config.js**

```javascript
const cwd = process.cwd();
function resolve(...dir) {
  return path.join(cwd, ...dir);
}
module.exports = {
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
}
```

`@`表示`src`全路径

```javascript
import test from '@/components/test.js'
```

#### 十八. 常用 loader

##### 代码检查

```javascript
{
  // 使用pre保证最先执行，避免代码被其它模块动了
  enforce: "pre",
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  exclude: /node_modules/,
}
```

##### 代码转译

```javascript
{
  test: /\.js$/,
  loader: "babel-loader",
  options: {
    // 可以有更多的配置
    // ...
  },
  exclude: /node_modules/,
}
```

##### 处理CSS

```javascript
{
  test: /\.css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
      },
    },
    "postcss-loader"
  ],
}
```

```shell
yarn add autoprefixer -D
```

```javascript
// 根目录创建 postcss.config.js 文件
module.exports = {
  plugins: [require("autoprefixer")],
};
```

##### 处理Sass

```js
{
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    {
      loader: "css-loader",
      // 官方说，css-loader 前面有几个 loader，就设置多少。默认值：0
      // TODO 但我不设置，也没影响啊，不懂
      options: {
        importLoaders: 2,
      },
    },
    "postcss-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
}
```

##### 处理图片

```js
{
  test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 4096,
        esModule: false,
        fallback: {
          loader: "file-loader",
          options: {
            name: "img/[name].[hash:8].[ext]",
            // 转成 esModule 的好处我还没体验到，但直接让我图片变成[object%20Module]出不来了~~
            esModule: false,
          },
        },
      },
    },
  ],
}
```

##### 处理 svg

```js
{
  test: /\.(svg)(\?.*)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "img/[name].[hash:8].[ext]",
        esModule: false,
      },
    },
  ],
}
```

##### 处理字体

```js
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 4096,
        esModule: false,
        fallback: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash:8].[ext]",
            esModule: false,
          },
        },
      },
    },
  ],
}
```

```js
{
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: [
    {
      // 参考 vue-cli 生成的 webpack 配置。话说 url-loader 处理视频会变成什么~~
      loader: "url-loader",
      options: {
        limit: 4096,
        esModule: false,
        fallback: {
          loader: "file-loader",
          options: {
            name: "media/[name].[hash:8].[ext]",
            esModule: false,
          },
        },
      },
    },
  ],
}
```

##### 处理html

```javascript
{
  test: /\.html$/,
  loader: "html-loader",
  exclude: /node_modules/,
}
```

##### 处理vue单文件

用于加载 vue 单文件

```javascript
const VueLoaderPlugin = require("vue-loader/lib/plugin")
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

#####  加载源文件

```shell
yarn add raw-loader -D
```

常见的场景，比如加载 txt 文件，获取其内容

```javascript
// 感叹号表示内联loader，属于webpack的知识
import txt from 'raw-loader!./file.txt';
```

有时候，希望在运行时，通过 js 脚本获取某个js文件的内容，如果直接 import 引入，那就变成 js 模块执行了，这时，就可以使用`raw-loader`

```javascript
// 知识点：使用双感叹号置前，表示处理“源文件”，即不接收其它loader处理过的（如果有loader在前），而是要原始的
import coreStr from "!!raw-loader!./other.js"；
// 或者
const { default: coreStr } = require("!!raw-loader!./other.js");
```

不做过多解释，用的时候，再查下[官网](https://webpack.js.org/loaders/raw-loader/)

#### 十九. 常用 plugin

##### EnvironmentPlugin

设置环境变量。需要在 scripts 设置环境变量结合使用

```json
// package.json
{
  // 使用 cross-env 跨平台
  "scripts": {
    "build": "cross-env NODE_ENV=production ENV=local webpack"
  }
}
```

```javascript
// webpack.config.js
module.exports = {
  plugins: [
    // cross-env已经将变量写至 node 中，可 webpack 却读不到，还要再衔接一次
    // 你可能会反对我这句话，说NODE_ENV就能读到，那应该是webpack预设了
    new webpack.EnvironmentPlugin(["NODE_ENV", "ENV"]),
  ]
}
```

如果输出 process.env，会发现还是个空对象，因为 EnvironmentPlugin 只是将代码中出现 process.env.NODE_ENV 的地方，直接替换成对应值，而并未对 process.env 进行赋值。

##### CleanWebpackPlugin

清理输出

```javascript
module.exports = {
  plugins: [
    // clean the build folder
    // 自动读取用户设置的 build 目录。若未设置，默认为 dist
    new CleanWebpackPlugin(),
  ]
}
```

##### WebpackBar

进度条

```javascript
module.exports = {
  plugins: [
    // 为构建过程添加进度条，直观展示
    new WebpackBar()
  ]
}
```

##### CopyWebpackPlugin

拷贝

```javascript
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          // 默认拷贝至 dist 根目录
          from: "src/manifest.json",
        },
        {
          // ！！！对于文件夹，不加目标路径会造成文件夹下的所有文件，全部散放在dist根目录
          from: "src/icons"
        },
        {
          from: "src/icons",
          // 文件夹，记得指明路径
          to: "icons"
        },
        {
          from: "plugins",
          to: "plugins",
          // 使用上下文 context，就可以随便复制任何地方的文件，不一定要当前项目下的
          context: resolve("../vip-crack-core/dist"), // resolve为获取绝对路径，此处省略没明
        },
        {
          from: "src/manifest.json",
          // 可以对内容进行加工
          transform: function (content) {
            // 视具体情况而定
            // ...
          }
        }
      ]
    })
  ]
}
```

##### HtmlWebpackPlugin

生成html文件

```javascript
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 不知道给相对路径行不行，没试过
      template: resolve("popup/popup.html"),
      filename: "popup.html",
      // 为生成的html添加script引入脚本，给定值为 entry 的 key值
      chunks: ["popup"],
    })
  ]
}
```

##### WriteFilePlugin

默认 webpack-dev-server 是不会生成文件到硬盘的，而是输出至内存，这样能获得更好的开发体验。但有些时候需要让它输出至硬盘，比如开发 chrome extension时，浏览器必须先加载一个文件夹作为插件内容才行，这时就派上用场了。

注意，使用些插件，不代表 webpack-dev-server 就只把内容输出至硬盘，而是即输出至内存（保证开发），又输出至硬盘。

```javascript
const WriteFilePlugin = require("write-file-webpack-plugin");
module.exports = {
  plugins: [
    new WriteFilePlugin()
  ]
}
```

##### FriendlyErrorsWebpackPlugin

终端更友好地输出信息

```javascript
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
module.exports = {
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      // 还有更多参数，自己到官网看
      clearConsole: true,
    })
  ]
}
```

如果使用 webpack-dev-server，需要关掉其信息输出

```javascript
module.exports = {
  plugins: [
    // 以 nodejs 方式为例
    new WebpackDevServer(compiler, {
      quiet: true
    })
  ]
}
```

#### 二十. FAQ

**错误时的页面错误信息遮罩如何实现？**

使用 webpack-dev-server 的 overlay 属性

```javascript
// 还是以 nodejs 启动为例
new WebpackDevServer(compiler, {
  // 报错时，全屏遮罩
  overlay: {
    // 警告就不往屏幕上抛了
    warnings: false,
    errors: true,
  },
})
```