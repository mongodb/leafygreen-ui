import { renderHook } from '@leafygreen-ui/testing-lib';

import { preLoadedModules } from '../../../testing/preLoadedModules';

import { useExtensions } from './useExtensions';

describe('useExtensions (aggregator)', () => {
  test('returns an array of extensions in expected order/length', () => {
    const { result } = renderHook(() =>
      useExtensions({
        editorViewInstance: null,
        hasPanel: false,
        props: {
          enableLineNumbers: true,
          enableLineWrapping: true,
          enableClickableUrls: true,
          readOnly: true,
          language: 'javascript',
        },
        modules: preLoadedModules,
      }),
    );

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(12);
  });
});
