module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'airbnb-base'
    ],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'no-plusplus': 2,
        'no-unused-vars': 2,
        'no-console': 2,
        indent: [2, 4],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'comma-dangle': [2, 'never'],
        semi: 2,
        'no-undef': 2,
        'no-alert': 2,
        'no-multi-spaces': [2, { ignoreEOLComments: false }]
    }
};
