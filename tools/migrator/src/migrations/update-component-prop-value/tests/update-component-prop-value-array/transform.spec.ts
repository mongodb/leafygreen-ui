import { transformTest } from '../../../../utils/tests/transformTest';

const transform = 'update-component-prop-value';
const test = {
  name: 'update-component-prop-value-array',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
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
