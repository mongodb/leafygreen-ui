import { transformTest } from '../../../../utils/tests/transformTest';

const transform = 'rename-component-prop';

const test = {
  name: 'rename-component-prop',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropName: 'newProp',
  },
};

transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
