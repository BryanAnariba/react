module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFiles: ["./setupTests.cjs"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.cjs"],
};
