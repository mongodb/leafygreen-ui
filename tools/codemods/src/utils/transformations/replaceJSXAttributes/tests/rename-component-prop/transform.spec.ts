import { transformTest } from '../../../../tests/transformTest';

const transform = 'replace-jsx-attributes';

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
