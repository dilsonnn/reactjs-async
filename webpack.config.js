/*global require,__dirname*/
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const JS_PATH = 'js';

const commonConfig = {
    module: {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]--[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'sass-loader'
              },
            ],
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
		  {
			test: /\.tsx?$/,
		    loader: 'awesome-typescript-loader' 
	     }
        ]
    },
	//devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
   // Options similar to the same options in webpackOptions.output
   // both options are optional
   filename: 'css/[name].css',
   chunkFilename: '[id].css'
	})
 ]
};
const newConfig = (config) => {
  const finalConfig = Object.assign({}, commonConfig, config);
  return finalConfig;
};

const bootstrapFiles = newConfig({
    entry: {
		'bootstrap/footer': './src/bootstrap/footer.tsx',
		'bootstrap/header': './src/bootstrap/header.js',
		'bootstrap/index': './src/bootstrap/index.js',
		'lib/dom': './src/lib/dom.js',
		'widgets/2fa': './src/widgets/2fa.js',
		'widgets/banner': './src/widgets/banner.js'
	},
    output: {
        filename: `${JS_PATH}/[name].js`,
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        ...commonConfig.plugins,
        new CopyPlugin([
          { from: './src/routes.js', to: `${JS_PATH}/routes.js` },
          { from: './src/index.html', to: 'index.html' },
          { from: './resources', to: `resources` },
        ]),
      ],
});

const transferPage = newConfig({
    entry: {
       transfer: './src/pages/transfer/transfer.js',
       transferComplete: './src/pages/transfer/transferComplete.js',
       transferReview: './src/pages/transfer/transferReview.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, `dist/${JS_PATH}/pages/transfer`)
    }
});

//eslint-disable-next-line
module.exports = [bootstrapFiles, transferPage];