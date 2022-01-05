const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Handlebars = require('handlebars');

// パスの設定
const imgPath = "/img/";
const hrefPath = "/";
const fontPath = "/";

module.exports = ({ outputFile }) => ({
	entry: {
		app: './src/js/app.js',
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: `js/${outputFile}.bundle.js`,
	},
	module: {
		rules: [
			{ // babel
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [['@babel/preset-env',{
						useBuiltIns: 'usage',
						corejs: 3,
						modules: false,
					}]]
				}
			},
			{ //lint
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{ // scss
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									["autoprefixer", {grid: true}]
								]
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
						}
					}
				]
			},
			{ // file-loader(画像)
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{ // 出力パスの設定
						loader: 'file-loader',
						options: {
							esModule: false,
							name: '[folder]/[name].[ext]',
							outputPath: 'img/',
							publicPath: imgPath,
						}
					},
					{ // 画像の圧縮
						loader: 'image-webpack-loader'
					},
				],
			},
			{ // file-loader(フォント)
				test: /\.(woff2?|ttf)$/i,
				loader: 'file-loader',
				options: {
					esModule: false,
					name: '[folder]/[name].[ext]',
					outputPath: 'font/',
					publicPath: fontPath
				}
			},
			{ // ejsのコンパイル
				test: /\.ejs$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
							preprocessor: (content, loaderContext) => {
								let result;
								try {
									result = Handlebars.compile(content)({
										url: hrefPath,
									});
								} catch (error) {
									loaderContext.emitError(error);
									return content;
								}
								return result;
							}
						}
					},
					{
						loader: 'ejs-plain-loader',
						options: {
							minimize: false,
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/style.css',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'src/static', to: 'static'}
			]
		}),
		// 以下ejsのコンパイル
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			filename: './index.html',
			minify: false
		})
	]
})