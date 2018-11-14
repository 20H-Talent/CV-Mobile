const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./react/index.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: { loader: 'babel-loader' }
      },
    ]
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    },
    compress: true,
    hot: true
  }
}