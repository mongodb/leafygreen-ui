import { renderHook } from '@testing-library/react';

import { LanguageName } from './extensions/useLanguageExtension';
import { useFormattingModuleLoaders } from './useFormattingModuleLoaders';

// Mock console.warn to test error handling
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFormattingModuleLoaders', () => {
  describe('with no language provided', () => {
    it('returns empty loaders object when language is undefined', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(undefined),
      );

      expect(result.current).toEqual({});
    });
  });

  describe('Prettier with built-in parsers', () => {
    it('returns correct loaders for JavaScript', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.javascript),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-babel');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-babel']).toBe('function');
    });

    it('returns correct loaders for JSX', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.jsx),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-babel');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-babel']).toBe('function');
    });

    it('returns correct loaders for JSON', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.json),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-babel');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-babel']).toBe('function');
    });

    it('returns correct loaders for TypeScript', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.typescript),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-typescript');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-typescript']).toBe('function');
    });

    it('returns correct loaders for TSX', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.tsx),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-typescript');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-typescript']).toBe('function');
    });

    it('returns correct loaders for CSS', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.css),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-postcss');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-postcss']).toBe('function');
    });

    it('returns correct loaders for HTML', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.html),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-html');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-html']).toBe('function');
    });
  });

  describe('Prettier with external plugins', () => {
    it('returns correct loaders for Java', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.java),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier-plugin-java');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier-plugin-java']).toBe('function');
    });

    it('returns correct loaders for Kotlin', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.kotlin),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier-plugin-kotlin');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier-plugin-kotlin']).toBe('function');
    });

    it('returns correct loaders for PHP', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.php),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('@prettier/plugin-php');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['@prettier/plugin-php']).toBe('function');
    });

    it('returns correct loaders for Ruby', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.ruby),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('@prettier/plugin-ruby');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['@prettier/plugin-ruby']).toBe('function');
    });

    it('returns correct loaders for Rust', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.rust),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier-plugin-rust');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier-plugin-rust']).toBe('function');
    });
  });

  describe('WASM formatters', () => {
    it('returns correct loaders for C++', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.cpp),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('@wasm-fmt/clang-format');
      expect(typeof loaders['@wasm-fmt/clang-format']).toBe('function');
    });

    it('returns correct loaders for C#', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.csharp),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('@wasm-fmt/clang-format');
      expect(typeof loaders['@wasm-fmt/clang-format']).toBe('function');
    });

    it('returns correct loaders for Go', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.go),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('@wasm-fmt/gofmt');
      expect(typeof loaders['@wasm-fmt/gofmt']).toBe('function');
    });

    it('returns correct loaders for Python', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.python),
      );

      const loaders = result.current;
      expect(loaders).toHaveProperty('@wasm-fmt/ruff_fmt');
      expect(typeof loaders['@wasm-fmt/ruff_fmt']).toBe('function');
    });
  });

  describe('memoization behavior', () => {
    it('returns the same object reference when language does not change', () => {
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

    it('returns different object reference when language changes', () => {
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

    it('returns the same object reference when re-rendering with undefined language', () => {
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

  describe('dynamic imports and error handling', () => {
    it('creates async loader functions for built-in modules', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.javascript),
      );

      const loaders = result.current;
      const prettierLoader = loaders['prettier/standalone'];
      const parserLoader = loaders['prettier/parser-babel'];

      expect(typeof prettierLoader).toBe('function');
      expect(typeof parserLoader).toBe('function');

      // Verify they return promises (async functions)
      expect(prettierLoader?.()).toBeInstanceOf(Promise);
      expect(parserLoader?.()).toBeInstanceOf(Promise);
    });

    it('creates async loader functions for external plugins', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.java),
      );

      const loaders = result.current;
      const javaLoader = loaders['prettier-plugin-java'];

      expect(typeof javaLoader).toBe('function');
      expect(javaLoader?.()).toBeInstanceOf(Promise);
    });

    it('creates async loader functions for WASM formatters', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.cpp),
      );

      const loaders = result.current;
      const clangFormatLoader = loaders['@wasm-fmt/clang-format'];

      expect(typeof clangFormatLoader).toBe('function');
      expect(clangFormatLoader?.()).toBeInstanceOf(Promise);
    });

    it('handles module loading attempts gracefully', async () => {
      // Test that optional modules fail gracefully without throwing
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.java),
      );

      const loaders = result.current;
      const javaLoader = loaders['prettier-plugin-java'];

      // This should not throw, even if the module doesn't exist
      let didThrow = false;

      try {
        await javaLoader?.();
      } catch {
        didThrow = true;
      }

      // For optional modules, we expect graceful handling (returning null)
      expect(didThrow).toBe(false);
    });
  });

  describe('loader function structure', () => {
    it('creates the correct loaders for JavaScript family', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.javascript),
      );

      const loaders = result.current;

      // Verify correct loaders are present
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-babel');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-babel']).toBe('function');
    });

    it('creates the correct loaders for TypeScript family', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.typescript),
      );

      const loaders = result.current;

      // Verify correct loaders are present
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier/parser-typescript');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier/parser-typescript']).toBe('function');
    });

    it('creates the correct loaders for external plugins', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.java),
      );

      const loaders = result.current;

      // Verify correct loaders are present
      expect(loaders).toHaveProperty('prettier/standalone');
      expect(loaders).toHaveProperty('prettier-plugin-java');
      expect(typeof loaders['prettier/standalone']).toBe('function');
      expect(typeof loaders['prettier-plugin-java']).toBe('function');
    });

    it('creates the correct loaders for WASM formatters', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.cpp),
      );

      const loaders = result.current;

      // Verify correct loaders are present
      expect(loaders).toHaveProperty('@wasm-fmt/clang-format');
      expect(typeof loaders['@wasm-fmt/clang-format']).toBe('function');
    });

    it('creates distinct loader functions for different modules', () => {
      const { result } = renderHook(() =>
        useFormattingModuleLoaders(LanguageName.javascript),
      );

      const loaders = result.current;
      const prettierLoader = loaders['prettier/standalone'];
      const babelLoader = loaders['prettier/parser-babel'];

      // Functions should be different instances
      expect(prettierLoader).not.toBe(babelLoader);

      // Both should return promises when called
      expect(prettierLoader?.()).toBeInstanceOf(Promise);
      expect(babelLoader?.()).toBeInstanceOf(Promise);
    });
  });

  describe('unsupported languages', () => {
    it('returns empty object for languages without formatters', () => {
      // Test with a language that's not handled by the formatter
      const { result } = renderHook(() =>
        useFormattingModuleLoaders('xml' as LanguageName),
      );

      expect(result.current).toEqual({});
    });
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
        expectedModules: ['prettier/standalone', 'prettier-plugin-java'],
      },
      {
        language: LanguageName.kotlin,
        expectedModules: ['prettier/standalone', 'prettier-plugin-kotlin'],
      },
      {
        language: LanguageName.php,
        expectedModules: ['prettier/standalone', '@prettier/plugin-php'],
      },
      {
        language: LanguageName.ruby,
        expectedModules: ['prettier/standalone', '@prettier/plugin-ruby'],
      },
      {
        language: LanguageName.rust,
        expectedModules: ['prettier/standalone', 'prettier-plugin-rust'],
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
});
