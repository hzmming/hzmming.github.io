---
title: loading圈圈
date: 2019-10-11
tags:
  - CSS
categories:
  - CSS
---

\1. 简单实现

 

```html
<div class="overlay">
    <div class="loading spinner"></div>
</div>
<style>
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -25px;
        margin-top: -25px;
    }
    .spinner {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-width: 3px;
        border-style: solid;
        border-color: #1f2d3d transparent transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite; /* linear:匀速， infinite: 无限循环*/
    }
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
```

![img](/img/24d1c088-c19b-4777-a135-3ac973f957c0.gif)

（录制出来效果有点差，但实际上挺好的......）

\2. 复杂点

 

```html
<div class="overlay">
    <div class="loading">
        <svg class="circular">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10"></circle>
        </svg>
    </div>
</div>
<style>
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .loading {
        width: 56px;
        height: 56px;
        position: absolute;
        left: calc(50% - 28px);
        top: calc(50% - 28px);
        border-radius: 50%;
        padding: 3px;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
    }
    .circular {
        animation: rotate 2s linear infinite;
        width: 50px;
        height: 50px;
        border-radius: 50%; /* 感觉没啥用处，这里 */
    }
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    .path {
        stroke-dasharray: 1, 200; /* 利用虚实线实现断环 */
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
        stroke-linecap: round;
        stroke: #ff4081;
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
</style>
```

![img](/img/23d13270-7357-4f48-9634-0b44db49fc5b.gif)