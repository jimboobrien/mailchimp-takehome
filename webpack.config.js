const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,  // Add support for both JS/TSX/TS
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript', // Add TypeScript preset
            ],
          },
        },
      },
      // Rule to handle SCSS/SASS files
      {
        test: /\.(scss|sass)$/, // Match .scss and .sass files
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',    // Injects CSS into the DOM
          'css-loader',      // Translates CSS into CommonJS
          'sass-loader',     // Compiles Sass to CSS
        ],
      },
      // Rule for image files
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // Built-in Webpack feature for handling assets
        generator: {
          filename: 'images/[name][hash].[ext]', // Output path for images
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css', // Output CSS files with the same name as the entry
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  mode: 'development',
};
