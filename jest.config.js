export default {
  // The bail config option can be used here to have Jest stop running tests after
  // the first failure.
  bail: false,

  // Indicates whether each individual test should be reported during the run.
  verbose: true,

  moduleFileExtensions: ['js'],

  moduleDirectories: ['node_modules'],

  roots: ['<rootDir>'],

  collectCoverageFrom: ['src/**/*.{js,jsx}'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],

  // The directory where Jest should output its coverage files.
  coverageDirectory: '<rootDir>/coverage/',

  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ['node_modules/'],

  // The pattern Jest uses to detect test files.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',

  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: [
    'node_modules/',
    'src/config/',
    'src/utils/logger.js',
    'src/utils/interceptor.js',
  ],

  // This option sets the URL for the jsdom environment.
  // It is reflected in properties such as location.href.
  // @see: https://github.com/facebook/jest/issues/6769
  //testEnvironmentOptions: {
  //  url: "http://localhost/",
  //},

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  reporters: [
    ['jest-slow-test-reporter', { numTests: 8, color: true }]
  ],

  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
};
