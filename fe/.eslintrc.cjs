module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@*/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
  },
  overrides: [
    {
      files: ['vite.config.ts', 'vite.config.js'],
      rules: {
        'import/default': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@public', './public'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
