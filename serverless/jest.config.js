module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test', '<rootDir>/back/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
