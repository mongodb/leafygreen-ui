import { transformTest } from '../../../../utils/tests/transformTest';

const transform = 'consolidate-props';

const test = {
  name: 'consolidate-props',
  options: {
    componentName: 'MyComponent',
    propToRemove: 'propToRemove',
    propToUpdate: 'propToUpdate',
    propMapping: {
      value2: 'value3',
    },
  },
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
