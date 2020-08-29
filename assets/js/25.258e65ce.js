(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{505:function(s,e,t){"use strict";t.r(e);var a=t(4),r=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"声明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#声明"}},[s._v("#")]),s._v(" 声明")]),s._v(" "),t("p",[s._v("参考自 "),t("a",{attrs:{href:"https://www.cnblogs.com/peida/archive/2013/03/18/2965369.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("每天一个linux命令（61）：wget命令"),t("OutboundLink")],1)]),s._v(" "),t("h3",{attrs:{id:"wget下载单个文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget下载单个文件"}},[s._v("#")]),s._v(" wget下载单个文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("从网络下载一个文件并保存在当前目录，在下载的过程中会显示进度条，包含（下载完成百分比，已经下载的字节，当前下载速度，剩余下载时间）。")]),s._v(" "),t("h3",{attrs:{id:"wget-o下载并以不同的文件名保存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-o下载并以不同的文件名保存"}},[s._v("#")]),s._v(" wget -O下载并以不同的文件名保存")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O wordpress.zip http://www.minjieren.com/download.aspx?id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1080")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("code",[s._v("wget")]),s._v("默认会以最后一个符合"),t("code",[s._v("/")]),s._v("后面的字符来命令，对于动态链接的下载通常文件名会不正确。")]),s._v(" "),t("p",[t("strong",[s._v("错误")]),s._v("：下面的例子会下载一个文件并以名称"),t("code",[s._v("download.aspx?id=1080")]),s._v("保存")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://www.minjieren.com/download?id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("即使下载的文件是"),t("code",[s._v("zip格式")]),s._v("，它仍然以"),t("code",[s._v("download.php?id=1080")]),s._v("命名。")]),s._v(" "),t("p",[t("strong",[s._v("正确")]),s._v("：为了解决这个问题，我们可以使用参数"),t("code",[s._v("-O")]),s._v("来指定一个文件名：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O wordpress.zip http://www.minjieren.com/download.aspx?id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1080")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"wget-o-下载并输出至终端标准流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-o-下载并输出至终端标准流"}},[s._v("#")]),s._v(" wget -O - 下载并输出至终端标准流")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O -\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("code",[s._v("-O -")]),s._v("等价于"),t("code",[s._v("-O /dev/stdout")])]),s._v(" "),t("p",[s._v("上面语句等价于下面这句")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O /dev/stdout\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"wget-o-sh下载并运行-不保存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-o-sh下载并运行-不保存"}},[s._v("#")]),s._v(" wget -O - | sh下载并运行（不保存）")]),s._v(" "),t("p",[s._v("这样的好处就是不会保存文件，运行完就没有了")]),s._v(" "),t("p",[s._v("原理：无非是把"),t("code",[s._v("shell")]),s._v("脚本直接管道输出至"),t("code",[s._v("sh")]),s._v("运行罢了")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"wget-limit-rate限速下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-limit-rate限速下载"}},[s._v("#")]),s._v(" wget –limit -rate限速下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --limit-rate"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("300k http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("当你执行"),t("code",[s._v("wget")]),s._v("的时候，它默认会占用全部可能的宽带下载。但是当你准备下载一个大文件，而你还需要下载其它文件时就有必要限速了。")]),s._v(" "),t("h3",{attrs:{id:"wget-c断点续传"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-c断点续传"}},[s._v("#")]),s._v(" wget -c断点续传")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -c http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("使用"),t("code",[s._v("wget -c")]),s._v("重新启动下载中断的文件，对于我们下载大文件时突然由于网络等原因中断非常有帮助，我们可以继续接着下载而不是重新下载一个文件。需要继续中断的下载时可以使用-c参数。")]),s._v(" "),t("h3",{attrs:{id:"wget-b后台下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-b后台下载"}},[s._v("#")]),s._v(" wget -b后台下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -b http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("对于下载非常大的文件的时候，我们可以使用参数"),t("code",[s._v("-b")]),s._v("进行后台下载。")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -b http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n\nContinuing "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" background, pid "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1840")]),s._v(".\nOutput will be written to `wget-log'.\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("你可以使用以下命令来察看下载进度：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tail")]),s._v(" -f wget-log\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"伪装代理名称下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#伪装代理名称下载"}},[s._v("#")]),s._v(" 伪装代理名称下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --user-agent"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16"')]),s._v(" http://www.minjieren.com/wordpress-3.1-zh_CN.zip\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("有些网站能通过根据判断代理名称不是浏览器而拒绝你的下载请求。不过你可以通过"),t("code",[s._v("–user-agent")]),s._v("参数伪装。")]),s._v(" "),t("h3",{attrs:{id:"wget-spider测试下载链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-spider测试下载链接"}},[s._v("#")]),s._v(" wget –spider测试下载链接")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --spider URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("当你打算进行定时下载，你应该在预定时间测试下载链接是否有效。我们可以增加"),t("code",[s._v("–spider")]),s._v("参数进行检查。")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --spider URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("如果下载链接"),t("strong",[s._v("正确")]),s._v("，将会显示")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --spider URL\n\nSpider mode enabled. Check "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" remote "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" exists.\nHTTP request sent, awaiting response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("200")]),s._v(" OK\nLength: unspecified "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("text/html"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nRemote "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" exists and could contain further links,\nbut recursion is disabled -- not retrieving.\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("这保证了下载能在预定的时间进行")]),s._v(" "),t("p",[s._v("但当你给错了一个链接，将会显示如下"),t("strong",[s._v("错误")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --spider url\n\nSpider mode enabled. Check "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" remote "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" exists.\nHTTP request sent, awaiting response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("404")]),s._v(" Not Found\nRemote "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" does not exist -- broken link"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("你可以在以下几种情况下使用"),t("code",[s._v("spider参数")]),s._v("：")]),s._v(" "),t("ul",[t("li",[s._v("定时下载之前进行检查")]),s._v(" "),t("li",[s._v("间隔检测网站是否可用")]),s._v(" "),t("li",[s._v("检查网站页面的死链接")])]),s._v(" "),t("h3",{attrs:{id:"wget-tries增加重试次数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-tries增加重试次数"}},[s._v("#")]),s._v(" wget –tries增加重试次数")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --tries"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("40")]),s._v(" URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("如果网络有问题或下载一个大文件也有可能失败。"),t("code",[s._v("wget")]),s._v("默认重试"),t("code",[s._v("20次")]),s._v("连接下载文件。如果需要，你可以使用"),t("code",[s._v("–tries")]),s._v("增加重试次数。")]),s._v(" "),t("h3",{attrs:{id:"wget-i下载多个文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-i下载多个文件"}},[s._v("#")]),s._v(" wget -i下载多个文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -i filelist.txt\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("首先，保存一份下载链接文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" filelist.txt\n\nurl1\nurl2\nurl3\nurl4\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("接着使用这个文件和参数"),t("code",[s._v("-i")]),s._v("下载")]),s._v(" "),t("h3",{attrs:{id:"wget-mirror镜像网站"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-mirror镜像网站"}},[s._v("#")]),s._v(" wget –mirror镜像网站")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --mirror -p --convert-links -P ./LOCAL URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("下载整个网站到本地。")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("–miror")]),s._v("：开户镜像下载")]),s._v(" "),t("li",[t("code",[s._v("-p")]),s._v("：下载所有为了html页面显示正常的文件")]),s._v(" "),t("li",[t("code",[s._v("–convert-links")]),s._v("：下载后，转换成本地的链接")]),s._v(" "),t("li",[t("code",[s._v("-P ./LOCAL")]),s._v("：保存所有文件和目录到本地指定目录")])]),s._v(" "),t("h3",{attrs:{id:"wget-reject过滤指定格式下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-reject过滤指定格式下载"}},[s._v("#")]),s._v(" wget –reject过滤指定格式下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --reject"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("gif URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("下载一个网站，但你不希望下载图片，可以使用以下命令。")]),s._v(" "),t("h3",{attrs:{id:"wget-o把下载信息存入日志文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-o把下载信息存入日志文件"}},[s._v("#")]),s._v(" wget -o把下载信息存入日志文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -o download.log URL\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("不希望下载信息直接显示在终端而是在一个日志文件，可以使用")]),s._v(" "),t("h3",{attrs:{id:"wget-q限制总下载文件大小"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-q限制总下载文件大小"}},[s._v("#")]),s._v(" wget -Q限制总下载文件大小")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -Q5m -i filelist.txt\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("当你想要下载的文件超过5M而退出下载，你可以使用。"),t("strong",[s._v("注意：这个参数对单个文件下载不起作用，只能递归下载时才有效。")])]),s._v(" "),t("h3",{attrs:{id:"wget-r-a下载指定格式文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-r-a下载指定格式文件"}},[s._v("#")]),s._v(" wget -r -A下载指定格式文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -r -A.pdf url\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("可以在以下情况使用该功能：")]),s._v(" "),t("ul",[t("li",[s._v("下载一个网站的所有图片")]),s._v(" "),t("li",[s._v("下载一个网站的所有视频")]),s._v(" "),t("li",[s._v("下载一个网站的所有PDF文件")])]),s._v(" "),t("h3",{attrs:{id:"wget-ftp下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wget-ftp下载"}},[s._v("#")]),s._v(" wget FTP下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" ftp-url\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --ftp-user"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("USERNAME --ftp-password"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("PASSWORD url\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("可以使用"),t("code",[s._v("wget")]),s._v("来完成"),t("code",[s._v("ftp链接")]),s._v("的下载。")]),s._v(" "),t("p",[s._v("使用"),t("code",[s._v("wget匿名ftp")]),s._v("下载：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" ftp-url\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("使用"),t("code",[s._v("wget用户名和密码认证的ftp")]),s._v("下载")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" --ftp-user"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("USERNAME --ftp-password"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("PASSWORD url\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);e.default=r.exports}}]);