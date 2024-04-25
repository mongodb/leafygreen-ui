import { transformCheck } from '../../../../utils/tests/transformCheck';

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
    fromPropType: 'boolean',
  },
};
transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
