import { transformTest } from '../../../../tests/transformTest';

const transform = 'consolidate-jsx-attributes';

const test = {
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
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
