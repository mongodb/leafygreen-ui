import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'rename-component-prop';

const test = {
  name: 'rename-component-prop',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropName: 'newProp',
  },
};

transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
