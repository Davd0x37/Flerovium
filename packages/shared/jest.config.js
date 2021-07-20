module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ["**/__tests__/jest/**/*.[jt]s?(x)"],
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
}
