import { renderHook } from '@testing-library/react';

import {
  createMockLanguageModule,
  createMockStateModule,
} from '../../../testing';
import { IndentUnits } from '../../CodeEditor.types';

import { useIndentExtension } from './useIndentExtension';

describe('useIndentExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeLanguageModule = createMockLanguageModule();

  it('returns empty when required modules missing', () => {
    const { result } = renderHook(() =>
      useIndentExtension({
        editorViewInstance: null,
        props: { indentUnit: undefined },
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns space-based indent configuration', () => {
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

  it('returns tab-based indent configuration', () => {
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
