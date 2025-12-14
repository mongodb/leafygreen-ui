import range from 'lodash/range';

import { convert12hTo24h } from './convert12hTo24h';

describe('convert12hTo24h', () => {
  describe('AM', () => {
    test('12 AM converts to 0', () => {
      expect(convert12hTo24h('12', 'AM')).toEqual('0');
    });

    test.each(range(1, 12).map(i => [i, i]))(
      '%i AM converts to %i',
      (input, expected) => {
        expect(convert12hTo24h(`${input}`, 'AM')).toEqual(`${expected}`);
      },
    );
  });

  describe('PM', () => {
    test('12 PM converts to 12', () => {
      expect(convert12hTo24h('12', 'PM')).toEqual('12');
    });

    test.each(range(1, 12).map(i => [i, i + 12]))(
      '%i PM converts to %i',
      (input, expected) => {
        expect(convert12hTo24h(`${input}`, 'PM')).toEqual(`${expected}`);
      },
    );
  });
});
