// webpack.base.js
const path = require('path');

//html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            //解析ts|tsx
            {
                test:/.(ts|tsx)$/,
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                use: ['thread-loader', 'babel-loader'],
            },
            {
                test: /.css$/, //匹配所有的 css 文件
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src'),/node_modules/],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /.less$/, //匹配所有的 less 文件
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/images/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },

            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/fonts/[name].[chunkhash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/media/[name].[chunkhash:8][ext]', // 文件输出目录和命名
                },
            },

        ]
    },

    resolve: {
        extensions: ['.js','.tsx','.ts'],//配置文件引入不带后缀
        alias: {
            '@': path.join(__dirname, '../src')
        },
        modules: [path.resolve(__dirname, '../node_modules')],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html'),
            inject:true,//自动引入静态资源
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash:8].css' // 抽离css的输出目录和名称
        }),
    ],

    cache: {
        type: 'filesystem', // 使用文件缓存
    },
}
