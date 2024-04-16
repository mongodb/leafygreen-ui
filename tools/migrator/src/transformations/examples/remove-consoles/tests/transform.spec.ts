import { transformCheck } from '../../../../utils/tests/transformCheck';

const transform = 'remove-consoles';
// Array of test file names
const tests = ['remove-consoles'];

for (const test of tests) {
  transformCheck(__dirname, {
    fixture: test,
    transform,
  });
}
