module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 2,
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'prettier/prettier': 2,
  },
}
