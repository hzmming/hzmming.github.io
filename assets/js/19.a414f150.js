(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{499:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("github地址：https://github.com/iberianpig/fusuma")]),s._v(" "),a("h4",{attrs:{id:"需求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#需求"}},[s._v("#")]),s._v(" 需求")]),s._v(" "),a("p",[s._v("ubuntu18只支持两指滚动、鼠标右键，而三指只支持三指鼠标中键，并不支持三指手势，怎么办？")]),s._v(" "),a("h4",{attrs:{id:"fusuma"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fusuma"}},[s._v("#")]),s._v(" fusuma")]),s._v(" "),a("h5",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1. 最重要一点，先将当前用户添加进input组，并重启系统")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" gpasswd -a "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$USER")]),s._v(" input\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2. 安装libinput")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" libinput-tools\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 3. 安装ruby（先前安装过ruby可以跳过）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ruby\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 4. 安装Fusuma")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" gem "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" fusuma\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 5. 安装xdotool（模拟按键和鼠标操作用的）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" xdotool\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("默认以下属性应该是开启的，如果没有，打开它")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gsettings get org.gnome.desktop.peripherals.touchpad send-events 可以查看是否开启")]),s._v("\ngsettings "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" org.gnome.desktop.peripherals.touchpad send-events enabled\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h5",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p ~/.config/fusuma        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# create config directory")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" ~/.config/fusuma/config.yml\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("code",[s._v("config.yml")]),s._v("内容如下")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("swipe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("left")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool click 9'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 三指左滑，前进")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("right")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool click 8'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 三指右滑，后退")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("up")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key super'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 三指上滑，任务列表")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("down")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key super+d'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 三指下滑，桌面")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("left")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key ctrl+Tab'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 四指左滑，向右切tab")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("right")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key ctrl+Shift+Tab'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 四指右滑，向左切tab")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("up")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key alt+Shift+Tab'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 四指上滑，逆时针循环切换应用")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("down")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool key alt+Tab'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 四指下滑，两应用之间切换")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("pinch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("in")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool keydown ctrl click 4 keyup ctrl'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 缩小")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("threshold")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("out")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n     "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xdotool keydown ctrl click 5 keyup ctrl'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 放大")]),s._v("\n     "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("threshold")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("threshold")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("swipe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("pinch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("swipe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("pinch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])]),a("p",[s._v("官网有模板：https://github.com/iberianpig/fusuma/wiki/")]),s._v(" "),a("h5",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("fusuma\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h5",{attrs:{id:"开机自启"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开机自启"}},[s._v("#")]),s._v(" 开机自启")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 首先查看程序位置")]),s._v("\nloryhuang@loryhuang-TravelMate-P238-G2-M:~/桌面$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" fusuma\n/usr/local/bin/fusuma\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("添加开机启动项，我另一篇笔记"),a("a",{attrs:{href:"wiz://open_document?guid=ff0e1c9d-9ec3-4c98-88e5-555bb54a7bc2&kbguid=&private_kbguid=7472715c-1c9b-4521-b56a-c3c6c6f9ca6e"}},[s._v("添加开机自启")]),s._v("有讲，不赘述了")]),s._v(" "),a("h5",{attrs:{id:"缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[s._v("#")]),s._v(" 缺点")]),s._v(" "),a("p",[s._v("只支持"),a("code",[s._v("swipe")]),s._v("和"),a("code",[s._v("pinch")]),s._v("，想自定义"),a("strong",[s._v("四指敲击")]),s._v("就不行...")]),s._v(" "),a("h4",{attrs:{id:"xdotool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xdotool"}},[s._v("#")]),s._v(" xdotool")]),s._v(" "),a("p",[a("code",[s._v("fusuma")]),s._v("做触摸板多指支持，"),a("code",[s._v("xdotool")]),s._v("做按键鼠标模拟")]),s._v(" "),a("p",[a("code",[s._v("xdotool")]),s._v("很强大，用法可以查看其自带的手册")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("man")]),s._v(" xdotool\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"xev"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xev"}},[s._v("#")]),s._v(" xev")]),s._v(" "),a("p",[s._v("使用"),a("code",[s._v("xdotool")]),s._v("可以模拟各种按键，那有些按键不知道其键值咋办？"),a("strong",[s._v("比如鼠标的两个侧键值是多少呢？")])]),s._v(" "),a("p",[a("code",[s._v("xev")]),s._v("，表示"),a("code",[s._v("X events")]),s._v("，输出所有鼠标、键盘事件，查看事件中的键值即可")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 终端输入xev，打开软件")]),s._v("\nxev\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200317002443.png",alt:""}})]),s._v(" "),a("p",[s._v("在打开的"),a("strong",[s._v("白色小窗口")]),s._v("上面进行操作，终端会显示出其对应的事件")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/hzmming/myGraphBed/master/20200317002716.png",alt:""}})]),s._v(" "),a("p",[s._v("得出"),a("strong",[s._v("鼠标后退侧键键值为8")]),s._v("，同理得出"),a("strong",[s._v("鼠标前进侧键键值为9")])]),s._v(" "),a("p",[s._v("所以使用"),a("code",[s._v("xdotool")]),s._v("时，就可以这样写到")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 执行鼠标后退侧键")]),s._v("\nxdotool click "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);