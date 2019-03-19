module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2307]
      }
    }
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/tests/__mocks__/fileMock.js'
  }
}
