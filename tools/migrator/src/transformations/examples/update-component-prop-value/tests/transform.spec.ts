import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'update-component-prop-value';
// Array of test file names
const tests = [
  'update-component-prop-value',
  'update-component-prop-value-multiple',
];

for (const test of tests) {
  transformCheck(__dirname, {
    fixture: test,
    transform,
  });
}
