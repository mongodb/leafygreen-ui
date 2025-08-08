import { renderHook } from '@testing-library/react';

import {
  createFakeHyperLinkModule,
  createFakeStateModule,
} from '../../testing';

import { useHyperLinkExtension } from './useHyperLinkExtension';

describe('useHyperLinkExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeHyperLinkModule = createFakeHyperLinkModule();

  it('returns empty when disabled', () => {
    const { result } = renderHook(() =>
      useHyperLinkExtension({
        editorViewInstance: null,
        props: { enableClickableUrls: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns hyperlink extension when enabled', () => {
    const { result } = renderHook(() =>
      useHyperLinkExtension({
        editorViewInstance: null,
        props: { enableClickableUrls: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@uiw/codemirror-extensions-hyper-link': fakeHyperLinkModule,
        },
      }),
    );
    expect(result.current).toBe('HYPERLINK_EXT');
  });
});
