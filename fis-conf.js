// 设置项目属性
fis.set('project.name', 'fis3-base');
fis.set('project.static', '/static');
fis.set('project.files', ['*.html', 'map.json', '/test/*']);

// 引入模块化开发插件，设置规范为 commonJs 规范。

fis.hook('commonjs', {
    baseUrl: './modules',
    extList: ['.js', '.es']
});

/*************************目录规范*****************************/

// 开启同名依赖
fis.match('/modules/**', {
    useSameNameRequire: true
});

// 配置css
fis.match(/^\/modules\/(.*\.scss)$/i, {
    parser: fis.plugin('sass', {
        include_paths: ['/components'] // 加入文件查找目录
    }),
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
    release: '${project.static}/$1.js'
});
fis.match(/^\/modules\/(.*)\.js$/i, {
    isMod: true,
    release: '${project.static}/$1.js'
});

// 配置前端模版 使用template.js
fis.match('**.tmpl', {
    parser: fis.plugin('template', {
        sTag: '<#',
        eTag: '#>',
        global: 'template'
    }),
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

// 公用js
var map = {
    'prd-debug': {
        host: '',
        path: ''
    },
    'prd': {
        host: 'http://yanhaijing.com',
        path: '/${project.name}'
    }
};

fis.util.map(map, function (k, v) {
    var domain = v.host + v.path;

    fis.media(k)
        .match('**.{js,es}', {
            useHash: true,
            domain: domain
        })
        .match('**.{css,scss}', {
            useSprite: true,
            useHash: true,
            domain: domain
        })
        .match('::image', {
            useHash: true,
            domain: domain
        })
        .match('**/(*_{x,y,z}.png)', {
            release: '/pkg/$1'
        })
        // 启用打包插件，必须匹配 ::package
        .match('::package', {
            spriter: fis.plugin('csssprites', {
                layout: 'matrix',
                // scale: 0.5,
                margin: '10'
            }),
            postpackager: fis.plugin('loader', {
                allInOne: true,
            })
        })
        .match('/modules/css/common.scss', {
            packTo: '/pkg/common.css'
        })
        .match('/components/**.js', {
            packTo: '/pkg/common.js'
        })
        .match('/modules/{lib,util,ui}/**.{js,es}', {
            packTo: '/pkg/common.js'
        });
});

// 发布产品库
fis.media('prd')
    .match('**.{js,es}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.{css,scss}', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    });
