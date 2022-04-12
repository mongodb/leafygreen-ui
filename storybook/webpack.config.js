module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(t|j)sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // Makes Babel treat the directory containing babel.config.js as the project root
          rootMode: 'upward',
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'auto',
              },
            ],
          ],
        },
      },
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
  ];

  config.resolve.extensions = ['.js', '.json', '.tsx', '.ts'];

  return config;
};
