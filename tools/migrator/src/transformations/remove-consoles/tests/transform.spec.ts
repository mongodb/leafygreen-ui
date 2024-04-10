import { check } from '../../../utils';

const transform = 'remove-consoles';
const fixtures = ['remove-consoles'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
