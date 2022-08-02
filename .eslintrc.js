module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    rules: {
      //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'vue/no-unused-components': 'off',
      'no-undef': 'off',
      'vue/no-unused-vars': 'off',
      'vue/return-in-computed-property': 'off'
    },
    parserOptions: {
      parser: '@babel/eslint-parser'
    }
  }