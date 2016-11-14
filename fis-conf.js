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


// ------ 全局配置
// 允许你在 js 中直接 require css+文件
fis.match('*.{js,es}', {
    preprocessor: [
        fis.plugin('js-require-file'),
        fis.plugin('js-require-css', {
            mode: 'dependency'
        })
    ]
});

// 配置图片压缩
fis.match('**.png', {
    optimizer: fis.plugin('png-compressor', {
        type: 'pngquant'
    })
});


// ------ 配置lib
fis.match('/lib/**.js', {
    release: '${project.static}/$&'
});


// ------ 配置components
fis.match('/components/**', {
    release: '${project.static}/$&'
});
fis.match('/components/**.css', {
    isMod: true,
    release: '${project.static}/$&'
});
fis.match('/components/**.js', {
    isMod: true,
    release: '${project.static}/$&'
});


// ------ 配置modules
fis.match('/modules/(**)', {
    release: '${project.static}/$1'
})

// 配置css
fis.match(/^\/modules\/(.*\.scss)$/i, {
    parser: fis.plugin('sass', {
        include_paths: ['modules/css', 'components'] // 加入文件查找目录
    })
});
fis.match(/^\/modules\/(.*\.less)$/i, {
    parser: fis.plugin('less', {
        paths: []
    })
});
fis.match(/^\/modules\/(.*\.(scss|less|css))$/i, {
    rExt: '.css',
    isMod: true,
    release: '${project.static}/$1',
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['IE >= 8', 'Chrome >= 30', 'last 2 versions'] // pc
            // browsers: ['Android >= 4', 'ChromeAndroid > 1%', 'iOS >= 6'] // wap
    })
});
fis.match(/^\/modules\/(.*\.(?:png|jpg|gif))$/i, {
    release: '${project.static}/$1'
});

// 配置js
fis.match(/^\/modules\/(.*\.es)$/i, {
    parser: fis.plugin('babel-5.x'),
    rExt: 'js',
    isMod: true,
    release: '${project.static}/$1'
});
fis.match(/^\/modules\/(.*\.js)$/i, {
    isMod: true,
    release: '${project.static}/$1'
});


// ------ 配置前端模版 使用template.js
fis.match('**.tmpl', {
    parser: fis.plugin('template', {
        sTag: '<#',
        eTag: '#>',
        global: 'template'
    }),
    isJsLike: true,
    release: false
});


// ------ 配置模拟数据
fis.match('/test/**', {
    release: '$0'
});
fis.match('/test/server.conf', {
    release: '/config/server.conf'
});


/*************************打包规范*****************************/

// 因为是纯前端项目，依赖不能自断被加载进来，所以这里需要借助一个 loader 来完成，
// 注意：与后端结合的项目不需要此插件!!!
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

// debug后缀 不会压缩
var map = {
    'rd': {
        host: '',
        path: ''
    },
    'rd-debug': {
        host: '',
        path: ''
    },
    'prod': {
        host: 'http://yanhaijing.com',
        path: '/${project.name}'
    },
    'prod-debug': {
        host: '',
        path: ''
    }
};

// 通用 1.替换url前缀 2.添加mr5码 3.打包 4.合图 5.重新定义资源路径
Object.keys(map).forEach(function(v) {
    var o = map[v];
    var domain = o.host + o.path;

    fis.media(v)
        .match('**.{es,js}', {
            useHash: true,
            domain: domain
        })
        .match('**.{scss,less,css}', {
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
                // scale: 0.5, // 移动端二倍图用
                margin: '10'
            }),
            postpackager: fis.plugin('loader', {
                allInOne: true,
            })
        })
        .match('/lib/es5-{shim,sham}.js', {
            packTo: '/pkg/es5-shim.js'
        })
        .match('/components/**.css', {
            packTo: '/pkg/components.css'
        })
        .match('/components/**.js', {
            packTo: '/pkg/components.js'
        })
        .match('/modules/**.{scss,less,css}', {
            packTo: '/pkg/modules.css'
        })
        .match('/modules/css/**.{scss,less,css}', {
            packTo: ''
        })
        .match('/modules/css/common.scss', {
            packTo: '/pkg/common.css'
        })
        .match('/modules/**.{es,js}', {
            packTo: '/pkg/modules.js'
        })
        .match('/modules/app/**.{es,js}', {
            packTo: '/pkg/aio.js'
        })
        // 为了上线方便，将静态文件发布到同一个目录
        // .match('**/(*.{css,less,scss,es,js,jpg,png,gif})', {
        //     release: '/prod/$1'
        // })
});


// 压缩css js html
Object.keys(map)
    .filter(function(v) {
        return v.indexOf('debug') < 0
    })
    .forEach(function(v) {
        fis.media(v)
            .match('**.html', {
                optimizer: fis.plugin('html-compress')
            })
            .match('**.{es,js}', {
                optimizer: fis.plugin('uglify-js')
            })
            .match('**.{scss,less,css}', {
                optimizer: fis.plugin('clean-css', {
                    'keepBreaks': true //保持一个规则一个换行
                })
            });
    });

// 本地产出发布
fis.media('prod')
    .match('**', {
        deploy: [
            fis.plugin('skip-packed', {
                // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
                // 但是如果这些文件满足下面的规则，则依然不过滤
                ignore: []
            }),

            fis.plugin('local-deliver', {
                to: 'output'
            })
        ]
    });


// 发布到指定的机器
['rd', 'rd-debug'].forEach(function(v) {
    fis.media(v)
        .match('*', {
            deploy: [
                fis.plugin('skip-packed', {
                    // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
                    // 但是如果这些文件满足下面的规则，则依然不过滤
                    ignore: []
                }),
                fis.plugin('http-push', {
                    receiver: 'xxx/fisreceiver.php',
                    to: 'xxx/' + fis.get('project.name')
                })
            ]
        });
});
