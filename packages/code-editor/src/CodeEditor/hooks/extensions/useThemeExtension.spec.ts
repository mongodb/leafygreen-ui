import { renderHook } from '@testing-library/react';

import { createFakeStateModule, createFakeViewModule } from '../../testing';

import { useThemeExtension } from './useThemeExtension';

describe('useThemeExtension', () => {
  const fakeStateModule = createFakeStateModule();
  const fakeEditorViewModule = createFakeViewModule();

  it('returns empty extension when view module not provided', () => {
    const { result } = renderHook(() =>
      useThemeExtension({
        editorViewInstance: null,
        props: { baseFontSize: 14, darkMode: true },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );

    expect(result.current).toEqual([]);
  });

  it('returns theme extension when view module provided', () => {
    const { result } = renderHook(() =>
      useThemeExtension({
        editorViewInstance: null,
        props: { baseFontSize: 14, darkMode: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeEditorViewModule,
        },
      }),
    );

    expect(result.current).toBe('THEME_EXT');
  });
});
