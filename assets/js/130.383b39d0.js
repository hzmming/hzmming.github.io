(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{607:function(s,a,t){"use strict";t.r(a);var e=t(4),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("说是很好用，没怎么了解，反正跟风装了下")]),s._v(" "),t("h3",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),t("p",[t("em",[s._v("参考：https://zhuanlan.zhihu.com/p/19556676")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1. 安装zsh")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("zsh")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2. 切换至zsh")]),s._v("\nchsh -s /bin/zsh\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 3. 安装 oh my zsh")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[s._v("#")]),s._v(" 优点")]),s._v(" "),t("p",[s._v("目前就用了一个"),t("strong",[s._v("向上翻历史记录时，会根据已输入字母过滤")])]),s._v(" "),t("h3",{attrs:{id:"坑"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#坑"}},[s._v("#")]),s._v(" 坑")]),s._v(" "),t("h4",{attrs:{id:"第一个"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第一个"}},[s._v("#")]),s._v(" 第一个")]),s._v(" "),t("p",[t("code",[s._v("help")]),s._v("命令没了，因为echo的特殊性，"),t("code",[s._v("echo --help")]),s._v("会直接输出"),t("code",[s._v("--help")]),s._v("，所以要使用"),t("code",[s._v("help echo")]),s._v("，然而")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# zsh: command not found: help")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("暂未寻找解决方案")]),s._v(" "),t("h4",{attrs:{id:"第二个"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第二个"}},[s._v("#")]),s._v(" 第二个")]),s._v(" "),t("p",[s._v("查找时（比如通配），会出现"),t("code",[s._v("no matches found")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# no matches found")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" list zlib*\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("解决方案：在"),t("code",[s._v("~/.zshrc")]),s._v("中加入"),t("code",[s._v("setopt no_nomatch")]),s._v("，然后在终端上执行"),t("code",[s._v("source .zshrc")]),s._v("命令")]),s._v(" "),t("h3",{attrs:{id:"弃坑"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#弃坑"}},[s._v("#")]),s._v(" 弃坑")]),s._v(" "),t("p",[s._v("发现"),t("code",[s._v("compgen")]),s._v("命令竟然用不了，不知道还有多少问题，暂时不想用了")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1. 查看已有终端（也可以忽略）")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/shells\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2. 切换回bash")]),s._v("\nchsh -s /bin/bash\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);