import { renderHook } from '@leafygreen-ui/testing-lib';

import { LanguageName } from '../extensions/useLanguageExtension';

import { useFormattingModuleLoaders } from './useFormattingModuleLoaders';

// Mock console.warn to test error handling
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFormattingModuleLoaders', () => {
  test('returns empty loaders object when language is undefined', () => {
    const { result } = renderHook(() => useFormattingModuleLoaders(undefined));

    expect(result.current).toEqual({});
  });

  test('returns empty object for languages without formatters', () => {
    // Test with a language that's not handled by the formatter
    const { result } = renderHook(() =>
      useFormattingModuleLoaders('xml' as LanguageName),
    );

    expect(result.current).toEqual({});
  });

  describe('comprehensive language coverage', () => {
    // Test all supported languages return appropriate loaders
    const supportedLanguages = [
      {
        language: LanguageName.javascript,
        expectedModules: ['prettier/standalone', 'prettier/parser-babel'],
      },
      {
        language: LanguageName.jsx,
        expectedModules: ['prettier/standalone', 'prettier/parser-babel'],
      },
      {
        language: LanguageName.json,
        expectedModules: ['prettier/standalone', 'prettier/parser-babel'],
      },
      {
        language: LanguageName.typescript,
        expectedModules: ['prettier/standalone', 'prettier/parser-typescript'],
      },
      {
        language: LanguageName.tsx,
        expectedModules: ['prettier/standalone', 'prettier/parser-typescript'],
      },
      {
        language: LanguageName.css,
        expectedModules: ['prettier/standalone', 'prettier/parser-postcss'],
      },
      {
        language: LanguageName.html,
        expectedModules: ['prettier/standalone', 'prettier/parser-html'],
      },
      {
        language: LanguageName.java,
        expectedModules: ['@wasm-fmt/clang-format'],
      },
      {
        language: LanguageName.cpp,
        expectedModules: ['@wasm-fmt/clang-format'],
      },
      {
        language: LanguageName.csharp,
        expectedModules: ['@wasm-fmt/clang-format'],
      },
      { language: LanguageName.go, expectedModules: ['@wasm-fmt/gofmt'] },
      {
        language: LanguageName.python,
        expectedModules: ['@wasm-fmt/ruff_fmt'],
      },
    ];

    supportedLanguages.forEach(({ language, expectedModules }) => {
      it(`returns expected modules for ${language}`, () => {
        const { result } = renderHook(() =>
          useFormattingModuleLoaders(language),
        );

        const loaders = result.current;
        const loaderKeys = Object.keys(loaders);

        expectedModules.forEach(moduleName => {
          expect(loaderKeys).toContain(moduleName);
          expect(typeof loaders[moduleName as keyof typeof loaders]).toBe(
            'function',
          );
        });

        // Ensure no unexpected modules are returned
        expect(loaderKeys).toHaveLength(expectedModules.length);
      });
    });
  });

  describe('memoization behavior', () => {
    test('returns the same object reference when language does not change', () => {
      const { result, rerender } = renderHook(
        ({ language }: { language: LanguageName | undefined }) =>
          useFormattingModuleLoaders(language),
        {
          initialProps: { language: LanguageName.javascript },
        },
      );

      const firstResult = result.current;
      rerender({ language: LanguageName.javascript });
      const secondResult = result.current;

      expect(firstResult).toBe(secondResult);
    });

    test('returns different object reference when language changes', () => {
      const { result, rerender } = renderHook(
        ({ language }: { language: LanguageName | undefined }) =>
          useFormattingModuleLoaders(language),
        {
          initialProps: {
            language: LanguageName.javascript as LanguageName | undefined,
          },
        },
      );

      const firstResult = result.current;
      rerender({ language: LanguageName.typescript });
      const secondResult = result.current;

      expect(firstResult).not.toBe(secondResult);
    });

    test('returns the same object reference when re-rendering with undefined language', () => {
      const { result, rerender } = renderHook(
        ({ language }: { language: LanguageName | undefined }) =>
          useFormattingModuleLoaders(language),
        {
          initialProps: { language: undefined },
        },
      );

      const firstResult = result.current;
      rerender({ language: undefined });
      const secondResult = result.current;

      expect(firstResult).toBe(secondResult);
    });
  });
});
