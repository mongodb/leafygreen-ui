import { transformTest } from '../../../../utils/tests/transformTest';

const transform = 'update-component-prop-value';
const test = {
  name: 'update-component-prop-value',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropValue: 'newPropValue',
  },
};
transformTest(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
