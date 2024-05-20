import { transformTest } from '../../../../utils/tests/transformTest';

const transform = 'consolidate-props';

const test = {
  name: 'consolidate-props-boolean',
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
