(window.webpackJsonp=window.webpackJsonp||[]).push([[193],{672:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),t("p",[s._v("ubuntu安装git很简单")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Ubuntu内置git")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("添加源安装最新稳定版本")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" add-apt-repository ppa:git-core/ppa\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" update\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"配置-ssh-key"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置-ssh-key"}},[s._v("#")]),s._v(" 配置 SSH-Key")]),s._v(" "),t("h4",{attrs:{id:"单个-key"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单个-key"}},[s._v("#")]),s._v(" 单个 key")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# linux和mac系统自带ssh-keygen。windows系统请使用 git bash")]),s._v("\nssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'844155285@qq.com'")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("连续回车即可，如果不需要密码。")]),s._v(" "),t("p",[s._v("生成私钥 "),t("code",[s._v("id_rsa")]),s._v(" 和公钥 "),t("code",[s._v("id_rsa.pub")]),s._v("。公钥名字就是私钥加个 pub 后缀名。")]),s._v(" "),t("p",[s._v("将公钥添加到 github 上")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830113134203.png",alt:"image-20200830113134203"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830113153150.png",alt:"image-20200830113153150"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830113220303.png",alt:"image-20200830113220303"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830114248618.png",alt:"image-20200830114248618"}})]),s._v(" "),t("p",[s._v("在终端测试下是否成功")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -T git@github.com\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h4",{attrs:{id:"多个-key"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多个-key"}},[s._v("#")]),s._v(" 多个 key")]),s._v(" "),t("p",[s._v("当我们要同时具备多个 git 账号时，就需要配置多个。")]),s._v(" "),t("p",[s._v("比如同时具备 github 和 gitee")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 给gitee用")]),s._v("\nssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'844155285@qq.com'")]),s._v(" -f ~/.ssh/gitee_id_rsa "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 和单个key的区别就是，我这里指定了名称")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 给github用")]),s._v("\nssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'844155285@qq.com'")]),s._v(" -f ~/.ssh/github_id_rsa\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("生成 "),t("code",[s._v("gitee_id_rsa")]),s._v("、"),t("code",[s._v("gitee_id_rsa.pub")]),s._v("和"),t("code",[s._v("github_id_rsa")]),s._v("、"),t("code",[s._v("github_id_rsa.pub")]),s._v("两对")]),s._v(" "),t("p",[s._v("新增配置文件，指定哪对密钥对应哪个网站")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建一个无后缀的文件，名字叫 config")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" config\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("内容如下")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gitee")]),s._v("\nHost gitee.com\nHostName gitee.com\nPreferredAuthentications publickey\nIdentityFile ~/.ssh/gitee_id_rsa\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# github")]),s._v("\nHost github.com\nHostName github.com\nPreferredAuthentications publickey\nIdentityFile ~/.ssh/github_id_rsa\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("p",[s._v("一样的道理，将公钥添加到对应的网站")]),s._v(" "),t("p",[s._v("github 的添加过程上面有了，这里再讲下 gitee 的添加过程")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830113952163.png",alt:"image-20200830113952163"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/image-20200830114111152.png",alt:"image-20200830114111152"}})]),s._v(" "),t("p",[s._v("验证下是否成功")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -T git@gitee.com\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -T git@github.com\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"设置个人信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置个人信息"}},[s._v("#")]),s._v(" 设置个人信息")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.name LoryHuang\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.email "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("844155285")]),s._v("@qq.com\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"创建自己的分支"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建自己的分支"}},[s._v("#")]),s._v(" 创建自己的分支")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b hzm        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建自己的分支 并切换过去")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -u origin hzm    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提交分支，远程无当前分支自动创建新分支")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 也可以这样 git push origin hzm:hzm")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch     "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看本地所有分支及当前所属分支")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -a  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看本地及远程的所有分支")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" fetch      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 若git branch -a看不到所有分支，是因为有些分支是在你拉取代码之后再建的，要先fetch下信息")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"更新代码至自己的分支"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#更新代码至自己的分支"}},[s._v("#")]),s._v(" 更新代码至自己的分支")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" pull origin developer  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉取其它分支代码至当前分支（本地代码）【merge是用于将当前分支合并到指定的远程分支】")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果冲突的话")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并冲突后需要使用git commit结束合并（合并冲突时可以不用填信息），没有冲突就会自动合并不用git commit")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将本地合并提交至远程")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"提交代码至自己的分支"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#提交代码至自己的分支"}},[s._v("#")]),s._v(" 提交代码至自己的分支")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'修改 xx bug'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push origin hzm    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在分支提交不指定好像不行")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"解冲突"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解冲突"}},[s._v("#")]),s._v(" 解冲突")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1. 解决冲突")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2. 提交")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"合并代码至主分支"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#合并代码至主分支"}},[s._v("#")]),s._v(" 合并代码至主分支")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(". 登录git网站\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(". 切换到自己的分支\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(". 左侧提交记录\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(". 创建合并请求\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(". change分支至指定分支\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(". compare\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(". submit\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(". merge\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);