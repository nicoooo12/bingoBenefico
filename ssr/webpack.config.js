const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['./src/frontend/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@containers': path.resolve(__dirname, 'src/frontend/containers'),
      '@components': path.resolve(__dirname, 'src/frontend/components'),
      '@images': path.resolve(__dirname, 'src/frontend/assets/images'),
      '@styles': path.resolve(__dirname, 'src/frontend/assets/styles'),
      '@actions': path.resolve(__dirname, 'src/frontend/actions'),
      '@reducers': path.resolve(__dirname, 'src/frontend/reducers'),
      '@router': path.resolve(__dirname, 'src/frontend/router'),
      '@config': path.resolve(__dirname, 'config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            'loader': 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      filename: '[name].gz',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
