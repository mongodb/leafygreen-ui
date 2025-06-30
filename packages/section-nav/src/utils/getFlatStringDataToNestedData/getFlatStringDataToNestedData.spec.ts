import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  FlatData,
  NestedData,
} from '../getTransformToNestedData/getTransformToNestedData.types';

import { getFlatStringDataToNestedData } from './getFlatStringDataToNestedData';

describe('getFlatStringDataToNestedData', () => {
  /**
   * Helper function to create a wrapper that returns the result of calling
   * getFlatStringDataToNestedData with the provided data.
   */
  const useTestHook = (data: FlatData) => {
    return getFlatStringDataToNestedData(data);
  };

  test('transforms empty data into empty array', () => {
    const { result } = renderHook(() => useTestHook([]));
    expect(result.current).toEqual([]);
  });

  test('transforms single level 1 item', () => {
    const flatData: FlatData = [{ level: 1, id: '1', label: 'Item 1' }];

    const { result } = renderHook(() => useTestHook(flatData));

    const expectedData: NestedData = [
      { id: '1', label: 'Item 1', children: [] },
    ];

    expect(result.current).toEqual(expectedData);
  });

  test('transforms level 1 and level 2 items', () => {
    const flatData: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
      { level: 2, id: '1.2', label: 'Item 1.2' },
    ];

    const { result } = renderHook(() => useTestHook(flatData));

    const expectedData: NestedData = [
      {
        id: '1',
        label: 'Item 1',
        children: [
          { id: '1.1', label: 'Item 1.1', children: [] },
          { id: '1.2', label: 'Item 1.2', children: [] },
        ],
      },
    ];

    expect(result.current).toEqual(expectedData);
  });

  test('transforms multiple level 1 items with nested children', () => {
    const flatData: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
      { level: 1, id: '2', label: 'Item 2' },
      { level: 2, id: '2.1', label: 'Item 2.1' },
    ];

    const { result } = renderHook(() => useTestHook(flatData));

    const expectedData: NestedData = [
      {
        id: '1',
        label: 'Item 1',
        children: [{ id: '1.1', label: 'Item 1.1', children: [] }],
      },
      {
        id: '2',
        label: 'Item 2',
        children: [{ id: '2.1', label: 'Item 2.1', children: [] }],
      },
    ];

    expect(result.current).toEqual(expectedData);
  });

  test('transforms deeply nested structure with multiple levels', () => {
    const flatData: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
      { level: 3, id: '1.1.1', label: 'Item 1.1.1' },
      { level: 3, id: '1.1.2', label: 'Item 1.1.2' },
      { level: 2, id: '1.2', label: 'Item 1.2' },
      { level: 1, id: '2', label: 'Item 2' },
      { level: 2, id: '2.1', label: 'Item 2.1' },
      { level: 3, id: '2.1.1', label: 'Item 2.1.1' },
    ];

    const { result } = renderHook(() => useTestHook(flatData));

    const expectedData: NestedData = [
      {
        id: '1',
        label: 'Item 1',
        children: [
          {
            id: '1.1',
            label: 'Item 1.1',
            children: [
              { id: '1.1.1', label: 'Item 1.1.1', children: [] },
              { id: '1.1.2', label: 'Item 1.1.2', children: [] },
            ],
          },
          { id: '1.2', label: 'Item 1.2', children: [] },
        ],
      },
      {
        id: '2',
        label: 'Item 2',
        children: [
          {
            id: '2.1',
            label: 'Item 2.1',
            children: [{ id: '2.1.1', label: 'Item 2.1.1', children: [] }],
          },
        ],
      },
    ];

    expect(result.current).toEqual(expectedData);
  });

  test('handles sibling transitions correctly', () => {
    const flatData: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
      { level: 3, id: '1.1.1', label: 'Item 1.1.1' },
      { level: 2, id: '1.2', label: 'Item 1.2' }, // Back to level 2
    ];

    const { result } = renderHook(() => useTestHook(flatData));

    const expectedData: NestedData = [
      {
        id: '1',
        label: 'Item 1',
        children: [
          {
            id: '1.1',
            label: 'Item 1.1',
            children: [{ id: '1.1.1', label: 'Item 1.1.1', children: [] }],
          },
          { id: '1.2', label: 'Item 1.2', children: [] },
        ],
      },
    ];

    expect(result.current).toEqual(expectedData);
  });

  test('handles skipped level transitions', () => {
    const flatData: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 3, id: '1.0.1', label: 'Item 1.0.1' }, // Skipped level 2
    ];

    const { result } = renderHook(() => useTestHook(flatData));

    // When level 2 is skipped, the level 3 item should still be added to level 1's children
    const expectedData: NestedData = [
      {
        id: '1',
        label: 'Item 1',
        children: [{ id: '1.0.1', label: 'Item 1.0.1', children: [] }],
      },
    ];

    expect(result.current).toEqual(expectedData);
  });
});
