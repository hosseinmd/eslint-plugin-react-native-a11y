/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__util__'],
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'reports',
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: '18' } }],
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/transform-flow-strip-types',
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@eslint|@typescript-eslint|levn|type-check|prelude-ls)/)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
