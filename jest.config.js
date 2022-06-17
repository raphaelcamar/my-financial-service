module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@user/(.*)$': '<rootDir>/src/user/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@transaction/(.*)$': '<rootDir>/src/transaction/$1',
    '^@history/(.*)$': '<rootDir>/src/history/$1',
  }
};