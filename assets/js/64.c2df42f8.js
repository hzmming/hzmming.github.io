(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{543:function(t,e,n){"use strict";n.r(e);var s=n(4),a=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h4",{attrs:{id:"一-node-appendchild"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一-node-appendchild"}},[t._v("#")]),t._v(" 一. Node.appendChild")]),t._v(" "),n("p",[n("code",[t._v("Node.appendChild")]),t._v("，将一个节点（"),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Node",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Node")]),n("OutboundLink")],1),t._v(" 对象）添加到指定父节点的子节点列表末尾")]),t._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入文本")]),t._v("\ntarget"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createTextNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入节点")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])]),n("p",[n("code",[t._v("appendChild")]),t._v("有几个特性")]),t._v(" "),n("ol",[n("li",[t._v("兼容性好（IE5+）")]),t._v(" "),n("li",[t._v("只能接收"),n("code",[t._v("Node")]),t._v("类型元素作为参数")]),t._v(" "),n("li",[t._v("参数只能一个，即：一次只能添加一个元素")]),t._v(" "),n("li",[t._v("返回插入的元素")]),t._v(" "),n("li",[t._v("如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）")])]),t._v(" "),n("blockquote",[n("p",[t._v("Element节点继承自Node，以常见的div为例，其原型链如下")]),t._v(" "),n("p",[t._v('"HTMLDivElement <= HTMLElement <= Element <= Node <= EventTarget <= Object"')])]),t._v(" "),n("h4",{attrs:{id:"二-parentnode-append"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二-parentnode-append"}},[t._v("#")]),t._v(" 二. ParentNode.append")]),t._v(" "),n("p",[n("code",[t._v("ParentNode.append")]),t._v("，将一组 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Node",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Node")]),n("OutboundLink")],1),t._v(" 对象或 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("DOMString")]),n("OutboundLink")],1),t._v(" 对象添加到指定父节点的子节点列表末尾")]),t._v(" "),n("p",[t._v("被插入的 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("DOMString")]),n("OutboundLink")],1),t._v(" 对象等价为 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Text",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Text")]),n("OutboundLink")],1),t._v(" 节点（"),n("code",[t._v("DOMString")]),t._v("就是普通的字符串罢了）")]),t._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target1 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target2 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入文本（支持多个）")]),t._v("\ntarget1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'target1'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntarget2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'target2'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入节点（支持多个）")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br")])]),n("p",[n("code",[t._v("append")]),t._v("有几个特性")]),t._v(" "),n("ol",[n("li",[t._v("兼容性不好（不支持IE）［实验属性］")]),t._v(" "),n("li",[t._v("可以接收"),n("code",[t._v("Node")]),t._v("类型元素，也可以接收"),n("code",[t._v("字符串")]),t._v("（字符串等价于"),n("code",[t._v("Text")]),t._v("文本节点）")]),t._v(" "),n("li",[t._v("参数可以多个")]),t._v(" "),n("li",[t._v("无返回值")]),t._v(" "),n("li",[t._v("如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）")])]),t._v(" "),n("h4",{attrs:{id:"三-node-insertbefore"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三-node-insertbefore"}},[t._v("#")]),t._v(" 三. Node.insertBefore")]),t._v(" "),n("p",[n("code",[t._v("Node.insertBefore")]),t._v("，将一个节点（"),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Node",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Node")]),n("OutboundLink")],1),t._v(" 对象）添加到指定父节点的子节点列表中指定节点前面")]),t._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" referenceElement "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'referId'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" parentNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" referenceElement"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将target添加到指定节点referenceElement前面")]),t._v("\nparentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" referenceElement"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将target添加到父节点parentNode子节点列表末尾")]),t._v("\nparentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将target添加到父节点parentNode子节点列表前面")]),t._v("\nparentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("firstChild"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br")])]),n("blockquote",[n("p",[t._v("第二个参数referenceElement如果不存在，要传null，不提供或者传入无效值，不同浏览器会有不同的表现")])]),t._v(" "),n("p",[n("code",[t._v("insertBefore")]),t._v("有几个特性")]),t._v(" "),n("ol",[n("li",[t._v("兼容性一般（IE9+）")]),t._v(" "),n("li",[t._v("只能接收"),n("code",[t._v("Node")]),t._v("类型元素作为参数")]),t._v(" "),n("li",[t._v("参数只能一个，即：一次只能添加一个元素")]),t._v(" "),n("li",[t._v("返回插入的元素")]),t._v(" "),n("li",[t._v("如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）")])]),t._v(" "),n("h4",{attrs:{id:"四-parentnode-prepend"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四-parentnode-prepend"}},[t._v("#")]),t._v(" 四. ParentNode.prepend")]),t._v(" "),n("p",[n("code",[t._v("ParentNode.prepend")]),t._v("，将一组 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Node",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Node")]),n("OutboundLink")],1),t._v(" 对象或 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("DOMString")]),n("OutboundLink")],1),t._v(" 对象添加到指定父节点的子节点列表前面")]),t._v(" "),n("p",[t._v("被插入的 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("DOMString")]),n("OutboundLink")],1),t._v(" 对象等价为 "),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Text",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("Text")]),n("OutboundLink")],1),t._v(" 节点（"),n("code",[t._v("DOMString")]),t._v("就是普通的字符串罢了）")]),t._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target1 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target2 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入文本（支持多个）")]),t._v("\ntarget1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("prepend")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'target1'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntarget2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("prepend")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'target2'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插入节点（支持多个）")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("prepend")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br")])]),n("p",[n("code",[t._v("prepend")]),t._v("有几个特性")]),t._v(" "),n("ol",[n("li",[t._v("兼容性不好（不支持IE）［实验属性］")]),t._v(" "),n("li",[t._v("可以接收"),n("code",[t._v("Node")]),t._v("类型元素，也可以接收"),n("code",[t._v("字符串")]),t._v("（字符串等价于"),n("code",[t._v("Text")]),t._v("文本节点）")]),t._v(" "),n("li",[t._v("参数可以多个")]),t._v(" "),n("li",[t._v("无返回值")]),t._v(" "),n("li",[t._v("如果插入的节点是文档中现有节点，删除原节点（剪切粘贴）")])])])}),[],!1,null,null,null);e.default=a.exports}}]);