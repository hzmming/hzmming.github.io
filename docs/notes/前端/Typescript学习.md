---
title: Typescript学习
date: 2018-08-28
tags:
  - 前端
categories:
  - 前端
---

#### 一. 基础类型

（1）布尔值

```typescript
let isDone: boolean = false;
```

（2）数字

```typescript
// number 支持 十进制、十六进制、八进制、二进制
 
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

（3）字符串

```typescript
let name1: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name1 }.
I'll be ${ age + 1 } years old next month.`;
```

**注意，下面这句声明会报错**

```typescript
let name: string = 'Gene';
 
// TS2451: Cannot redeclare block-scoped variable 'name'.
```

**为什么呢？**

在默认状态下，typescript 将 DOM typings 作为全局的运行环境，所以当我们声明 name时， 与 DOM 中的全局 window 对象下的 name 属性出现了重名（也就是说类似的 let alert = '333' 也会报错）

**解决方法**

**方法一**：将运行环境由 DOM typings 更改成其他运行环境。

我们可以在 tsconfig.json 中做一下声明：          

```json
{
    "compilerOptions": {
        "lib": [
            "es2015"
        ]
    }
}
```

**负面影响**：DOM中全局window对象下的变量、方法不可用，如 alert

**方法二**：既然与全局的变量出现重名，那我们将脚本封装到模块（module）内。module 有自己的作用域，自然不会与全局作用域的变量产生冲突。

在 Typescript 中，只要文件存在 import 或 export 关键字，都被视为 module

```typescript
let name: string = `Gene`;
export {};
```

**负面影响**：我暂时不清楚。。。

（4）数组

```typescript
let list: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];
```

 

（5）元组 Tuple

*暂未清楚元组是干嘛的*

```typescript
let x: [string, number];
x = ['hello', 10];
```

 

（6）枚举

```typescript
// 默认情况下，从0开始为元素编号。也可以手动的指定成员的数值。此处我改为从1开始
 
enum Color {Red, Green, Blue}
// enum Color {Red = 1, Green, Blue}
// enum Color {Red = 1, Green = 3, Blue = 2}
let c: Color = Color.Green;
let colorName: string = Color[2];
```

看了下生成后的代码，其实不过是用 Object对象 进行模拟罢了

```javascript
// 生成后的JavaScript代码
 
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var colorName = Color[2];
 
/*
最终Color值为
{
    0:"Red",
    1:"Green",
    2:"Blue",
    Blue:2,
    Green:1,
    Red:0  
}
*/
```

 

（7）Any

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

*any 类型，粗略看就是不做类型判断，那我直接不写类型不就好了。。反正支持原生JavaScript*

（8）Void

```typescript
function warn(): void {
    alert('warn');
}
// 声明void变量没有意义，因为只能赋予undefined
let unusable: void = undefined;
```

（9）Null 和 Undefined

```typescript
// 好像还是没啥意义-_-
let u: undefined = undefined;
let n: null = null;
```

（10）Never

**返回never的函数必须存在无法达到的终点**

```typescript
// 1.抛异常。
function error(message: string): never {
    throw new Error(message)
}
 
// 2.推断为never。返回了 “返回never结果的函数” 的 结果
function fail() {
    return error("Something failed");
}
 
// 3.死循环
function infiniteLoop(): never {
    while(true){
 
    }
}
```

（11）类型断言

```typescript
let somevalue: any = 'hello world';
// 两种方式
let strLen: number = (<string>somevalue).length;    // 方式一
let strLen1: number = (somevalue as string).length; // 方式二
```

有点强转的样子

#### 二. 变量声明

复习了ES6的新特性，以及在此基础上，TypeScript做了点增强（主要还是强类型判断，不然没什么。。）

不做笔记了~~

#### 三. 接口

（一）接口初探

```typescript
// 未使用接口
function print(labelObj: { label: string }) {
  console.log(labelObj.label);
}
 
let myObj = { size: 10, label: "Size 10 Object" };
print(myObj);
 
 
// 使用接口，效果与上面等同
interface LabelObj {
  label: string;
}
 
function print(labelObj: LabelObj) {
  console.log(labelObj.label);
}
 
let myObj = {size: 10, label: "Size 10 Object"};
print(myObj);
```

编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。

多余的属性不理会【实际可能会管，详情见第（四）节 额外的属性检查】

**定义接口格式还挺灵活的**

支持 **分号（;）**、**逗号（,）**、**回车换行** 各种组合

```typescript
interface Hello {
  a: string
}
 
interface Hello {
  a: string;
}
 
interface Hello {
  a: string,
}
 
interface Hello {
  a: string
  b: string
}
 
interface Hello {
  a: string;
  b: string;
}
 
interface Hello {
  a: string,
  b: string,
}
 
interface Hello {
  a: string;
  b: string
}
 
interface Hello {
  a: string
  b: string;
} 
 
interface Hello {
  a: string,
  b: string
}
 
interface Hello {
  a: string
  b: string,
}
```

 

（二）可选属性

```typescript
interface SquareCfg {
    width?: number,
    color?: string
}
function createSquare(config: SquareCfg) {
    // ...
}
createSquare()    // Error。属性可以省略，但对象还是要传递
createSquare({})
createSquare({width: 3})
createSquare({color: 'red'})
createSquare({width: 3, color: 'red'})
```

使用`?:`表示可选

做如下修改，参数甚至都可以不传

```typescript
interface SquareCfg {
    // ...
}
// 此处参数用了 ?:
function createSquare(config?: SquareCfg) {
    // ...
}
createSquare()
createSquare({})
createSquare({ //... })
```

（三）只读属性

使用`readonly`表示只读属性

```typescript
interface Point {
    readonly x: number,
    readonly y: number
}
let p1: Point = {x: 3, y: 4};
p1.x = 4;   // TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
```

延伸：只读数组（ReadonlyArray）

```typescript
let a: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
 
a[0] = 1;
ro[0] = 1;    // Error
```

（四）额外的属性检查

```typescript
interface LabelObj {
  label: string;
}
 
function print(labelObj: LabelObj) {
  console.log(labelObj.label);
}
 
// 写法一
let myObj = {size: 10, label: "Size 10 Object"};
print(myObj); // 正确
 
// 写法二
print({size: 10, label: "Size 10 Object"}); // Error
```

**为什么？**

写法一 和 写法二 的区别，只是写法一定义了变量而写法二使用对象字面量而已，为什么就不行了？？

更何况不是说只要满足接口，多几个属性TypeScript是不会管的么？？

**答：设定如此**

**如何解决？**

**方法一**：采用写法一，额外定义一个变量

```typescript
let myObj = {size: 10, label: "Size 10 Object"};
print(myObj); // 正确
```

**方法二**：强转

```typescript
print( <LabelObj>{size: 10, label: "Size 10 Object"} );
print( {size: 10, label: "Size 10 Object"} as LabelObj );    // 强转的两种方法而已，上下效果等价
```

（五）函数类型（给函数用的接口）

```typescript
interface Func {
    // (args: type[, ...]):type
    (param1: string, param2: string): boolean
}
let testFun: Func;
testFun = function (h: string, e: string) {
    return true;
}
```

使用`(args: type[, ...]):type`格式定义函数的参数（个数、类型）和返回值

（六）可索引的类型

```typescript
interface StrArray {
    // index 可以随便取的，叫abc都行
    [index: number]: string
}
let myArray: StrArray = ['hello', 'world'];
```

很好的描述dictionary模式（*不懂干啥*）

```typescript
interface NumDict {
    [index: string]: number,
    hello: 2
    // name: '3' 报错。 `name`的类型与索引类型返回值的类型不匹配
}
let numObj: NumDict = {hello: 2, 1: 20, '1': 20};
```

只读索引签名

```typescript
interface ReadonlyStrArr {
    readonly [index: number]: string
}
let myArr: ReadonlyStrArr = ['hello', 'world'];
 
myArr[3] = 'h'; // TS2542: Index signature in type 'ReadonlyStrArr' only permits reading.
 
```

*不是很懂可索引的类型实际用途*

（七）类类型

官方代码都没跑起来。。学完类，再回来看下

（八）继承接口

```typescript
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Circle extends Shape {
    radius: number;
}
// 支持多继承
interface Square extends Shape, PenStroke {
    sideLength: number;
}
 
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
 
let circle = <Circle>{};
square.color = "blue";
circle.radius = 5;
```

（九）混合类型

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
 
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
 
let cd = getCounter();
cd(10);
cd.reset();
cd.interval = 5.0;
```

官方demo直接拷贝的，不是很清楚具体有什么用

（十）接口继承类

```typescript
class Control {
    private state: any;
}
 
interface SelectableControl extends Control {
    select(): void;
}
 
class Button extends Control implements SelectableControl {
    select() { }
}
 
class TextBox extends Control {
    select() { }
}
 
// 错误：“Image”类型缺少“state”属性。
class Image1 implements SelectableControl {
    select() { }
}
```

当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

此处 Image类 就是没有继承 Control，所以不能实现 继承了Control的接口 SelectableControl

> 细心的人发现，代码上我写的是 Image1 而不是 Image，原因是 Image 和 window.Image 名称冲突了
>
> 原因见 第一章 基础类型 （三）字符串

#### 四. 类

 

 

 