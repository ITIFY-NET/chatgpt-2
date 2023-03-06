module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'arrow-body-style': [0],
    'consistent-return': [0],
    'generator-star-spacing': [0],
    'global-require': [0],
    'import/extensions': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'import/prefer-default-export': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'no-bitwise': [0],
    'no-return-await': [0],
    'no-cond-assign': [0],
    'no-else-return': [0],
    'no-nested-ternary': [0],
    'no-restricted-syntax': [0],
    'no-use-before-define': [0],
    'require-yield': [1],
    semi: [0],
    'no-console': [0],
    'comma-dangle': [0],
    'max-len': [1, 150],
    'no-param-reassign': [0],
    'no-underscore-dangle': [
      2,
      {
        allow: ['_id', '_models', '_password', 'hashed_password', '_doc', '__']
      }
    ],
    'object-curly-newline': [0],
    'no-empty-pattern': [0],
    'func-names': [0],
    'newline-per-chained-call': [0],
    'no-mixed-operators': [0]
  }
}
