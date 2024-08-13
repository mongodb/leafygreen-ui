import { renderHook } from '@leafygreen-ui/testing-lib';

import * as OverlayContextModule from './OverlayContext';
import OverlayProvider from './OverlayContext';
import { useOverlay } from './useOverlay';

jest.mock('@leafygreen-ui/hooks', () => ({
  ...jest.requireActual('@leafygreen-ui/hooks'),
  useForwardedRef: jest.fn(ref => ref),
  useIdAllocator: jest.fn(() => 'mock-id'),
}));

describe('useOverlay', () => {
  let mockRegisterOverlay;
  let mockRemoveOverlay;
  let mockTopMostOverlay;

  beforeEach(() => {
    mockRegisterOverlay = jest.fn();
    mockRemoveOverlay = jest.fn();
    mockTopMostOverlay = undefined;

    jest
      .spyOn(OverlayContextModule, 'useOverlayContext')
      .mockImplementation(() => ({
        getOverlays: jest.fn(),
        registerOverlay: mockRegisterOverlay,
        removeOverlay: mockRemoveOverlay,
        topMostOverlay: mockTopMostOverlay,
      }));

    document.contains = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registers overlay when component mounts', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useOverlay(ref), { wrapper: OverlayProvider });

    expect(mockRegisterOverlay).toHaveBeenCalledTimes(1);
    expect(mockRegisterOverlay).toHaveBeenCalledWith({
      element: ref.current,
      id: 'mock-id',
      ref,
    });
  });

  test('does not register overlay when ref is not attached', () => {
    const ref = { current: null };
    renderHook(() => useOverlay(ref), { wrapper: OverlayProvider });

    expect(mockRegisterOverlay).not.toHaveBeenCalled();
  });

  test('removes overlay on unmount', () => {
    mockRemoveOverlay = jest
      .spyOn(OverlayContextModule.useOverlayContext(), 'removeOverlay')
      .mockImplementation(jest.fn);
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useOverlay(ref), {
      wrapper: OverlayProvider,
    });

    unmount();

    expect(mockRemoveOverlay).toHaveBeenCalledTimes(1);
    expect(mockRemoveOverlay).toHaveBeenCalledWith('mock-id');
  });

  test('returns id and ref', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useOverlay(ref), {
      wrapper: OverlayProvider,
    });

    expect(result.current.id).toBe('mock-id');
    expect(result.current.ref).toBe(ref);
  });

  test('returns correct isTopMostOverlay value', () => {
    const ref = { current: document.createElement('div') };
    mockTopMostOverlay = { id: 'mock-id' };
    const { result } = renderHook(() => useOverlay(ref), {
      wrapper: OverlayProvider,
    });

    expect(result.current.isTopMostOverlay).toBe(true);
  });
});
