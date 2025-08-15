import { renderHook } from '@testing-library/react';

import { createMockStateModule } from '../../testing';

import { LanguageName, useLanguageExtension } from './useLanguageExtension';

describe('useLanguageExtension', () => {
  const fakeStateModule = createMockStateModule();
  const modulesBase = { '@codemirror/state': fakeStateModule } as any;

  it('returns empty when language not provided', () => {
    const { result } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: {},
        modules: modulesBase,
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns javascript extension with correct options', () => {
    const jsMock = jest.fn(() => 'JS_EXT');
    const { result } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.javascript },
        modules: {
          ...modulesBase,
          '@codemirror/lang-javascript': { javascript: jsMock },
        },
      }),
    );
    expect(jsMock).toHaveBeenCalledWith({ jsx: false, typescript: false });
    expect(result.current).toBe('JS_EXT');
  });

  it('returns jsx extension with correct options', () => {
    const jsMock = jest.fn(() => 'JSX_EXT');
    const { result } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.jsx },
        modules: {
          ...modulesBase,
          '@codemirror/lang-javascript': { javascript: jsMock },
        },
      }),
    );
    expect(jsMock).toHaveBeenCalledWith({ jsx: true, typescript: false });
    expect(result.current).toBe('JSX_EXT');
  });

  it('returns tsx extension with correct options', () => {
    const jsMock = jest.fn(() => 'TSX_EXT');
    const { result } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.tsx },
        modules: {
          ...modulesBase,
          '@codemirror/lang-javascript': { javascript: jsMock },
        },
      }),
    );
    expect(jsMock).toHaveBeenCalledWith({ jsx: true, typescript: true });
    expect(result.current).toBe('TSX_EXT');
  });

  it('returns typescript extension with correct options', () => {
    const jsMock = jest.fn(() => 'TS_EXT');
    const { result } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.typescript },
        modules: {
          ...modulesBase,
          '@codemirror/lang-javascript': { javascript: jsMock },
        },
      }),
    );
    expect(jsMock).toHaveBeenCalledWith({ jsx: false, typescript: true });
    expect(result.current).toBe('TS_EXT');
  });

  it('returns kotlin and ruby via StreamLanguage.define', () => {
    const defineMock = jest.fn((lang: any) => `STREAM_${lang.name || 'LANG'}`);
    const modules = {
      ...modulesBase,
      '@codemirror/language': { StreamLanguage: { define: defineMock } },
      '@codemirror/legacy-modes/mode/clike': { kotlin: { name: 'kotlin' } },
      '@codemirror/legacy-modes/mode/ruby': { ruby: { name: 'ruby' } },
    } as any;

    const { result: kotlinRes } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.kotlin },
        modules,
      }),
    );
    expect(kotlinRes.current).toBe('STREAM_kotlin');

    const { result: rubyRes } = renderHook(() =>
      useLanguageExtension({
        editorViewInstance: null,
        props: { language: LanguageName.ruby },
        modules,
      }),
    );
    expect(rubyRes.current).toBe('STREAM_ruby');
  });

  it('returns direct language factory results for simple languages', () => {
    const mk = (name: string) => ({
      [name]: jest.fn(() => `${name.toUpperCase()}_EXT`),
    });
    const modules = {
      ...modulesBase,
      '@codemirror/lang-json': mk('json'),
      '@codemirror/lang-css': mk('css'),
      '@codemirror/lang-html': mk('html'),
      '@codemirror/lang-java': mk('java'),
      '@codemirror/lang-cpp': mk('cpp'),
      '@codemirror/lang-go': mk('go'),
      '@codemirror/lang-python': mk('python'),
      '@codemirror/lang-php': mk('php'),
      '@codemirror/lang-rust': mk('rust'),
      '@replit/codemirror-lang-csharp': { csharp: jest.fn(() => 'CSHARP_EXT') },
    } as any;

    const testCases: Array<[LanguageName, string]> = [
      [LanguageName.json, 'JSON_EXT'],
      [LanguageName.css, 'CSS_EXT'],
      [LanguageName.html, 'HTML_EXT'],
      [LanguageName.java, 'JAVA_EXT'],
      [LanguageName.cpp, 'CPP_EXT'],
      [LanguageName.go, 'GO_EXT'],
      [LanguageName.python, 'PYTHON_EXT'],
      [LanguageName.php, 'PHP_EXT'],
      [LanguageName.rust, 'RUST_EXT'],
      [LanguageName.csharp, 'CSHARP_EXT'],
    ];

    for (const [lang, expected] of testCases) {
      const { result } = renderHook(() =>
        useLanguageExtension({
          editorViewInstance: null,
          props: { language: lang },
          modules,
        }),
      );
      expect(result.current).toBe(expected);
    }
  });
});
