import { MIGRATOR_ERROR } from '../../../../constants';
import { transformTest } from '../../../tests/transformTest';

const transform = 'add-jsx-attributes';

const tests = [
  {
    name: 'add-component-prop-boolean',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: false,
    },
  },
  {
    name: 'add-component-prop-number',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: 123,
    },
  },
  {
    name: 'add-component-prop-string',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: 'new-value',
      commentOverride: `${MIGRATOR_ERROR.manualAdd} prop: newStringProp`,
    },
  },
  {
    name: 'add-component-prop-null',
    options: {
      componentName: 'MyComponent',
      propName: 'prop',
      propValue: null,
    },
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
    options: test.options,
  });
}
