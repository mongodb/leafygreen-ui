import { generateOutputStrings } from './generateOutputStrings';

describe('tools/slackbot/release', () => {
  describe('generateOutputStrings', () => {
    test('patch', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-patch',
        version: '1.0.2',
      });

      expect(updateObj).toContainEqual({
        name: '@leafygreen-ui/example-patch',
        fullName: '@leafygreen-ui/example-patch@1.0.2',
        scope: '@leafygreen-ui',
        shortName: 'example-patch',
        changelogUrl:
          'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-patch/CHANGELOG.md`;',
        version: '1.0.2',
      });
    });
    test('minor', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-minor',
        version: '1.2.0',
      });

      expect(updateObj).toContainEqual({
        name: '@leafygreen-ui/example-minor',
        fullName: '@leafygreen-ui/example-minor@1.2.0',
        scope: '@leafygreen-ui',
        shortName: 'example-minor',
        changelogUrl:
          'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-minor/CHANGELOG.md`;',
        version: '1.2.0',
      });
    });
    test('major', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-major',
        version: '2.0.0',
      });

      expect(updateObj).toContainEqual({
        name: '@leafygreen-ui/example-major',
        fullName: '@leafygreen-ui/example-major@2.0.0',
        scope: '@leafygreen-ui',
        shortName: 'example-major',
        changelogUrl:
          'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-major/CHANGELOG.md`;',
        version: '2.0.0',
      });
    });
    test('@lg-tools', () => {
      const updateObj = generateOutputStrings({
        name: '@lg-tools/example-tool',
        version: '1.2.0',
      });

      expect(updateObj).toContainEqual({
        name: '@lg-tools/example-tool',
        fullName: '@lg-tools/example-tool@1.2.0',
        scope: '@lg-tools',
        shortName: 'example-tool',
        changelogUrl:
          'https://github.com/mongodb/leafygreen-ui/blob/main/tools/example-tool/CHANGELOG.md`;',
        version: '1.2.0',
      });
    });
  });
});
