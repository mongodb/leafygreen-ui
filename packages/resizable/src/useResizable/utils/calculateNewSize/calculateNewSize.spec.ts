import { Position } from '../../useResizable.types';

import { calculateNewSize } from './calculateNewSize';

describe('calculateNewSize', () => {
  // Mock window.innerWidth and window.innerHeight
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 768,
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
    });
  });

  test('calculates new size correctly when position is Right', () => {
    const mockEvent = { clientX: 300, clientY: 200 } as MouseEvent;
    const initialElementSize = 400;
    const initialMousePosition = { x: 350, y: 200 };
    const position = Position.Right;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      100,
      800,
    );

    // Delta X = 300 - 350 = -50
    // New size = 400 - (-50) = 450
    expect(result).toBe(450);
  });

  test('calculates new size correctly when position is Left', () => {
    const mockEvent = { clientX: 300, clientY: 200 } as MouseEvent;
    const initialElementSize = 400;
    const initialMousePosition = { x: 350, y: 200 };
    const position = Position.Left;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      100,
      800,
    );

    // Delta X = 300 - 350 = -50
    // New size = 400 + (-50) = 350
    expect(result).toBe(350);
  });

  test('calculates new size correctly when position is Bottom', () => {
    const mockEvent = { clientX: 300, clientY: 200 } as MouseEvent;
    const initialElementSize = 400;
    const initialMousePosition = { x: 300, y: 250 };
    const position = Position.Bottom;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      100,
      800,
    );

    // Delta Y = 200 - 250 = -50
    // New size = 400 - (-50) = 450
    expect(result).toBe(450);
  });

  test('calculates new size correctly when position is Top', () => {
    const mockEvent = { clientX: 300, clientY: 200 } as MouseEvent;
    const initialElementSize = 400;
    const initialMousePosition = { x: 300, y: 250 };
    const position = Position.Top;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      100,
      800,
    );

    // Delta Y = 200 - 250 = -50
    // New size = 400 + (-50) = 350
    expect(result).toBe(350);
  });

  test('constrains size to minSize when new size is less than minSize', () => {
    const mockEvent = { clientX: 200, clientY: 200 } as MouseEvent;
    const initialElementSize = 150;
    const initialMousePosition = { x: 250, y: 200 };
    const position = Position.Left;
    const minSize = 100;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      minSize,
      800,
    );

    // Delta X = 200 - 250 = -50
    // New size = 150 + (-50) = 100
    expect(result).toBe(minSize);
  });

  test('constrains size to maxSize when new size is greater than maxSize', () => {
    const mockEvent = { clientX: 400, clientY: 200 } as MouseEvent;
    const initialElementSize = 450;
    const initialMousePosition = { x: 250, y: 200 };
    const position = Position.Left;
    const maxSize = 500;

    const result = calculateNewSize(
      mockEvent,
      initialElementSize,
      initialMousePosition,
      position,
      100,
      maxSize,
    );

    // Delta X = 400 - 250 = 150
    // New size = 450 + 150 = 600, but maxSize is 500
    expect(result).toBe(maxSize);
  });
});
