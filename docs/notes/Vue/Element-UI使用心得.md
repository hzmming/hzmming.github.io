---
title: Element-UI使用心得
date: 2019-07-01
tags:
  - Vue
categories:
  - Vue
---

### 直接设置表单验证为错误，并支持自定义错误信息

使用场景：用户名/密码验证中，密码错误信息直接填至原密码校验处，而不是message

```html
<el-form>
    <el-form-item label="旧密码" :error="errorMsg">
        <el-input />
    </el-form-item>
</el-form>


<script>
    new Vue({
        data() {
            return {
                errorMsg: ''
            }
        },
        methods: {
            submit() {
                // 验证密码之前，需将errMsg重置，不然errMsg值没变化，不会触发显示
                this.errorMsg = ''
                // simulation request
                const res = post()
                if(!res.success){
                    this.errorMsg = res.data.msg
                }
            }
        }
    })
</script>
```

### 手动上传文件，显示图片及设置图片校验

```html
<el-upload
           ref="upload"
           class="upload-demo"
           action=""
           :on-change="fileChange"
           :show-file-list="false"
           accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
           :auto-upload="false"
           >
    <el-button
               slot="trigger"
               size="small"
               ref="avatarUpload"
               >
        上传头像
    </el-button>
</el-upload>


<script>
    new Vue({
        methods: {
            fileChange(file) {
                // 读取本地图片
                this.imgUrl = URL.createObjectURL(file.raw)
                this.temp.file = file.raw
            },
        }
    })
</script>
```

### el-form 表单是否必填 星号 动态切换

**方法（一）**

使用`el-form-item`的`required`属性，rules里的required可以去掉了

这个方法缺点就是不知道如何设置必填项的校验信息，而且不能设置触发方式（blur或change），只能validate表单[也可能是我不懂而已]

```html
<el-form>
    <el-form-item
                  label="动态必填"
                  :required="dynamicRequire">
        <el-input />
    </el-form-item>
</el-form>


<script>
    new Vue({
        computed: {
            dynamicRequire() {
                // 取决于某个会变的值
            },
        }
    })
</script>
```

**方法（二）**

动态修改`rules`里的`required`属性

```html
<el-form :rules=rules>
    <el-form-item
                  label="动态必填"
                  prop="dynamicRequire">
        <el-input />
    </el-form-item>
</el-form>


<script>
    new Vue({
        watch: {
            XXX() {
                // required属性是响应式的
                this.rules['dynamicRequire'][0].required = true
            },
        },
        data() {
            return {
                rules: {
                    'dynamicRequire': [
                        { required: false, message: "请选择XXX", trigger: "change" }
                    ]
                }
            }
        }
    })
</script>
```



### el-form-item验证的prop字段

不能乱取名字的，要和你要验证的字段一致，即`model [prop]`，所以model也不能传错

### el-form 与 template

场景：有多个`el-form-item`要控制显示/隐藏，不想一个一个加，使用`template`包裹

```html
<!-- 1.最原始可行方法 -->
<el-form>
    <el-form-item v-show/if="isShow">
        ...
    </el-form-item>
    <el-form-item v-show/if="isShow">
        ...
    </el-form-item>
</el-form>


<!-- 2.同样可行 -->
<el-form>
    <div v-show/if="isShow">
        <el-form-item>
            ...
        </el-form-item>
        <el-form-item>
            ...
        </el-form-item>
    </div>
</el-form>


<!-- 3.使用template -->
<!-- 注意：只能使用v-if，因为v-show不起作用，但是v-if是重新生成实例，自己斟酌 -->
<el-form>
    <template v-if="isShow">
        <el-form-item>
            ...
        </el-form-item>
        <el-form-item>
            ...
        </el-form-item>
    </template>
</el-form>
```

### el-table自定义表头

#### 使用slot自定义表头

```html
<el-table :data="personList">
    <el-table-column prop="name" label="name">
        <template slot="header" slot-scope="{column}">
            <span>{{column.label}}<span class="icon" @click="doOperation">(自定义图标)</span></span>
        </template>
    </el-table-column>
    <el-table-column prop="age" label="age"></el-table-column>
</el-table>
<script>
    new Vue({
        data() {
            return {
                personList: [
                    {name: 'hello', age: 24},
                    {name: 'world', age: 22}
                ]
            }
        },
        methods: {
            doOperation() {
                console.log(this)
                alert('我是图标')
            }
        }
    })
</script>
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191216154900.png)



#### 使用render-header自定义表头

```html
<el-table :data="personList">
    <el-table-column prop="name" label="name" :render-header="renderHeader">
    </el-table-column>
    <el-table-column prop="age" label="age"></el-table-column>
</el-table>
<script>
    new Vue({
        data() {
            return {
                personList: [
                    {name: 'hello', age: 24},
                    {name: 'world', age: 22}
                ]
            }
        },
        methods: {
            renderHeader(h, {column}) {
                return h('span', [
                    column.label,
                    h('span', {
                        'attrs': {
                            class: 'icon'
                        },
                        'on': {
                            click: this.doOperation
                        }
                    }, [
                        '(自定义图标)'
                    ])
                ])
            },
            doOperation() {
                console.log(this)
                alert('我是图标')
            }
        }
    })
</script>
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191216155236.png)



#### 使用render-header(JSX) 自定义表头

```html
<el-table :data="personList">
    <el-table-column prop="name" label="name" :render-header="renderHeaderJSX">
    </el-table-column>
    <el-table-column prop="age" label="age"></el-table-column>
</el-table>
<script>
    new Vue({
        data() {
            return {
                personList: [
                    {name: 'hello', age: 24},
                    {name: 'world', age: 22}
                ]
            }
        },
        methods: {
            renderHeaderJSX(h, {column}) {
                return <span>
                    {column.label}<span class="icon" vOn:click={this.doOperation}>(自定义图标)</span>
                </span>
            },
            doOperation() {
                console.log(this)
                alert('我是图标')
            }
        }
    })
</script>
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191216155410.png)

> 使用`JSX`所需要的配置，见[`Babel笔记`](wiz://open_document?guid=fc63bce0-f8eb-43cc-a106-6f29e214ba81&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e)的**第十章**

### el-table与doLayout

`el-table`布局错乱，可以使用`doLayout`解决

### 输出带sourceMap的elementui.js

适用于前后端未分离的系统开发调试使用

1. **从git上下载源代码**

   ```shell
   git clone https://github.com/ElemeFE/element.git
   ```

2. **安装依赖**

   ```shell
   # element官方建议使用yarn安装依赖
   yarn
   ```

3. **修改webpack配置文件**

   *build/webpack.conf.js*

   ```javascript
   // ...略
   module.exports = {
       // ...略
       
       // 第1步：添加sourceMap
       devtool: 'inline-source-map',
   
    // 第2步：屏蔽＂去除注释代码＂（因为inline-source-map是内联在代码文件中的，会被当注释给去掉）
       /*
       optimization: {
           minimizer: [
               new TerserPlugin({
                   terserOptions: {
                       output: {
                           comments: false
                       }
                   }
               })
           ]
       },
       */
   }
   ```

   

4. **构建**

   ```shell
   npm run dist
   ```

5. **最终文件**

   从`build/webpack.conf.js`的配置可以知道输出文件在哪

   ```javascript
   module.exports = {
       entry: {
           app: ['./src/index.js']
       },
       output: {
           // 输出目录
           path: path.resolve(process.cwd(), './lib'),
           // 输出文件名
           filename: 'index.js'
           // ...
       }
   }
   ```

   所以最终文件为`lib/index.js`（sourceMap已经内联在文件的末端了）

### el-table分页与多选

切换页码的情况下，还想要保留前一页的勾选项，如何做到？

业务遇到了这种需要，最后做出来的页面如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191216162508.png)

暗色背景主要是因为业务需要，默认的白底过于刺眼且与项目原有风格不搭，所以才调整成暗色

```html
<template>
    <div>
        <el-button type="primary" @click="showSendAreaDialog">添加</el-button>
        <!-- 添加下发地州 -->
        <el-dialog
                   class="sendArea-dialog dark-skin"
                   width="52vw"
                   v-cloak
                   title="添加下发地州"
                   :visible.sync="sendAreaDialog">
            <div class="sendArea-filter">
                <el-form @submit.native.prevent :inline="true" label-width="80px">
                    <el-form-item label="支队名称">
                        <el-input v-model.trim="sendAreaQuery.name" clearable style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchSendArea">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="sendArea-box">
                <div class="sendArea-available-panel">
                    <el-table
                              class="dark-skin my-table"
                              ref="sendAreaTable"
                              :data="sendAreaList"
                              @row-click="handleSendAreaRowClick"
                              @select="handleSendAreaSelect"
                              @select-all="handleSendAreaSelectAll"
                              max-height="425">
                        <el-table-column
                                         align="center"
                                         type="selection"
                                         width="55">
                        </el-table-column>
                        <!-- 序号 -->
                        <el-table-column
                                         width="60"
                                         align="center"
                                         label="序号"
                                         :index="getNo"
                                         type="index">
                        </el-table-column>
                        <!-- 支队名称 -->
                        <el-table-column
                                         prop="name"
                                         label="支队名称">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                                   class="dialog-page my-page"
                                   v-show="sendAreaListTotal"
                                   background
                                   layout="prev, pager, next,total"
                                   :current-page.sync="sendAreaQuery.page"
                                   :page-size.sync="sendAreaQuery.size"
                                   @current-change="handleSendAreaPageChange"
                                   :total="sendAreaListTotal">
                    </el-pagination>
                </div>
                <div class="sendArea-selected-panel">
                    <template v-for="(item,index) in dialogSelectedSendAreaList">
                        <div class="sendArea-item">
                            <el-tag effect="dark" type="info" closable @close="deleteDialogSelectedSendArea(index)">
                                {{item.name}}
                            </el-tag>
                        </div>
                    </template>
                    <div class="sendArea-empty" v-show="!dialogSelectedSendAreaList.length">
                        请选择下发地州
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="sendAreaDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    const easyCopy = obj => JSON.parse(JSON.stringify(obj))

    export default {
        name: "pageAndCheckbox",
        data() {
            return {
                sendAreaDialog: false, // 添加下发地州弹窗
                sendAreaList: [], // 可选下发地州
                selectedSendAreaList: [], // 已选下发地州
                dialogSelectedSendAreaList: [], // 弹窗已选择下发地州
                sendAreaQuery: {
                    page: 1,
                    size: 10,
                    name: '' // 支队名称
                },
                sendAreaListTotal: 0,
            }
        },
        methods: {
            showSendAreaDialog: function () {
                this.dialogSelectedSendAreaList = easyCopy(this.selectedSendAreaList);
                this.getSendAreaList();
                this.sendAreaDialog = true;
            },
            searchSendArea: function () {
                this.sendAreaQuery.page = 1;
                this.getSendAreaList()
            },
            handleSendAreaRowClick: function (row) {
                let that = this;
                let tableInstance = that.$refs['sendAreaTable'];
                tableInstance.toggleRowSelection(row);

                // hack
                this.handleSendAreaSelect(null, row);
            },
            handleSendAreaSelect: function (selection, row) {
                let index = this.dialogSelectedSendAreaList.findIndex(item => {
                    return item.id === row.id;
                })
                if(index !== -1){
                    // row已选就取消
                    this.dialogSelectedSendAreaList.splice(index, 1)
                }else{
                    // row未选就添加
                    this.dialogSelectedSendAreaList.push({
                        id: row.id,
                        name: row.name
                    })
                }
            },
            handleSendAreaSelectAll: function (selection) {
                if(selection.length){
                    // 当前页全选
                    selection.forEach((item) => {
                        let index = this.dialogSelectedSendAreaList.findIndex(i => {
                            return i.id === item.id
                        })
                        if(index === -1){
                            this.dialogSelectedSendAreaList.push({
                                id: item.id,
                                name: item.name
                            })
                        }
                    })
                }else{
                    // 当前页全取消
                    this.sendAreaList.forEach((item) => {
                        let index = this.dialogSelectedSendAreaList.findIndex(i => {
                            return i.id === item.id
                        })
                        index !== -1 && this.dialogSelectedSendAreaList.splice(index, 1)
                    })
                }
            },
            handleSendAreaPageChange: function () {
                this.getSendAreaList()
            },
            deleteDialogSelectedSendArea: function (index) {
                let delItem = this.dialogSelectedSendAreaList.splice(index, 1);
                this.updateSendAreaCheckStatus(delItem)
            },
            // 更新选中状态
            updateSendAreaCheckStatus: function (rowList) {
                let that = this;
                let tableInstance = that.$refs['sendAreaTable'];
                let selectedList = rowList || that.dialogSelectedSendAreaList;
                selectedList.forEach(function (item) {
                    let tmp = that.sendAreaList.filter(function (i) {
                        return i.id === item.id
                    })
                    if(tmp.length){
                        tableInstance.toggleRowSelection(tmp[0])
                    }
                })

            },
            getNo: function (index) {
                // 加上分页的序号
                return (this.sendAreaQuery.page-1)*this.sendAreaQuery.size + index + 1
            },
            getSendAreaList() {
                // simulate fetch
                setTimeout(() => {
                    const param = this.sendAreaQuery
                    const data = [
                        {name: 'name', id: '0'},
                        {name: 'name', id: '1'},
                        {name: 'name', id: '2'},
                        {name: 'name', id: '3'},
                        {name: 'name', id: '4'},
                        {name: 'name', id: '5'},
                        {name: 'name', id: '6'},
                        {name: 'name', id: '7'},
                        {name: 'name', id: '8'},
                        {name: 'name', id: '9'},
                        {name: 'name', id: '10'},
                        {name: 'name', id: '11'},
                        {name: 'name', id: '12'},
                        {name: 'name', id: '13'},
                        {name: 'name', id: '14'},
                        {name: 'name', id: '15'},
                        {name: 'name', id: '16'},
                    ];
                    const start = (param.page-1)*param.size;
                    const end = start + param.size
                    const res = {
                        success: true,
                        object: {
                            totalCounts: data.length,
                            data: data.slice(start, end)
                        }
                    }
                    if (res.success === true && res.object) {
                        this.sendAreaList = res.object.data
                        this.sendAreaListTotal = res.object.totalCounts
                        // 表格渲染完不要立即执行选中操作，会选不上的...
                        this.$nextTick(function () {
                            this.updateSendAreaCheckStatus()
                        })
                    }else{
                        this.$message.error('获取数据失败')
                    }
                },500)
            }
        }
    }
</script>

<style scoped lang="scss">
    .sendArea-dialog {
        // scss和vue-loader结合，不能使用＂>>>＂，要用＂/deep/＂
        & /deep/ .el-dialog {
            margin-top: 9vh !important;
        }
    }
    .sendArea-box {
        display: flex;
    }
    .sendArea-available-panel {
        flex: 1;
    }
    .sendArea-selected-panel {
        width: 20vw;
        position: relative;
        padding: 1px 20px 16px;
        max-height: 414px;
        overflow: auto;
    }
    .sendArea-item {
        margin-bottom: 10px;
    }
    .sendArea-empty {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
    .dialog-page {
        margin-top: 20px;
    }
</style>
```

两个核心方法

* @select="handleSendAreaSelect"
* @select-all="handleSendAreaSelectAll"

*（可运行代码见`demo`目录中的`vue-develop-env`）*

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191216173508.png)

### el-table加上分页的序号

```html
<el-table>
    <!-- 序号 -->
    <el-table-column
                     width="60"
                     align="center"
                     label="序号"
                     :index="getNo"
                     type="index">
    </el-table-column>
</el-table>
<script>
export default {
        data() {
            return {
                query: {
                    page: 1,
                    size: 10
                }
            }
        },
        methods: {
            getNo(index) {
                // 加上分页的序号
                return (this.query.page-1)*this.query.size + index + 1
            }
        }
    } 
</script>
```



### el-form @submit.native.prevent

W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

> *When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.*

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `` 标签上添加 `@submit.native.prevent`。

```html
<el-form @submit.native.prevent>
<!-- ... -->
</el-form>
```



### 点击行触发checkbox选中

```html
<el-table ref="myTable" @row-click="handleRowClick">
    <el-table-column align="center"  type="selection"  width="55">
    </el-table-column>
</el-table>
<script>
export default {
        methods: {
            handleRowClick(row) {
                var tableInstance = this.$refs['myTable'];
                tableInstance.toggleRowSelection(row);
            }
        }
    }
</script>
```



### el-dialog与before-close

会造成弹窗关闭失效，要自己手动关闭

```html
<el-dialog :visible.sync="dialogVisible" :before-close="closeModelDialog"></el-dialog>

<script>
export default {
        data() {
            return {
                dialogVisible: true
            }
        },
        methods: {
            closeModelDialog() {
                // 需要自己手动关闭！！！
                this.dialogVisible = false;
            }
        }
    }
</script>
```



### el-tooltip宽度

```html
<el-tooltip popper-class="my-tooltip" effect="dark" content="测试" placement="top">
    <i class="el-icon-info"></i>
</el-tooltip>
 
<style>
    .my-tooltip {
        /* 设置完宽度后，会自动换行 */
        width: 30vw;
    }
</style>
```









