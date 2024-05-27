import { transformTest } from '../../../../tests/transformTest';

const transform = 'replace-jsx-attributes';
const test = {
  name: 'update-component-prop-value-object',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropName: 'prop',
    newPropValue: {
      value1: 'value1Mapped',
      value2: 'value2Mapped',
      value3: 'value3Mapped',
      value4: 'value4Mapped',
    },
  },
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
