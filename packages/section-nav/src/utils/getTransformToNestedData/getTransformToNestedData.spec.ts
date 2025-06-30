import { renderHook } from '@leafygreen-ui/testing-lib';

import { getFlatStringDataToNestedData } from '../getFlatStringDataToNestedData';

import { getTransformToNestedData } from './getTransformToNestedData';
import {
  FlatData,
  GetTransformToNestedDataArgs,
} from './getTransformToNestedData.types';

jest.mock('../getFlatStringDataToNestedData', () => ({
  getFlatStringDataToNestedData: jest.fn(),
}));

describe('getTransformToNestedData', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Helper function that wraps getTransformToNestedData for testing
   */
  const useTestHook = (params: GetTransformToNestedDataArgs) => {
    return getTransformToNestedData(params);
  };

  test('calls getFlatStringDataToNestedData when type is "flatString"', () => {
    // Setup test data
    const flatStringInput: FlatData = [
      { level: 1, id: '1', label: 'Item 1' },
      { level: 2, id: '1.1', label: 'Item 1.1' },
    ];

    // Call the function through our test hook
    renderHook(() =>
      useTestHook({
        type: 'flatString',
        data: flatStringInput,
      }),
    );

    // Verify the correct transformer function was called with the input data
    expect(getFlatStringDataToNestedData).toHaveBeenCalledWith(flatStringInput);
  });

  test('throws error for unsupported data type', () => {
    const renderWithInvalidType = () => {
      renderHook(() =>
        // @ts-expect-error Testing with invalid type
        useTestHook({ type: 'invalidType', data: {} }),
      );
    };

    expect(renderWithInvalidType).toThrow('Unsupported data type: invalidType');
  });
});
