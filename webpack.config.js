const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/app.ts', './static/css/style.css'],
	mode: 'production',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			}, {
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/fonts/[name].[hash:5].[ext]'
						}
					}
				]
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:5].[id].css',
			chunkFilename: 'css/[name].[contenthash:5].[id].css',
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts'],
	},
	output: {
		filename: 'js/script.js',
		path: path.resolve(__dirname, 'dist')
	},
};