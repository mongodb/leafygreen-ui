import { transformTest } from '../../../tests/transformTest';

const transform = 'add-jsx-attributes';

const tests = [
  {
    name: 'add-component-prop-boolean',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: false,
    },
  },
  {
    name: 'add-component-prop-number',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: 123,
    },
  },
  {
    name: 'add-component-prop-string',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: 'new-value',
    },
  },
  {
    name: 'add-component-prop-null',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: null,
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
