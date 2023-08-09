import { generateOutputStrings } from './generateOutputStrings';

describe('tools/slackbot/release', () => {
  describe('generateOutputStrings', () => {
    test('patch', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-patch',
        version: '1.0.2',
      });

      expect(updateObj).toHaveProperty('name', '@leafygreen-ui/example-patch');

      expect(updateObj).toHaveProperty(
        'fullName',
        '@leafygreen-ui/example-patch@1.0.2',
      );
      expect(updateObj).toHaveProperty('scope', '@leafygreen-ui');
      expect(updateObj).toHaveProperty('shortName', 'example-patch');
      expect(updateObj).toHaveProperty(
        'changelogUrl',
        'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-patch/CHANGELOG.md',
      );
      expect(updateObj).toHaveProperty('version', '1.0.2');
    });

    test('minor', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-minor',
        version: '1.2.0',
      });

      expect(updateObj).toHaveProperty('name', '@leafygreen-ui/example-minor');
      expect(updateObj).toHaveProperty(
        'fullName',
        '@leafygreen-ui/example-minor@1.2.0',
      );
      expect(updateObj).toHaveProperty('scope', '@leafygreen-ui');
      expect(updateObj).toHaveProperty('shortName', 'example-minor');
      expect(updateObj).toHaveProperty(
        'changelogUrl',
        'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-minor/CHANGELOG.md',
      );
      expect(updateObj).toHaveProperty('version', '1.2.0');
    });

    test('major', () => {
      const updateObj = generateOutputStrings({
        name: '@leafygreen-ui/example-major',
        version: '2.0.0',
      });

      expect(updateObj).toHaveProperty('name', '@leafygreen-ui/example-major');
      expect(updateObj).toHaveProperty(
        'fullName',
        '@leafygreen-ui/example-major@2.0.0',
      );
      expect(updateObj).toHaveProperty('scope', '@leafygreen-ui');
      expect(updateObj).toHaveProperty('shortName', 'example-major');
      expect(updateObj).toHaveProperty(
        'changelogUrl',
        'https://github.com/mongodb/leafygreen-ui/blob/main/packages/example-major/CHANGELOG.md',
      );
      expect(updateObj).toHaveProperty('version', '2.0.0');
    });

    test('@lg-tools', () => {
      const updateObj = generateOutputStrings({
        name: '@lg-tools/example-tool',
        version: '1.2.0',
      });

      expect(updateObj).toHaveProperty('name', '@lg-tools/example-tool');
      expect(updateObj).toHaveProperty(
        'fullName',
        '@lg-tools/example-tool@1.2.0',
      );
      expect(updateObj).toHaveProperty('scope', '@lg-tools');
      expect(updateObj).toHaveProperty('shortName', 'example-tool');
      expect(updateObj).toHaveProperty(
        'changelogUrl',
        'https://github.com/mongodb/leafygreen-ui/blob/main/tools/example-tool/CHANGELOG.md',
      );
      expect(updateObj).toHaveProperty('version', '1.2.0');
    });
  });
});
