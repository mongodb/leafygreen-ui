import { getElementDocumentPosition } from './positionUtils';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    width: '0px',
  }),
});

describe('positionUtils', () => {
  describe('getElementDocumentPosition', () => {
    test('given an element, it returns an object with information about its position', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const pos = getElementDocumentPosition(div);

      expect(pos.top).toBe(0);
      expect(pos.bottom).toBe(0);
      expect(pos.left).toBe(0);
      expect(pos.right).toBe(0);
      expect(pos.height).toBe(0);
      expect(pos.width).toBe(0);
    });
  });
});
