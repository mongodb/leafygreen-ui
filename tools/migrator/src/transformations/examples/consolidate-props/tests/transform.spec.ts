import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'consolidate-props';
// Array of test file names
const tests = [
  {
    name: 'consolidate-props',
    options: {
      componentName: 'MyComponent',
      propToRemove: 'secondProp',
      propToUpdate: 'firstProp',
      propMapping: {
        value2: 'value3',
      },
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
