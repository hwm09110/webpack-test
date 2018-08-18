const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css单独打包


const config = require('./config.js');

// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {};

config.HTMLDirs.forEach((page)=>{
	let htmlPlugin = new HTMLWebpackPlugin({
		filename: `template/${page}.html`,
		template: path.resolve(__dirname,`../src/template/${page}.html`),
		hash: true,
		minify:true,
		meta:{},
		chunks:[page,'commons']
	});
	HTMLPlugins.push(htmlPlugin);
	Entries[page] = path.resolve(__dirname,`../src/script/${page}.js`);
})


module.exports = {
	mode: 'development',
	//启用 sourceMap
	// devtool:"cheap-module-source-map",
	entry:Entries,
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname,'../dist')
	},
	module:{
		rules: [
			{
				test: /\.css$/i,
				// 不处理 node_modules 文件中的 css 文件
    			exclude: /node_modules/,
				use: [
					{
						// 抽取 css 文件到单独的文件夹 
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			              publicPath: config.cssPublicPath
			            }
			        },
					{ 
						loader:"css-loader", 
						options:{ 
							// 开启 css 压缩 
							//minimize:true,
							importLoaders:1 
						} 
					}, 
					{ 
						loader:"postcss-loader"
					} 
				]
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use:[
					{
						loader: 'babel-loader',
						// options: {
						// 	presets: ['env']
						// }
					}
				]
			},
			{ 
				test: /\.(png|svg|jpg|gif)$/i, 
				use:{ 
					// loader:"file-loader", 
					loader:"url-loader", 
					options:{
						limit:20000, //小于20kb的图片转成base64
						// 打包生成图片的名字 
						//name:"[hash].[ext]", 
						// 图片的生成路径 
						outputPath:config.imgOutputPath,
						publicPath:'../'+config.imgOutputPath  //加上这个 html 中引用图片才能显示
					} 
				} 
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				use: ['file-loader']
			}
		]
	},
	plugins:[
		new cleanWebpackPlugin([config.cleanOutpath],{
			root:path.resolve(__dirname,'../')
		}),
		// new ExtractTextPlugin(config.cssOutputPath),
		...HTMLPlugins,
		new MiniCssExtractPlugin({
	      filename: "css/[name].css"
	    })
	]
}










