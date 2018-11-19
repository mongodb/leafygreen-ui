const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'development') {
  const isProduction = env === 'production';

  return {
    mode: env,
    entry: './src/index.js',
    target: 'web',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
      library: isProduction ? 'leafygreen' : undefined,
      libraryTarget: isProduction ? 'umd' : undefined,
    },

    externals: isProduction ?
      [
        'react',
        'react-emotion',
        'polished',
        'prop-types',
      ] :
      [],

    resolve: {
      extensions: ['.js', '.json', '.less', '.css'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions", "safari >= 7"]
                    },
                    modules: "commonjs",
                  },
                ],
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-export-default-from",
                "emotion",
              ],
            },
          }],
          exclude: /node_modules/,
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 8192,
          },
        },
      ],
    },

    plugins: (function() {
      let plugins = [
        new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')]),

        // Defines global variables
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify((!isProduction).toString()),
        }),
      ];

      return plugins;
    })(),
  };
};
