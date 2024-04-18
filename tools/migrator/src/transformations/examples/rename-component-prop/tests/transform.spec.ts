import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'rename-component-prop';
// Array of test file names
const tests = [
  {
    name: 'rename-component-prop',
    options: {
      componentName: 'MyComponent',
      attributeName: 'prop',
      newAttributeName: 'newProp',
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
