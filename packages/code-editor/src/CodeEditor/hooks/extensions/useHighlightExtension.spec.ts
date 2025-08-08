import { renderHook } from '@testing-library/react';

import {
  createFakeLanguageModule,
  createFakeLezerHighlightModule,
  createFakeStateModule,
} from '../../testing';

import { useHighlightExtension } from './useHighlightExtension';

describe('useHighlightExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeLanguageModule = createFakeLanguageModule();
  const fakeLezerHighlight = createFakeLezerHighlightModule();

  it('returns empty when missing modules or language', () => {
    const { result } = renderHook(() =>
      useHighlightExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns syntax highlighting extension when modules present', () => {
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
