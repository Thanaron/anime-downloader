module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'lines-between-class-members': 'off',
    },
    parserOptions: {
        parser: 'typescript-eslint-parser',
    },
    plugins: ['prettier', 'vue'],
    extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier', '@vue/typescript'],
};
