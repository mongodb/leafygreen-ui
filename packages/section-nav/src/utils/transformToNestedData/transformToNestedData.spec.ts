import { isReact17, renderHook } from '@leafygreen-ui/testing-lib';

import { getFlatLevelDataToNestedData } from '../getFlatLevelDataToNestedData';

import { transformToNestedData } from './transformToNestedData';
import { FlatLevelData } from './transformToNestedData.types';

jest.mock('../getFlatLevelDataToNestedData', () => ({
  getFlatLevelDataToNestedData: jest.fn(),
}));

describe('transformToNestedData', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls getFlatLevelDataToNestedData when type is "flatLevel"', () => {
    // Setup test data
    const flatLevelInput: FlatLevelData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
    ];

    // Call the function through our test hook
    renderHook(() =>
      transformToNestedData({
        type: 'flatLevel',
        data: flatLevelInput,
      }),
    );

    // Verify the correct transformer function was called with the input data
    expect(getFlatLevelDataToNestedData).toHaveBeenCalledWith(flatLevelInput);
  });

  test('throws error for unsupported data type', async () => {
    /**
     * The version of `renderHook`  imported from "@testing-library/react-hooks", (used in React 17)
     * has an error boundary, and doesn't throw errors as expected:
     * https://github.com/testing-library/react-hooks-testing-library/blob/main/src/index.ts#L5
     * */
    if (isReact17()) {
      const { result } = renderHook(() => {
        // @ts-expect-error Testing with invalid type
        transformToNestedData({ type: 'invalidType', data: {} });
      });

      expect(result.error.message).toEqual(
        'Unsupported data type: invalidType',
      );
    } else {
      expect(() => {
        renderHook(() => {
          // @ts-expect-error Testing with invalid type
          transformToNestedData({ type: 'invalidType', data: {} });
        });
      }).toThrow('Unsupported data type: invalidType');
    }
  });
});
