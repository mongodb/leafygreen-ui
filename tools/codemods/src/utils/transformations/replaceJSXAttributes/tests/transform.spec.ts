import { transformTest } from '../../../tests/transformTest';

const transform = 'replace-jsx-attributes';

const tests = [
  {
    name: 'rename-component-prop',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      newPropName: 'newProp',
    },
  },
  {
    name: 'update-component-prop-value',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      newPropName: 'prop',
      newPropValue: 'new prop value',
    },
  },
  {
    name: 'update-component-prop-value-multiple',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      newPropName: 'prop',
      newPropValue: "new prop y'all",
    },
  },
  {
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
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
    options: test.options,
  });
}
