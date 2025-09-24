import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  createMockStateModule,
  createMockViewModule,
} from '../hooks.testUtils';

import { useThemeExtension } from './useThemeExtension';

describe('useThemeExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeEditorViewModule = createMockViewModule();

  test('returns empty extension when view module not provided', () => {
    const { result } = renderHook(() =>
      useThemeExtension({
        editorViewInstance: null,
        props: { baseFontSize: 14, darkMode: true },
        modules: { '@codemirror/state': fakeStateModule },
        hasPanel: false,
      }),
    );

    expect(result.current).toEqual([]);
  });

  test('returns theme extension when view module provided', () => {
    const { result } = renderHook(() =>
      useThemeExtension({
        editorViewInstance: null,
        props: { baseFontSize: 14, darkMode: true },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeEditorViewModule,
        },
        hasPanel: false,
      }),
    );

    expect(result.current).toBe('THEME_EXT');
  });
});
