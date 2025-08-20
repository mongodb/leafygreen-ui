import { LanguageName } from '../extensions/useLanguageExtension';
import { CodeEditorModules } from '../moduleLoaders.types';

import { FormattingOptions } from './types';
import {
  createClangFormatConfig,
  createJavaScriptConfig,
  createPrettierConfig,
} from './utils';

/**
 * Helper function to format code using Prettier
 */
const formatWithPrettier = (
  code: string,
  parserModuleName: keyof CodeEditorModules,
  config: any,
  modules: Partial<CodeEditorModules>,
  warningMessage: string,
): string => {
  const prettier = modules['prettier/standalone'];
  const parser = modules[parserModuleName];

  if (!prettier || !parser) {
    console.warn(warningMessage);
    return code;
  }

  return prettier.format(code, config);
};

/**
 * Helper function to format code using WASM formatters
 */
const formatWithWasm = async <T extends Array<any>>(
  code: string,
  wasmModuleName: keyof CodeEditorModules,
  modules: Partial<CodeEditorModules>,
  warningMessage: string,
  formatFn: (formatter: any, code: string, ...args: T) => string,
  ...formatArgs: T
): Promise<string> => {
  const formatter = modules[wasmModuleName];

  if (!formatter) {
    console.warn(warningMessage);
    return code;
  }

  // Initialize the WASM module if needed
  if (typeof (formatter as any).default === 'function') {
    await (formatter as any).default();
  }

  return formatFn(formatter, code, ...formatArgs);
};

/**
 * Formats code using the appropriate formatter based on the selected language.
 *
 * @param code - The code string to format
 * @param language - The programming language of the code
 * @param options - Optional formatting options
 * @param editorTabWidth - Tab width from editor configuration
 * @param editorUseTabs - Whether to use tabs from editor configuration
 * @param modules - Module dependencies containing formatting modules
 * @returns Promise resolving to formatted code, or original code if formatting fails/unavailable
 */
export const formatCode = async (
  code: string,
  language: LanguageName | undefined,
  options: FormattingOptions = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
  modules: Partial<CodeEditorModules>,
): Promise<string> => {
  if (!language || !code.trim()) {
    return code;
  }

  try {
    switch (language) {
      // Prettier with built-in parsers
      case LanguageName.javascript:
      case LanguageName.jsx: {
        const parserBabel = modules['prettier/parser-babel'];
        return formatWithPrettier(
          code,
          'prettier/parser-babel',
          createJavaScriptConfig(
            'babel',
            [parserBabel],
            options,
            editorTabWidth,
            editorUseTabs,
          ),
          modules,
          'Prettier modules not loaded for JavaScript/JSX formatting',
        );
      }

      case LanguageName.typescript:
      case LanguageName.tsx: {
        const parserTypescript = modules['prettier/parser-typescript'];
        return formatWithPrettier(
          code,
          'prettier/parser-typescript',
          createJavaScriptConfig(
            'typescript',
            [parserTypescript],
            options,
            editorTabWidth,
            editorUseTabs,
          ),
          modules,
          'Prettier modules not loaded for TypeScript/TSX formatting',
        );
      }

      case LanguageName.json: {
        const parserBabel = modules['prettier/parser-babel'];
        return formatWithPrettier(
          code,
          'prettier/parser-babel',
          createPrettierConfig(
            'json',
            [parserBabel],
            options,
            {
              printWidth: options.printWidth ?? 40, // Force multi-line formatting for JSON
            },
            editorTabWidth,
            editorUseTabs,
          ),
          modules,
          'Prettier modules not loaded for JSON formatting',
        );
      }

      case LanguageName.css: {
        const parserPostcss = modules['prettier/parser-postcss'];
        return formatWithPrettier(
          code,
          'prettier/parser-postcss',
          createPrettierConfig(
            'css',
            [parserPostcss],
            options,
            {},
            editorTabWidth,
            editorUseTabs,
          ),
          modules,
          'Prettier modules not loaded for CSS formatting',
        );
      }

      case LanguageName.html: {
        const parserHtml = modules['prettier/parser-html'];
        return formatWithPrettier(
          code,
          'prettier/parser-html',
          createPrettierConfig(
            'html',
            [parserHtml],
            options,
            {},
            editorTabWidth,
            editorUseTabs,
          ),
          modules,
          'Prettier modules not loaded for HTML formatting',
        );
      }

      // External Prettier plugins - disabled due to browser compatibility issues
      case LanguageName.kotlin:
      case LanguageName.php:
      case LanguageName.ruby:
      case LanguageName.rust: {
        console.warn(
          `${language} code formatting is not supported in browser environments. ` +
            'External Prettier plugins have compatibility issues with browser/standalone bundles. ' +
            'Consider using server-side formatting for these languages.',
        );
        return code;
      }

      // WASM formatters
      case LanguageName.java:
      case LanguageName.cpp:
      case LanguageName.csharp: {
        const filename =
          language === LanguageName.java
            ? 'Main.java'
            : language === LanguageName.cpp
            ? 'main.cpp'
            : 'main.cs';

        const style =
          language === LanguageName.java
            ? createClangFormatConfig(
                'Google',
                options,
                {
                  BreakBeforeBraces: 'Attach',
                },
                editorTabWidth,
                editorUseTabs,
              )
            : language === LanguageName.cpp
            ? createClangFormatConfig(
                'LLVM',
                options,
                {
                  BreakBeforeBraces: 'Attach',
                  NamespaceIndentation: 'None',
                },
                editorTabWidth,
                editorUseTabs,
              )
            : createClangFormatConfig(
                'Microsoft',
                options,
                {
                  BreakBeforeBraces: 'Allman',
                },
                editorTabWidth,
                editorUseTabs,
              );

        return formatWithWasm(
          code,
          '@wasm-fmt/clang-format',
          modules,
          `Clang-format module not loaded for ${language} formatting`,
          (formatter, code, filename, style) =>
            formatter.format(code, filename, style),
          filename,
          style,
        );
      }

      case LanguageName.go: {
        return formatWithWasm(
          code,
          '@wasm-fmt/gofmt',
          modules,
          'Gofmt module not loaded for Go formatting',
          (formatter, code) => formatter.format(code),
        );
      }

      case LanguageName.python: {
        return formatWithWasm(
          code,
          '@wasm-fmt/ruff_fmt',
          modules,
          'Ruff formatter module not loaded for Python formatting',
          (formatter, code, filename, options) =>
            formatter.format(code, filename, options),
          'main.py',
          {
            indent_width: editorTabWidth,
            line_width: options.printWidth ?? 88,
            // Add other ruff formatting options as needed
          },
        );
      }

      default:
        console.warn(`No formatter available for language: ${language}`);
        return code;
    }
  } catch (error) {
    console.error(`Error formatting ${language} code:`, error);
    return code; // Return original code if formatting fails
  }
};
