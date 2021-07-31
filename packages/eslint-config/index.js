module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-typescript/base', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/naming-convention': 'off'
	}
};
