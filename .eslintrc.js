module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 4],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': ['error', { allow: ['state', 'getters'] }],
    'no-underscore-dangle': [1, { allow: ['_id'] }],
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    window: true,
    $: true,
  },
};
