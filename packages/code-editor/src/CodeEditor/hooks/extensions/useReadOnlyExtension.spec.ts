import { renderHook } from '@testing-library/react';

import { createMockStateModule } from '../../../testing';

import { useReadOnlyExtension } from './useReadOnlyExtension';

describe('useReadOnlyExtension', () => {
  const fakeStateModule = createMockStateModule();

  test('returns empty when readOnly is false', () => {
    const { result } = renderHook(() =>
      useReadOnlyExtension({
        editorViewInstance: null,
        props: { readOnly: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns readonly extension when enabled', () => {
    const { result } = renderHook(() =>
      useReadOnlyExtension({
        editorViewInstance: null,
        props: { readOnly: true },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toBe('READONLY_true');
  });
});
