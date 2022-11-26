export default {
  // The bail config option can be used here to have Jest stop running tests after
  // the first failure.
  bail: false,

  // Indicates whether each individual test should be reported during the run.
  verbose: true,

  preset: "ts-jest",

  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },

  testEnvironment: "jest-environment-jsdom",
  coverageProvider: "v8",

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: "./coverage/",

  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ["node_modules/"],

  // The pattern Jest uses to detect test files.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",

  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ["node_modules/", "src/config/"],

  // The pattern Jest uses to detect test files.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",

  // This option sets the URL for the jsdom environment.
  // It is reflected in properties such as location.href.
  // @see: https://github.com/facebook/jest/issues/6769
  testEnvironmentOptions: {
    url: "http://localhost/",
  },

  // @see: https://jestjs.io/docs/en/configuration#coveragethreshold-object
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },

  notify: true,

  //reporters: [
  //  ["jest-slow-test-reporter", { numTests: 8, color: true }],
  //],

  runner: "jest-light-runner",
};