import { transformCheck } from '../../../../../utils/tests/transformCheck';

const transform = 'update-component-prop-value';

const test = {
  name: 'update-component-prop-value-multiple',
  options: {
    componentName: 'MyComponent',
    propName: 'prop',
    newPropValue: "new prop y'all",
  },
};
transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
