import { renderHook } from '@testing-library/react';

import { createFakeLanguageModule, createFakeStateModule } from '../../testing';

import { useCodeFoldingExtension } from './useCodeFoldingExtension';

describe('useCodeFoldingExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeLanguageModule = createFakeLanguageModule();

  it('returns empty when disabled or module missing', () => {
    const { result } = renderHook(() =>
      useCodeFoldingExtension({
        editorViewInstance: null,
        props: { enableCodeFolding: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns fold gutter extension when enabled', () => {
    const { result } = renderHook(() =>
      useCodeFoldingExtension({
        editorViewInstance: null,
        props: { enableCodeFolding: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/language': fakeLanguageModule,
        },
      }),
    );
    expect(result.current).toHaveProperty('FOLD_EXT');
  });
});
