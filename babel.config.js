module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@resources': './src/resources',
          '@images': './src/resources/images',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
