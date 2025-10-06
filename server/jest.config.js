export default {
  testEnvironment: "node",
  transform: {},
  collectCoverage: true,
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "controllers/**/*.js",
    "models/**/*.js",
    "utils/**/*.js"
  ],
};