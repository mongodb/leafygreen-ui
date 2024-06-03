import { transformTest } from '../../../tests/transformTest';

const transform = 'consolidate-jsx-attributes';

const tests = [
  {
    name: 'consolidate-jsx-attributes-boolean',
    options: {
      componentName: 'MyComponent',
      propToRemove: 'disabled',
      propToUpdate: 'state',
      propMapping: {
        true: 'disabled',
      },
      propToRemoveType: 'boolean',
    },
  },
  {
    name: 'consolidate-jsx-attributes-string',
    options: {
      componentName: 'MyComponent',
      propToRemove: 'propToRemove',
      propToUpdate: 'propToUpdate',
      propMapping: {
        value2: 'value3',
      },
      propToRemoveType: 'string',
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
