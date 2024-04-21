module.exports = {
  extends: [
    'universe',
    'universe/native',
    'universe/web',
    'universe/node',
    'universe/shared/typescript-analysis'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  plugins: ['react-hooks'],
  rules: {
    'import/order': 'off',
    'react-hooks/rules-of-hooks': 'error',
    quotes: ['error', 'single'],
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-extra-semi': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  env: {
    node: true
  }
}
