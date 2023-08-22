module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports
  },
};
