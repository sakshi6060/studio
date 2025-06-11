module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Example: disable prop-types and React in scope
    '@next/next/no-img-element': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
