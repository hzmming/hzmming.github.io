---
title: ECharts使用
date: 2019-09-23
tags:
  - 可视化
  - ECharts
categories:
  - 可视化
---

[TOC]

*ECharts本身[配置项](https://www.echartsjs.com/zh/option.html)详细，且自带的[教程](https://www.echartsjs.com/zh/tutorial.html)也挺详细的，所以该笔记只简单的记录下，以自己的视角理解及补充*．

*如若想学习ECharts建议先把官方教程过一遍，再看本笔记*

*( 当前版本：ECharts 4.5.0 )*

### 概览

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209100858.png)

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209100925.png)

![image-20191209100947530](/home/loryhuang/.config/Typora/typora-user-images/image-20191209100947530.png)

*( 参考自ECharts官方[在线定制](https://www.echartsjs.com/zh/builder.html)页面 )*

### 个性化样式

*参考自[个性化图表的样式](https://www.echartsjs.com/zh/tutorial.html#个性化图表的样式)、[ECharts中样式简介](https://www.echartsjs.com/zh/tutorial.html#ECharts 中的样式简介)*

可以从3个层面设置样式，`全局`、`系列`、`数据`

#### 全局

1. 调色板及背景色和字体样式

   如果没有额外设置，ECharts默认会从调色板取颜色

   ```javascript
   // https://www.echartsjs.com/zh/option.html#color
   option = {
       // 全局调色盘。
       color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
   }
   ```

   整个图表的背景色

   ```javascript
   // https://www.echartsjs.com/zh/option.html#backgroundColor
   option = {
       backgroundColor: '#61a0a8'
   }
   ```

   全局的字体样式

   ```javascript
   // https://www.echartsjs.com/zh/option.html#textStyle
   option = {
       textStyle: {
           color: '#fff',
           fontWeight: 'bold',
           // ...
       }
   }
   ```

   

2. 颜色主题

   ECharts4 开始，除了一贯的默认主题外，新内置了两套主题，分别为 `'light'` 和 `'dark'`。可以这么来使用它们

   ```javascript
   var chart = echarts.init(dom, 'light');
   // or
   // var chart = echarts.init(dom, 'dark');
   ```

   其他的主题，没有内置在 ECharts 中，需要自己加载。

   如果主题保存为 JSON 文件，那么可以自行加载和注册，例如：

   ```javascript
   // 假设主题名称是 "vintage"
   $.getJSON('xxx/xxx/vintage.json', function (themeJSON) {
       echarts.registerTheme('vintage', JSON.parse(themeJSON))
       var chart = echarts.init(dom, 'vintage');
   });
   ```

   如果保存为 UMD 格式的 JS 文件，那么支持了自注册，直接引入 JS 文件即可：

   ```javascript
   // HTML 引入 vintage.js 文件后（假设主题名称是 "vintage"）
   var chart = echarts.init(dom, 'vintage');
   // ...
   ```

3. 视觉映射

   这个看之后的`visualMap`篇章

#### 系列

1. 调色板

   ```javascript
   option = {
       series: [{
           type: 'bar',
           // 此系列自己的调色盘。
           color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
           // ...
       }, {
           type: 'pie',
           // 此系列自己的调色盘。
           color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
           // ...
       }]
   }
   ```

2. 样式设置

   一般来说，ECharts 的各个系列和组件，都遵从相同命名习惯，很多地方可以设置 [itemStyle](https://www.echartsjs.com/zh/option.html#series.itemStyle)、[lineStyle](https://www.echartsjs.com/zh/option.html#series-line.lineStyle)、[areaStyle](https://www.echartsjs.com/zh/option.html#series-line.areaStyle)、[label](https://www.echartsjs.com/zh/option.html#series.label) 等等。默认情况下，高亮的样式是根据普通样式自动生成的。但是高亮的样式也可以自己定义，主要是通过 [emphasis](https://www.echartsjs.com/zh/option.html#series-scatter.emphasis) 属性来定制

   ```javascript
   option = {
       series: {
           type: 'scatter',
   
           // 普通样式。
           itemStyle: {
               // 点的颜色。
               color: 'red'
           },
           
           // 标签样式
           label: {
               show: true,
               formatter: 'This is a normal label.',
               color: 'blue',
               // ...
           },
           
           // 更多样式设置自行查看配置项文档
           // ...
   
           // 高亮样式。
           emphasis: {
               itemStyle: {
                   // 高亮时点的颜色。
                   color: 'blue'
               },
               label: {
                   show: true,
                   // 高亮时标签的文字。
                   formatter: 'This is a emphasis label.'
               }
           }
       }
   }
   ```

#### 数据

ECharts 中的数据项都是既可以只设成数值，也可以设成一个包含有名称、该数据图形的样式配置、标签配置的对象，具体见 [data](https://www.echartsjs.com/zh/option.html#series-pie.data) 文档

```javascript
[{
    name: '数据1',
    value: 10
}, {
    // 数据项名称
    name: '数据2',
    value : 56,
    //自定义特殊 tooltip，仅对该数据项有效
    tooltip:{},
    //自定义特殊itemStyle，仅对该item有效
    itemStyle:{}
}]
```

### 设置legend

以饼图为例

```javascript
option = {
    // 默认会取自 series.name 或者 series.encode 的 seriesName 所指定的维度
    // 顺序默认按物理位置
    legend: {
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209165917.png)

如果想调整`legend`的显示顺序呢？

```javascript
option = {
    // 不存在的seriesName会自动忽略
    legend: {
        data: ['搜索引擎', '视频广告', '联盟广告', '邮件营销', '直接访问']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209170752.png)

如果不想显示某个系列呢？

没找着关闭系列legend的属性，但可以设置显示部分系列达到相同效果

```javascript
option = {
    // 只显示指定系列名称
    legend: {
        data: ['搜索引擎', '视频广告']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209170907.png)

### tooltip小圆点丢失

```javascript
option = {
     tooltip: {
        trigger: 'item',
        formatter: function (params) {
            // 使用formatter会造成前面的小园点丢失，使用params.marker补上
            return params.marker + params.name + '：' + params.value[2] // 此处val取值自己视情况而定
        }
    }
}
```



### 拆线图夹层

```javascript
option = {
    xAxis: {
        type: 'category',
        boundaryGap: false, // 类目轴两边默认会有留白，设为false去掉
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        stack: '堆叠' // 设置相同stack达到堆叠效果（https://www.echartsjs.com/examples/zh/editor.html?c=area-stack）
    },{
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        type: 'line',
        stack: '堆叠',
        areaStyle: {} // 使用areaStyle表示填充区域颜色（https://www.echartsjs.com/examples/zh/editor.html?c=area-basic）
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209103945.png)

可以看到两条`line`的颜色及线上的圆点非常多余，并且连线不够光滑，再给它优化下

```javascript
// 参考自 https://www.echartsjs.com/examples/zh/editor.html?c=confidence-band
option = {
    xAxis: {
        type: 'category',
        boundaryGap: false, // 类目轴两边默认会有留白，设为false去掉
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true, // 设为光滑曲线
        symbol: 'none', // 去除连线上的圆点
        // showSymbol设为false好像也行，但如果有tooltip效果，圆点还会显示出来，所以不行
        // showSymbol: false,
        lineStyle: {
            opacity: 0 // 使连线看不到
        },
        stack: '堆叠' // 设置相同stack达到堆叠效果（https://www.echartsjs.com/examples/zh/editor.html?c=area-stack）
    },{
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        type: 'line',
        smooth: true, // 设为光滑曲线
        stack: '堆叠',
        symbol: 'none',
        lineStyle: {
            opacity: 0
        },
        areaStyle: {} // 使用areaStyle表示填充区域颜色（https://www.echartsjs.com/examples/zh/editor.html?c=area-basic）
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209111829.png)

### 饼图标签覆盖

当饼图数据项过多时，会造成饼图的label（即各数据项名称）重叠，可能是不知情的情况下配置了`avoidLabelOverlap`属性，将其设置为`true`即可解决

```javascript
option = {
    series: [
        {
            type: 'pie',
            avoidLabelOverlap: true // 默认为true，避免label重叠
        }
    ]
}
```

### 标签旋转

空间不够时，可以旋转标签来呈现更多标签

```javascript
option = {
    xAxis: {
        axisLabel: {
            rotate: 45
        }
    }
}
```

### 防止直角坐标系标签溢出

```javascript
// https://www.echartsjs.com/zh/option.html#grid.containLabel
option = {
    grid: {
        containLabel: true // 默认为false
    }
}
```



### 数据更新（合并）

不管是数据还是配置项，都是通过[`setOption`](https://www.echartsjs.com/zh/api.html#echartsInstance.setOption)

调用方式：

```js
chart.setOption(option, notMerge, lazyUpdate);
```

或者

```js
chart.setOption(option, {
    notMerge: ...,
    lazyUpdate: ...,
    silent: ...
});
```

- `option`

    图表的配置项和数据，具体见[配置项手册](https://www.echartsjs.com/zh/option.html)。

- `notMerge`

    可选，是否不跟之前设置的 `option` 进行合并，默认为 `false`，即合并。

- `lazyUpdate`

    可选，在设置完 `option` 后是否不立即更新图表，默认为 `false`，即立即更新。

- `silent`

    可选，阻止调用 `setOption` 时抛出事件，默认为 `false`，即抛出事件。

**例**：假设当前有拆线图，如下

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'first',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        },
        {
            name: 'second',
            data: [630, 521, 190, 324, 920, 10, 1010],
            type: 'line'
        },
    ]
};

```

如果想要修改第二条拆线图的数据，只需这样

**方法一：**物理位置

```javascript
chart.setOption({
    series: [
        {},
        {
            data: [190, 324, 521, 4, 1290, 1330,820 ] // 只需保证该系列所在的位置一致，echarts会自动合并覆盖
        }
    ]
})
```

**方法二：**唯一标识符（id或name）

```javascript
chart.setOption({
    series: [
        {
            name: 'second', // 摆脱物理限制，直接指定系列名称
            // 若有指定id，使用id也同样可以
            data: [190, 324, 521, 4, 1290, 1330,820 ] 
        }
    ]
})
```



### 柱状图作背景

想做出如下效果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209152311.png)

每根柱子的背后还有个灰色的柱子样式，就好像是空柱子没被完全填满的感觉

```javascript
// 使用两个系列（即两根柱子），调整其间距
option = {
    series: [
        {
            type: 'bar',
            barGap:'-100%', // barGap表示bar系列之间的间距，'-100%'即完全重合
        },
        {
            type: 'bar',
            // ...
        }
    ]
}

// 更完整的配置看官方demo：https://www.echartsjs.com/examples/zh/editor.html?c=bar-gradient
```

### 渐变色

早期版本（不建议）

```javascript
option = {
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            }
        }
    ]
}
```

上面这种用法只在官方demo中看得到，配置项或api手册里已经没有相关介绍了，也就是不建议使用了

推荐用法

```javascript
// 随便一个配置颜色的教程均可
// https://www.echartsjs.com/zh/option.html#backgroundColor
option = {
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0, 
                    x2: 0, 
                    y2: 1,
                    // 定义关键帧
                    colorStops: [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                }
            }
        }
    ]
}
```



### dataZoom

应用场景：以柱状图为例，若数据项过多，即柱子过多，有限的屏幕根本无法完全显示所有柱子，`dataZoom`便派上用场

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130, 80, 70, 110, 130],
        type: 'bar'
    }],
    dataZoom: [
        // 如果什么参数都不指定，默认为slider类型，且控制x轴
        {
            // type: 'slider'
        } 
    ]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209163600.png)

`orient`、`xAxisIndex`、`yAxisIndex`用于设置该`dataZoom`控制`x轴`还是`y轴`

```javascript
option = {
    dataZoom: [
        { orient: 'horizontal' }, // 控制水平x轴（多坐标轴时，默认第一个）
        { orient: 'vertical' }, // 控制垂直y轴（多坐标轴时，默认第一个）
        { xAxisIndex: 1}, // （多坐标轴时）控制第二个x轴
        { xAxisIndex: [1,2] }, // （多坐标轴时）同时控制第二个和第三个x轴
        { yAxisIndex: 1}, // （多坐标轴时）控制第二个y轴
        { yAxisIndex: [1,2] } // （多坐标轴时）同时控制第二个和第三个y轴
    ]
}
```

使用`type`为`inside`的`dataZoom`添加图表的**鼠标缩放**、**拖拽**功能

```javascript
option = {
    dataZoom: [
        // 默认slider类型，表现为外化的可拖拽slider
        {},
        // inside类型dataZoom，无界面展示，表现为控制层面，可通过鼠标缩放、拖拽
        {
            type: 'inside'
        }
    ]
}
```

默认显示全部区域，可指定显示区域

使用`start`、`end`指定显示范围的起始百分比

```javascript
option = {
    dataZoom: [
        {
            start: 60,
            end: 90
        },
        {
            type: 'inside', // inside和slider的start、end应该设置相同值吧
            start: 60,
            end: 90
        }
    ]
}
```

使用`startValue`、`endValue`指定显示范围的绝对值，需注意，若设置了`start`、`end`则`startValue`、`endValue`失效

```javascript
option = {
    dataZoom: [
        {
            startValue: 60,
            endValue: 90
        },
        {
            type: 'inside', // inside和slider的start、end应该设置相同值吧
            startValue: 60,
            endValue: 90
        }
    ]
}
```



### visualMap

*参考自[数据的视觉映射](https://www.echartsjs.com/zh/tutorial.html#%E6%95%B0%E6%8D%AE%E7%9A%84%E8%A7%86%E8%A7%89%E6%98%A0%E5%B0%84)*

visualMap 组件定义了把数据的『哪个维度』映射到『什么视觉元素上』

以柱状图为例

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }],
    visualMap: {
        // 默认连续型，但不建议省略，表意不清
        // type: 'continuous'
    }
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209184051.png)

应该是默认将`数据`映射到`color`上（从效果来看，我猜的）

```javascript
option = {
    visualMap: {
        // 指明分段型
        type: 'piecewise'
    }
};
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191209185538.png)

分段型视觉映射组件（visualMapPiecewise），有三种模式：

- 连续型数据平均分段: 依据 [visualMap-piecewise.splitNumber](https://www.echartsjs.com/zh/option.html#visualMap-piecewise.splitNumber) 来自动平均分割成若干块。
- 连续型数据自定义分段: 依据 [visualMap-piecewise.pieces](https://www.echartsjs.com/zh/option.html#visualMap-piecewise.pieces) 来定义每块范围。
- 离散数据（类别性数据）: 类别定义在 [visualMap-piecewise.categories](https://www.echartsjs.com/zh/option.html#visualMap-piecewise.categories) 中

**例**：

```javascript
option = {
    visualMap: [
        {
            type: 'piecewise',
            
            // 若没有设置，echarts自动设置[min, max] 为 [0, 数据的最大值]
            min: 0,
            max: 5000,
            
            // 默认取最后一个维度
            // 此处设置series.data 的第四个维度（即 value[3]）被映射
            dimension: 3,      
            
            // 对第四个系列进行映射。若同时映射多个系列可使用数组，eg: [3,4]
            seriesIndex: 4,   
            
            // 选中范围中的视觉配置
            inRange: {          
                color: ['blue', '#121122', 'red'], // 定义了图形颜色映射的颜色列表，
                                                    // 数据最小值映射到'blue'上，
                                                    // 最大值映射到'red'上，
                                                    // 其余自动线性计算。
                symbolSize: [30, 100],               // 定义了图形尺寸的映射范围，
                                                    // 数据最小值映射到30上，
                                                    // 最大值映射到100上，
                                                    // 其余自动线性计算。
                colorLightness: [0.2, 1], // 映射到明暗度上。也就是对本来的颜色进行明暗度处理。
                                          // 本来的颜色可能是从全局色板中选取的颜色，visualMap组件并不关心。
            },
            outOfRange: {       // 选中范围外的视觉配置
                symbolSize: [30, 100]
            }
        },
        ...
    ]
};
```



### axisPointer（坐标指示器）

坐标轴指示器在多轴的场景能起到辅助作用，效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191210164821.png)

有3种开启`axisPointer`的方法

* 全局axisPointer
* `tooltip.axisPointer`
* 各轴自己的axisPointer（如`xAxis.axisPointer`、`yAxis.axisPointer`）

#### 全局axisPointer

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }],
    axisPointer: {
        show: true,
        // type: 'line' // 默认直线指示器，且同时开启x轴、y轴
        // type可选值：'line', 'shadow', 'none'，值得注意的是，如果设为shadow，只有x轴会变成阴影指示器，y轴还是正常的line
    }
};

```



#### tooltip.axisPointer

```javascript
option = {
    tooltip: {
        // 直角坐标系下，默认显示x轴指示器
        trigger: 'axis'
    }
}
```

```javascript
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            axis: 'y' // 设置显示哪个轴，可选值：x，y，radius，angle
        }
    }
}
```

```javascript
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // 设置指示器类型
            type: 'cross' // cross表示启用两个正交的轴的axisPointer，如x轴，y轴的axisPointer
        }
    }
}
```



#### 各轴自己的axisPointer

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
            // 需显示设置打开！
            show: true
        }
    }
}
```

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
            show: true,
            type: 'shadow' // 默认'line'. 可选值：'line', 'shadow', 'none'
        }
    }
}
```

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
            show: true,
            type: 'shadow' // 默认'line'. 可选值：'line', 'none'
            // y轴不支持设置shadow类型，若设了，效果和line类型一样
        }
    }
}
```



### geo与series.map（地图）

#### geo

1. 注册地图数据

   `echarts`官网说是不提供下载地图数据了，但实际上其npm包代码中还是可以找到的

   ```shell
   ├── map
   │   ├── js
   │   │   ├── china-contour.js
   │   │   ├── china.js
   │   │   ├── province
   │   │   └── world.js
   │   └── json
   │       ├── china-cities.json
   │       ├── china-contour.json
   │       ├── china.json
   │       ├── province
   │       └── world.json
   ```

   可以看到分为`js`和`json`两个文件夹，自己看下`js`里的内容，其实地图数据本质上`json`存放就够了，`js`无非就是多加了一句**注册地图代码**

   ```javascript
   echarts.registerMap('china', { /*... */ })
   ```

   所以引用地图数据js文件时，要保证已导入`echarts`，不然会报错

   我们以`json`文件为例，自己注册

   ```javascript
   const res = await axios.get('./map/json/china.json')
   // 注册的地图名称由自己决定，之后会再用到
   echarts.registerMap('china', res.data)
   ```

   > 阿里有提供一个下载地图的[网站](http://datav.aliyun.com/tools/atlas/)

   

2. 渲染

   ```html
   <div id="container"></div>
   ```

   

   ```javascript
   const container = document.getElementById('container')
   const chart = echarts.init(container)
   chart.setOption({
       geo: {
           // 使用之前注册的地图名称
           map: 'china',
           // zoom: 2.2, // 缩放比例
           roam: true, // 开启鼠标缩放和拖拽
           label: {
               show: true // 默认显示地区名称（eg：中国地图是省份，世界地图是国家）
           }
       }
   })
   ```

   效果如下

   ![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191210210011.png)

#### series.map

基本代码

```html

<script src="./echarts.js"></script>
<!-- 此处以js文件为例，其内部自注册为'china' -->
<script src="./map/json/china.js"></script>
<div id="container"></div>
```

```javascript
const container = document.getElementById('container')
const chart = echarts.init(container)
chart.setOption({
    series: [{
        type: 'map',
        // 使用之前注册的地图名称
        map: 'china',
        // zoom: 2.2, // 缩放比例
        roam: true, // 开启鼠标缩放和拖拽
        label: {
            show: true // 默认显示地区名称（eg：中国地图是省份，世界地图是国家）
        }
    }]
})
```

效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191210210702.png)

#### 区别

可以看到，`geo`与`series.map`都可以画出地图，且配置项又几乎一样，那它们俩的区别是啥呢？

* `geo`是`ECharts`的一种坐标系，可以在上面画散点图(scatter)或者轨迹图(lines)．

* `series.map`是一种图表(ECharts内部用系列series表示)，使用`visualMap`为地图上色时就要用`series.map`

#### 同步

有些时候，需要同时使用到`geo`与`series.map`，比如一张地图，既要使用`visualMap`上色，又要在上面绘制`scatter`散点图．如果`geo`和`series.map`都配置了`roam`属性，也就是都可以缩放、拖拽，会发现一个很严重的问题，就是二者不同步，一次只能拖拽或者缩放一张地图，如下

```javascript
option = {
    geo: {
        map: 'china',
        roam: true
    },
    series: [{
        type: 'map',
        map: 'china',
        roam: true,
    }]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211193214.png)

> 默认情况下，map series 会自己生成内部专用的 `geo` 组件。但是也可以用这个 `geoIndex` 指定一个 [geo](https://www.echartsjs.com/zh/option.html#geo) 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 [geo](https://www.echartsjs.com/zh/option.html#geo) 组件了。并且，[geo](https://www.echartsjs.com/zh/option.html#geo) 组件的颜色也可以被这个 map series 控制，从而用 [visualMap](https://www.echartsjs.com/zh/option.html#visualMap) 来更改。
>
> 当设定了 `geoIndex` 后，[series-map.map](https://www.echartsjs.com/zh/option.html#series-map.map) 属性，以及 [series-map.itemStyle](https://www.echartsjs.com/zh/option.html#series-map.itemStyle) 等样式配置不再起作用，而是采用 [geo](https://www.echartsjs.com/zh/option.html#geo) 中的相应属性。
>
> 来源于https://www.echartsjs.com/zh/option.html#series-map.geoIndex

所以，只要让`series.map`不生成自己的`geo`组件，共用同一个`geo`组件就能解决

**解决方案**

```javascript
option = {
    geo: {
        map: 'china',
        roam: true
    },
    series: [{
        type: 'map',
        map: 'china',
        roam: true,
        geoIndex: 0 // 核心！！！
    }]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211193754.png)

#### 美化

可以看到默认的样式非常难看，以`geo`地理坐标系为例

```javascript
const chart = echarts.init(container)
chart.setOption({
    // 整张图的背景色
    backgroundColor: '#080a20',

    // 标题
    title: {
        // 是否显示
        show: true,
        // 文本内容
        text: '轨迹迁移',
        // 距离左边界位置
        left: 'center',
        // 距离上边界位置
        top: '20%',
        // 文本样式
        textStyle: {
            // 文本颜色
            color: '#fff'
        }
    },
    geo: {
        map: 'china',

        // 地图文字样式
        label: {
            // 高亮状态样式（echarts的高亮就是鼠标悬浮状态）
            emphasis: {
                //  高亮状态不显示文本
                show: false
            }
        },

        // 长宽比例，aspectScale = width/height，所以小于1表示长比宽窄，注意，会造成图形变形！
        // aspectScale: 0.65,

        // zoom: 2.2,

        // 不显示地图
        // show: false,

        roam: true,
        // 开启roam（缩放）的情况下，限制其缩放比例范围
        scaleLimit: {
            min: 0.6,
            max: 2
        },

        // 地图区域样式（中国地图是省份，世界地图是国家）
        itemStyle: {
            // 区域背景色
            areaColor: '#132937',

            // 区域边框色
            borderColor: '#0692a4',

            //  区域高亮状态样式
            emphasis: {
                areaColor: '#0b1c2d'
            }
        }
    }
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211100156.png)

### geo与regions

#### 部分地区样式定制

想要单独调整某些地区的样式，要怎么办呢？

例：在上一节美化后，想再单独把**广东**的**边界高亮**

```javascript
const regions = [
    {
        name: '广东',
        itemStyle: {
            borderColor: 'red'
        }
    }
]

chart.setOption({
    // ...
    geo: {
        // ...
        regions
    }
})
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211103117.png)

#### 优先级

仔细看我们的图却发现`广东`与`广西`接壤的边界线**没有高亮**，这是为什么？

> 前置知识：`canvas`并没有`z-index`的概念，因为画布中的图形元素对于`canvas`只是像素点而已，它并不识别画布上一个个图形元素（比如此处的省份），所有`canvas框架`都为我们封装了**图形元素识别**这一层（无非是利用鼠标点击位置判断是否在图形元素内），所以**`canvas`的优先级就是后画的图形遮盖先前画的图形**

此处很明显`广西`比`广东`绘画的晚，所以`广西`盖住了｀广东｀

那怎么让要定制样式的省份放到后面渲染呢？

**写这篇笔记时，还没找到解决方案...**

我用了个临时方案，修改地图数据`china.json`，如果`ECharts`没有提供支持的话，至少它还是按照省份数据的物理位置渲染的（简单的想下，无非就是个for循环）

**临时方案一：将要定制样式的省份数据挪到最后面**

可想而知，这个方案有个缺陷，比如有套系统同时有两张地图，一个要高亮广西，一个要高亮广东，二者明显不可兼得，难不成还要再复制一份地图数据出来？

**临时方案二：在注册地图时调整数据**

其实无非就是不调整物理数据，而是加工内存中的数据，这样，内存中就可以有多份不一样的地图数据，而只有一份物理数据（这方案和上一个方案无非是五十步和百步的区别...）

```javascript
// 获取中国地图数据
const res = await axios.get('../node_modules/echarts/map/json/china.json');
// 需要置底的数据
const stickyBottom = ['广东']
// sort排序的效果：返回负数往前靠，正数往后靠
res.data.features = res.data.features.sort(item => stickyBottom.indexOf(item.properties.name))
echarts.registerMap('china', res.data)
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211110755.png)

可以看到，广东的整个轮廓都正常地高亮了

### series.map与visualMap

```javascript
const data = [
    {name: '北京', value: '100'}, {name: '天津', value: randomData()},
    {name: '上海', value: randomData()}, {name: '重庆', value: randomData()},
    {name: '河北', value: randomData()}, {name: '河南', value: randomData()},
    {name: '云南', value: randomData()}, {name: '辽宁', value: randomData()}
]

const container = document.getElementById('container')
const chart = echarts.init(container)
chart.setOption({
    series: [{
        type: 'map',
        // 使用之前注册的地图名称
        map: 'china',
        // zoom: 2.2, // 缩放比例
        roam: true, // 开启鼠标缩放和拖拽
        label: {
            show: true // 默认显示地区名称（eg：中国地图是省份，世界地图是国家）
        },
        // 传入[{name: '北京', value: 30}, {name: 'XX', value: 15}, ...]数据格式
        // name需要与地图地区数据名称一致，比如传个'北京市'而地图数据中是'北京'，这条数据就废了
        data
    }],
    visualMap: {}
})
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211093454.png)

可以看到只上色了部分省份，因为传入的`data`就只有那几个省份，两种情况不会上色

* 其它省份没有数据（比如 `{name: '青海', value: 98}`）
* 有数据但没有value（比如 `{name: '青海'}`），记住，**即使没有value值，给value设为0还是会上色的，也就是不要有value这个属性**

### geo与scatter

实现如下效果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211152743.png)

```javascript
const chart = echarts.init(container)
const option = {
    // 开启散点图的tooltip
    // 说好的series也可以单独设置tooltip呢？试了下反正不起作用
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            // 默认取value[1]，即第二个值.但散点图结合geo时，前两个值是经纬度，手动取第三个值
            // 使用formatter会造成前面的小园点丢失，使用params.marker补上
            return params.marker + params.name + '：' + params.value[2]
        }
    },
    geo: {
        // 按照之前美化的代码
        // ...省略
    },
    series: [
        {
            type: 'scatter',
            coordinateSystem: "geo", // 指定坐标系，一定要设置！！

            // 散点大小
            // symbolSize: 20,
            // 支持回调函数
            symbolSize: function(val){
                // val数据结构：[x, y, value]，x和y其实就是经度和纬度，value值才是真实数据
                const tmp = 30 * val[2]/10;
                return tmp < 20 ? 20 : tmp > 30 ? 30 : tmp // 保证size在[20,30]之间
            },

            // 圆点样式
            itemStyle: {
                // 透明度．注意：此透明度会作用到label，文本也会变透明而显示不清！暂未找到解决方案
                opacity: 0.65,
                // ...
            },

            // 开启标签显示
            label: {
                // 设置为true表明显示
                show: true,

                // 文本位置
                position: 'top',

                // 定制显示文本内容
                formatter: function (e) {
                    // 默认会显示val[1]，显示成纬度了，手动设置成val[2]并加上省份名称
                    return e.name + '(' + e.value[2] + ')'
                },

                // 文本样式
                textStyle: {
                    color: "#FFF",
                    fontSize: 12,
                    fontWeight: 'bold'
                }
            }
        }
    ]
}

// 数据
// 格式要求为 [{"name":"新疆","value":[87.36,43.45,126323]}, ...]
option.data = [
    {"name":"新疆","value":[87.36,43.45,126323]},
    {"name":"北京","value":[116.413554,39.911013,1320]}
]

chart.setOption(option)
```

修改symbol类型，可以达到如下效果

```javascript
option = {
    series: [
        {
            // ...
            symbol: 'pin'
            // symbol还支持好多类型，见https://www.echartsjs.com/zh/option.html#series-scatter.symbol
            // ...
        }
    ]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211161038.png)

**有一个`核心问题`：各省市的经纬度坐标从哪里来？**

见下一节，经纬度数据

### 经纬度数据

`ECharts`地图打点，本质上是在指定的`经纬度`上画`scatter`，它并不识别这个点是新疆还是北京，只要你给了经纬度，地名爱叫什么随你乐意，所以我们需要有一份各省市经纬度

**简单点，网上搜下就有了^_^**

或者自己动手，丰衣足食．`ECharts`官方npm包实际上有提供

```shell
./map
└── json
    ├── china-cities.json

```

`china-cities.json`底下有各个地市的数据，打开一看

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/1576050987.png)

将所有`cp`取出来，就可以了

如果是世界地图打点，`ECharts`官方还真没提供了，自行搜各国经纬度就行

#### 注意

个人觉得经纬度这份数据完全可以存进数据库，前端打点只要经纬度而已，而如果前端存储经纬度数据，后端给地名前端自己获取的话，容易出现地名对不上的问题．比如后端返回`合肥市`，而前端数据是`合肥`，这就对不上了．这还只是比较简单的情况，再比如，后端返回数据叫`大理白族自治州`，而前端是`大理`，这又对不上了...

如果非要前端处理经纬度，那必须约定好名称，不要一会叫`大理白族自治州`，一会叫`大理`，很不专业欸

### geo与lines

*（参考自https://www.echartsjs.com/examples/en/editor.html?c=geo-lines）*

实现如下效果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211162529.png)

#### 第一步，画出背景

```javascript
option = {
    backgroundColor: '#404a59',
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
    ]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211163143.png)

#### 第二步，画出轨迹的终止点

假设数据为

```javascript
const simulateData = [
    {start:'北京', end:'上海', value:95},
    {start:'北京', end:'广州', value:90},
    {start:'北京', end:'大连', value:80},
    {start:'北京', end:'南宁', value:70},
    {start:'北京', end:'南昌', value:60},
    {start:'北京', end:'拉萨', value:50},
    {start:'北京', end:'长春', value:40},
    {start:'北京', end:'包头', value:30},
    {start:'北京', end:'重庆', value:20},
    {start:'北京', end:'常州', value:10}
]
```

所有城市经纬度如下

```javascript
const geoCoordMap = {
    '上海': [121.4648,31.2891],
    '东莞': [113.8953,22.901],
    '东营': [118.7073,37.5513],
    '中山': [113.4229,22.478],
    '临汾': [111.4783,36.1615],
    '临沂': [118.3118,35.2936],
    '丹东': [124.541,40.4242],
    // ...省略
}
```

获取结束点数据，并加工成所需数据格式

```javascript
// 所需数据格式：[ { name: '地名',  value: ['经度', '纬度', '数据值'] } ]
const endPoints = simulateData.map(item => (
    {
        name: item.end,
        value: geoCoordMap[item.end].concat(item.value)
    }
))
```

添加series系列

```javascript
option = {
    series: [
        // 轨迹结束点
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            // 涟漪特效相关配置（https://www.echartsjs.com/zh/option.html#series-effectScatter.rippleEffect）
            rippleEffect: {
                brushType: 'stroke' // 波纹的绘制方式，可选 'stroke' 和 'fill'
            },

            // 显示地名
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },

            // 调整scatter点的大小
            symbolSize: function (val) {
                return val[2] / 8;
            },

            itemStyle: {
                color: '#a6c84c'
            },
            data: endPoints
        }
    ]
}

```

效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211170315.png)

#### 第三步，绘制飞机轨迹

获取连线数据

```javascript
const lines = simulateData.map(item => (
    {
        coords: [geoCoordMap[item.start], geoCoordMap[item.end]]
    }
))
```

添加series

```javascript
option = {
    series: [
        // 飞机轨迹
        {
            type: 'lines',
            lineStyle: {
                color: '#a6c84c',
                width: 1,
                opacity: 0.6,
                // 连线曲度，不设置的话就是直线，不好看
                curveness: 0.2
            },
            data: lines
        }
    ]
}
```

效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211183127.png)

添加运动的点（开启动效）

```javascript
option = {
    series: [
        // 飞机轨迹
        {
            type: 'lines',
            
            // 不懂这里为什么要这样设置
            zlevel: 2,
            
            // 开启动效
            effect: {
                show: true,
                // 动画时间，单位秒
                period: 6,
                // 这个特效尾迹会随着symbolSize调整大小，特别的丑，所以不要这个，待会另起个lines用来显示尾迹
                trailLength: 0,
                symbolSize: 15
            },
            
            lineStyle: {
                color: '#a6c84c',
                width: 1,
                opacity: 0.6,
                // 连线曲度，不设置的话就是直线，不好看
                curveness: 0.2
            },
            data: lines
        }
    ]
}
```

效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211183734.png)

将圆点更换为飞机模型

```javascript
const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

option = {
    series: [
        // 飞机轨迹
        {
            type: 'lines',
            
            // 不懂这里为什么要这样设置
            zlevel: 2,
            
            // 开启动效
            effect: {
                show: true,
                // 动画时间，单位秒
                period: 6,
                // 这个特效尾迹会随着symbolSize调整大小，特别的丑，所以不要这个，待会另起个lines用来显示尾迹
                trailLength: 0,
                symbol: planePath, // 指定为飞机模型
                symbolSize: 15
            },
            
            lineStyle: {
                color: '#a6c84c',
                width: 1,
                opacity: 0.6,
                // 连线曲度，不设置的话就是直线，不好看
                curveness: 0.2
            },
            data: lines
        }
    ]
}
```

效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211184206.png)

#### 第四步，添加炫光尾迹

```javascript
option = {
    series: [
        // 炫光尾迹
        {
            type: 'lines',

            // 这个一定要设，不设的话尾迹效果不对．我也不懂～～
            zlevel: 1,

            effect: {
                show: true,

                // 动效周期和飞机轨迹保持一致
                period: 6,

                // 数值越大，尾迹越长
                trailLength: 0.7,

                // 尾迹颜色
                color: '#fff',

                // 这个大小就够了
                symbolSize: 3
            },
            lineStyle: {
                color: '#a6c84c',
                width: 0,
                curveness: 0.2
            },
            data: lines
        }
    ]
}
```

先单独看下其效果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211191014.png)

结合起来，最终效果

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211191121.png)

#### 完整代码

```javascript
const geoCoordMap = {
    '上海': [121.4648,31.2891],
    '东莞': [113.8953,22.901],
    '东营': [118.7073,37.5513],
    '中山': [113.4229,22.478],
    '临汾': [111.4783,36.1615],
    '临沂': [118.3118,35.2936],
    '丹东': [124.541,40.4242],
    // ...省略
}

const simulateData = [
    {start:'北京', end:'上海', value:95},
    {start:'北京', end:'广州', value:90},
    {start:'北京', end:'大连', value:80},
    {start:'北京', end:'南宁', value:70},
    {start:'北京', end:'南昌', value:60},
    {start:'北京', end:'拉萨', value:50},
    {start:'北京', end:'长春', value:40},
    {start:'北京', end:'包头', value:30},
    {start:'北京', end:'重庆', value:20},
    {start:'北京', end:'常州', value:10}
]

const endPoints = simulateData.map(item => (
    {
        name: item.end,
        value: geoCoordMap[item.end].concat(item.value)
    }
))

const lines = simulateData.map(item => (
    {
        coords: [geoCoordMap[item.start], geoCoordMap[item.end]]
    }
))

const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

const option = {
    backgroundColor: '#404a59',
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        // 轨迹结束点
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            // 涟漪特效相关配置（https://www.echartsjs.com/zh/option.html#series-effectScatter.rippleEffect）
            rippleEffect: {
                brushType: 'stroke' // 波纹的绘制方式，可选 'stroke' 和 'fill'
            },

            // 显示地名
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },

            // 调整scatter点的大小
            symbolSize: function (val) {
                return val[2] / 8;
            },

            itemStyle: {
                color: '#a6c84c'
            },
            data: endPoints
        },

        // 飞机轨迹
        {
            type: 'lines',

            // 不懂这里为什么要这样设置
            zlevel: 2,

            // 开启动效
            effect: {
                show: true,
                // 动画时间，单位秒
                period: 6,
                // 这个特效尾迹会随着symbolSize调整大小，特别的丑，所以不要这个，待会另起个lines用来显示尾迹
                trailLength: 0,
                symbol: planePath, // 指定为飞机模型
                symbolSize: 15
            },

            lineStyle: {
                color: '#a6c84c',
                width: 1,
                opacity: 0.6,
                // 连线曲度，不设置的话就是直线，不好看
                curveness: 0.2
            },
            data: lines
        },

        // 炫光尾迹
        {
            type: 'lines',

            // 这个一定要设，不设的话尾迹效果不对．我也不懂～～
            zlevel: 1,

            effect: {
                show: true,

                // 动效周期和飞机轨迹保持一致
                period: 6,

                // 数值越大，尾迹越长
                trailLength: 0.7,

                // 尾迹颜色
                color: '#fff',

                // 这个大小就够了
                symbolSize: 3
            },
            lineStyle: {
                color: '#a6c84c',
                width: 0,
                curveness: 0.2
            },
            data: lines
        }
    ]
}
```



### geo与热力图

老套路，先画背景

```javascript
option = {
    backgroundColor: '#080a20',
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            areaColor: '#132937',
            borderColor: '#0692a4',
            emphasis: {
                areaColor: '#0b1c2d'
            }
        },
    },
    series: [
    ]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211194440.png)

添加热力图，有一点注意下，**`heatMap`必须与`visualMap`搭配使用！**

```javascript
// simulate data
const data = [
    [87.36,43.45,140],
    [116.413554,39.911013,278],
    [121.480237,31.236305,70],
    [113.14,23.08,323]
]

option = {
    // 好像不支持tooltip
    // tooltip: {},
    visualMap: {
        show: false
    },
    series: [
        {
            type: 'heatmap',
            coordinateSystem: 'geo', // 不设置的话会报错！
            data
        }
    ]
}
```



![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211201456.png)

> 个人觉得，如果数据量少的话，热力图完全没有发挥作用，和散点图无异

同样可以定制样式

```javascript
option = {
    // 修改颜色只能通过visualMap！！
    visualMap: {
        show: false,
        inRange: {
            color: ['#ffff00', '#ff00ff']
        }
    },
    series: [
        {
            type: 'heatmap',
            coordinateSystem: 'geo', // 不设置的话会报错！
            data,
            pointSize: 30, // 点大小
            blurSize: 15,
            // ... 更多调整自己看官网配置项
            
            // 注意：itemStyle在这无效了！受控于visualMap
            // itemStyle: {
            // color: 'blue'
            // }
        }
    ]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191211203007.png)

### geo与namemap

使用`ECharts`提供的`world.json`绘制的世界地图，会发现各个国家名都是英文的...

使用`namemap`作映射解决

```javascript
option = {
    geo: {
        // 自定义地区的名称映射，如：
        {
            'China' : '中国'
        }
    }
}

```

> 早期版本的`ECharts`，如果使用`namemap`，会造成`geo.regions`个性化地区时失效，无论是使用英文名还是映射后的中文名都匹配不上，解决方案：更新至最新版即可

### graph关系图

`echarts`支持`无布局`和`自动布局`两种关系图

* **无布局**：需提供精确的坐标（x，y）［不提供甚至会报错！！］
* **自动布局**：无需提供坐标，echarts自动布局．目前支持：力导向图(`force`)、环形布局(`circular`)

#### 无布局

*（样式参考自[官方demo](https://www.echartsjs.com/examples/zh/editor.html?c=graph)）*

##### 基本

```javascript
const graph = {}
// mock数据，坐标是我随便设置的
graph.nodes = [
    {name: '刘备', id: '001', x: 0, y: 0},
    {name: '关羽', id: '002', x: 10, y: 10},
    {name: '张飞', id: '003', x: 20, y: 20},
    {name: '刘禅', id: '004', x: 30, y: 30},
]
graph.edges = [
    {name: '二弟', source: '001', target: '002'},
    {name: '三弟', source: '001', target: '003'},
    {name: '儿子', source: '001', target: '004'},
    {name: '父亲', source: '004', target: '001'},
]

const option = {
    series: [{
        type: 'graph',
        data: graph.nodes,
        links: graph.edges
    }]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230151632.png)

##### 美化

```javascript
const option = {
    series: [{
        type: 'graph',
        data: graph.nodes,
        links: graph.edges,
        // 开启拖拽缩放
        roam: true,
        // 设置默认缩放比例
        zoom: 1.1,
        // 限定缩放比例
        scaleLimit: {
            min: 0.8,
            max: 1.5
        },
        // 节点大小
        symbolSize: 30,
        // 节点样式
        itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 5,
            shadowColor: 'rgba(0,0,0,0.3)'
        },
        // 设置连线箭头（分别对应起点和终点）
        edgeSymbol: ['none', 'arrow'],
        // 连线样式
        lineStyle: {
            color: 'source', // 此处有两个关键字文档没介绍：source与target．表示连线颜色取自source节点或target节点
            curveness: 0.3, // 曲度
        },
        // 悬浮样式
        emphasis: {
            // 悬浮状态下连线样式
            lineStyle: {
                width: 3 // 粗细
            }
        }
    }]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230155312.png)

##### 节点默认显示文本

```javascript
const option = {
    // ... 省略

    label: {
        normal: {
            // 默认不显示，设置为显示
            show: true,
            position: 'right'
        }
    }
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230155141.png)

##### 边默认显示文本

```javascript
const option = {
    // ... 省略

    edgeLabel: {
        // 默认不显示，设置为显示
        show: true
    },
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230162318.png)

`echarts`边的文本默认为`源节点id > 目标节点id`，很明显不是我们想要的，使用`formatter`解决

同时也可以看出，`name`属性不作为边节点的名称来源

```javascript
const option = {
    // ... 省略

    edgeLabel: {
        // 默认不显示，设置为显示
        show: true,
        formatter(params) {
            return params.data.name
        }
    },
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230162538.png)

##### 使用focusNodeAdjacency

在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点

```javascript
const option = {
    // ... 省略
    
    focusNodeAdjacency: true
}
```

将鼠标悬浮至节点`张飞`上，效果如下

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230163152.png)

##### 分组归类

```javascript
/* 只作示意 */

// 0. 初始几个类目
const categories = [];
for (let i = 0; i < 3; i++) {
    categories[i] = {
        name: '类目' + i
    };
}

graph.nodes.forEach(function (node, index) {
    // 1. 设置节点所属类目index
    node.category = index
})

const option = {
    // ... 省略

    // 2. 传入所有类目
    categories: categories
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230163912.png)

##### 添加事件

```javascript
graphChart.on('click', params => {
    if(params.dataType === 'node'){
        alert('cardNo: ' + params.data.id)
    }else if(params.dataType === 'edge'){
        alert('我是边啦')
    }
})
```

##### 监测缩放事件

```javascript
// 监听事件'graphroam'，'graphRoam'均可
graphChart.on('graphroam', params => {
    console.log(params)
    /*
    {
        seriesId: "series00",
        type: "graphroam",
        zoom: 1.1,
        originX: 724,
        originY: 300,
    }
    */
})
```

##### js触发缩放

见**`dispatchAction与缩放`**那节

##### 完整代码

至此为此，完整代码如下（vue版本）

```javascript
import echarts from 'echarts';

const categories = [];
for (let i = 0; i < 3; i++) {
    categories[i] = {
        name: '类目' + i
    };
}

const mock = () => {
    let graph = {}
    graph.nodes = [
        {name: '刘备', id: '001', x: 0, y: 0},
        {name: '关羽', id: '002', x: 10, y: 10},
        {name: '张飞', id: '003', x: 20, y: 20},
        {name: '刘禅', id: '004', x: 30, y: 30},
    ]
    graph.edges = [
        {name: '二弟', source: '001', target: '002'},
        {name: '三弟', source: '001', target: '003'},
        {name: '儿子', source: '001', target: '004'},
        {name: '父亲', source: '004', target: '001'},
    ]
    graph.nodes.forEach(function (node, index) {
        node.category = index
    })
    return graph
}

export default {
    name: "echartsGraph",
    data() {
        return {

        }
    },
    mounted() {
        let graph = mock()
        const graphChart = echarts.init(this.$refs.graph) // dom容器
        const option = {
            series: [{
                type: 'graph',
                data: graph.nodes,
                links: graph.edges,
                // 开启拖拽缩放
                roam: true,
                // 设置默认缩放比例
                zoom: 1.1,
                // 限定缩放比例
                scaleLimit: {
                    min: 0.8,
                    max: 1.5
                },
                // 节点文本
                label: {
                    normal: {
                        // 默认不显示，设置为显示
                        show: true,
                        position: 'right'
                    }
                },
                // 节点大小
                symbolSize: 30,
                // 节点样式
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,0,0,0.3)'
                },
                // 设置连线箭头（分别对应起点和终点）
                edgeSymbol: ['none', 'arrow'],
                edgeLabel: {
                    // 默认不显示，设置为显示
                    show: true,
                    formatter(params) {
                        return params.data.name
                    }
                },
                // 连线样式
                lineStyle: {
                    color: 'source', // 此处有两个关键字文档没介绍：source与target．表示连线颜色取自source节点或target节点
                    curveness: 0.3, // 曲度
                },
                // 悬浮样式
                emphasis: {
                    // 悬浮状态下连线样式
                    lineStyle: {
                        width: 3 // 粗细
                    }
                },
                focusNodeAdjacency: true,
                // 分类
                categories: categories
            }]
        }
        graphChart.setOption(option)
        graphChart.on('click', params => {
            if(params.dataType === 'node'){
                alert('cardNo: ' + params.data.id)
            }else if(params.dataType === 'edge'){
                alert('我是边啦')
            }
        })
        graphChart.on('graphroam', params => {
            console.log(params)
        })
    }
}
```

#### 力导向图

基于上一个demo，代码如下

```javascript
const mock = () => {
    let graph = {}
    graph.nodes = [
        // 力导向不需要设置坐标（即使设了也没用，但所有节点都设又好像起作用了...）
        {name: '刘备', id: '001'},
        {name: '关羽', id: '002'},
        {name: '张飞', id: '003'},
        {name: '刘禅', id: '004'},
    ]
    graph.edges = [
        {name: '二弟', source: '001', target: '002'},
        {name: '三弟', source: '001', target: '003'},
        {name: '儿子', source: '001', target: '004'},
        {name: '父亲', source: '004', target: '001'},
    ]
    return graph
}

const option = {
    series: [{
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        links: graph.edges,
        // 开启拖拽缩放
        roam: true,
        // 设置默认缩放比例
        zoom: 4,
        // 限定缩放比例
        // scaleLimit: {
        //     min: 0.8,
        //     max: 1.5
        // },
        // 节点文本
        label: {
            normal: {
                // 默认不显示，设置为显示
                show: true,
                position: 'right'
            }
        },
        // 节点大小
        // symbolSize: 30,
        // 节点样式
        itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 5,
            shadowColor: 'rgba(0,0,0,0.3)'
        },
        // 设置连线箭头（分别对应起点和终点）
        edgeSymbol: ['none', 'arrow'],
        edgeLabel: {
            // 默认不显示，设置为显示
            show: true,
            formatter(params) {
                return params.data.name
            }
        },
        // 连线样式
        lineStyle: {
            color: 'source', // 此处有两个关键字文档没介绍：source与target．表示连线颜色取自source节点或target节点
            curveness: 0.3, // 曲度
        },
        // 悬浮样式
        emphasis: {
            // 悬浮状态下连线样式
            lineStyle: {
                width: 3 // 粗细
            }
        },
        focusNodeAdjacency: true,
        // 分类
        categories: categories,
        force: {
            repulsion: 350, // 排斥力
            edgeLength: 50, // 边长度
            gravity: 0.2 // 重力（向心力应该更贴切点，值越大，越靠中心）
        }
    }]
}
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191230170655.png)

### dispatchAction与缩放

#### 地图缩放

```javascript
geoChart.dispatchAction({
type: 'geoRoam', // 注意，是驼峰法
    zoom: 1.1,
    // originX与originY必须给，否则会出问题
    originX: 0, 
    originY: 0
})
```

官方文档并没有关于`geoRoam`的介绍，再加上`originX`与`originY`这两个属性，一种浓浓的`hack`感，可见这个属性确实还没整好，暂不对外开放

#### 关系图缩放

根据`github`上的`issue`以及分析源码，按理来说，应该支持如下触发缩放

```javascript
graphChart.dispatchAction({
type: 'graphRoam', // 注意，是驼峰法
    zoom: 1.1,
    originX: 0,
    originY: 0
})
```

然而，**并不支持！！！**

明明地图的`geoRoam`是支持的，到这却不行也是无语...`github`上有相同问题的`issue`，都没解决~_~

> 2019年12月31日
>
> 跟了下源码，简要地记录下发现，主要是围绕两个问题
>
> 1. 为什么`geoRoam`可以，`graphRoam`不行
> 2. 既然`dispatchAction({type: graphRoam})`不行，那为什么鼠标缩放还会内部触发`dispatchAction`？而且既然`dispatchAction`不起作用，那又是哪句代码起的缩放作用？
>
> 第1个问题：`geo`注册`action`时，其`update`方法为`updateTransform`，所以正常．而`graph`注册的`update`为`none`，所以才没有达到预期效果
>
> ```javascript
> // 地图
> // node_modules/echarts/lib/action/geoRoam.js
> echarts.registerAction({
>     type: 'geoRoam',
>     event: 'geoRoam',
>     update: 'updateTransform'
> }, function(payload, ecModel){
>     // ...
> })
> 
> // 关系图
> // node_modules/echarts/lib/chart/graph/graphAction.js
> var actionInfo = {
>     type: 'graphRoam',
>     event: 'graphRoam',
>     update: 'none'
> };
> ```
>
> 已经在`github`上提[issue](https://github.com/apache/incubator-echarts/issues/11962)了，等待回应．
>
> 第2个问题：鼠标之所以还能正常缩放关系图，主要是`updateViewOnZoom`起作用
>
> ```javascript
> // node_modules/echarts/lib/chart/graph/GraphView.js
> _updateController: function (seriesModel, ecModel, api) {
>     // ...
> 
>     controller.off('pan').off('zoom').on('pan', function (e) {
>         // ...
>     }).on('zoom', function (e) {
>         // 就这这句话起作用了！！！
>         roamHelper.updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
>         // 此处dispatchAction并不起作用
>         api.dispatchAction({
>             seriesId: seriesModel.id,
>             type: 'graphRoam',
>             zoom: e.scale,
>             originX: e.originX,
>             originY: e.originY
>         });
>         // ...
>     })
> }
> ```
>
> 

### dispatchAction与hack

场景：想通过`js`触发某个操作，但是文档却没找着，这可怎么办呢？

`echarts`很多动作最终都会通过内部`dispatchAction`触发（也算是一种解偶吧），所以只要在`dispatchAction`上设置断点，再通过ui界面触发动作，查看`dispatchAction`的参数，即可完美hack

举例：想要通过`js`触发地图缩放，但是官方文档没有介绍，怎么办？

1. 在`dispatchAction`上下断点

   ```javascript
   // node_modules/echarts/lib/echarts.js
   function doDispatchAction(payload, silent) {
       var payloadType = payload.type;
       var escapeConnect = payload.escapeConnect;
       //...
   }
   ```

2. 在界面上通过滚轮缩放（这一步视需求情况而定，比如选中的话可能就是执行框选动作）

3. 代码成功断住，查看参数`payload`

4. 仿照`payload`格式，手动执行`dispatchAction`，删减或修改参数，理解参数的含义



### 坐标轴

以直角坐标系`grid`为例，例如

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212112909.png)

#### 坐标轴名称

```javascript
option = {
    xAxis: {
        // 坐标轴名称
        name: '星期几',
        // 与坐标轴线的距离
        nameGap: 30,
        // 坐标轴名称旋转
        nameRotate: 45,
        // 坐标轴反转
        // inverse: true,
        // 坐标名称位置：'start'、'middle'或'center'、'end'
        // nameLocation: 'start',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212143812.png)

#### 坐标轴线

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        axisLine: {
            // 是否显示
            // show: false,
            // 两端图形．如果都是箭头可直接设为'arrow'
            symbol: ['none', 'arrow'],
            // 末端图形偏移
            symbolOffset: [0,10],
            // 坐标轴线样式
            lineStyle: {
                // 轴线颜色
                color: 'pink',
                // 轴线粗细
                width: 4,
                // 轴线类型：'dashed'，'dotted'，'solid'
                type: 'dashed',
                
                // 阴影4兄弟
                shadowColor: 'yellow', // 阴影颜色
                shadowBlur: 15, // 阴影等级
                shadowOffsetX: 10, // 阴影偏移量X
                shadowOffsetY: 10, // 阴影偏移量Y
                
                // 透明度
                opacity: 0.6
            }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212144341.png)

#### 坐标轴刻度

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
            // 是否显示
            // show: false,
            // 刻度是否与x轴名称对齐．默认x轴名称位于刻度之间的band（带）
            alignWithLabel: true,
            // 刻度朝向：是否朝内
            inside: true,
            // 刻度长度
            length: 40,
            // 刻度样式
            lineStyle: {
                // 刻度颜色
                color: 'red',
                // 刻度粗细
                width: 10,
                // 刻度类型：'dotted'，'dashed'，'solid'
                type: 'dotted',
                
                // 阴影4兄弟
                shadowColor: 'yellow',
                shadowBlur: 15,
                shadowOffsetX: 10,
                shadowOffsetY: 10,
                
                // 透明度
                opacity: 0.4
            }
        }
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212145019.png)

#### 坐标轴刻度标签

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
            // 是否显示
            // show: false
            // 朝向：是否朝内
            inside: true,
            // 旋转角度
            rotate: 45,
            // 刻度标签离坐标轴距离
            margin: 16,
            // 格式化文本
            formatter: '星期{value}',
            // 文本颜色
            color: 'green',
            // 字体
            fontStyle: 'oblique',
            // 字体家族
            fontSize: 20,
            // 水平居中方式
            align: 'center',
            // 简直居中方式
            verticalAlign: 'bottom',
            // 行高
            lineHeight: 28,
            // 文本背景色
            backgroundColor: 'pink',
            // 文本边框颜色
            borderColor: 'yellow',
            // 边框宽度
            borderWidth: 2,
            // 边框圆角
            borderRadius: 20,
            // 文字内边距
            padding: [2,4,5,9],
            
            // 阴影4兄弟
            shadowColor: 'yellow',
            shadowBlur: 15,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
        }
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212150425.png)

#### 区域分隔线（splitLine）

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        // 坐标轴在 grid 区域中的分隔线
        splitLine: {
            // 是否显示分隔线。默认数值轴显示，类目轴不显示
            show: true,
            lineStyle: {
                color: 'green',
                width: 6,
                type: 'dashed',
                shadowBlur: 25,
                shadowOffsetX: 30,
                shadowOffsetY: 30,
                opacity: 0.4
            }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212150903.png)

#### 分隔区域（splitArea）

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        splitArea: {
            // 默认不显示
            show: true,
            areaStyle: {
                // color: 'green',
                // shadowBlur: 25,
                // shadowOffsetX: 30,
                // shadowOffsetY: 30,
                // opacity: 0.4
            }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212151328.png)

### markPoint、markLine及markArea

#### markPoint（图表标注）

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        markPoint: {
            label: {
                color: '#ff00ff'
            },
            itemStyle: {
                color: 'pink'
            },
            data: [
                {
                    name: '最大值',
                    type: 'max'
                },
                {
                    name: '最小值',
                    type: 'min'
                },
                {
                    name: '平均值',
                    type: 'average'
                },
                {
                    name: '任意坐标',
                    coord: ['Wed', 901]
                }, {
                    name: '固定 x 像素位置',
                    yAxis: 10,
                    x: '60%'
                }, 
                {
                    name: '某个屏幕坐标',
                    x: 600,
                    y: 500
                }
            ]
        }
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212153025.png)

#### markLine（图表标线）

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        markLine: {
            data: [
                
                {
                    name: '平均线',
                    // 支持 'average', 'min', 'max'
                    type: 'average'
                },
                
                {
                    name: 'Y 轴值为 100 的水平线',
                    yAxis: 100
                },
                
                {
                    // 起点和终点的项会共用一个 name
                    name: '最小值到最大值',
                    type: 'min'
                },
                
                {
                    type: 'max'
                },
                
                [
                    {
                        name: '两个坐标之间的标线',
                        coord: ['Tue', 20]
                    },
                    {
                        coord: ['Sun', 480]
                    }
                ],
                
                [{
                    // 固定起点的 x 像素位置，用于模拟一条指向最大值的水平线
                    yAxis: 'max',
                    x: '40%'
                }, {
                    type: 'max'
                }],
                
                [
                    {
                        name: '两个屏幕坐标之间的标线',
                        x: 100,
                        y: 100
                    },
                    {
                        x: 500,
                        y: 200
                    }
                ]
            ]
        }
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212154213.png)

#### markArea（图表标域）

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        markArea: {
            data: [
                [
                    {
                        name: '平均值到最大值',
                        type: 'average'
                    },
                    {
                        type: 'max'
                    }
                ],

                [
                    {
                        name: '两个坐标之间的标域',
                        coord: ['Tue', 20]
                    },
                    {
                        coord: ['Sat', 130]
                    }
                ],

                [
                    {
                        name: '60分到80分',
                        yAxis: 260
                    },
                    {
                        yAxis: 380
                    }
                ],

                // 底下这两个没出来，不想管了
                [
                    {
                        name: '所有数据范围区间',
                        coord: ['min', 'min']
                    },
                    {
                        coord: ['max', 'max']
                    }
                ],
                [
                    {
                        name: '两个屏幕坐标之间的标域',
                        x: 100,
                        y: 100
                    }, {
                        x: '90%',
                        y: '10%'
                    }
                ]
            ]
        }
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191212154817.png)



### 轮播tooltip

参考自[官方demo](https://www.echartsjs.com/examples/en/editor.html?c=doc-example/pie-highlight)

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        type: 'item'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

let currentIndex = -1;
setInterval(()=>{
    const dataLen = option.series[0].data.length;
    // 取消之前高亮的图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    // 显示 tooltip
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
},1000)

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/Peek2019-12-1216-03.gif)

#### 避免悬浮label重叠

发生场景：环形图轮播tooltip，鼠标悬浮会触发tooltip，造成圈内文本重叠

**个人解决思路**：设置**标志位**，在鼠标悬浮其上时，停止轮播tooltip的定时器

```javascript
option = {
    color: ['rgb(105, 184, 107)', 'rgb(105, 193, 193)', 'rgb(199, 119, 188)', 'rgb(216, 197, 192)'],
    series: [
        {
            type: 'pie',
            radius: ['58%', '80%'],
            hoverOffset: 4,
            selectedOffset: 4,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        fontSize: 1,
                        fontWeight: "bold"
                    },
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '34',
                        fontWeight: 'bold'
                    },
                    formatter(params) {
                        return params.name + '\n' +params.value
                    }
                }
            },
            itemStyle: {
                borderColor: "#fff",
                borderWidth: 2
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: []
        }
    ]
}

// 数据长度
let dataLen = mock.length;

// 是否忽略定时器标志
let paused = false
chart.on('mouseover', function (params) {
    // 1.忽略定时器
    paused = true
    // 2.downplay所有
    for(let k=0; k<dataLen; k++){
        chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: k
        })
    }
    // 3.highlight当前
    chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex
    })
})
chart.on('mouseout', function (params) {
    // 重置标志位及downplay当前tooltip
    paused = false
    chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: params.dataIndex
    })
})

let currentIndex = -1;
setInterval(()=>{
    if(paused) return;
    // 取消之前高亮的图形
    chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLen;
    // 高亮当前图形
    chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    // 显示 tooltip
    chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
},1000)
```



### dataset与encode

*（参考自官网＂[使用dataset管理数据](https://www.echartsjs.com/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20dataset%20%E7%AE%A1%E7%90%86%E6%95%B0%E6%8D%AE)＂）*

ECharts 4 开始支持了 `dataset` 组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以基于数据指定数据到视觉的映射。这在不少场景下能带来使用上的方便

#### 基本

以拆线图为例，使用往常的方式，分别设置各自的数据`data`

```javascript
option = {
    tooltip: {},
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    },{
        data: [120, 1932, 2901, 1934, 290, 1630, 320],
        type: 'line'
    }]
};

```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215095007.png)

**改用`dataset`**

```javascript
option = {
    tooltip: {},
    dataset: {
        source: [
            ['Mon',820,120],
            ['Tue',932,1932],
            ['Wed', 901,2901],
            ['Thu',934,1934],
            ['Fri',1290,290],
            ['Sat',1330,1630],
            ['Sun',1320,320],    
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line'
    },{
        type: 'line'
    }]
};
```

**使用带维度名的数据**

```javascript
option = {
    tooltip: {},
    dataset: {
        source: [
            ['name1', 'name2', 'name3'],
            ['Mon',820,120],
            ['Tue',932,1932],
            ['Wed', 901,2901],
            ['Thu',934,1934],
            ['Fri',1290,290],
            ['Sat',1330,1630],
            ['Sun',1320,320],    
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line'
    },{
        type: 'line'
    }]
};
```

效果一样，不过`维度名`会被当成系列名用于`tooltip`

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215095413.png)

ECharts会自动检测数据是否含有维度名，当然也可以手动设置数据是否含有维度名，见下节

#### sourceHeader

```javascript
option = {
    tooltip: {},
    dataset: {
        sourceHeader: false, // 表明数据不含有维度名
        source: [
            ['Mon',820,120],
            ['Tue',932,1932],
            ['Wed', 901,2901],
            ['Thu',934,1934],
            ['Fri',1290,290],
            ['Sat',1330,1630],
            ['Sun',1320,320],    
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line'
    },{
        type: 'line'
    }]
};
```



#### seriesLayoutBy

`ECharts`默认按列为一个维度渲染数据，可以配置成按行为一个维度

```javascript
option = {
    tooltip: {},
    dataset: {
        source: [
            [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            [ 820, 932, 901, 934, 1290, 1330, 1320],
            [ 120, 1932, 2901, 1934, 290, 1630, 320]
        ]
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line',
        seriesLayoutBy: 'row'
    },{
        type: 'line',
        seriesLayoutBy: 'row'
    }]
};

```

效果其实是一样的

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215100101.png)

#### key-val格式数据

这种格式就必须要指名维度名了

```javascript
option = {
    tooltip: {},
    dataset: {
        source: [
            {name1: 'Mon', name2: 820, name3: 120},
            {name1: 'Tue', name2: 932, name3: 1932},
            {name1: 'Wed', name2: 901, name3: 2901},
            {name1: 'Thu', name2: 934, name3: 1934},
            {name1: 'Fri', name2: 1290, name3: 290},
            {name1: 'Sat', name2: 1330, name3: 1630},
            {name1: 'Sun', name2: 1320, name3: 320},    
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line'
    },{
        type: 'line'
    }]
};

```

效果还是一样的，不截图了

#### encode

```javascript
option = {
    tooltip: {},
    dataset: {
        source: [
            ['Mon',820,120],
            ['Tue',932,1932],
            ['Wed', 901,2901],
            ['Thu',934,1934],
            ['Fri',1290,290],
            ['Sat',1330,1630],
            ['Sun',1320,320],    
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line',
        encode: {
            // 支持数字（维度下标）、字符串（维度名）
            y: 2
        }
    },{
        type: 'line',
        encode: {
            y: 1
        }
    }]
};
```

![](https://raw.githubusercontent.com/hzmming/myGraphBed/master/20191215101223.png)

仔细看连线的颜色，红色的那条本来默认是取第二列数据的，因为设置了`y: 2`（下标从0开始，第三列为2），改取第三列了

更多encode知识，看 [**数据到图形的映射（encode）**](https://www.echartsjs.com/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20dataset%20%E7%AE%A1%E7%90%86%E6%95%B0%E6%8D%AE)

#### 常见的映射方式

还是见[官网](https://www.echartsjs.com/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20dataset%20%E7%AE%A1%E7%90%86%E6%95%B0%E6%8D%AE)

