import { getSortedUpdates } from './getSortedUpdates';
import { TEST_DATA } from './test.data';

describe('tools/slackbot/release', () => {
  describe('getSortedUpdates', () => {
    test('sorts the updates array', async () => {
      const sortedUpdates = await getSortedUpdates(TEST_DATA);
      expect(sortedUpdates).toHaveProperty(
        'major',
        expect.objectContaining([
          { name: '@leafygreen-ui/example-major', version: '2.0.0' },
          { name: '@lg-tools/tool-major', version: '2.0.0' },
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'minor',
        expect.objectContaining([
          { name: '@leafygreen-ui/example-minor', version: '1.2.0' },
          { name: '@lg-tools/tool-minor', version: '1.2.0' },
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'patch',
        expect.objectContaining([
          { name: '@leafygreen-ui/example-patch', version: '1.0.2' },
          { name: '@lg-tools/tool-patch', version: '1.0.2' },
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'dependency',
        expect.objectContaining([]),
      );
    });
  });
});
