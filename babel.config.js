module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
