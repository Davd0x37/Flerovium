module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ["**/tests/**/*.(test|spec).[jt]s?(x)"],
	moduleDirectories: ['node_modules'],
	// moduleNameMapper: {
	// 	'^@/(.*)$': '<rootDir>/src/$1',
	// },
}
