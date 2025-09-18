import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  createMockHyperLinkModule,
  createMockStateModule,
} from '../hooks.testUtils';

import { useHyperLinkExtension } from './useHyperLinkExtension';

describe('useHyperLinkExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeHyperLinkModule = createMockHyperLinkModule();

  test('returns empty when disabled', () => {
    const { result } = renderHook(() =>
      useHyperLinkExtension({
        editorViewInstance: null,
        props: { enableClickableUrls: false },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns hyperlink extension when enabled', () => {
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
