---
title: Git使用技巧
date: 2019-05-06
tags:
  - 版本控制
  - Git
categories:
  - 版本控制
---

 

```shell
# 查看帮助（等价于 git 不带任何参数）
git --help
# 查看子命令帮助
git add -h
# 查看命令手册
git help add
# 查看help支持的参数
git help -h
# 查看所有可用命令
git help -a # all
# 查看所有可用的指南
git help -g # guide
```

 

```shell
# 查看修改的地方
git diff
# 退出查看修改的地方，ctrl c没反应的地方都可以试下
ctrl z
# ctrl z退出应该是linux的一种比较强硬的手段，git自带的退出是输入“q”（适用于git log、git diff等命令）
q
```

gitlab查看commit号

![img](/img/f5007561-817e-4881-8a1e-af1910e4d82b.png)

gitlab查看分支是否合并

![img](/img/0db07d60-72e9-4764-a8a3-975376c844aa.png)

gitlab查看某个文件或目录的提交历史

![img](/img/2b44454d-a468-4ca8-916e-72f5c1fed83f.png)

 

```shell
# 查看当前分支所有commit记录
git log
# 查看某个commit变动的地方（一大堆代码）
git show 3d7cad3c5850ac885e62690f04f3b2cd1a260e80
# 查看某个commit变动的文件
git show 3d7cad3c5850ac885e62690f04f3b2cd1a260e80 --stat
# 合并某个commit至当前分支
# 只是合并至本地的分支，还需要git push才算完成
git cherry-pick 3d7cad3c5850ac885e62690f04f3b2cd1a260e80
```

 

```shell
# 本地分支重命名
git branch -m old new
# 删除本地分支
git branch -d <BranchName>
# 未合并分支不允许删除，使用-D强制删除
git branch -D <BranchName>
# 删除远程分支
git push --delete origin <BranchName>
git push -d origin <BranchName> # 使用-d表示缩写
```

 

```shell
# 在某个分支修改，工作未完成还无法提交，但需要临时切换到其它分支，做其它分支的任务，怎么办？
# 储藏当前工作区变动（所有未暂存、暂存的变动均被还原　）
git stash
# 查看现有的储藏
git stash list
# 还原至最近一次储藏
git stash apply
# 还原至指定的储藏
git statsh apply stash@{2} # name
```

 

```shell
# 撤销“版本控制文件”（未暂存）修改【即：还没git add】
git checkout . # 撤销全部修改，，，只针对已版本控制的文件，对于未跟踪文件是没有用的
git checkout src/index.js # 指定对应文件或目录
# 清空“未跟踪文件”
git clean -n # 查看将要删除的文件
git clean -df # 删除所有未跟踪文件（不包括.gitignore文件忽略的内容，比如：node_modules、dist）
git clean -df src # 指定路径删除
git clean -dfn # 查看-df将要删除的文件，效果其实和-n是一样的
git clean -xf # 删除所有未跟踪文件，包括.gitignore文件忽略的内容，对于现在的我，慎用
git clean -xfn # 查看-xf将要删除的文件
```

 

```shell
# 取消暂存
git reset HEAD # 默认等价于--soft
git reset --soft HEAD
# 取消暂存并撤回修改，即“还原至HEAD”
git reset --hard HEAD
# 撤销commit（所有修改打回workspace）
git reset HEAD^ # 默认等价于--soft
git reset --soft HEAD^ 
# 撤销commit，并且还原所有修改
git reset --hard HEAD^
```

 

```shell
# 查看git记录，复制commit编号
git log
# 还原至任何时刻
git reset --hard <commit编号>
```

 

```shell
# 为推送当前分支并建立与远程上游的跟踪
git push --set-upstream origin <branchName>
git push -u origin <branchName> # 缩写
# 为当前分支并建立与远程上游的跟踪
git branch --set-upstream-to=origin/<branchName> # 注意是/而不是空格，空格的话此处相当于截断，也就链接到origin即主干develop了
```

 

```shell
# 做了一半才发现自己在develop上，要切到自己的分支，做如下步骤
git stash # 暂存改动
git checkout myBranch # 切回自己分支
git pull origin develop # 一定要先拉取develop的代码，不然待会等着冲突吧
git stash apply # 恢复改动（如果没有执行上一步合并develop的操作，这步恢复改动是以之前所在分支为参考，也就是develop，那么就会有各种对不上，也就容易冲突）
```

 

```shell
# 记住用户名密码
git config --global credential.helper store
```

 

```shell
# 远程已删除分支，但git branch -a还是看得到，使用以下命令清空
git remote prune origin
# git fetch 也有同样功能
git fetch -p # -p表示--prune缩写
git fetch -P # -P表示--prune-tags（删除远程不存在的本地tag）
```

 

```shell
# 关联本地git项目和远程git项目
# 因为我用的是ssh的方式，所以此处选的是git@开头的！
git remote add origin git@github.com:hzmming/example.git
# 关联错了可以删掉重加
git remote remove origin
```

 

```shell
# 合并本地分支至当前分支
git merge otherbranch # 如果当前分支是develop，则为：otherbranch合并至develop
```

 

```shell
# 查看所有全局配置
git config --global -l # -l 是 --list 的缩写
# 配置全局属性。如 core.autocrlf
git config --global core.autocrlf input 
# 删除全局配置
git config --global --unset core.autocrlf
# 不加 --global，就是配置当前项目git
git config -l # 输出信息除了包括全局的git配置，还包括当前项目的git配置（每个项目有自己的.git文件夹）
```