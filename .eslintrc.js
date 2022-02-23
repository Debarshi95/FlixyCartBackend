module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
  },
};
