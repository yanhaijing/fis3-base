# 文档
这里说明文档。依赖fis3，如果你不了解fis3，请移步[fis3官网](http://fis.baidu.com/)。

## 依赖
fis依赖node，了解node请看这里[nodejs.org](http://nodejs.org/)。

**注意：windows平台，推荐node版本 0.12.x。**

第一步，用下面的命令安装fis3（安装失败，可以试试[淘宝镜像](http://yanhaijing.com/tool/2015/09/01/my-npm-note/)）

	npm install -g fis3

第二步，安装fis插件
    
    # hook类
    npm install -g fis3-hook-commonjs
    
    # parser类
    ## 下面两个sass插件二选一，还需要更改fisconf里对应的插件
    npm install -g fis-parser-sass # node版本需 <= 0.12
    npm install -g fis-parser-node-sass # node >= 4

    npm install -g fis-parser-less
    npm install -g fis-parser-template
    npm install -g fis-parser-babel-5.x
    
    # preprocessor类
    npm install -g fis3-preprocessor-js-require-file
    npm install -g fis3-preprocessor-js-require-css

    # postprocessor类
    npm install -g fis-postprocessor-autoprefixer
    
    # postpackager类
    npm install -g fis3-postpackager-loader
    
    # optimizer类
    # npm install -g fis3-optimizer-html-compress # 此插件已废弃，可跳过

    # deploy类
    npm install -g fis3-deploy-skip-packed

更多插件可以看[fis3插件开发](http://fis.baidu.com/fis3/docs/api/dev-plugin.html)和[fis3常用插件列表

](http://fis.baidu.com/fis3/docs/common-plugin.html)。

第三步，需要安装组件，此处需要区分使用npm，还是components

如果你是用的是npm（也就是使用fis-conf-npm.js），接下来需要安装npm依赖

    npm install
    
如果你使用fis-components（也就是使用fis-conf.js），接下来需要安装fis组件

    fis3 install

更多信息请看[fis用户文档](http://fis.baidu.com/fis3/docs/beginning/install.html)。

如果

## 如何运行
开启fis服务器

	fis3 server start

发布

	fis3 release

	fis3 release prod-debug # 本地查看发布产品库状态
    fis3 release prod # 发布产品库

    fis3 release rd # 发布到指定机器
	fis3 release rd-debug # 发布到指定机器调试

更多命令请[查看这里](http://fis.baidu.com/fis3/docs/api/command.html)。

## 目录说明
项目的目录树如下：

    ┌─components
    ├─img
    ├─lib
    ├─modules
    │  ├─app
    │  ├─css
    │  ├─lib
    │  ├─ui
    │  └─util
    └─test

根目录下存放html文件。

- components fis 组件的目录
- img html中用到的图片
- lib 存放一些不打包的js库
- modules 项目的组件
	- app 项目用到的js
	- css 项目用到的css
	- lib 第三方js
	- ui UI 组件
	- util 工具组件
- test 模拟测试数据

## fis components
fis提供了大量组件，社区比较活跃的库一般都有组件存在，你可以在下面的链接查找对应组件。
https://github.com/fis-components

**注意：为了稳定性，建议把components也加入版本控制库。**

## 问题反馈
使用过程中的常见问题请见这里 [issue](https://github.com/yanhaijing/fis3-base/issues)。
