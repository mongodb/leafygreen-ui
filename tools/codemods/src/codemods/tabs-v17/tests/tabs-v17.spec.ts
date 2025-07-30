import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'tabs-v17';

const tests = [
  {
    name: 'rename-props',
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    extension: 'jsx',
    fixture: test.name,
    transform,
  });
}
