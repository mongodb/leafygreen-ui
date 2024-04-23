import { transformCheck } from '../../../../../utils/tests/transformCheck';

const transform = 'update-component-prop-value';
const test = {
  name: 'update-component-prop-value',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropValue: 'newPropValue',
  },
};
transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
