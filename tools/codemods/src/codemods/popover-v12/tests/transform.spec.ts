import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'popover-v12';

const tests = [
  {
    name: 'add-usePortal-consolidate-renderMode',
  },
  {
    name: 'remove-legacy-props',
  },
  {
    name: 'remove-shouldTooltipUsePortal',
  },
  {
    name: 'filter-packages',
    options: {
      packages: ['@leafygreen-ui/popover', '@leafygreen-ui/select'],
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
