const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
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

  if (config.mode === 'production') {
    config.optimization.minimize = false;
    config.optimization.minimizer = [new TerserPlugin({
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true,
        mangle: {
          keep_classnames: true, // FIX typeorm
          keep_fnames: true, // FIX typeorm
        },
        output: {
          ascii_only: true,
          quote_style: 3,
          wrap_iife: true,
        },
        sourceMap: {
          includeSources: false,
        },
        toplevel: false,
        compress: {
          reduce_funcs: false,
        },
      },
    })];
  }

  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  };
  return config;
};

