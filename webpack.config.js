const path = require( 'path' )

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const PugPlugin = require('pug-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = env => ( {

	context: path.resolve( __dirname, `src` ),

	entry: {

		main: ["regenerator-runtime/runtime", "./index.ts"],
		// main: "./index.js",

	},
	output: {

		filename: `[name].[contenthash].js`,
		path: path.resolve(__dirname, `dist`),
		publicPath: `/`,

	},
	resolve: {

		extensions: [ `ts`, `.js`, `.json` ],
		alias: {

			'@modules': path.resolve( __dirname, `src/modules` ),
			'@classes': path.resolve( __dirname, `src/classes` ),
			'@assets': path.resolve( __dirname, `src/assets` ),
			'@img': path.resolve( __dirname, `src/assets/images` ),
			'@fonts': path.resolve( __dirname, `src/assets/fonts` ),
			'@sass': path.resolve( __dirname, `src/sass` ),
			'@pug': path.resolve( __dirname, `src/pug` ),
			'@': path.resolve( __dirname, `src` ),

		}

	},
	optimization: {

		splitChunks: {

			chunks: `all`,

		},
		minimize: env.prod ? true : false,
		minimizer: [
			new TerserPlugin(),
			new OptimizeCssAssetsPlugin(),
			// new ImageMinimizerPlugin({
			// 	minimizer: {
			// 		implementation: ImageMinimizerPlugin.imageminMinify,
			// 		options: {
			// 		// Lossless optimization with custom option
			// 		// Feel free to experiment with options for better result for you
			// 		plugins: [
			// 			["gifsicle", { interlaced: true }],
			// 			["imagemin-mozjpeg", { progressive: true }],
			// 			["imagemin-pngquant", { optimizationLevel: 5 }],
			// 			// Svgo configuration here https://github.com/svg/svgo#configuration
			// 			[
			// 			"svgo",
			// 			{
			// 				plugins: extendDefaultPlugins([
			// 				{
			// 					name: "removeViewBox",
			// 					active: false,
			// 				},
			// 				{
			// 					name: "addAttributesToSVGElement",
			// 					params: {
			// 					attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
			// 					},
			// 				},
			// 				]),
			// 			},
			// 			],
			// 		],
			// 		},
			// 	},
			// }),
		],

	},
	plugins: [

		new HtmlWebpackPlugin({

			template: `./index.pug`,
			minify: {

				collapseWhitespace: env.prod ? true : false,

			}

		}),
		new MiniCssExtractPlugin({

			filename: `[name].[contenthash].css`

		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({

			patterns: [

				{

					from: path.resolve(__dirname, `src/assets/favicon.ico`),
					to: path.resolve(__dirname, `dist` ),

				}

			],

		}),
		new ImageminWebpWebpackPlugin(),
		new PugPlugin(),

	],
	
	devtool: env.prod ? 'eval' : 'source-map',
	module: {

		rules: [

			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
					presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
					presets: [

						'@babel/preset-env',
						'@babel/preset-typescript',

					]
					}
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
					presets: [

						'@babel/preset-env',
						'@babel/preset-react',

					]
					}
				}
			},

			{

				test: /\.pug$/,
				loader: PugPlugin.loader, // the pug-plugin already contain this pug-loader

			},

			{

				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset",

			},
			{

				test: /\.(ttf|woff|woff2|otf)$/,
				type: "asset",

			},
			{

				test: /\.xml$/,
				use: [

					'xml-loader',

				]

			},
			{

				test: /\.csv$/,
				use: [

					'csv-loader',

				]

			},
			{

				test: /\critical.s[ac]ss$/i,
				use: [

					// Creates `style` nodes from JS strings
					"style-loader",

					// Translates CSS into CommonJS
					"css-loader",

					// Compiles Sass to CSS
					"sass-loader",

				],

			},
			{

				test: /\.s[ac]ss$/i,
				use: [

					// Creates `style` nodes from JS strings
					env.prod ? MiniCssExtractPlugin.loader : "style-loader",

					// Translates CSS into CommonJS
					"css-loader",

					// Compiles Sass to CSS
					"sass-loader",

				],

			},
			{

				test: /\.css$/i,
				use: [

					// Creates `style` nodes from JS strings
					env.prod ? MiniCssExtractPlugin.loader : "style-loader",

					// Translates CSS into CommonJS
					"css-loader",

				],

			},

		]

	},
	devServer: {

		static: {
			directory: path.join(__dirname, 'src/'),
		},

		proxy: {

			'/api': 'http://localhost:5000'

		},

		hot: true,
		port: 5000,
		historyApiFallback: true,

	},

} )