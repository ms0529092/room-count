const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

const config = (env, argv) => {
    const isDev = argv.mode == 'development';

     /** 打包壓縮最佳化設定 */
     const optimization = {
        minimize:true,
        flagIncludedChunks:true,
        removeEmptyChunks:true,
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                reactVendor:{
                    test:/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name:'reactVendor',
                },
            }
        },
        minimizer:[
            new TerserWebpackPlugin({
                extractComments: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }
            })
        ]
    }

    const module = {
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: "asset",
                generator: {
                    filename: "images/[name]_[hash][ext]", // 独立的配置
                },
            }
        ]
    }

    const devServer = {
        static:{
            directory: path.resolve(__dirname, 'dist') 
        },
        port:8787,      
        compress: true, 
        open: false,     
        hot: true       
    }

    const plugins = [
        new SpeedMeasureWebpackPlugin(),
        new ProgressBarWebpackPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'room-count',
            template:'./src/index.html',              
            filename:'./index.html',                 
            inject:true,                                                   
            hash:true,                               
            cache:true,                              
            minify:true
        }),
    ]

    const resolve = {
        modules:[path.resolve(__dirname, 'src'), 'node_modules'],
        alias:{
            src:path.resolve(__dirname, 'src'),
            common:path.resolve(__dirname, 'src/common'),
            assets:path.resolve(__dirname,'./src/assets'),
            containers:path.resolve(__dirname,'./src/containers')
        },
        extensions: ['.js', '.css', '.scss', '.json'],  
        symlinks:false
    }

    if(process.env.ANALYZE){
        plugins.push(new WebpackBundleAnalyzerPlugin());
    }

    return {
        mode:isDev ? 'development' : 'production',
        entry:path.resolve(__dirname, 'src/main.js'),
        output:{
            filename:'[name].js',  //要打包後的檔名
            path: path.resolve(__dirname, 'dist')   //要打包到哪裡
        },
        performance: {
            hints: false
        },
        devtool: 'eval-cheap-module-source-map',
        optimization,
        module,
        devServer,
        plugins,
        resolve
    }
}

module.exports = config;