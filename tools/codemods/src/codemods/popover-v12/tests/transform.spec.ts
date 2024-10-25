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
];

for (const test of tests) {
  transformTest(__dirname, {
    fixture: test.name,
    transform,
  });
}