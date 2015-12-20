// 设置项目属性
fis.set('project', {
    name: 'fis3-base',
    static: '/static',
    files: ['*.html', 'map.json', '/test/*'] //设置编译范围为 html 文件，不过 html 文件中使用到的资源也会参与编译。
});

// 引入模块化开发插件，设置规范为 commonJs 规范。
fis.hook('module', {
    mode: 'commonJs'
});

/*************************目录规范*****************************/
// 配置css
fis.match(/^\/modules\/(.*\.scss)$/i, {
    parser: fis.plugin('sass'),
    rExt: '.css',
    isMod: true,
    release: '${project.static}/$1'
});
fis.match(/^\/modules\/(.*\.css)$/i, {
    isMod: true,
    release: '${project.static}/$1'
})
fis.match(/^\/modules\/(.*\.(?:png|jpg|gif))$/i, {
    release: '${project.static}/$1'
});

// 配置js
fis.match('/lib/**.js', {
    release: '${project.static}/$&'
});
fis.match('/components/**.js', {
    isMod: true,
    release: '${project.static}/$&'
});
fis.match(/^\/modules\/(.*)\.es$/i, {
    parser: fis.plugin('babel-5.x'),
    rExt: 'js',
    isMod: true,
    id: '$1',
    release: '${project.static}/$1.js'
});
fis.match(/^\/modules\/(.*)\.js$/i, {
    isMod: true,
    id: '$1',
    release: '${project.static}/$1.js'
});

// 配置前端模版
fis.match('**.tmpl', {
    isJsLike: true,
    release : false
});

// 配置模拟数据
fis.match('/test/**', {
  release: '$0'
});
fis.match('/test/server.conf', {
  release: '/config/server.conf'
});


/*************************打包规范*****************************/

// 因为是纯前段项目，依赖不能自断被加载进来，所以这里需要借助一个 loader 来完成，
// 注意：与后端结合的项目不需要此插件!!!
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});


// fis3 release prod 产品发布，进行合并
fis.media('prod');
