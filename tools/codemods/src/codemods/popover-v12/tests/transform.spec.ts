import { transformTest } from '../../../utils/tests/transformTest';

const transform = 'popover-v12';

const tests = [
  {
    name: 'add-usePortal-consolidate-renderMode',
  },
  {
    name: 'filter-packages',
    options: {
      packages: ['@leafygreen-ui/popover', '@leafygreen-ui/select'],
    },
  },
  {
    name: 'remove-legacy-props',
  },
  {
    name: 'remove-shouldTooltipUsePortal',
  },
  {
    name: 'replace-justify-fit',
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
