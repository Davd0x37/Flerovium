module.exports = {
	extends: ['@flerovium/eslint-config/electron'],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname
	},
	rules: {
		'global-require': 'off',
		'no-console': 'off',
	}
}
