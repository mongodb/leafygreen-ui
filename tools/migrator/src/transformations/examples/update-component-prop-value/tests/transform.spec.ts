import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'update-component-prop-value';
// Array of test file names
const tests = [
  {
    name: 'update-component-prop-value',
    options: {
      componentName: 'MyComponent',
      attributeName: 'prop',
      newAttributeValue: 'newPropValue',
    },
  },
  {
    name: 'update-component-prop-value-multiple',
    options: {
      componentName: 'MyComponent',
      attributeName: 'prop',
      newAttributeValue: 'newPropValue',
    },
  },
];

for (const test of tests) {
  transformCheck(__dirname, {
    fixture: test.name,
    transform,
    options: test.options,
  });
}
