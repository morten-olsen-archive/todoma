const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.plugins = [
    ...config.plugins,
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
        result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      'window.SQL': 'sql.js/dist/sql-wasm.js'
    }),
    new CopyPlugin({
      patterns: [
        { from: require.resolve('sql.js/dist/sql-wasm.wasm'), to: './sql-wasm.wasm'},
      ],
    }),
  ];

  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  };
  return config;
};

