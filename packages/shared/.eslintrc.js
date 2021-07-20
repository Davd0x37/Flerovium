module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-typescript/base', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'import/prefer-default-export': 'off',
	},
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
};
