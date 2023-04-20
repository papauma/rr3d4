module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
		'prettier/prettier': ['off', { singleQuote: true }],
        '@typescript-eslint/no-shadow': ['error'],
        'max-lines': ['error', 250],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
