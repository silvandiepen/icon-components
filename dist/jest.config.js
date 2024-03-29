module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['src/templates', 'temp'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    }
};
//# sourceMappingURL=jest.config.js.map