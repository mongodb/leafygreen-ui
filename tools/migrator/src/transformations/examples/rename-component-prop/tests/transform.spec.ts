import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'rename-component-prop';
// Array of test file names
const tests = ['rename-component-prop'];

for (const test of tests) {
  transformCheck(__dirname, {
    fixture: test,
    transform,
  });
}
