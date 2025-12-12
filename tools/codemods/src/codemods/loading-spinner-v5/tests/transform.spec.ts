import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'loading-spinner-v5';

const tests = [
  {
    name: 'replace-displayOption-with-size',
  },
  {
    name: 'keep-description',
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
  {
    name: 'tree-shaken-import',
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
  });
}
