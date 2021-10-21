const { resolve } = require('path');
const { withUnimodules } = require("@expo/webpack-config/addons");

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: (config) => {
    return withUnimodules({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          'react-native': 'react-native-web',
        },
      },
    }, {
      projectRoot: resolve(__dirname, "../"),
    });
  },
};
