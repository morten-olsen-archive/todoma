module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      '@babel/transform-react-jsx-source',
      ['module-resolver', {
        'alias': {
          'db': './src/db',
          'configs': "./src/configs",
          'contexts': './src/contexts',
          'hooks': './src/hooks',
          'models': './src/models',
          'providers': './src/providers',
          'Router': './src/Router',
          'screens': './src/screens',
          'services': './src/services',
          'theme': './src/theme',
          'typography': './src/typography',
          'containers': './src/containers',
          'components': './src/components',
          'queries': './src/queries',
        }
      }],
    ],
  };
};
