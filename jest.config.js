module.exports = {
  roots: ['./src'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,ts}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
