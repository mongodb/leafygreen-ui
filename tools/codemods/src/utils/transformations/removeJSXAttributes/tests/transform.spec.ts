import { transformTest } from '../../../tests/transformTest';

const transform = 'add-jsx-attributes';

const tests = [
  {
    name: 'remove-component-prop',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
    },
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
    options: test.options,
  });
}
