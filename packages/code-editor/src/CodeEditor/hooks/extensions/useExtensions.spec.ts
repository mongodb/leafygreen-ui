import { renderHook } from '@testing-library/react';

import { createComprehensiveFakeModules } from '../../testing';

import { useExtensions } from './useExtensions';

describe('useExtensions (aggregator)', () => {
  const fakeModules = createComprehensiveFakeModules();

  it('returns an array of extensions in expected order/length', () => {
    const { result } = renderHook(() =>
      useExtensions({
        editorViewInstance: null,
        props: {
          enableLineNumbers: true,
          enableLineWrapping: true,
          enableClickableUrls: true,
          readOnly: true,
          language: 'javascript',
        },
        modules: fakeModules,
      }),
    );

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(12);
  });
});
