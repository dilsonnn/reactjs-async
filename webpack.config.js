const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = {
    module: {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader'
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
          }
        ]
    },
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
   // Options similar to the same options in webpackOptions.output
   // both options are optional
	filename: '[name].css',
	chunkFilename: '[id].css',
	})
 ]
};
const newConfig = (config) => {
  const finalConfig = Object.assign({}, commonConfig, config);
  return finalConfig;
};

const bootstrapFiles = newConfig({
    entry: {
		'bootstrap/footer': './src/bootstrap/footer.js',
		'bootstrap/header': './src/bootstrap/header.js',
		'bootstrap/index': './src/bootstrap/index.js',
		'lib/dom': './src/lib/dom.js',
		'widgets/2fa': './src/widgets/2fa.js',
		'widgets/banner': './src/widgets/banner.js'
	},
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        ...commonConfig.plugins,
        new CopyPlugin([
          { from: './src/routes.js', to: 'routes.js' },
          { from: './src/bootstrap/header.css', to: 'bootstrap/header.css' },
          { from: './src/widgets', to: 'widgets' },
          { from: './src/index.html', to: 'index.html' },
          { from: './src/index.css', to: 'index.css' },
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
      path: path.resolve(__dirname, 'dist/pages/transfer')
    }
});

//eslint-disable-next-line
module.exports = [bootstrapFiles, transferPage];