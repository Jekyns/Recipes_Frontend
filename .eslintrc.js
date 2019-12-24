module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  // extends: 'airbnb',
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    "class-methods-use-this": 0,
    "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    "react/prefer-stateless-function": 0,
    "no-confusing-arrow": 0,
    "arrow-body-style": 0,
    "object-curly-newline": 0,
    "label-has-for": 0,
    "label-has-associated-control": 0,
    "dot-notation": "off"
  },
};