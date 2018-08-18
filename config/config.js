//项目中会用到的所有 HTML 页面
const HTMLDirs = [
	'index',
	'product',
	'product_detail',
	'news',
	'news_detail'
];
const devServerOutputPath = '../dist';
const cssPublicPath = '../';
const imgOutputPath = 'img/';
const cssOutputPath = './css/styles.css';
const cleanOutpath = 'dist';

module.exports = {
	HTMLDirs: HTMLDirs,
	cssPublicPath: cssPublicPath,
	imgOutputPath: imgOutputPath,
	cssOutputPath: cssOutputPath,
	cleanOutpath: cleanOutpath
};