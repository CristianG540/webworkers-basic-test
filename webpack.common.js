const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'], // Agrego el babel-polyfill para trabajar con async/await
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'worker.[hash].js',
            publicPath: '/dist/'
          }
        }
      }
    ]
  },
  target: 'web'
}
