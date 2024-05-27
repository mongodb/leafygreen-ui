import { transformTest } from '../../../../tests/transformTest';

const transform = 'replace-jsx-attributes';

const test = {
  name: 'update-component-prop-value',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropName: 'prop',
    newPropValue: 'new prop value',
  },
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
