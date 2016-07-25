var  webpack = require('webpack');
module.exports = {
    //页面入口文件配置,形式  {name:value}
    entry:{
        bundle:'./test.jsx',
        vendor:['react','redux','react-dom','react-redux','reqwest','react-router','redux-thunk']
    },
    //入口文件输出配置
    output:{
        path: __dirname+'/bundle',
        publicPath:'bundle/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    //插件项
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，
        // 然后生成一个 vendor.js 来方便多页面之间进行复用
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        //new webpack.optimize.DedupePlugin(),
        // 使用 OccurenceOrderPlugin 減少文件大小
        new webpack.optimize.OccurenceOrderPlugin(),
        //React文档中明确建议在生产环境下设置 NODE_ENV 为 production
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
  ]
}