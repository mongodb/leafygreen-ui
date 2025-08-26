import { renderHook } from '@testing-library/react';

import { IndentUnits } from '../../CodeEditor.types';
import {
  createMockLanguageModule,
  createMockStateModule,
} from '../../../testing';

import { useIndentExtension } from './useIndentExtension';

describe('useIndentExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeLanguageModule = createMockLanguageModule();

  test('returns empty when required modules missing', () => {
    const { result } = renderHook(() =>
      useIndentExtension({
        editorViewInstance: null,
        props: { indentUnit: undefined },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns space-based indent configuration', () => {
    const { result } = renderHook(() =>
      useIndentExtension({
        editorViewInstance: null,
        props: { indentUnit: IndentUnits.Space, indentSize: 4 },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/language': fakeLanguageModule,
        },
      }),
    );
    expect(result.current).toEqual(['INDENT_"    "', 'TABSIZE_4']);
  });

  test('returns tab-based indent configuration', () => {
    const { result } = renderHook(() =>
      useIndentExtension({
        editorViewInstance: null,
        props: { indentUnit: IndentUnits.Tab, indentSize: 2 },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/language': fakeLanguageModule,
        },
      }),
    );
    expect(result.current).toEqual(['INDENT_"\\t"', 'TABSIZE_2']);
  });
});
