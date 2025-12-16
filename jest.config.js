module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testMatch: ['**/test/**/*.spec.ts', '**/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
