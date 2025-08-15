import { renderHook } from '@testing-library/react';

import { createMockStateModule, createMockViewModule } from '../../testing';

import { useLineWrapExtension } from './useLineWrapExtension';

describe('useLineWrapExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeViewModule = createMockViewModule();

  it('returns empty when disabled', () => {
    const { result } = renderHook(() =>
      useLineWrapExtension({
        editorViewInstance: null,
        props: { enableLineWrapping: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns wrapping extension when enabled and module present', () => {
    const { result } = renderHook(() =>
      useLineWrapExtension({
        editorViewInstance: null,
        props: { enableLineWrapping: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeViewModule,
        },
      }),
    );
    expect(result.current).toBe('WRAP_EXT');
  });
});
