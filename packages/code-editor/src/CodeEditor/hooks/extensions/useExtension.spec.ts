import { renderHook, waitFor } from '@testing-library/react';

import { createMockExtension, createMockStateModule } from '../../testing';

import { useExtension } from './useExtension';

describe('useExtension (base hook)', () => {
  const fakeStateModule = createMockStateModule();

  test('returns empty extension when no stateModule provided', () => {
    const { result } = renderHook(() =>
      useExtension({
        editorViewInstance: null,
        value: 'A',
        factory: v => createMockExtension(`EXT_${v}`),
      }),
    );

    expect(result.current).toEqual([]);
  });

  test('returns factory output when stateModule is provided', async () => {
    const { result } = renderHook(() =>
      useExtension({
        editorViewInstance: null,
        value: 'A',
        factory: v => createMockExtension(`EXT_${v}`),
        stateModule: fakeStateModule,
      }),
    );

    await waitFor(() => expect(result.current).toEqual({ label: 'EXT_A' }));
  });

  test('updates returned extension when value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useExtension({
          editorViewInstance: null,
          value,
          factory: (v: string) => createMockExtension(`EXT_${v}`),
          stateModule: fakeStateModule,
        }),
      { initialProps: { value: 'A' } },
    );

    await waitFor(() => expect(result.current).toEqual({ label: 'EXT_A' }));

    rerender({ value: 'B' });
    await waitFor(() => expect(result.current).toEqual({ label: 'EXT_B' }));
  });
});
