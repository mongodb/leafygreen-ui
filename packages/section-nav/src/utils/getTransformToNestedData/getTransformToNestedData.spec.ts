import { renderHook } from '@leafygreen-ui/testing-lib';

import { getFlatLevelDataToNestedData } from '../getFlatLevelDataToNestedData';

import { getTransformToNestedData } from './getTransformToNestedData';
import { FlatLevelData } from './getTransformToNestedData.types';

jest.mock('../getFlatLevelDataToNestedData', () => ({
  getFlatLevelDataToNestedData: jest.fn(),
}));

describe('getTransformToNestedData', () => {
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
      getTransformToNestedData({
        type: 'flatLevel',
        data: flatLevelInput,
      }),
    );

    // Verify the correct transformer function was called with the input data
    expect(getFlatLevelDataToNestedData).toHaveBeenCalledWith(flatLevelInput);
  });

  test('throws error for unsupported data type', () => {
    const renderWithInvalidType = () => {
      renderHook(() =>
        // @ts-expect-error Testing with invalid type
        getTransformToNestedData({ type: 'invalidType', data: {} }),
      );
    };

    expect(renderWithInvalidType).toThrow('Unsupported data type: invalidType');
  });
});
