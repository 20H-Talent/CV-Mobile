const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./react/index.jsx",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: { loader: 'babel-loader' }
      },
    ]
  }
}