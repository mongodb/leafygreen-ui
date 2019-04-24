const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'production') {
  const isProduction = env === 'production';

  return {
    mode: env,
    entry: './src/index',
    target: 'web',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
      libraryTarget: isProduction ? 'umd' : undefined,
    },

    externals: isProduction
      ? [
          'react',
          'emotion',
          'react-emotion',
          'create-emotion',
          'polished',
          'prop-types',
          ...[
            'badge',
            'button',
            'checkbox',
            'Icon',
            'lib',
            'popover',
            'portal',
            'radio-box-group',
            'radio-group',
            'theme',
            'toggle',
          ].map(pkg => `@leafygreen-ui/${pkg}`),
        ]
      : [],

    resolve: {
      extensions: ['.js', '.json', '.less', '.css', '.tsx', '.ts'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              // Makes Babel treat the directory containing babel.config.js as the project root
              rootMode: 'upward',
            },
          },
          exclude: /node_modules/,
        },

        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: '@svgr/webpack',
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 50000,
          },
        },
      ],
    },

    plugins: (function() {
      const plugins = [
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
