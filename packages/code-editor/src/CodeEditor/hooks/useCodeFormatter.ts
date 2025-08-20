import { useEffect, useState } from 'react';

import { type CodeEditorProps } from '../CodeEditor.types';

import { LanguageName } from './extensions/useLanguageExtension';
import { CodeEditorModules } from './moduleLoaders.types';

/**
 * Interface defining formatting options for different formatters
 */
export interface FormattingOptions {
  // Prettier options
  semi?: boolean;
  singleQuote?: boolean;
  tabWidth?: number;
  useTabs?: boolean;
  printWidth?: number;
  trailingComma?: 'none' | 'es5' | 'all';
  bracketSpacing?: boolean;
  jsxBracketSameLine?: boolean;
  arrowParens?: 'avoid' | 'always';
  // WASM formatter options can be added here as needed
}

/**
 * Hook for creating a code formatting utility that can format code based on the selected language.
 *
 * This hook provides language-specific code formatting capabilities using lazy-loaded
 * formatting modules. It supports both Prettier-based formatters and WASM-based formatters.
 *
 * @param params - Configuration object
 * @param params.props - Partial CodeEditor props containing language setting
 * @param params.modules - Module dependencies containing formatting modules
 * @returns Object containing the format function and availability check
 */
export function useCodeFormatter({
  props,
  modules,
}: {
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  const [isFormattingAvailable, setIsFormattingReady] = useState(false);

  /**
   * Formats code using the appropriate formatter based on the selected language.
   *
   * @param code - The code string to format
   * @param options - Optional formatting options
   * @returns Promise resolving to formatted code, or original code if formatting fails/unavailable
   */
  const formatCode = async (
    code: string,
    options: FormattingOptions = {},
  ): Promise<string> => {
    const { language } = props;

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

          return prettier.format(code, {
            parser: 'babel',
            plugins: [parserBabel],
            semi: options.semi ?? true,
            singleQuote: options.singleQuote ?? true,
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            trailingComma: options.trailingComma ?? 'es5',
            bracketSpacing: options.bracketSpacing ?? true,
            jsxBracketSameLine: options.jsxBracketSameLine ?? false,
            arrowParens: options.arrowParens ?? 'avoid',
            ...options,
          });
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

          return prettier.format(code, {
            parser: 'typescript',
            plugins: [parserTypescript],
            semi: options.semi ?? true,
            singleQuote: options.singleQuote ?? true,
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            trailingComma: options.trailingComma ?? 'es5',
            bracketSpacing: options.bracketSpacing ?? true,
            arrowParens: options.arrowParens ?? 'avoid',
            ...options,
          });
        }

        case LanguageName.json: {
          const prettier = modules['prettier/standalone'];
          const parserBabel = modules['prettier/parser-babel'];

          if (!prettier || !parserBabel) {
            console.warn('Prettier modules not loaded for JSON formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'json',
            plugins: [parserBabel],
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 40, // Force multi-line formatting for JSON
            ...options,
          });
        }

        case LanguageName.css: {
          const prettier = modules['prettier/standalone'];
          const parserPostcss = modules['prettier/parser-postcss'];

          if (!prettier || !parserPostcss) {
            console.warn('Prettier modules not loaded for CSS formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'css',
            plugins: [parserPostcss],
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            ...options,
          });
        }

        case LanguageName.html: {
          const prettier = modules['prettier/standalone'];
          const parserHtml = modules['prettier/parser-html'];

          if (!prettier || !parserHtml) {
            console.warn('Prettier modules not loaded for HTML formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'html',
            plugins: [parserHtml],
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            ...options,
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
              ? `{
                BasedOnStyle: Google,
                IndentWidth: ${options.tabWidth ?? 4},
                UseTab: ${options.useTabs ? 'Always' : 'Never'},
                ColumnLimit: ${options.printWidth ?? 100},
                AllowShortFunctionsOnASingleLine: None,
                AllowShortBlocksOnASingleLine: Never,
                AllowShortIfStatementsOnASingleLine: Never,
                AllowShortLoopsOnASingleLine: false,
                BreakBeforeBraces: Attach,
                IndentCaseLabels: true,
                SpaceAfterCStyleCast: false,
                SpaceBeforeParens: Never
              }`
              : language === LanguageName.cpp
              ? `{
                BasedOnStyle: LLVM,
                IndentWidth: ${options.tabWidth ?? 2},
                UseTab: ${options.useTabs ? 'Always' : 'Never'},
                ColumnLimit: ${options.printWidth ?? 100},
                AllowShortFunctionsOnASingleLine: None,
                AllowShortBlocksOnASingleLine: Never,
                AllowShortIfStatementsOnASingleLine: Never,
                AllowShortLoopsOnASingleLine: false,
                BreakBeforeBraces: Attach,
                IndentCaseLabels: true,
                SpaceAfterCStyleCast: false,
                SpaceBeforeParens: Never,
                NamespaceIndentation: None
              }`
              : `{
                BasedOnStyle: Microsoft,
                IndentWidth: ${options.tabWidth ?? 4},
                UseTab: ${options.useTabs ? 'Always' : 'Never'},
                ColumnLimit: ${options.printWidth ?? 100},
                AllowShortFunctionsOnASingleLine: None,
                AllowShortBlocksOnASingleLine: Never,
                AllowShortIfStatementsOnASingleLine: Never,
                AllowShortLoopsOnASingleLine: false,
                BreakBeforeBraces: Allman,
                IndentCaseLabels: true,
                SpaceAfterCStyleCast: false,
                SpaceBeforeParens: Never
              }`;

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
            indent_width: options.tabWidth ?? 4,
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

  useEffect(() => {
    let isReady = false;

    const { language } = props;

    if (!language) {
      isReady = false;
    }

    switch (language) {
      case LanguageName.javascript:
      case LanguageName.jsx:
      case LanguageName.json:
        isReady = !!(
          modules['prettier/standalone'] && modules['prettier/parser-babel']
        );
        break;

      case LanguageName.typescript:
      case LanguageName.tsx:
        isReady = !!(
          modules['prettier/standalone'] &&
          modules['prettier/parser-typescript']
        );
        break;

      case LanguageName.css:
        isReady = !!(
          modules['prettier/standalone'] && modules['prettier/parser-postcss']
        );
        break;

      case LanguageName.html:
        isReady = !!(
          modules['prettier/standalone'] && modules['prettier/parser-html']
        );
        break;

      case LanguageName.java:
      case LanguageName.cpp:
      case LanguageName.csharp:
        isReady = !!modules['@wasm-fmt/clang-format'];
        break;

      case LanguageName.kotlin:
      case LanguageName.php:
      case LanguageName.ruby:
      case LanguageName.rust:
        // External Prettier plugins are not supported in browser environments
        isReady = false;
        break;

      case LanguageName.go:
        isReady = !!modules['@wasm-fmt/gofmt'];
        break;

      case LanguageName.python:
        isReady = !!modules['@wasm-fmt/ruff_fmt'];
        break;

      default:
        isReady = false;
        break;
    }

    setIsFormattingReady(isReady);
  }, [modules, props]);

  return {
    formatCode,
    isFormattingAvailable,
  };
}
