import { LanguageName } from '../extensions/useLanguageExtension';
import { CodeEditorModules } from '../moduleLoaders.types';

import {
  createClangFormatConfig,
  createJavaScriptConfig,
  createPrettierConfig,
} from './utils';

/**
 * Prettier configuration object with improved type safety
 * Uses unknown instead of any for better type checking while maintaining flexibility
 */
interface PrettierConfig {
  parser: string;
  plugins: Array<unknown>; // Prettier plugins have complex interfaces, allowing any plugin type
  semi?: boolean;
  singleQuote?: boolean;
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  trailingComma?: 'none' | 'es5' | 'all';
  bracketSpacing?: boolean;
  jsxBracketSameLine?: boolean;
  arrowParens?: 'avoid' | 'always';
  // Prettier supports many additional options, keeping minimal index signature
  [key: string]: unknown;
}

/**
 * Ruff formatter options for Python formatting
 */
interface RuffFormatOptions {
  indent_width: number;
  line_width: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * WASM formatter interface with common format method
 * Uses overloaded format method to support different formatter signatures
 */
interface WasmFormatter {
  format(code: string): string;
  format(code: string, filename: string): string;
  format(
    code: string,
    filename: string,
    options: string | RuffFormatOptions,
  ): string;
  default?: () => Promise<void>;
}

/**
 * Helper function to format code using Prettier
 */
const formatWithPrettier = ({
  code,
  parserModuleName,
  config,
  modules,
  warningMessage,
}: {
  code: string;
  parserModuleName: keyof CodeEditorModules;
  config: PrettierConfig;
  modules: Partial<CodeEditorModules>;
  warningMessage: string;
}): string => {
  const prettier = modules['prettier/standalone'];
  const parser = modules[parserModuleName];

  if (!prettier || !parser) {
    console.warn(warningMessage);
    return code;
  }

  return prettier.format(code, config as any); // Prettier config has complex internal types
};

/**
 * Helper function to format code using WASM formatters
 */
const formatWithWasm = async <T extends ReadonlyArray<unknown>>({
  code,
  wasmModuleName,
  modules,
  warningMessage,
  formatFn,
  formatArgs,
}: {
  code: string;
  wasmModuleName: keyof CodeEditorModules;
  modules: Partial<CodeEditorModules>;
  warningMessage: string;
  formatFn: (formatter: WasmFormatter, code: string, ...args: T) => string;
  formatArgs: T;
}): Promise<string> => {
  const formatter = modules[wasmModuleName] as WasmFormatter | undefined;

  if (!formatter) {
    console.warn(warningMessage);
    return code;
  }

  // Initialize the WASM module if needed
  if (typeof formatter.default === 'function') {
    await formatter.default();
  }

  return formatFn(formatter, code, ...formatArgs);
};

/**
 * Formats code using the appropriate formatter based on the selected language.
 * Uses opinionated formatting settings for consistency.
 *
 * @param params - Object containing formatting parameters
 * @param params.code - The code string to format
 * @param params.language - The programming language of the code
 * @param params.editorTabWidth - Tab width from editor configuration
 * @param params.editorUseTabs - Whether to use tabs from editor configuration
 * @param params.modules - Module dependencies containing formatting modules
 * @returns Promise resolving to formatted code, or original code if formatting fails/unavailable
 */
export const formatCode = async ({
  code,
  language,
  editorTabWidth,
  editorUseTabs,
  modules,
}: {
  code: string;
  language: LanguageName | undefined;
  editorTabWidth: number;
  editorUseTabs: boolean;
  modules: Partial<CodeEditorModules>;
}): Promise<string> => {
  if (!language || !code.trim()) {
    return code;
  }

  try {
    switch (language) {
      // Prettier with built-in parsers
      case LanguageName.javascript:
      case LanguageName.jsx: {
        const parserBabel = modules['prettier/parser-babel'];
        return formatWithPrettier({
          code,
          parserModuleName: 'prettier/parser-babel',
          config: createJavaScriptConfig({
            parser: 'babel',
            plugins: [parserBabel],
            editorTabWidth,
            editorUseTabs,
          }),
          modules,
          warningMessage:
            'Prettier modules not loaded for JavaScript/JSX formatting',
        });
      }

      case LanguageName.typescript:
      case LanguageName.tsx: {
        const parserTypescript = modules['prettier/parser-typescript'];
        return formatWithPrettier({
          code,
          parserModuleName: 'prettier/parser-typescript',
          config: createJavaScriptConfig({
            parser: 'typescript',
            plugins: [parserTypescript],
            editorTabWidth,
            editorUseTabs,
          }),
          modules,
          warningMessage:
            'Prettier modules not loaded for TypeScript/TSX formatting',
        });
      }

      case LanguageName.json: {
        const parserBabel = modules['prettier/parser-babel'];
        return formatWithPrettier({
          code,
          parserModuleName: 'prettier/parser-babel',
          config: createPrettierConfig({
            parser: 'json',
            plugins: [parserBabel],
            overrides: {
              printWidth: 40, // Force multi-line formatting for JSON
            },
            editorTabWidth,
            editorUseTabs,
          }),
          modules,
          warningMessage: 'Prettier modules not loaded for JSON formatting',
        });
      }

      case LanguageName.css: {
        const parserPostcss = modules['prettier/parser-postcss'];
        return formatWithPrettier({
          code,
          parserModuleName: 'prettier/parser-postcss',
          config: createPrettierConfig({
            parser: 'css',
            plugins: [parserPostcss],
            overrides: {}, // No special overrides for CSS
            editorTabWidth,
            editorUseTabs,
          }),
          modules,
          warningMessage: 'Prettier modules not loaded for CSS formatting',
        });
      }

      case LanguageName.html: {
        const parserHtml = modules['prettier/parser-html'];
        return formatWithPrettier({
          code,
          parserModuleName: 'prettier/parser-html',
          config: createPrettierConfig({
            parser: 'html',
            plugins: [parserHtml],
            overrides: {}, // No special overrides for HTML
            editorTabWidth,
            editorUseTabs,
          }),
          modules,
          warningMessage: 'Prettier modules not loaded for HTML formatting',
        });
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
            ? createClangFormatConfig({
                basedOnStyle: 'Google',
                overrides: {
                  BreakBeforeBraces: 'Attach',
                },
                editorTabWidth,
                editorUseTabs,
              })
            : language === LanguageName.cpp
            ? createClangFormatConfig({
                basedOnStyle: 'LLVM',
                overrides: {
                  BreakBeforeBraces: 'Attach',
                  NamespaceIndentation: 'None',
                },
                editorTabWidth,
                editorUseTabs,
              })
            : createClangFormatConfig({
                basedOnStyle: 'Microsoft',
                overrides: {
                  BreakBeforeBraces: 'Allman',
                },
                editorTabWidth,
                editorUseTabs,
              });

        return formatWithWasm({
          code,
          wasmModuleName: '@wasm-fmt/clang-format',
          modules,
          warningMessage: `Clang-format module not loaded for ${language} formatting`,
          formatFn: (formatter, code, filename, style) =>
            formatter.format(code, filename, style),
          formatArgs: [filename, style],
        });
      }

      case LanguageName.go: {
        return formatWithWasm({
          code,
          wasmModuleName: '@wasm-fmt/gofmt',
          modules,
          warningMessage: 'Gofmt module not loaded for Go formatting',
          formatFn: (formatter, code) => formatter.format(code),
          formatArgs: [],
        });
      }

      case LanguageName.python: {
        return formatWithWasm({
          code,
          wasmModuleName: '@wasm-fmt/ruff_fmt',
          modules,
          warningMessage:
            'Ruff formatter module not loaded for Python formatting',
          formatFn: (
            formatter: WasmFormatter,
            code: string,
            filename: string,
            options: RuffFormatOptions,
          ) => formatter.format(code, filename, options),
          formatArgs: [
            'main.py',
            {
              indent_width: editorTabWidth,
              line_width: 88, // Opinionated default for Python
              // Add other ruff formatting options as needed
            },
          ],
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
