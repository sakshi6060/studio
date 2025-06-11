
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not strictly necessary with new JSX transform
    'react/no-unescaped-entities': 'off',
  },
};
