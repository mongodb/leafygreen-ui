import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import urlPlugin from 'rollup-plugin-url';
import fs from 'fs';
import path from 'path';

function getAllPackages(dir) {
	const dirList = fs.readdirSync(dir);
	return dirList.map(function(subDir) {
		subDir = path.resolve(dir, subDir);
		const json = require(`${subDir}/package.json`);
		return json.name;
	});
}

const external = [
	'react',
	'react-dom',
	'emotion',
	'react-emotion',
	'create-emotion',
	'create-emotion-server',
	'polished',
	'prop-types',
	'react-transition-group',
	...getAllPackages('../../packages'),
];

const resolvePlugin = resolve({extensions: ['.js', '.jsx', '.ts', 'tsx']})

const commonjsPlugin = commonjs({
	include: /node_modules/,
	namedExports: {
		react: ['useRef', 'useEffect', 'useState', 'useCallback'],
	},
})

const typescriptPlugin = typescript({
	tsconfig: 'tsconfig.json',
	useTsconfigDeclarationDir: true,

	// This property is supported as a way around an error we frequently received:
	// Error: Unknown object type "asyncfunction"
	//
	// This property is documented in the main README as a workaround:
	// https://github.com/ezolenko/rollup-plugin-typescript2
	objectHashIgnoreUnknownHack: true,

	// We need to clean frequently because of the "hack" property above.
	// We can probably do this less than "always" in the future.
	clean: true,

	// This property allows us to use the latest TS version, rather than the supported 2.x
	typescript: require('typescript'),
	verbosity: 2,
})

const urlLoaderPlugin = urlPlugin({
	limit: 50000,
	include: ['**/*.png'],
});

const plugins = [
	resolvePlugin,
	commonjsPlugin,
	typescriptPlugin,
	urlLoaderPlugin,
	svgr(),
];

export default { external, plugins };
