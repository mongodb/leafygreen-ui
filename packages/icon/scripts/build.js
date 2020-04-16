const svgr = require('@svgr/core').default
const template = require('../src/template')
const fs = require('fs')
const path = require('path')

const glyphsDir = path.resolve(__dirname, '../src/glyphs')
const svgFilePaths = fs.readdirSync(glyphsDir)
	.filter(fileName => fileName.includes('.svg'))
	.map(fileName => ({
		name: fileName.replace('.svg', ''),
		path: path.resolve(glyphsDir, fileName),
	}))

svgFilePaths.forEach(file => {
	try {
		const svgCode = fs.readFileSync(file.path, { encoding: 'utf8' })

		svgr(svgCode, {
			titleProp: true,
			svgProps: {
				role: 'img',
				viewBox: '0 0 16 16',
			},
			jsx: {
				babelConfig: {
					plugins: [
						[
							// This plugin lets us transform the JSX output to change instances of
							// #000000 and #000 (the fill for our SVG glyphs) to use `this.props.fill` instead.
							'@svgr/babel-plugin-replace-jsx-attribute-value',
							{
								values: [
									{ value: '#000', newValue: "'currentColor'", literal: true },
									{ value: '#000000', newValue: "'currentColor'", literal: true },
								],
							},
						],
					],
				},
			},
			template,
		}, {
			componentName: file.name,
		}).then(moduleCode => {
			const glyphsDistDir = path.resolve(__dirname, '../dist/test');

			if (!fs.existsSync (glyphsDistDir)) {
				fs.mkdirSync(glyphsDistDir, { recursive: true })
			}

			const distFilePath = path.resolve(glyphsDistDir, `${file.name}.js`)
			fs.writeFileSync(distFilePath, moduleCode)
		})
	} catch (err) {
		console.error(err)
	}
})

// exec('yarn svgr --template src/template.js -d dist/test src/glyphs')