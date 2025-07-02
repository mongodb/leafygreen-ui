import { formatCssSize } from './formatCssSize';

describe('formatCssSize', () => {
  test('appends px to number input', () => {
    expect(formatCssSize(100)).toBe('100px');
    expect(formatCssSize(0)).toBe('0px');
    expect(formatCssSize(-5)).toBe('-5px');
  });

  test('appends px to numeric string input', () => {
    expect(formatCssSize('100')).toBe('100px');
    expect(formatCssSize('0')).toBe('0px');
    expect(formatCssSize('-5')).toBe('-5px');
    expect(formatCssSize(' 42 ')).toBe('42px');
  });

  test('returns string with units as is', () => {
    expect(formatCssSize('100px')).toBe('100px');
    expect(formatCssSize('5rem')).toBe('5rem');
    expect(formatCssSize('2em')).toBe('2em');
    expect(formatCssSize('50%')).toBe('50%');
    expect(formatCssSize('auto')).toBe('auto');
    expect(formatCssSize('inherit')).toBe('inherit');
    expect(formatCssSize('calc(100% - 10px)')).toBe('calc(100% - 10px)');
  });

  test('handles edge cases for string input', () => {
    expect(formatCssSize('')).toBe('');
    expect(formatCssSize(' ')).toBe('');
    expect(formatCssSize('px')).toBe('px');
    expect(formatCssSize('100 px')).toBe('100 px');
    expect(formatCssSize('100.5')).toBe('100.5px');
    expect(formatCssSize('.5')).toBe('.5px');
    expect(formatCssSize('-.5')).toBe('-.5px');
  });

  test('does not append px to non-numeric stripnngs', () => {
    expect(formatCssSize('foo')).toBe('foo');
    expect(formatCssSize('barpx')).toBe('barpx');
    expect(formatCssSize('100abc')).toBe('100abc');
  });
});
