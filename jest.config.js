const {
  compilerOptions
} = require('./tsconfig');

const {
  resolve
} = require('path');


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/lib/**",
    "!**/vendor/**"
  ],
  moduleNameMapper: {
    '^@core/(.*)$': resolve(__dirname, './src/modules/core/$1'),
    '^@components/(.*)$': resolve(__dirname, './src/components/$1'),
    '^@products/(.*)$': resolve(__dirname, './src/modules/products/$1'),
    '^@layouts/(.*)$': resolve(__dirname, './src/modules/layouts/$1'),

  },
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -20
    }
  },
};
