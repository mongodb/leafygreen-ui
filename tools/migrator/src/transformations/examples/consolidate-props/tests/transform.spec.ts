import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'consolidate-props';
// Array of test file names
const tests = [
  {
    name: 'consolidate-props',
    options: {
      componentName: 'MyComponent',
      propToRemove: 'propToRemove',
      propToUpdate: 'propToUpdate',
      propMapping: {
        value2: 'value3',
      },
    },
  },
  {
    name: 'consolidate-props-boolean',
    options: {
      componentName: 'MyComponent',
      propToRemove: 'disabled',
      propToUpdate: 'state',
      propMapping: {
        true: 'disabled',
      },
      fromPropType: 'boolean',
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
