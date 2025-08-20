import { LanguageName } from '../extensions/useLanguageExtension';
import { CodeEditorModules } from '../moduleLoaders.types';

import { FormattingOptions } from './types';
import {
  createClangFormatConfig,
  createJavaScriptConfig,
  createPrettierConfig,
} from './utils';

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
        const prettier = modules['prettier/standalone'];
        const parserBabel = modules['prettier/parser-babel'];

        if (!prettier || !parserBabel) {
          console.warn(
            'Prettier modules not loaded for JavaScript/JSX formatting',
          );
          return code;
        }

        return prettier.format(
          code,
          createJavaScriptConfig(
            'babel',
            [parserBabel],
            options,
            editorTabWidth,
            editorUseTabs,
          ),
        );
      }

      case LanguageName.typescript:
      case LanguageName.tsx: {
        const prettier = modules['prettier/standalone'];
        const parserTypescript = modules['prettier/parser-typescript'];

        if (!prettier || !parserTypescript) {
          console.warn(
            'Prettier modules not loaded for TypeScript/TSX formatting',
          );
          return code;
        }

        return prettier.format(
          code,
          createJavaScriptConfig(
            'typescript',
            [parserTypescript],
            options,
            editorTabWidth,
            editorUseTabs,
          ),
        );
      }

      case LanguageName.json: {
        const prettier = modules['prettier/standalone'];
        const parserBabel = modules['prettier/parser-babel'];

        if (!prettier || !parserBabel) {
          console.warn('Prettier modules not loaded for JSON formatting');
          return code;
        }

        return prettier.format(
          code,
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
        );
      }

      case LanguageName.css: {
        const prettier = modules['prettier/standalone'];
        const parserPostcss = modules['prettier/parser-postcss'];

        if (!prettier || !parserPostcss) {
          console.warn('Prettier modules not loaded for CSS formatting');
          return code;
        }

        return prettier.format(
          code,
          createPrettierConfig(
            'css',
            [parserPostcss],
            options,
            {},
            editorTabWidth,
            editorUseTabs,
          ),
        );
      }

      case LanguageName.html: {
        const prettier = modules['prettier/standalone'];
        const parserHtml = modules['prettier/parser-html'];

        if (!prettier || !parserHtml) {
          console.warn('Prettier modules not loaded for HTML formatting');
          return code;
        }

        return prettier.format(
          code,
          createPrettierConfig(
            'html',
            [parserHtml],
            options,
            {},
            editorTabWidth,
            editorUseTabs,
          ),
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
        const clangFormat = modules['@wasm-fmt/clang-format'];

        if (!clangFormat) {
          console.warn(
            `Clang-format module not loaded for ${language} formatting`,
          );
          return code;
        }

        // Initialize the WASM module if needed
        await clangFormat.default();

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

        return clangFormat.format(code, filename, style);
      }

      case LanguageName.go: {
        const gofmt = modules['@wasm-fmt/gofmt'];

        if (!gofmt) {
          console.warn('Gofmt module not loaded for Go formatting');
          return code;
        }

        // Initialize the WASM module if needed
        await gofmt.default();

        return gofmt.format(code);
      }

      case LanguageName.python: {
        const ruffFmt = modules['@wasm-fmt/ruff_fmt'];

        if (!ruffFmt) {
          console.warn(
            'Ruff formatter module not loaded for Python formatting',
          );
          return code;
        }

        // Initialize the WASM module if needed
        await ruffFmt.default();

        return ruffFmt.format(code, 'main.py', {
          indent_width: editorTabWidth,
          line_width: options.printWidth ?? 88,
          // Add other ruff formatting options as needed
        });
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
