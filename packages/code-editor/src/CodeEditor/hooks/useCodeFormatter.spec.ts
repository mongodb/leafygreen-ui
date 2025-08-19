import { renderHook, waitFor } from '@testing-library/react';

import { LanguageName } from './extensions/useLanguageExtension';
import { type CodeEditorModules } from './moduleLoaders.types';
import { type FormattingOptions, useCodeFormatter } from './useCodeFormatter';

// Mock console methods to avoid test output noise
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useCodeFormatter', () => {
  // Mock Prettier modules
  const createMockPrettierStandalone = () => ({
    format: jest.fn((code: string, options?: any) => {
      return `formatted_${code}_${JSON.stringify(options)}`;
    }),
  });

  const createMockPrettierParser = (parserName: string) => ({
    parsers: { [parserName]: {} },
  });

  // Mock Prettier plugins
  const createMockPrettierPlugin = (pluginName: string) => ({
    default: {
      parsers: { [pluginName]: {} },
    },
  });

  // Mock WASM formatter modules
  const createMockWasmFormatter = (formatResult = 'wasm_formatted_code') => ({
    default: jest.fn().mockResolvedValue(undefined),
    format: jest.fn((code: string, filename?: string, style?: string) => {
      return `${formatResult}_${code}_${filename || 'default'}_${
        style || 'default'
      }`;
    }),
  });

  const createMockRuffFormatter = (formatResult = 'ruff_formatted_code') => ({
    default: jest.fn().mockResolvedValue(undefined),
    format: jest.fn((code: string, filename?: string, options?: any) => {
      return `${formatResult}_${code}_${filename || 'default'}_${JSON.stringify(
        options || {},
      )}`;
    }),
  });

  describe('formatCode function', () => {
    describe('JavaScript/JSX formatting', () => {
      it('formats JavaScript code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserBabel = createMockPrettierParser('babel');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-babel': parserBabel as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('const x = 1;');

        expect(prettierStandalone.format).toHaveBeenCalledWith('const x = 1;', {
          parser: 'babel',
          plugins: [parserBabel],
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          printWidth: 80,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: false,
          arrowParens: 'avoid',
        });
        expect(formatted).toContain('formatted_const x = 1;');
      });

      it('formats JSX code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserBabel = createMockPrettierParser('babel');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-babel': parserBabel as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.jsx },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('<div>Hello</div>');

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          '<div>Hello</div>',
          {
            parser: 'babel',
            plugins: [parserBabel],
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            useTabs: false,
            printWidth: 80,
            trailingComma: 'es5',
            bracketSpacing: true,
            jsxBracketSameLine: false,
            arrowParens: 'avoid',
          },
        );
        expect(formatted).toContain('formatted_<div>Hello</div>');
      });

      it('returns original code when Prettier modules are not available', async () => {
        const modules: Partial<CodeEditorModules> = {};

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('const x = 1;');

        expect(formatted).toBe('const x = 1;');
        expect(console.warn).toHaveBeenCalledWith(
          'Prettier modules not loaded for JavaScript/JSX formatting',
        );
      });
    });

    describe('TypeScript/TSX formatting', () => {
      it('formats TypeScript code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserTypescript = createMockPrettierParser('typescript');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-typescript': parserTypescript as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.typescript },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          'const x: number = 1;',
        );

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          'const x: number = 1;',
          {
            parser: 'typescript',
            plugins: [parserTypescript],
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            useTabs: false,
            printWidth: 80,
            trailingComma: 'es5',
            bracketSpacing: true,
            arrowParens: 'avoid',
          },
        );
        expect(formatted).toContain('formatted_const x: number = 1;');
      });

      it('formats TSX code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserTypescript = createMockPrettierParser('typescript');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-typescript': parserTypescript as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.tsx },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('<div>Hello</div>');

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          '<div>Hello</div>',
          {
            parser: 'typescript',
            plugins: [parserTypescript],
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            useTabs: false,
            printWidth: 80,
            trailingComma: 'es5',
            bracketSpacing: true,
            arrowParens: 'avoid',
          },
        );
        expect(formatted).toContain('formatted_<div>Hello</div>');
      });
    });

    describe('JSON formatting', () => {
      it('formats JSON code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserBabel = createMockPrettierParser('json');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-babel': parserBabel as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.json },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('{"name":"test"}');

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          '{"name":"test"}',
          {
            parser: 'json',
            plugins: [parserBabel],
            tabWidth: 2,
            useTabs: false,
          },
        );
        expect(formatted).toContain('formatted_{"name":"test"}');
      });
    });

    describe('CSS formatting', () => {
      it('formats CSS code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserPostcss = createMockPrettierParser('css');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-postcss': parserPostcss as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.css },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('body{color:red}');

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          'body{color:red}',
          {
            parser: 'css',
            plugins: [parserPostcss],
            tabWidth: 2,
            useTabs: false,
            printWidth: 80,
          },
        );
        expect(formatted).toContain('formatted_body{color:red}');
      });
    });

    describe('HTML formatting', () => {
      it('formats HTML code with Prettier', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserHtml = createMockPrettierParser('html');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-html': parserHtml as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.html },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          '<div><p>Hello</p></div>',
        );

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          '<div><p>Hello</p></div>',
          {
            parser: 'html',
            plugins: [parserHtml],
            tabWidth: 2,
            useTabs: false,
            printWidth: 80,
          },
        );
        expect(formatted).toContain('formatted_<div><p>Hello</p></div>');
      });
    });

    describe('Java formatting', () => {
      it('formats Java code with Prettier plugin', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const javaPlugin = createMockPrettierPlugin('java');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier-plugin-java': javaPlugin as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.java },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          'public class Test {}',
        );

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          'public class Test {}',
          {
            parser: 'java',
            plugins: [javaPlugin],
            tabWidth: 4,
            useTabs: false,
            printWidth: 100,
          },
        );
        expect(formatted).toContain('formatted_public class Test {}');
      });
    });

    describe('Kotlin formatting', () => {
      it('formats Kotlin code with Prettier plugin', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const kotlinPlugin = createMockPrettierPlugin('kotlin');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier-plugin-kotlin': kotlinPlugin as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.kotlin },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('class Test');

        expect(prettierStandalone.format).toHaveBeenCalledWith('class Test', {
          parser: 'kotlin',
          plugins: [kotlinPlugin.default],
          tabWidth: 4,
          useTabs: false,
          printWidth: 100,
        });
        expect(formatted).toContain('formatted_class Test');
      });
    });

    describe('PHP formatting', () => {
      it('formats PHP code with Prettier plugin', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const phpPlugin = createMockPrettierPlugin('php');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          '@prettier/plugin-php': phpPlugin as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.php },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          '<?php echo "Hello"; ?>',
        );

        expect(prettierStandalone.format).toHaveBeenCalledWith(
          '<?php echo "Hello"; ?>',
          {
            parser: 'php',
            plugins: [phpPlugin.default],
            tabWidth: 4,
            useTabs: false,
            printWidth: 80,
          },
        );
        expect(formatted).toContain('formatted_<?php echo "Hello"; ?>');
      });
    });

    describe('Ruby formatting', () => {
      it('formats Ruby code with Prettier plugin', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const rubyPlugin = createMockPrettierPlugin('ruby');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          '@prettier/plugin-ruby': rubyPlugin as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.ruby },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('puts "Hello"');

        expect(prettierStandalone.format).toHaveBeenCalledWith('puts "Hello"', {
          parser: 'ruby',
          plugins: [rubyPlugin.default],
          tabWidth: 2,
          useTabs: false,
          printWidth: 80,
        });
        expect(formatted).toContain('formatted_puts "Hello"');
      });
    });

    describe('Rust formatting', () => {
      it('formats Rust code with Prettier plugin', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const rustPlugin = createMockPrettierPlugin('rust');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier-plugin-rust': rustPlugin as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.rust },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('fn main() {}');

        expect(prettierStandalone.format).toHaveBeenCalledWith('fn main() {}', {
          parser: 'rust',
          plugins: [rustPlugin.default],
          tabWidth: 4,
          useTabs: false,
          printWidth: 100,
        });
        expect(formatted).toContain('formatted_fn main() {}');
      });
    });

    describe('C++ formatting', () => {
      it('formats C++ code with clang-format WASM', async () => {
        const clangFormat = createMockWasmFormatter('clang_formatted');

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/clang-format': clangFormat as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.cpp },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          '#include <iostream>',
        );

        expect(clangFormat.default).toHaveBeenCalled();
        expect(clangFormat.format).toHaveBeenCalledWith(
          '#include <iostream>',
          'main.cpp',
          '{BasedOnStyle: LLVM, IndentWidth: 2, UseTab: Never, ColumnLimit: 100}',
        );
        expect(formatted).toContain('clang_formatted');
      });
    });

    describe('C# formatting', () => {
      it('formats C# code with clang-format WASM', async () => {
        const clangFormat = createMockWasmFormatter('clang_formatted');

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/clang-format': clangFormat as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.csharp },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('using System;');

        expect(clangFormat.default).toHaveBeenCalled();
        expect(clangFormat.format).toHaveBeenCalledWith(
          'using System;',
          'main.cs',
          '{BasedOnStyle: LLVM, IndentWidth: 2, UseTab: Never, ColumnLimit: 100}',
        );
        expect(formatted).toContain('clang_formatted');
      });
    });

    describe('Go formatting', () => {
      it('formats Go code with gofmt WASM', async () => {
        const gofmt = createMockWasmFormatter('go_formatted');

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/gofmt': gofmt as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.go },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('package main');

        expect(gofmt.default).toHaveBeenCalled();
        expect(gofmt.format).toHaveBeenCalledWith('package main');
        expect(formatted).toContain('go_formatted');
      });
    });

    describe('Python formatting', () => {
      it('formats Python code with ruff WASM', async () => {
        const ruffFmt = createMockRuffFormatter('ruff_formatted');

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/ruff_fmt': ruffFmt as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.python },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('print("hello")');

        expect(ruffFmt.default).toHaveBeenCalled();
        expect(ruffFmt.format).toHaveBeenCalledWith(
          'print("hello")',
          'main.py',
          {
            indent_width: 4,
            line_width: 88,
          },
        );
        expect(formatted).toContain('ruff_formatted');
      });
    });

    describe('Custom formatting options', () => {
      it('applies custom formatting options for JavaScript', async () => {
        const prettierStandalone = createMockPrettierStandalone();
        const parserBabel = createMockPrettierParser('babel');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-babel': parserBabel as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules,
          }),
        );

        const customOptions: FormattingOptions = {
          semi: false,
          singleQuote: false,
          tabWidth: 4,
          useTabs: true,
          printWidth: 120,
          trailingComma: 'all',
          bracketSpacing: false,
          jsxBracketSameLine: true,
          arrowParens: 'always',
        };

        await result.current.formatCode('const x = 1;', customOptions);

        expect(prettierStandalone.format).toHaveBeenCalledWith('const x = 1;', {
          parser: 'babel',
          plugins: [parserBabel],
          ...customOptions,
        });
      });

      it('applies custom formatting options for WASM formatters', async () => {
        const clangFormat = createMockWasmFormatter();

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/clang-format': clangFormat as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.cpp },
            modules,
          }),
        );

        const customOptions: FormattingOptions = {
          tabWidth: 8,
          useTabs: true,
          printWidth: 120,
        };

        await result.current.formatCode('#include <iostream>', customOptions);

        expect(clangFormat.format).toHaveBeenCalledWith(
          '#include <iostream>',
          'main.cpp',
          '{BasedOnStyle: LLVM, IndentWidth: 8, UseTab: Always, ColumnLimit: 120}',
        );
      });

      it('applies custom formatting options for Python/Ruff', async () => {
        const ruffFmt = createMockRuffFormatter();

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/ruff_fmt': ruffFmt as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.python },
            modules,
          }),
        );

        const customOptions: FormattingOptions = {
          tabWidth: 2,
          printWidth: 100,
        };

        await result.current.formatCode('print("hello")', customOptions);

        expect(ruffFmt.format).toHaveBeenCalledWith(
          'print("hello")',
          'main.py',
          {
            indent_width: 2,
            line_width: 100,
          },
        );
      });
    });

    describe('Edge cases', () => {
      it('returns original code when no language is provided', async () => {
        const { result } = renderHook(() =>
          useCodeFormatter({
            props: {},
            modules: {},
          }),
        );

        const formatted = await result.current.formatCode('const x = 1;');
        expect(formatted).toBe('const x = 1;');
      });

      it('returns original code when code is empty', async () => {
        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules: {},
          }),
        );

        const formatted = await result.current.formatCode('');
        expect(formatted).toBe('');
      });

      it('returns original code when code is only whitespace', async () => {
        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules: {},
          }),
        );

        const formatted = await result.current.formatCode('   \n  \t  ');
        expect(formatted).toBe('   \n  \t  ');
      });

      it('returns original code for unsupported language', async () => {
        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: 'unsupported' as LanguageName },
            modules: {},
          }),
        );

        const formatted = await result.current.formatCode('some code');
        expect(formatted).toBe('some code');
        expect(console.warn).toHaveBeenCalledWith(
          'No formatter available for language: unsupported',
        );
      });

      it('handles formatting errors gracefully', async () => {
        const prettierStandalone = {
          format: jest.fn(() => {
            throw new Error('Formatting error');
          }),
        };
        const parserBabel = createMockPrettierParser('babel');

        const modules: Partial<CodeEditorModules> = {
          'prettier/standalone': prettierStandalone as any,
          'prettier/parser-babel': parserBabel as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules,
          }),
        );

        const formatted = await result.current.formatCode('const x = 1;');

        expect(formatted).toBe('const x = 1;');
        expect(console.error).toHaveBeenCalledWith(
          'Error formatting javascript code:',
          expect.any(Error),
        );
      });

      it('handles WASM initialization errors gracefully', async () => {
        const clangFormat = {
          default: jest.fn().mockRejectedValue(new Error('WASM init error')),
          format: jest.fn(),
        };

        const modules: Partial<CodeEditorModules> = {
          '@wasm-fmt/clang-format': clangFormat as any,
        };

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language: LanguageName.cpp },
            modules,
          }),
        );

        const formatted = await result.current.formatCode(
          '#include <iostream>',
        );

        expect(formatted).toBe('#include <iostream>');
        expect(console.error).toHaveBeenCalledWith(
          'Error formatting cpp code:',
          expect.any(Error),
        );
      });
    });
  });

  describe('isFormattingAvailable', () => {
    it('returns false when no language is provided', async () => {
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: {},
          modules: {},
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(false);
      });
    });

    it('returns true when JavaScript modules are available', async () => {
      const modules: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        'prettier/parser-babel': createMockPrettierParser('babel') as any,
      };

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules,
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(true);
      });
    });

    it('returns false when JavaScript modules are missing', async () => {
      const modules: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        // Missing parser-babel
      };

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules,
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(false);
      });
    });

    it('returns true when TypeScript modules are available', async () => {
      const modules: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        'prettier/parser-typescript': createMockPrettierParser(
          'typescript',
        ) as any,
      };

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.typescript },
          modules,
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(true);
      });
    });

    it('returns true when WASM formatter modules are available', async () => {
      const modules: Partial<CodeEditorModules> = {
        '@wasm-fmt/clang-format': createMockWasmFormatter() as any,
      };

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.cpp },
          modules,
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(true);
      });
    });

    it('updates availability when modules change', async () => {
      const { result, rerender } = renderHook(
        ({ modules }: { modules: Partial<CodeEditorModules> }) =>
          useCodeFormatter({
            props: { language: LanguageName.javascript },
            modules,
          }),
        {
          initialProps: { modules: {} as Partial<CodeEditorModules> },
        },
      );

      // Initially false
      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(false);
      });

      // Add modules
      const modulesWithFormatters: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        'prettier/parser-babel': createMockPrettierParser('babel') as any,
      };

      rerender({ modules: modulesWithFormatters });

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(true);
      });
    });

    it('updates availability when language changes', async () => {
      const modules: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        'prettier/parser-babel': createMockPrettierParser('babel') as any,
      };

      const { result, rerender } = renderHook(
        ({ language }: { language: LanguageName | undefined }) =>
          useCodeFormatter({
            props: { language },
            modules,
          }),
        {
          initialProps: { language: LanguageName.javascript as LanguageName },
        },
      );

      // Initially true for JavaScript
      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(true);
      });

      // Change to TypeScript (missing modules)
      rerender({ language: LanguageName.typescript });

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(false);
      });
    });

    it('returns false for unsupported languages', async () => {
      const modules: Partial<CodeEditorModules> = {
        'prettier/standalone': createMockPrettierStandalone() as any,
        'prettier/parser-babel': createMockPrettierParser('babel') as any,
      };

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: 'unsupported' as LanguageName },
          modules,
        }),
      );

      await waitFor(() => {
        expect(result.current.isFormattingAvailable).toBe(false);
      });
    });

    // Test availability for each supported language
    const languageModuleMappings = [
      {
        languages: [LanguageName.jsx, LanguageName.json],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier/parser-babel': createMockPrettierParser('babel') as any,
        },
      },
      {
        languages: [LanguageName.tsx],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier/parser-typescript': createMockPrettierParser(
            'typescript',
          ) as any,
        },
      },
      {
        languages: [LanguageName.css],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier/parser-postcss': createMockPrettierParser('css') as any,
        },
      },
      {
        languages: [LanguageName.html],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier/parser-html': createMockPrettierParser('html') as any,
        },
      },
      {
        languages: [LanguageName.java],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier-plugin-java': createMockPrettierPlugin('java') as any,
        },
      },
      {
        languages: [LanguageName.kotlin],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier-plugin-kotlin': createMockPrettierPlugin('kotlin') as any,
        },
      },
      {
        languages: [LanguageName.php],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          '@prettier/plugin-php': createMockPrettierPlugin('php') as any,
        },
      },
      {
        languages: [LanguageName.ruby],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          '@prettier/plugin-ruby': createMockPrettierPlugin('ruby') as any,
        },
      },
      {
        languages: [LanguageName.rust],
        modules: {
          'prettier/standalone': createMockPrettierStandalone() as any,
          'prettier-plugin-rust': createMockPrettierPlugin('rust') as any,
        },
      },
      {
        languages: [LanguageName.csharp],
        modules: {
          '@wasm-fmt/clang-format': createMockWasmFormatter() as any,
        },
      },
      {
        languages: [LanguageName.go],
        modules: {
          '@wasm-fmt/gofmt': createMockWasmFormatter() as any,
        },
      },
      {
        languages: [LanguageName.python],
        modules: {
          '@wasm-fmt/ruff_fmt': createMockRuffFormatter() as any,
        },
      },
    ];

    languageModuleMappings.forEach(({ languages, modules }) => {
      languages.forEach(language => {
        it(`returns true when ${language} modules are available`, async () => {
          const { result } = renderHook(() =>
            useCodeFormatter({
              props: { language },
              modules,
            }),
          );

          await waitFor(() => {
            expect(result.current.isFormattingAvailable).toBe(true);
          });
        });
      });
    });
  });
});
