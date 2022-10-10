module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'react-app',
    'airbnb',
    'airbnb/hooks',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: [
      2,
      'never',
    ],
    quotes: [
      'error',
      'single',
    ],
    'prefer-const': 'error',
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-no-duplicate-props': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'import/no-cycle': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'react/jsx-no-useless-fragment': [
      'error',
      { allowExpressions: true },
    ],
  },
}
