(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{531:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("在ubuntu系统的termial下，用apt-get install 安装软件的时候，如果在未完成下载的情况下将terminal close。此时 apt-get进程可能没有结束。结果，如果再次运行apt-get install 命令安装如今，可能会发生下面的提示：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("无法获得锁 /var/lib/dpkg/lock - "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(": 资源暂时不可用"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n无法锁定管理目录"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("/var/lib/dpkg/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，是否有其他进程正占用它？\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("解决办法如下：")]),s._v(" "),a("ol",[a("li",[s._v("终端输入 ps aux ，列出进程。找到含有apt-get的进程，直接sudo kill PID。")]),s._v(" "),a("li",[s._v("强制解锁,命令")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" /var/cache/apt/archives/lock\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" /var/lib/dpkg/lock\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);