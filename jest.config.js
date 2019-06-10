const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './src'),
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.js'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  globals: {
    window: {},
    APP_ENV: 'test',
    APP_NAME: 'JEST',
    APP_VERSION: '0.0.0',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    // https://stackoverflow.com/questions/40523144/is-it-possible-to-test-your-react-app-entry-point-with-jest#comment69294003_40523144
    '!index.jsx',
    '!**/index.{js,jsx}', // As index files as rollup files, do not cover them
  ],
  coverageDirectory: path.resolve(__dirname, './coverage'),
  coverageReporters: ['lcov', 'text-summary'],
}
