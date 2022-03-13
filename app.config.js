const pkg = require('./package.json');
const config = {
  expo: {
    name: 'Todoma',
    slug: 'todoma',
    version: pkg.version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    scheme: 'todoma',
    entryPoint: "src/index.ts",
    packagerOpts: {
      config: "metro.config.js"
    },
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'sh.assemle.todoma',
      buildNumber: pkg.version,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'sh.assemle.todoma',
    },
    web: {
      favicon: './assets/icon.png',
    },
  },
};

module.exports = config;
