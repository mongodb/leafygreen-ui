import { renderHook } from '@testing-library/react';

import {
  createMockLanguageModule,
  createMockStateModule,
} from '../hooks.testUtils';

import { useCodeFoldingExtension } from './useCodeFoldingExtension';

describe('useCodeFoldingExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeLanguageModule = createMockLanguageModule();

  test('returns empty when disabled or module missing', () => {
    const { result } = renderHook(() =>
      useCodeFoldingExtension({
        editorViewInstance: null,
        props: { enableCodeFolding: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns fold gutter extension when enabled', () => {
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
