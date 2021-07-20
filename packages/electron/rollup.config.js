import baseConfig from '../../scripts/rollup.base.config'

export default [
	{
		...baseConfig.index({
			plugins: {
				nodeResolve: {
					browser: false,
				},
			},
		}),
		output: {
			file: '../../build/electron/index.js',
			format: 'cjs',
		},
		external: [
			/node_modules/,
			'crypto',
			'assert',
			'fs',
			'util',
			'os',
			'events',
			'child_process',
			'http',
			'https',
			'path',
			'electron',
		],
	},
	{
		input: 'src/preload.js',
		output: {
			file: '../../build/electron/preload.js',
			format: 'cjs',
		},
	},
	// {
	// 	input: './src/index.d.ts',
	// 	output: [{ file: 'lib/electron.d.ts', format: 'cjs' }],
	// 	plugins: [dts()],
	// },
]
