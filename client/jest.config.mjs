const jestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx'],
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|react-router-dom)/)',
  ],
};

export default jestConfig;