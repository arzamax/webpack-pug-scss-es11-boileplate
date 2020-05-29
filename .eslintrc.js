module.exports = {
  env: {
    es6: true,
    commonjs: true,
    node: true,
    browser: true,
  },
  extends: ['standard', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        trailingComma: 'es5',
        tabWidth: 2,
        singleQuote: true,
        semi: false,
      },
    ],
  },
}
