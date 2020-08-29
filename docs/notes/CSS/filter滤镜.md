---
title: filter滤镜
date: 2019-04-11
tags:
  - CSS
categories:
  - CSS
---

demo文件夹有可运行代码

参考文章：http://www.cnblogs.com/fsjohnhuang/p/4127888.html 

##### 滤镜实现方式及兼容性

|             | IE                    | Edge     | Chrome | Firefox |
| ----------- | --------------------- | -------- | ------ | ------- |
| ie filter   | IE5-9（微软独家实现） | 不支持   | 不支持 | 不支持  |
| css3 filter | 不支持                | 部分支持 | 支持   | 支持    |
| svg filter  | IE10+                 | 支持     | 支持   | 支持    |
| canvas 模拟 | IE9+                  | 支持     | 支持   | 支持    |

##### Speia滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>speia</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .sepia {
            /* 取值范围为0-1或0-100%；0表示无效果，1或100%表示最大效果 */
            -webkit-filter: sepia(100%);
            -moz-filter:sepia(100%);
            -o-filter: sepia(100%);
            -ms-filter: sepia(100%);
            filter: sepia(100%);
        }
    </style>
</head>
<body onload="init()">
    <h2>Speia滤镜（复古风）</h2>
    <p>Speia滤镜是对图片或元素整体进行棕褐色处理，就是老照片那种效果</p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="sepia" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
            // 定义处理方法
            var sepia = function(el){
                var canvas = document.createElement('canvas');
                var w = canvas.width = el.offsetWidth,
                    h = canvas.height = el.offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(el, 0, 0);
                // 对像素作处理
                var imgData = ctx.getImageData(0, 0, w, h), d = imgData.data;
                for (var i = 0, len = d.length; i < len; i+=4){
                    var r = d[i],
                        g = d[i+1],
                        b = d[i+2];
                    d[i] = (r * 0.393)+(g * 0.769)+(b * 0.189);
                    d[i+1] = (r * 0.349)+(g * 0.686)+(b * 0.168);
                    d[i+2] = (r * 0.272)+(g * 0.534)+(b * 0.131);
                }
                ctx.putImageData(imgData, 0, 0);
                // 导出
                return canvas.toDataURL('image/*');
            };
            // 调用
            var img = document.getElementById('img-canvas');
            img.src = sepia(img);
        }
    </script>
</body>
</html>
```

##### Grayscale(灰度)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>grayscale</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .grayscale {
            /* 取值范围为0-1或0-100%；0表示无效果，1或100%表示最大效果 */
            -webkit-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            filter: grayscale(100%);
        }
        .grayscale-ie {
            filter:gray;
        }
        .grayscale-svg{
            filter:url(#grayscale);
        }
    </style>
</head>
<body onload="init()">
    <h2>Grayscale(灰度)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="grayscale" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜</h3>
            <img class="grayscale-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Svg</h3>
            <img class="grayscale-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="grayscale">
            <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
        </filter>
    </svg>
    <script>
        function init() {
            var grayscale = function(el){
                var canvas = document.createElement('canvas');
                var w = canvas.width = el.offsetWidth,
                    h = canvas.height = el.offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(el, 0, 0);
                // 对像素作处理
                var imgData = ctx.getImageData(0, 0, w, h), d = imgData.data;
                for (var i = 0, len = d.length; i < len; i+=4){
                    var r = d[i],
                        g = d[i+1],
                        b = d[i+2];
                    d[i] = d[i+1] = d[i+2] = (r+g+b)/3;
                }
                ctx.putImageData(imgData, 0, 0);
                // 导出
                return canvas.toDataURL("image/*");
            };
            // 调用
            var img = document.getElementById('img-canvas');
            img.src = grayscale(img);
        }
    </script>
</body>
</html>
```

##### Blur(高斯模糊)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>blur</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .blur {
            /* 模糊半径，取值范围0~Npx，0为无效果 */
            -webkit-filter: blur(1px);
            -moz-filter: blur(1px);
            -o-filter: blur(1px);
            -ms-filter: blur(1px);
            filter: blur(1px);
        }
        .blur-ie {
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=1, MakeShadow=false);
        }
        .blur-svg{
            filter:url(#blur);
        }
    </style>
</head>
<body onload="init()">
    <h2>Blur(高斯模糊)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="blur" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜</h3>
            <img class="blur-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas</h3>
            <canvas id="img-canvas" width="240px"></canvas>
        </div>
        <div class="content-item">
            <h3>Svg</h3>
            <img class="blur-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <svg version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:ev="http://www.w3.org/2001/xml-events"
         baseProfile="full">
        <defs>
            <filter id="blur">
                <feGaussianBlur stdDeviation="1" />
            </filter>
        </defs>
    </svg>
    <script src="StackBlur.js"></script>
    <script>
        function init() {
            /*
                使用Canvas作处理，高斯模糊的算法请参考：阮老师的“高斯模糊的算法”参考译文，处理库StackBlur.js。
                处理库API： stackBlurImage( sourceImageID, targetCanvasID, radius, blurAlphaChannel );
                sourceImageID表示要模糊的图片的id, 默认这个图片要隐藏；
                targetCanvasID表示要显示模糊图片的canvas元素的id;
                radius表示模糊的半径大小。不过，根据我的对比测试，radius好像与CSS中filter滤镜的模糊值不是1:1匹配的，反倒是有些类似2:1. 也就是这里的20px的半径模糊近似于CSS中blur滤镜值设置为10px;
                blurAlphaChannel为布尔属性，表示aplha透明通道是否要模糊，true表示要模糊。
            */
            stackBlurImage('origin', 'img-canvas', 1, true)
        }
    </script>
</body>
</html>
```

##### Invert(反色)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>inver</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .invert {
            /* 效果范围，取值范围0~1或0~100%，0为无效果，1或100%表示最大效果 */
            -webkit-filter: invert(1);
            -moz-filter: invert(1);
            -o-filter: invert(1);
            -ms-filter: invert(1);
            filter: invert(1);
        }
    </style>
</head>
<body onload="init()">
    <h2>Inver(反色)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="invert" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
            var invert = function(el){
                var canvas = document.createElement('canvas');
                var w = canvas.width = el.offsetWidth,
                    h = canvas.height = el.offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(el, 0, 0);
                // 对像素作处理
                var imgData = ctx.getImageData(0, 0, w, h), d = imgData.data;
                for (var i = 0, len = d.length; i < len; i+=4){
                    var r = d[i],
                        g = d[i+1],
                        b = d[i+2];
                    d[i] = 255 - r;
                    d[i+1] = 255 - g;
                    d[i+2] = 255 - b;
                }
                ctx.putImageData(imgData, 0, 0);
                // 导出
                return canvas.toDataURL("image/*");
            };
            // 调用
            var img = document.getElementById('img-canvas');
            img.src = invert(img);
        }
    </script>
</body>
</html>
```

##### Saturate(饱和度)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>saturate</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .saturate {
            /* 取值范围>=0的数字或百分数，1为无效果，0为灰度图 */
            -webkit-filter: saturate(2);
            -moz-filter: saturate(2);
            -o-filter: saturate(2);
            -ms-filter: saturate(2);
            filter: saturate(2);
        }
        .saturate-ie {
        }
        .saturate-svg{
        }
    </style>
</head>
<body onload="init()">
    <h2>Saturate(饱和度)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="saturate" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img class="saturate-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas（待研究）</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Svg（待研究）</h3>
            <img class="saturate-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
        }
    </script>
</body>
</html>
```

##### Contrast(对比度)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>contrast</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .contrast {
            /* 取值范围>=0的数字或百分数，1为无效果 */
            -webkit-filter: contrast(2);
            -moz-filter: contrast(2);
            -o-filter: contrast(2);
            -ms-filter: contrast(2);
            filter: contrast(2);
        }
        .contrast-ie {
        }
        .contrast-svg{
        }
    </style>
</head>
<body onload="init()">
    <h2>Contrast(对比度)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="contrast" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img class="contrast-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas（待研究）</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Svg（待研究）</h3>
            <img class="contrast-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
        }
    </script>
</body>
</html>
```

##### Brightness(亮度)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>brightness</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .brightness {
            /* 取值范围>=0的数字或百分数，1为无效果 */
            -webkit-filter: brightness(2);
            -moz-filter: brightness(2);
            -o-filter: brightness(2);
            -ms-filter: brightness(2);
            filter: brightness(2);
        }
        .brightness-ie {
        }
        .brightness-svg{
        }
    </style>
</head>
<body onload="init()">
    <h2>Brightness(亮度)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="brightness" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img class="brightness-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas（有问题）</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Svg（待研究）</h3>
            <img class="brightness-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
            // 原理：让图像变得更亮或更暗，算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。
            var brightness = function(el, delta){
                var canvas = document.createElement('canvas');
                var w = canvas.width = el.offsetWidth,
                    h = canvas.height = el.offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(el, 0, 0);
                // 对像素作处理
                var imgData = ctx.getImageData(0, 0, w, h), d = imgData.data;
                for (var i = 0, len = d.length; i < len; i+=4){
                    var r = d[i],
                        g = d[i+1],
                        b = d[i+2];
                    d[i] = r + delta;
                    d[i+1] = g + delta;
                    d[i+2] = b + delta;
                }
                ctx.putImageData(imgData, 0, 0);
                // 导出
                return canvas.toDataURL("image/*");
            };
            // 调用
            var img = document.getElementById('img-canvas');
            img.src = brightness(img);
        }
    </script>
</body>
</html>
```

##### Hue Rotate(色相旋转)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>huerotate</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .huerotate {
            /* 取值范围0deg~365deg，0（默认值）为无效果 */
            -webkit-filter: hue-rotate(200deg);
            -moz-filter: hue-rotate(200deg);
            -o-filter: hue-rotate(200deg);
            -ms-filter: hue-rotate(200deg);
            filter: hue-rotate(200deg);
        }
        .huerotate-ie {
        }
        .huerotate-svg{
        }
    </style>
</head>
<body onload="init()">
    <h2>Hue Rotate(色相旋转)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3</h3>
            <img class="huerotate" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜（待研究）</h3>
            <img class="huerotate-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Canvas（待研究）</h3>
            <img id="img-canvas" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>Svg（待研究）</h3>
            <img class="huerotate-svg" id="img-svg" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
        }
    </script>
</body>
</html>
```

##### Drop Shadow(阴影)滤镜

 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>dropshadow</title>
    <style>
        svg {
            display: none;
        }
        .content-item {
            float: left;
            margin-right: 25px;
        }
        .dropshadow {
            /**  格式，filer: drop-shadow(x-offset y-offset 阴影模糊半径 阴影颜色)
             *  x-offset和y-offset为阴影的相对于元素左上角的位移距离；
             * 注意：
             *     1. 阴影的外观受border-radius样式的影响；
             *     2. :after和:before等伪元素会继承阴影的效果。
             */
            -webkit-filter: drop-shadow(0 0 0.75rem crimson);
            -moz-filter: drop-shadow(0 0 0.75rem crimson);
            -o-filter: drop-shadow(0 0 0.75rem crimson);
            -ms-filter: drop-shadow(0 0 0.75rem crimson);
            filter: drop-shadow(0 0 0.75rem crimson);
        }
        .drop-ie {
            /**
             * color为阴影颜色，形如"#ff00cc"
             * direction为角度，取值范围0,45,90,135,180,225,270,315
             */
            filter:Shadow(Color=#ff00cc,Direction=45);
        }
        .dropshadow-ie {
            /**
             * color为阴影颜色，形如"#ff00cc"
             * offx为水平偏移量
             * offy为垂直偏移量
             * positive为1或0
             */
            filter:DropShadow(Color=#ff00cc,OffX=0,OffY=0,Positive=1);
        }
        .box-shadow {
            box-shadow: 0 0 0.75rem crimson;
        }
    </style>
</head>
<body onload="init()">
    <h2>Drop Shadow(阴影)滤镜</h2>
    <p></p>
    <div>
        <div class="content-item">
            <h3>原图</h3>
            <img id="origin" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3 filter</h3>
            <img class="dropshadow" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>IE滤镜</h3>
            <img class="drop-ie" src="beauty.jpg">
            <img class="dropshadow-ie" src="beauty.jpg">
        </div>
        <div class="content-item">
            <h3>CSS3 box-shadow</h3>
            <img class="box-shadow" src="beauty.jpg">
        </div>
    </div>
    <script>
        function init() {
        }
    </script>
</body>
</html>
```