import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'named-exports';

const tests = [
  {
    name: 'aliased-import',
  },
  {
    name: 'mixed-imports',
  },
  {
    name: 'already-named',
  },
  {
    name: 'multiple-packages',
  },
  {
    name: 'filter-packages',
    options: {
      packages: ['@leafygreen-ui/button', '@leafygreen-ui/modal'],
    },
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    extension: 'tsx',
    fixture: test.name,
    transform,
    options: test.options,
  });
}
