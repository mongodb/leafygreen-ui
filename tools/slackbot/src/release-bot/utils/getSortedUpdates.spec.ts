import { fetchChangelogText, fetchLatestChangelogText } from './fetchChangelog';
import { getSortedUpdates } from './getSortedUpdates';
import { TEST_CHANGELOG, TEST_DATA } from './test.data';

jest.mock('./fetchChangelog', () => {
  return {
    fetchChangelogText: jest.fn(),
    fetchLatestChangelogText: jest.fn(),
  };
});

describe('tools/slackbot/release', () => {
  beforeEach(() => {
    (fetchChangelogText as jest.Mock).mockReturnValue(
      new Promise(r => r(TEST_CHANGELOG)),
    );
    (fetchLatestChangelogText as jest.Mock).mockReturnValue(
      new Promise(r => r(TEST_CHANGELOG)),
    );
  });

  describe('getSortedUpdates', () => {
    test('sorts the updates array', async () => {
      const sortedUpdates = await getSortedUpdates(TEST_DATA);
      expect(sortedUpdates).toHaveProperty(
        'major',
        expect.arrayContaining([
          expect.objectContaining({
            name: '@leafygreen-ui/example-major',
            version: '2.0.0',
          }),
          expect.objectContaining({
            name: '@lg-tools/tool-major',
            version: '2.0.0',
          }),
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'minor',
        expect.arrayContaining([
          expect.objectContaining({
            name: '@leafygreen-ui/example-minor',
            version: '1.2.0',
          }),
          expect.objectContaining({
            name: '@lg-tools/tool-minor',
            version: '1.2.0',
          }),
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'patch',
        expect.arrayContaining([
          expect.objectContaining({
            name: '@leafygreen-ui/example-patch',
            version: '1.0.2',
          }),
          expect.objectContaining({
            name: '@lg-tools/tool-patch',
            version: '1.0.2',
          }),
        ]),
      );

      expect(sortedUpdates).toHaveProperty(
        'dependency',
        expect.arrayContaining([]),
      );
    });
  });
});
