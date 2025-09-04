import { renderHook } from '@testing-library/react';

import {
  createMockLanguageModule,
  createMockLezerHighlightModule,
  createMockStateModule,
} from '../hooks.testUtils';

import { useHighlightExtension } from './useHighlightExtension';

describe('useHighlightExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeLanguageModule = createMockLanguageModule();
  const fakeLezerHighlight = createMockLezerHighlightModule();

  test('returns empty when missing modules or language', () => {
    const { result } = renderHook(() =>
      useHighlightExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns syntax highlighting extension when modules present', () => {
    const { result } = renderHook(() =>
      useHighlightExtension({
        editorViewInstance: null,
        props: { language: 'javascript', darkMode: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/language': fakeLanguageModule,
          '@lezer/highlight': fakeLezerHighlight,
        },
      }),
    );
    expect(result.current).toHaveProperty('HIGHLIGHT_EXT');
  });
});
