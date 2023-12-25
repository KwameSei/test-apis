// export default {
//   verbose: true,
//   testEnvironment: 'node',
//   testMatch: [
//     '**/__tests__/**/*.js?(x)',
//     '**/?(*.)+(spec|test).js?(x)'
//   ],
//   collectCoverageFrom: [
//     '**/controllers/**/*.{js,jsx}',
//     '**/models/**/*.{js,jsx}',
//     '**/routes/**/*.{js,jsx}',
//     '**/utils/**/*.{js,jsx}',
//     '**/middleware/**/*.{js,jsx}',
//     '!**/node_modules/**',
//     '!**/vendor/**'
//   ],
//   coveragePathIgnorePatterns: [
//     '/node_modules/',
//     '/vendor/',
//     '/__tests__/',
//     '/coverage/',
//     '/.vscode/',
//     '/.github/',
//     '/.heroku/',
//     '/.netlify/',
//     '/.vercel/',
//     '/.gitignore/',
//     '/.git/',
//     '/.env/',
//     '/.eslintignore/',
//     '/.eslintrc.js/',
//     '/.prettierrc/',
//     '/.prettierignore/',
//     '/.babelrc.js/',
//     '/.babelrc/',
//     '/.travis.yml/',
//     '/.codeclimate.yml/',
//     '/.all-contributorsrc/',
//     '/.huskyrc/',
//     '/.lintstagedrc/',
//     '/.stylelintrc/',
//     '/.stylelintignore/',
//     '/.github/',
//     '/.vscode/',
//     '/.vscodeignore/',
//     '/.vs/',
//     '/.idea/',
//   ],
//   coverageReporters: [
//     'json',
//     'text',
//     'lcov',
//     'clover',
//     'html'
//   ],
//   // coverageThreshold: {
//   //   global: {
//   //     branches: 80,
//   //     functions: 80,
//   //     lines: 80,
//   //     statements: -10
//   //   }
//   // },
//   reporters: [
//     'default',
//     'jest-junit' 
//   ],
//   testResultsProcessor: 'jest-sonar-reporter',
//   moduleFileExtensions: [
//     'js',
//     'jsx'
//   ],
//   moduleDirectories: [
//     'node_modules'
//   ],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1'
//   },
//   transform: {},
//   transformIgnorePatterns: [
//     '/node_modules/',
//     '/vendor/'
//   ],
//   setupFilesAfterEnv: [
//     '<rootDir>/test/jest.setup.js'
//   ],
//   setupFiles: [
//     '<rootDir>/test/jest.setup.js'
//   ],
//   globals: {
//     'NODE_ENV': 'test'
//   },
//   coverageDirectory: './coverage/',
//   collectCoverage: true,
// };


const config = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  collectCoverageFrom: [
    '**/controllers/**/*.{js,jsx}',
    '**/models/**/*.{js,jsx}',
    '**/routes/**/*.{js,jsx}',
    '**/utils/**/*.{js,jsx}',
    '**/middleware/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/vendor/',
    '/__tests__/',
    '/coverage/',
    '/.vscode/',
    '/.github/',
    '/.heroku/',
    '/.netlify/',
    '/.vercel/',
    '/.gitignore/',
    '/.git/',
    '/.env/',
    '/.eslintignore/',
    '/.eslintrc.js/',
    '/.prettierrc/',
    '/.prettierignore/',
    '/.babelrc.js/',
    '/.babelrc/',
    '/.travis.yml/',
    '/.codeclimate.yml/',
    '/.all-contributorsrc/',
    '/.huskyrc/',
    '/.lintstagedrc/',
    '/.stylelintrc/',
    '/.stylelintignore/',
    '/.github/',
    '/.vscode/',
    '/.vscodeignore/',
    '/.vs/',
    '/.idea/',
  ],
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
    'html'
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10
  //   }
  // },
  reporters: [
    'default',
    'jest-junit' 
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/vendor/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/jest.setup.js'
  ],
  setupFiles: [
    '<rootDir>/test/jest.setup.js'
  ],
  globals: {
    'NODE_ENV': 'test'
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
};

export default config;