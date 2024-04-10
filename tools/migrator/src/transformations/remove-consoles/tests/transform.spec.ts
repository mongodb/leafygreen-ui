import { check } from '../../../utils';

const transform = 'remove-consoles';
// Array of test file names
const fixtures = ['remove-consoles'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
