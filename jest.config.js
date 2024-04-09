module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist-test/", "<rootDir>/node_modules/", "<rootDir>/test/"],
  exclude: ["node_modules"],
};
