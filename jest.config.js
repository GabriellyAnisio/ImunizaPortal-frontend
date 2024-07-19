export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['./src/setupTests.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  };