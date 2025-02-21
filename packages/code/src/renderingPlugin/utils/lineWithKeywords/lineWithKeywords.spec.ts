import { lineWithKeywords } from './lineWithKeywords';

describe('lineWithKeywords', () => {
  it('should return unchanged array when no keywords match', () => {
    const input = ['hello world', { kind: 'text', children: ['test'] }];
    const keywords = { _special: 'custom' };
    expect(lineWithKeywords(input, keywords)).toEqual(input);
  });

  it('should highlight keywords with custom kind', () => {
    const input = ['_hello world _hello'];
    const keywords = { _hello: 'custom' };
    const expected = [
      { kind: 'lg-highlight-custom', children: ['_hello'] },
      ' world ',
      { kind: 'lg-highlight-custom', children: ['_hello'] },
    ];
    expect(lineWithKeywords(input, keywords)).toEqual(expected);
  });

  it('should handle multiple different keywords', () => {
    const input = ['_test some @user text'];
    const keywords = {
      _test: 'keyword',
      '@user': 'mention',
    };
    const expected = [
      { kind: 'lg-highlight-keyword', children: ['_test'] },
      ' some ',
      { kind: 'lg-highlight-mention', children: ['@user'] },
      ' text',
    ];
    expect(lineWithKeywords(input, keywords)).toEqual(expected);
  });

  it('should preserve non-string tokens', () => {
    const input = [
      '_keyword',
      { kind: 'operator', children: ['+'] },
      '_keyword',
    ];
    const keywords = { _keyword: 'special' };
    const expected = [
      { kind: 'lg-highlight-special', children: ['_keyword'] },
      { kind: 'operator', children: ['+'] },
      { kind: 'lg-highlight-special', children: ['_keyword'] },
    ];
    expect(lineWithKeywords(input, keywords)).toEqual(expected);
  });
});
