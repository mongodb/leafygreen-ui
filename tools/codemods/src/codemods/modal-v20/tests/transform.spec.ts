import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'modal-v20';

const tests = [
  {
    name: 'rename-className-props',
  },
  {
    name: 'remove-initialFocus',
  },
  {
    name: 'handle-aliases',
  },
  {
    name: 'filter-packages',
    options: {
      packages: ['@leafygreen-ui/modal', '@leafygreen-ui/confirmation-modal'],
    },
  },
];

for (const test of tests) {
  transformTest(__dirname, {
    extension: 'jsx',
    fixture: test.name,
    transform,
    options: test.options,
  });
}
