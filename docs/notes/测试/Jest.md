---
title: Jest
date: 2020-08-27
tags:
  - 测试
categories:
  - 测试
---

*写自 2020年8月3日*

### 是什么及为什么

[Jest](https://jestjs.io/) 是由 Facebook 开源出来的一个测试框架，它集成了断言库、mock、快照测试、覆盖率报告等功能。

为什么要测试呢？保证代码如预期运行。

比如你写了个插件，当你增加了新功能，你不清楚有没有影响到原先的功能，这时你只要重跑一遍测试用例，若测试用例如往常通过，则说明你的改动未引起 bug

### 基本

项目结构如下

```
demo1
|- package.json
|- /src
  |- sum.js
|- /test
  |- sum.test.js
```

```shell
npm i jest -D
```

添加代码提示项便于开发（非必须项）

```shell
npm i @types/jest -D
```

 

```javascript
// src/sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```javascript
// test/sum.test.js
const sum = require('./sum');
 
it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**package.json**

```json
{
  "scripts": {
    "test": "jest test"
  }
}
```

`npm run test`

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

上面使用到的 `expect`、`tobe` 就是断言，具体看断言小节。

一般匹配后缀为`.spec.js`或`.test.js`的文件，当然这可以设置的，具体见 [testMatch](https://jestjs.io/docs/en/configuration.html#testmatch-arraystring)

### 使用配置文件

默认读取根目录下的 `jest.config.js` 文件

使用 `jest --init`生成配置文件（若只本地安装了jest，可 npx jest 调用）

生成的文件，感觉没啥用。。。我自己的配置文件

```js
// https://jestjs.io/docs/en/configuration.html
 
module.exports = {
  // 开启代码覆盖率收集
  collectCoverage: true,
 
  // An array of regexp pattern strings used to skip coverage collection
  // 默认只过滤了 node_modules，我一般把测试文件放 test 目录，测试文件不需要收集代码覆盖率
  coveragePathIgnorePatterns: ['/node_modules/', 'test'],
 
  // The test environment that will be used for testing
  // 默认值为 jsdom。也就是模拟了部分 dom api，即：可以使用windows等相关浏览器api
  // 如果不需要可以设置为 node 环境
  testEnvironment: 'node',
 
  // 更详细的输出
  verbose: true
};
```

 

### 断言

jest 称呼断言为 `matchers`，能理解就行

expect 的更多用法见[官网](https://jestjs.io/docs/en/expect)

#### 原始值

```javascript
it('primitive value', () => {
    const num = 3;
    expect(num).toBe(3);
    // 否定
    expect(num).not.toBe(3);
})
```

#### toBe 与 toEqual 等价

```javascript
it("toBe 与 toEqual 等价", () => {
  expect("str").toBe("str");
  expect("str").toEqual("str");
 
  expect(1).toBe(1);
  expect(1).toEqual(1);
 
  expect(false).toBe(false);
  expect(false).toEqual(false);
 
  expect(null).toBe(null);
  expect(null).toEqual(null);
 
  expect(undefined).toBe(undefined);
  expect(undefined).toEqual(undefined);
});
```

#### 对象

```javascript
it('object assignment', () => {
    const data = {a: 1, b: 2};
    // 属性位置不一样，并不影响对象的相等，如 {b: 2, a:1} 照样相等
    expect(data).toEqual({a: 1, b: 2});
    expect(data).not.toEqual({a: 1, b: 2, c: 3});
})
```

#### null

```javascript
it('null', () => {
    const n = null;
    expect(n).toBeNull()
    expect(n).toBeDefined()
    expect(n).toBeFalsy()
    // 以下错误error
    // expect(n).toBeUndefined()
    // expect(n).toBeTruthy()
})
```

#### undefined

```javascript
it("undefined", () => {
  let n;
  let m = undefined;
  expect(n).toBeUndefined();
  expect(m).toBeUndefined();
  expect(n).toBeFalsy();
  // 以下错误error
  // expect(n).toBeNull()
  // expect(n).toBeDefined()
  // expect(n).toBeTruthy()
});
```

#### zero

```javascript
it('zero', () => {
    const n = 0;
    expect(n).toBeDefined()
    expect(n).toBeFalsy()
    // 以下错误error
    // expect(n).toBeNull()
    // expect(n).toBeUndefined()
    // expect(n).toBeTruthy()
})
```

#### 数字

```javascript
it('two plus two', () => {
    const value = 4
    expect(value).toBeGreaterThan(3)
    expect(value).toBeGreaterThanOrEqual(4)
    expect(value).toBeLessThan(5)
    expect(value).toBeLessThanOrEqual(4)
 
    expect(value).toBe(4)
    expect(value).toEqual(4)
})
```

#### 浮点数

```javascript
it("两个浮点数相加", () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
  /**
   * 当初没及时做笔记，我看不懂这个 2 和 0.005 的关系了。。。
   * Expected precision:    2
   * Expected difference: < 0.005
   */
  // error，因为 0.309-0.3 = 0.009 > 0.005
  // expect(0.309).toBeCloseTo(0.3)
 
  // success，因为 0.304-0.3 = 0.0040000000000000036 < 0.005
  expect(0.304).toBeCloseTo(0.3);
});
```

#### 字符串

```javascript
it("there is no I in team", () => {
  // 匹配正则
  expect("team").not.toMatch(/I/);
});
```

#### Arrays and iterables

```javascript
it("the array and set contains world beer", () => {
  const list = ["a", "b", "c", "beer"];
  const set = new Set(list);
  expect(list).toContain("beer");
  expect(set).toContain("beer");
});
 
it("toEqual 对于数组是强调顺序的", () => {
  const list = [1, 2, 3];
  expect(list).toEqual([1, 2, 3]);
  // 顺序不对，error
  // expect(list).toEqual([1, 3, 2]);
});
```

#### Execptions

```javascript
it("the function throw exception", () => {
  function fn() {
    throw new SyntaxError("Ah, error @_@");
  }
  // 校验抛异常
  expect(fn).toThrow();
  // 校验异常类型
  // expect(fn).toThrow(TypeError) // error
  expect(fn).toThrow(SyntaxError);
  expect(fn).toThrow(Error); // 支持父类匹配
  // 校验抛指定异常内容
  expect(fn).toThrow("Ah, error @_@");
  // 使用正则匹配异常内容
  expect(fn).toThrow(/@_@/);
});
```

#### expect.assertions

验证当前测试是否有指定数量的断言被调用，在测试异步时比较有用

```javascript
it('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }
 
  doAsync(callback1, callback2);
});
```

 

#### expect.anything

仅适用于 toEqual 和 toBeCalledWith，匹配任何非 null 和 undefined

```javascript
it("test anything", () => {
  expect(1).toEqual(expect.anything());
  expect("str").toEqual(expect.anything());
  expect({}).toEqual(expect.anything());
});
```

#### expect.any

仅适用于 toEqual 和 toBeCalledWith，匹配任意由给定构造函数创建的实例

```javascript
it("test any", () => {
  expect(1).toEqual(expect.any(Number));
  expect([]).toEqual(expect.any(Array));
});
```

 

### mock 函数

#### .mock

使用mock包裹函数，执行完记录函数的 每次运行参数(calls), 每次运行结果(results), 每次运行时的this指向(instances)

```javascript
function forEach(items, callback) {
    for (let i = 0; i < items.length; i++) {
        callback(items[i], i)
    }
}
it('mock basic', () => {
    const mockCallback = jest.fn(x => 42 + x)
    forEach([0, 1], mockCallback)
    // 被调用2次
    expect(mockCallback.mock.calls.length).toBe(2)
    // 第一次调用函数的第一个参数是0
    expect(mockCallback.mock.calls[0][0]).toBe(0)
    // 第一次调用函数的第一个参数是1
    expect(mockCallback.mock.calls[1][0]).toBe(1)
    // 第一次函数调用的返回值
    expect(mockCallback.mock.results[0].value).toBe(42)
})
```

#### this

输出函数执行时的this（此处叫成实例instance）

```javascript
it('mock this', () => {
    const myMock = jest.fn()
    const a = new myMock()
    const b = {
        name: 'test'
    }
    const bound = myMock.bind(b)
    bound()
 
    // 输出数组，包括两个元素，[mockConstructor {}, b]
    console.log(myMock.mock.instances)
    expect(myMock.mock.instances[1].name).toEqual('test')
})
```

#### mock返回值

```javascript
it('mock return', () => {
    const myMock = jest.fn()
    console.log(myMock())
    // 可以链式调用哦
    myMock.mockReturnValueOnce(10)  // 一次性
        .mockReturnValueOnce('x')   // 一次性
        .mockReturnValue(true)      // 永久
    console.log(myMock(), myMock(), myMock(), myMock())
})
```

#### mock 请求

> 当初好像就没怎么弄懂。。时间一久忘了，先大概记下

是任何库的所有方法都会被挂载属性么？

```javascript
// node尚不正式支持es6 import，需要使用babel
import axios from 'axios'
import Users from "./user";
 
// 不能放在要执行的test里，必须放在最外层，不然不起作用，比如：axios.get.mockResolvedValue 就会报不识别
jest.mock('axios')
 
it('mock axios', () => {
    // expect.assertions(1)
    const users = [
        {name: 'Bob'}
    ]
    const res = { data: users }
    // 不能用mockReturnValue，因为是要mock返回promise，用mockReturnValue返回一个确定值，一会报 .then is not a function
    // axios.get.mockReturnValue(res)
    axios.get.mockResolvedValue(res)
    // axios.get.mockImplementation(() => Promise.resolve(res))
    // 用了expect.assertions和异步，正常情况下都得return 这个promise的，可能 mockResolvedValue 比较特殊吧...
    Users.all().then(data => {
        expect(data).toEqual(users)
    })
})
```

#### mock方法实现体

```javascript
it('mock implementation', () => {
    // 个人文件可以写在test（it）里，写在外面和里面都行
    jest.mock('./sum')
    const sum = require('./sum')
    sum.mockImplementation(() => 42)
    console.log(sum(1,2))
 
    const myMockFn = jest.fn().mockImplementationOnce(cb => cb(null, true))
        .mockImplementationOnce(cb => cb(null, false))
 
    myMockFn((err,val) => console.log(val))
    myMockFn((err,val) => console.log(val))
    // 这一次不会执行了，因为mockImplementationOnce只能用一次，且jest.mock时没有初始函数，所以不会执行，如果有的话，就执行它
    myMockFn((err,val) => console.log(val))
})
```

#### 链式调用

```javascript
it('mock return this', () => {
    const myObj = {
        method: jest.fn().mockReturnThis()
    }
    console.log(myObj.method())
})
```

#### mock name

看错误输出时，有个名称比较好辨认

```javascript
it('mock name', () => {
    const myMockFn = jest.fn()
    // mockReturnValue与mockImplementation互斥，谁在后，就保留谁
    myMockFn.mockReturnValue(12)
        .mockImplementation(s => 42+s)
        .mockName('hello') // 实在是没发现mockName在哪起作用...
})
```

#### custom matchers

更像是mock函数的语法糖

```javascript
it('custom matchers', () => {
    const myMockFn = jest.fn()
 
    myMockFn(1,2)
    myMockFn(2,3)
 
    // 至少调用一次
    expect(myMockFn).toBeCalled()
    // 等价于
    expect(myMockFn.mock.calls.length).toBeGreaterThan(0)
 
    // 至少被调用一次传入了特定参数
    expect(myMockFn).toBeCalledWith(1,2)
    // 等价于
    expect(myMockFn.mock.calls).toContainEqual([1,2]) // 用toEqual判断包含
 
    // 最后一次以特定参数调用
    expect(myMockFn).lastCalledWith(2,3)
    // 等价于
    expect(myMockFn.mock.calls[myMockFn.mock.calls.length-1]).toEqual([2,3])
 
    // 这个之后的篇章会再理解，现在我是没看懂啦... https://jestjs.io/docs/zh-Hans/snapshot-testing
    expect(myMockFn).toMatchSnapshot()
    // 先放着吧
 
    // 这个没有对应的语法糖
    // 看了下好像都是XXXCalledWith，就都是整组参数比较的，好像没看到单个参数的，所以官方才说这个没有对应的语法糖吧
    expect(myMockFn.mock.calls[0][1]).toBe(2)
})
```

### jest.fn 与 jest.spyOn

二者都可以 mock function 并记录相关调用信息，但其实从使用方式上就不同了

`jest.fn(implementation)`

```javascript
it('jest.fn', async () => {
  const mockCallback = jest.fn(x => console.log(x));
  await getUser().then(mockCallback);
  expect(mockCallback).toHaveBeenCalled();
})
```

`jest.spyOn(object, methodName)`

```javascript
const video = {
  play() {},
};
 
it('jest.spyOn', () => {
  const spy = jest.spyOn(video, 'play');
  video.play();
  expect(spy).toHaveBeenCalled();
})
```

**主要区别**：使用场景不同。`jest.fn`需要替换源方法被调用，而`jest.spyOn`则不需要，在不影响源代码的情况下（或者不方便替换源代码），mock 函数并获取相关调用信息，跟它的名字一样，spy 有着监听的感觉。

### mock 时间

有需要再看吧，哪那么多时间精学

### 开始和结束

官方小节叫 [Setup And Teardown](https://jestjs.io/docs/en/setup-teardown)，根据我的理解，其实就是

* 在执行一组测试用例开始之前执行相关动作（如在 beforeAll 里执行登录动作）
* 在执行一组测试用例结合后执行相关动作（如在 afterAll 里执行全局变量的还原）

Setup 翻译成 “安装、起步”，Teardown 翻译成 “拆卸、结束”

关于**执行顺序**如下

1. 所有的describe最先执行
2. 嵌套的describe层层递进，执行完，才会执行下一个describe
3. 执行顺序：beforeAll, beforeEach, test, afterEach, describe-beforeAll, beforeEach, describe-test, describe-afterEach, afterEach, describe-afterAll, afterAll
4. beforeAll一定会按顺序最先执行完，即使其内部有异步，jest 会自动等待，直到 done() 或 Promise.resolve()

上面是我很早之前写的，有点忘了。。反正就运行下面的例子，好好看下就能理解

```javascript
// 4. 执行所有测试用例之前先执行我，我的优先级只比 describe 低，就算我有延迟setTimeout，之后所有人都得等我
beforeAll(done => {
    setTimeout(() => {
        console.log('setTimeout')
        done()
    },1000)
})
// 5. 前面的 beforeAll 执行完，按书写顺序到我了
beforeAll(async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout2')
            resolve()
        })
    })
})
// 6. 前面两个异步终于完了，按书写顺序到我了
beforeAll(() => {
    console.log('beforeAll')
})
// 20. 执行完所有测试用例，就到我
afterAll(() => {
    console.log('afterAll')
})
// 7. 执行测试用例之前要先执行我（basic）
// 10. 执行测试用例之前要先执行我（basic2）
// 14. 就算是 describe 里的 test，执行之前也得先执行我（group-test）
beforeEach(() => {
    console.log('beforeEach')
})
// 9. 执行测试用例之后要执行我（basic）
// 12. 执行测试用例之后要执行我（basic2）
// 18. 就算是 describe 里的 test，执行完之后也得执行我（group-test）
afterEach(() => {
    console.log('afterEach')
})
// 8. 终于到我测试用例了
test('basic', () => {
    console.log('basic')
})
// 11. 按书写顺序，到我了
test('basic2', () => {
    console.log('basic2')
})
 
// 1. 虽然我放到后面，但我 group1 作为 describe 优先执行
describe('group1', () => {
    console.log('group1')
    // 2. 作为嵌套describe，我 group1-1 优先级比我父亲的兄弟 group2 高
    describe('group1-1', () => {
        console.log('group1-1')
    })
    // 13. 虽说我在 describe 里，但只有嵌套 describe 可以优先，我的执行顺序只取决于书写位置
    beforeAll(() => {
        console.log('group','beforeAll')
    })
    // 19. 执行完当前 describe 的所有测试用例，就到我
    afterAll(() => {
        console.log('group','afterAll')
    })
    // 15. 执行当前 describe 里的 test 之前，都得先执行我
    beforeEach(() => {
        console.log('group','beforeEach')
    })
    // 17. 执行当前 describe 里的 test 之后，都得先执行我
    afterEach(() => {
        console.log('group','afterEach')
    })
    // 16. 虽然我也在 describe 里，但我的执行顺序也只取决于书写位置
    test('group-test', () => {
        console.log('group-test')
    })
})
 
// 3. 前面的 describe 家族执行完，到我了
describe('group2', () => {
    console.log('group2')
})
```

输出结果如下

```javascript
group1
group1-1
group2
setTimeout
setTimeout2
beforeAll
beforeEach
basic
afterEach
beforeEach
basic2
afterEach
group beforeAll
beforeEach
group beforeEach
group-test
group afterEach
afterEach
group afterAll
afterAll
```

 

### 异步

#### 错误示范

这是个错误例子，不要学！！！

```javascript
function fetchData(data) {
    setTimeout(() => {
        data.push('hello')
    }, 200)
}
 
it('error test asynchronous', () => {
    const data = []
    fetchData(data)
    // error， 因为fetchData是异常的，数据data还没来得及修改
    // expect(data.length).not.toBe(0)
})
```

#### 正确：使用done解决异步

在异步结束时，执行 done() 结束该测试用例

**注意**：只要参数写了 done，jest 会检测参数，如果不执行 done()，测试用例就会一直等待，直至超过 5000ms 报错（5000ms 是 jest 规定的，怎么配置或者能不能配置暂时不知）

```javascript
it('done with asynchronous', done => {
    expect.assertions(1)
    setTimeout(() => {
        expect('error').toMatch('error')
        done()
    }, 200)
})
```

#### 正确：promise解决异步

```javascript
// 用到的一些辅助方法
function fetchDataPromise(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data && data.push('hello')
            resolve(data)
        }, 200)
    })
}
 
function fetchDataPromiseResolve(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data && data.push('hello')
            resolve('success')
        }, 200)
    })
}
 
function fetchDataPromiseReject() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 200)
    })
}
```

 

```javascript
it('promise test asynchronous', () => {
    // expect.assertions(1)
    const data = []
    return fetchDataPromise(data).then(() => {
        expect(data.length).not.toBe(0)
    })
})
it('promise with an assertion', () => {
    expect.assertions(1)
    // 必须return promise，否则expect.assertions会报zero assertion calls，实际上有，但因为异步，返回promise，表明异步
    return fetchDataPromiseReject().catch(e => {
        expect(e).toMatch('error')
    })
})
it('resolves with an assertion', () => {
    expect.assertions(1)
    // 此处一定要return，简单地猜想，无非还是要promise
    return expect(fetchDataPromiseResolve()).resolves.toMatch('success') // 包含即可
})
it('rejects with an assertion', () => {
    expect.assertions(1)
    // 此处一定要return，简单地猜想，无非还是要promise
    return expect(fetchDataPromiseReject()).rejects.toMatch('error')
})
```

#### 正确：Async/Await 解决异步

用了 async 这个语法糖，就不用像 promise 那样一定要 return 了

```javascript
it('async and await test asynchronous', async () => {
    const data = await fetchDataPromise([])
    expect(data.length).not.toBe(0)
})
it('async and await with resolves and rejects', async () => {
    expect.assertions(2)
    await expect(fetchDataPromiseResolve()).resolves.toMatch('success')
    await expect(fetchDataPromiseReject()).rejects.toMatch('error')
})
```

### testEnvironment

测试环境，默认为 jsdom，也就是实现了部分浏览器 api。如下

```javascript
describe("jsdom", () => {
  it("localStorage", () => {
    expect(localStorage).toBeDefined()
  })
  it("sessionStorage", () => {
    expect(sessionStorage).toBeDefined()
  })
  it("cookie", () => {
    expect(document.cookie).toBeDefined()
  })
})
```

但实际上 jsdom 还是不完美（具体怎么不完美，我忘了...），可以使用 [jest-electron](https://github.com/hustcc/jest-electron) 实现更加真实的浏览器环境，这是我参考 [g6](https://github.com/antvis/G6) 的解决方案的，由于没有更多的使用，就先不管了。

### BDD vs TDD

TDD，测试驱动开发，全称：Test Driven Development

BDD，行为驱动开发，全称：Behavior Driven Development

区别，两者感觉就是个理念不同而已，**BDD 会更加像人类语言，就这么简单**

以下例子来自 [chai 官网](https://www.chaijs.com/)

比如 TDD 的写法如下

```javascript
var assert = chai.assert;
 
assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
```

而 BDD 的写法如下

```javascript
// expect 风格
var expect = chai.expect;
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors').with.lengthOf(3);
 
// should 风格
chai.should();
foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors').with.lengthOf(3);
```

### it vs test 和 spect vs test

```javascript
// hello.spec.js
it('hello', ()=>{})
 
// hello.test.js
test('hello', ()=>{})
```

关于这个的区别，其实只是**口味问题**而已！！！

我们知道，jest 只是后起之秀，早在它之前就有好多优秀的测试框架，有的用`it`，有的用`test`，这只是一种满足大众习惯的做法，好处应该就是可以让习惯其它框架的人，更友好地过滤吧

### 代码覆盖率

代码覆盖率可以用来保证我们的测试代码是否全面，是否把源代码的`每一行、每个函数、每个分支、每个语句`都覆盖到

更多代码覆盖率知识见阮一峰的[代码覆盖率工具 Istanbul 入门教程](https://www.ruanyifeng.com/blog/2015/06/istanbul.html)

> 我自己的体会就是，写插件时，看到这么多方法没有被覆盖到，心理都没底，都不敢轻易把插件发布出去

#### CLI 方式

```shell
jest --coverage
# or
jest --collectCoverage
```

#### 配置文件

```javascript
module.exports = {
  // 开启代码覆盖率收集
  collectCoverage: true
}
```

 

### 结合 babel

jest 能支持的 es6 取决于执行的 node 环境（好像是这样，，，有点忘了，不知道为什么会有这样的印象，先写上吧~~）

node 尚不正式支持 es6 import 等一些新特性，需要使用 babel

```shell
# babel需要的包（没有runtime，因为runtime是polyfill）
npm i @babel/core @babel/preset-env -D
```

jest 默认安装 `babel-jest`，若根目录下有 babel 配置文件，则使用 babel-jest 进行转译

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
```

使用命令还是 `jest test`

#### 指定配置文件

默认配置文件放置根目录，但如果想换个地方呢？比如 `/config`，或者想改名字也不是不可能

修改 **jest.config.js**

```javascript
module.exports = {
    // 指定 babel 配置文件
    // https://github.com/facebook/jest/issues/3845#issuecomment-582511237
    transform: {
        // 前面这串正则是看官网的，transform的默认值
        "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "path/to/babel.config.js" }], // 路径相对 pwd()
    },
}
```

> 在使用 yarn workspace 的 monorepo 项目结构中遇到的问题，jest 被安装在 `packages/` 下的子项目

### 结合 eslint

为 jest 添加环境变量，避免报 `it`为`undefined`

```javascript
// .eslintrc.js
module.exports = {
    env: {
        jest: true
    }
}
```

### 各种框架

jest、mocha、chai、istanbul、karma、jasmine 等等，咋这么多呢？

`mocha`是一个`测试框架`，提供了**describle**、**it**等关键字

`chai`是一个`断言库`，提供**should.be**、**expect**等关键字

`istanbul `是一个`代码覆盖率工具`，测试的时候，我们常常关心，是否所有代码都测试到了

`jest`是一个`测试框架`，但它更**开箱即用**。断言库和代码覆盖率它都内置了

`karma`，没用过，看网上介绍是一个启动各种浏览器的整合工具

`jasmine`，没用过，大概看下官网，感觉人家也挺小巧全面的

### FAQ

这一小节，主要是使用中遇到的一些场景，比较典型，记录下，便于以后使用

#### 屏蔽 console 信息

只想看到干净的通过信息，不想看到 console 信息

```javascript
it('hide console info', () => {
  // 不想在跑测试用例时，看到console信息
  const spy = jest.spyOn(console, 'error').mockReturnValue();
 
  // 实际测试用例写在中间
  // ...
 
  // 看不到console信息，但要确保它确实有执行console
  expect(spy).toHaveBeenCalled();
  // 还原console.error
  spy.mockRestore();
});
```