module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(t|j)sx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          // Makes Babel treat the directory containing babel.config.js as the project root
          presets: [
            '@babel/preset-typescript',
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'],
                },
                modules: 'commonjs',
              },
            ],
          ],

          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            'emotion',
          ],
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
