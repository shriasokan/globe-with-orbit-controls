const path = require('path');

module.exports = {
  // Mode can be 'development' or 'production'
  mode: 'development', 
  // Entry point of your application
  entry: './script.js', 
  target: 'web', 
  // Output of your bundle
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Configuration for development server
  devServer: {
    static: './dist',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },

  // Resolve imports
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules'],
  }
};