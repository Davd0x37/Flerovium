module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		'airbnb-typescript/base',
		'plugin:jest/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'jest'],
	rules: {
	},
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
}
