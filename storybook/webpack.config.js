module.exports = ({ config }) => {
  config.module.rules = [
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
      test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: 50000,
      },
    },
    {
      test: /\.less(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  ];

  config.resolve.extensions = ['.js', '.json', '.less', '.css', '.tsx', '.ts'];

  return config;
};
