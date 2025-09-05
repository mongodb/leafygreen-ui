// https://www.smooth-code.com/open-source/svgr/docs/configuration-files/
module.exports = {
  titleProp: false,
  expandProps: 'end',
  svgProps: {
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
              { value: 'black', newValue: "'currentColor'", literal: true },
            ],
          },
        ],
      ],
    },
  },
};
