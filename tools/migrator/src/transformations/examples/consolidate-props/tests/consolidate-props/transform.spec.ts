import { transformCheck } from '../../../../../utils/tests/transformCheck';

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
transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
