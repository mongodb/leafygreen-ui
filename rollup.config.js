import typescript from '@rollup/plugin-typescript';

export default {
	output: {
		file: 'index.web.js',
	},
	plugins: [
		typescript(),
	],
};
