const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    chart: "./react/indexChart.jsx",
    survey: "./react/indexSurvey.jsx",
    offers: "./react/indexOffers.jsx",
    login: "./react/indexLogin.jsx",
    assessment:"./js/assessment.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].bundle.js'
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