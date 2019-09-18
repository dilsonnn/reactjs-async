const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = {
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
};
const newConfig = (config) => {
   return Object.assign({}, commonConfig, config);
};

const bootstrapFiles = newConfig({
    entry: './src/routes.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin([
          { from: './src/routes.js', to: 'routes.js' },
          { from: './src/bootstrap', to: 'bootstrap' },
          { from: './src/lib', to: 'lib' },
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