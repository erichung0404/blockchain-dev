module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/test/"],
  coverageReporters: ["json", "html"],
  reporters: [
    "default",
    [ "jest-junit", { outputDirectory: "./reports/junit/" } ],
  ],
};
