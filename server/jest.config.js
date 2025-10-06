export default {
  testEnvironment: "node",
  transform: {}, // quitamos babel-jest
  collectCoverage: true,
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "controllers/**/*.js",
    "models/**/*.js",
    "utils/**/*.js"
  ]
};
