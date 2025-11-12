import React from 'react';

import { isReact17, renderHook } from '@leafygreen-ui/testing-lib';

import {
  charsPerSegmentMock,
  SegmentObjMock,
  segmentRefsMock,
  segmentsMock,
} from '../testutils/testutils.mocks';

import { InputBoxProvider, useInputBoxContext } from './InputBoxContext';

describe('InputBoxContext', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('throws error when used outside of InputBoxProvider', () => {
    /**
     * The version of `renderHook` imported from "@testing-library/react-hooks", (used in React 17)
     * has an error boundary, and doesn't throw errors as expected:
     * https://github.com/testing-library/react-hooks-testing-library/blob/main/src/index.ts#L5
     * */
    if (isReact17()) {
      const { result } = renderHook(() => useInputBoxContext<SegmentObjMock>());
      expect(result.error.message).toEqual(
        'useInputBoxContext must be used within a InputBoxProvider',
      );
    } else {
      expect(() =>
        renderHook(() => useInputBoxContext<SegmentObjMock>()),
      ).toThrow('useInputBoxContext must be used within a InputBoxProvider');
    }
  });

  test('provides context values that match the props passed to the provider', () => {
    const { result } = renderHook(() => useInputBoxContext<SegmentObjMock>(), {
      wrapper: ({ children }) => (
        <InputBoxProvider
          charsPerSegment={charsPerSegmentMock}
          segmentEnum={SegmentObjMock}
          onChange={mockOnChange}
          onBlur={mockOnBlur}
          segmentRefs={segmentRefsMock}
          segments={segmentsMock}
          disabled={false}
        >
          {children}
        </InputBoxProvider>
      ),
    });

    const {
      charsPerSegment,
      segmentEnum,
      onChange,
      onBlur,
      segmentRefs,
      segments,
      disabled,
    } = result.current;

    expect(charsPerSegment).toBe(charsPerSegmentMock);
    expect(segmentEnum).toBe(SegmentObjMock);
    expect(onChange).toBe(mockOnChange);
    expect(onBlur).toBe(mockOnBlur);
    expect(segmentRefs).toBe(segmentRefsMock);
    expect(segments).toBe(segmentsMock);
    expect(disabled).toBe(false);
  });
});
