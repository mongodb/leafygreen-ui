import { renderHook } from '@testing-library/react';

import {
  createFakeAutoCompleteModule,
  createFakeStateModule,
} from '../../testing';

import { useAutoCompleteExtension } from './useAutoCompleteExtension';

describe('useAutoCompleteExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeAutoModule = createFakeAutoCompleteModule();

  it('returns empty when language not set', () => {
    const { result } = renderHook(() =>
      useAutoCompleteExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns autocompletion extension when language set', () => {
    const { result } = renderHook(() =>
      useAutoCompleteExtension({
        editorViewInstance: null,
        props: { language: 'javascript' },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/autocomplete': fakeAutoModule,
        },
      }),
    );
    expect(result.current).toBe('AC_EXT');
  });
});
