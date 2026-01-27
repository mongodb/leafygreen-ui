import { waitFor } from '@testing-library/react';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { useRenderData } from './useRenderData';

describe('mcp/hooks/useRenderData', () => {
  const originalPostMessage = window.parent.postMessage;
  let postMessageSpy: jest.SpyInstance;

  beforeEach(() => {
    postMessageSpy = jest
      .spyOn(window.parent, 'postMessage')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    window.parent.postMessage = originalPostMessage;
  });

  function sendMessage(data: unknown) {
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data }));
    });
  }

  test('starts with loading state', () => {
    const { result } = renderHook(() => useRenderData());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('sends ready message to parent on mount', () => {
    renderHook(() => useRenderData());
    expect(postMessageSpy).toHaveBeenCalledWith(
      { type: 'ui-lifecycle-iframe-ready' },
      '*',
    );
  });

  test('receives valid render data', async () => {
    const { result } = renderHook(() => useRenderData<{ name: string }>());

    sendMessage({
      type: 'ui-lifecycle-iframe-render-data',
      payload: { renderData: { name: 'test' } },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual({ name: 'test' });
      expect(result.current.error).toBe(null);
    });
  });

  test('ignores messages with wrong type', () => {
    const { result } = renderHook(() => useRenderData());

    sendMessage({ type: 'some-other-message' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
  });

  test('sets error for invalid payload structure', async () => {
    const { result } = renderHook(() => useRenderData());

    sendMessage({
      type: 'ui-lifecycle-iframe-render-data',
      payload: null,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Invalid payload structure received');
    });
  });

  test('handles null renderData without error', async () => {
    const { result } = renderHook(() => useRenderData());

    sendMessage({
      type: 'ui-lifecycle-iframe-render-data',
      payload: { renderData: null },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
    });
  });

  test('sets error when renderData is not an object', async () => {
    const { result } = renderHook(() => useRenderData());

    sendMessage({
      type: 'ui-lifecycle-iframe-render-data',
      payload: { renderData: 'not an object' },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Expected object but received string');
    });
  });

  test('removes event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useRenderData());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });
});
