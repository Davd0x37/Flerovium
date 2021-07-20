import baseConfig from '../../scripts/rollup.base.config'

export default [
	{
		...baseConfig.index(),
		output: {
			dir: 'lib',
			name: 'shared',
			format: 'es',
			// format: 'umd',
		},
	},
	baseConfig.definitions,
]
