import { transformTest } from '../../../../tests/transformTest';

const transform = 'consolidate-jsx-attributes';

const test = {
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
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
