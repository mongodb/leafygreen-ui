import { renderHook } from '@testing-library/react';

import { createFakeStateModule, createFakeViewModule } from '../../testing';

import { usePlaceholderExtension } from './usePlaceholderExtension';

describe('usePlaceholderExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeViewModule = createFakeViewModule();

  it('returns empty when no placeholder', () => {
    const { result } = renderHook(() =>
      usePlaceholderExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns placeholder extension when provided', () => {
    const { result } = renderHook(() =>
      usePlaceholderExtension({
        editorViewInstance: null,
        props: { placeholder: 'Type here' },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeViewModule,
        },
      }),
    );
    expect(result.current).toBe('PLACEHOLDER_Type here');
  });
});
