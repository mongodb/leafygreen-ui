import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'loading-spinner-v5';

const tests = [
  {
    name: 'replace-displayOption-with-size',
  },
  {
    name: 'remove-description',
  },
  {
    name: 'combined-props',
  },
  {
    name: 'aliased-import',
  },
  {
    name: 'no-changes',
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
  });
}
