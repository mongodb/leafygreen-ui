import { getChangeType } from './getChangeType';

describe('tools/slackbot/release', () => {
  describe('getChangeType', () => {
    test('major', () => {
      const update = getChangeType({
        name: '@leafygreen-ui/example',
        version: '1.0.0',
      });
      expect(update).toEqual('major');
    });
    test('minor', () => {
      const update = getChangeType({
        name: '@leafygreen-ui/example',
        version: '1.1.0',
      });
      expect(update).toEqual('minor');
    });
    test('patch', () => {
      const update = getChangeType({
        name: '@leafygreen-ui/example',
        version: '1.1.1',
      });
      expect(update).toEqual('patch');
    });
  });
});
