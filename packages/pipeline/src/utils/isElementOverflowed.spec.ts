import isElementOverflowed from './isElementOverflowed';

const createMockElement = ({
  scrollWidth = 100,
  scrollHeight = 100,
  clientWidth = 100,
  clientHeight = 100,
}): HTMLDivElement => {
  const element = document.createElement('div');

  Object.defineProperty(element, 'scrollWidth', {
    value: scrollWidth,
    writable: true,
  });

  Object.defineProperty(element, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
  });

  Object.defineProperty(element, 'clientWidth', {
    value: clientWidth,
    writable: true,
  });

  Object.defineProperty(element, 'clientHeight', {
    value: clientHeight,
    writable: true,
  });

  return element;
};

describe('packages/pipeline/utils/isElementOverflowed', () => {
  test('returns the "true" when the element is overflowed horizontally', () => {
    const element = createMockElement({ scrollWidth: 150 });
    const result = isElementOverflowed(element);

    expect(result).toEqual(true);
  });

  test('returns the "false" when the element is not overflowed horizontally', () => {
    const element = createMockElement({ scrollWidth: 50 });
    const result = isElementOverflowed(element);

    expect(result).toEqual(false);
  });

  test('returns the "true" when the element is overflowed vertically', () => {
    const element = createMockElement({ scrollHeight: 150 });
    const result = isElementOverflowed(element);

    expect(result).toEqual(true);
  });

  test('returns the "false" when the element is not overflowed vertically', () => {
    const element = createMockElement({ scrollHeight: 50 });
    const result = isElementOverflowed(element);

    expect(result).toEqual(false);
  });
});
