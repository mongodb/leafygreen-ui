import { renderHook } from '@testing-library/react';

import { createMockStateModule, createMockViewModule } from '../../../testing';

import { useLineNumbersExtension } from './useLineNumbersExtension';

describe('useLineNumbersExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeViewModule = createMockViewModule();

  it('returns empty when disabled', () => {
    const { result } = renderHook(() =>
      useLineNumbersExtension({
        editorViewInstance: null,
        props: { enableLineNumbers: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns line numbers extension when enabled', () => {
    const { result } = renderHook(() =>
      useLineNumbersExtension({
        editorViewInstance: null,
        props: { enableLineNumbers: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeViewModule,
        },
      }),
    );
    expect(result.current).toBe('LINENUM_EXT');
  });
});
