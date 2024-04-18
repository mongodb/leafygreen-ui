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
      newAttributeValue: "new prop y'all",
    },
  },
  {
    name: 'update-component-prop-value-array',
    options: {
      componentName: 'MyComponent',
      attributeName: 'prop',
      newAttributeValue: {
        value1: 'value1Mapped',
        value2: 'value2Mapped',
        value3: 'value3Mapped',
        value4: 'value4Mapped',
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
