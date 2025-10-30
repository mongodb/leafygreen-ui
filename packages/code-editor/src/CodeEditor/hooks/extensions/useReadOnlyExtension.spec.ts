import * as StateModule from '@codemirror/state';
import * as ViewModule from '@codemirror/view';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useReadOnlyExtension } from './useReadOnlyExtension';

describe('useReadOnlyExtension', () => {
  test('returns empty when readOnly is false', () => {
    const { result } = renderHook(() =>
      useReadOnlyExtension({
        editorViewInstance: null,
        props: { readOnly: false },
        modules: {
          '@codemirror/state': StateModule,
          '@codemirror/view': ViewModule,
        },
      }),
    );
    const current = result.current as any;
    expect(current.inner).toEqual([]);
  });

  test('returns readonly extension when enabled', () => {
    const { result } = renderHook(() =>
      useReadOnlyExtension({
        editorViewInstance: null,
        props: { readOnly: true },
        modules: {
          '@codemirror/state': StateModule,
          '@codemirror/view': ViewModule,
        },
      }),
    );
    const current = result.current as any;
    expect(current.inner.length).toBeGreaterThan(0); // CodeMirrorcompartment was created
  });
});
