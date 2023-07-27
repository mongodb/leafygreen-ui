import { getSortedUpdates } from './getSortedUpdates';
import { TEST_DATA } from './test.data';

describe('tools/slackbot/release', () => {
  describe('getSortedUpdates', () => {
    test('sorts the updates array', async () => {
      const sortedUpdates = await getSortedUpdates(TEST_DATA);
      expect(sortedUpdates).toContainEqual({
        major: [
          {
            name: '@leafygreen-ui/example-major',
            version: '2.0.0',
          },
        ],
        minor: [
          {
            name: '@leafygreen-ui/example-minor',
            version: '1.2.0',
          },
        ],
        patch: [
          {
            name: '@leafygreen-ui/example-patch',
            version: '1.0.2',
          },
        ],
        dependency: [],
      });
    });
  });
});
