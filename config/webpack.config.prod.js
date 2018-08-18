// 引入基础配置 
const webpackBase = require("./webpack.config.base"); 
// 引入 webpack-merge 插件 
const webpackMerge = require("webpack-merge"); 
// 引入 webpack 
const webpack = require("webpack");
//压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//压缩css
const OptimizeCssAssetsPlugin  = require('optimize-css-assets-webpack-plugin'); 

// 合并配置文件 
module.exports = webpackMerge(webpackBase,{
	//提取公共代码到单独文件
	optimization: {
	    splitChunks: {
		    automaticNameDelimiter: '~',
      		name: true,
			cacheGroups: {
				commons: {
				  name: 'commons',
				  chunks: 'initial',
				  minChunks: 2
				}
			}
	    }
    }, 
	plugins:[ 
		// js代码压缩 
		new UglifyJSPlugin({ 
			// 开启 sourceMap 
			sourceMap: false 
		}), 
		//压缩css文件
		// new OptimizeCssAssetsPlugin({
	 //      assetNameRegExp: /\.css$/g,
	 //      cssProcessor: require('cssnano'),
	 //      cssProcessorOptions: { 
	 //      	discardComments: { 
	 //      		removeAll: true 
	 //      	} 
	 //      },
	 //      canPrint: true
	 //    })
	] 
});
