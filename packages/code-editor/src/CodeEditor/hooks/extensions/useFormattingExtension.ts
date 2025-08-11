import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { LanguageName } from './useLanguageExtension';

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
 * Hook for creating a formatting utility that can format code based on the selected language.
 *
 * This hook doesn't return a CodeMirror extension, but rather a formatting function
 * that can be used to format code content. It uses lazy-loaded formatting modules
 * to provide language-specific formatting capabilities.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance (unused but kept for API consistency)
 * @param params.props - Partial CodeEditor props containing language setting
 * @param params.modules - Module dependencies containing formatting modules
 * @returns Object containing the format function and loading state
 */
export function useFormattingExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
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

        // Prettier with external plugins
        case LanguageName.java: {
          const prettier = modules['prettier/standalone'];
          const javaPlugin = modules['prettier-plugin-java'];

          if (!prettier || !javaPlugin) {
            console.warn('Prettier modules not loaded for Java formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'java',
            plugins: [javaPlugin],
            tabWidth: options.tabWidth ?? 4,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 100,
            ...options,
          });
        }

        case LanguageName.kotlin: {
          const prettier = modules['prettier/standalone'];
          const kotlinPlugin = modules['prettier-plugin-kotlin'];

          if (!prettier || !kotlinPlugin) {
            console.warn('Prettier modules not loaded for Kotlin formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'kotlin',
            plugins: [kotlinPlugin],
            tabWidth: options.tabWidth ?? 4,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 100,
            ...options,
          });
        }

        case LanguageName.php: {
          const prettier = modules['prettier/standalone'];
          const phpPlugin = modules['@prettier/plugin-php'];

          if (!prettier || !phpPlugin) {
            console.warn('Prettier modules not loaded for PHP formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'php',
            plugins: [phpPlugin],
            tabWidth: options.tabWidth ?? 4,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            ...options,
          });
        }

        case LanguageName.ruby: {
          const prettier = modules['prettier/standalone'];
          const rubyPlugin = modules['@prettier/plugin-ruby'];

          if (!prettier || !rubyPlugin) {
            console.warn('Prettier modules not loaded for Ruby formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'ruby',
            plugins: [rubyPlugin],
            tabWidth: options.tabWidth ?? 2,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 80,
            ...options,
          });
        }

        case LanguageName.rust: {
          const prettier = modules['prettier/standalone'];
          const rustPlugin = modules['prettier-plugin-rust'];

          if (!prettier || !rustPlugin) {
            console.warn('Prettier modules not loaded for Rust formatting');
            return code;
          }

          return prettier.format(code, {
            parser: 'rust',
            plugins: [rustPlugin],
            tabWidth: options.tabWidth ?? 4,
            useTabs: options.useTabs ?? false,
            printWidth: options.printWidth ?? 100,
            ...options,
          });
        }

        // WASM formatters
        case LanguageName.cpp:
        case LanguageName.csharp: {
          const clangFormat = modules['@wasm-fmt/clang-format'];

          if (!clangFormat) {
            console.warn(
              'Clang-format module not loaded for C++/C# formatting',
            );
            return code;
          }

          // Initialize the WASM module if needed
          await clangFormat.init();

          return clangFormat.format(code, {
            // Default clang-format options
            IndentWidth: options.tabWidth ?? 2,
            UseTab: options.useTabs ? 'Always' : 'Never',
            ColumnLimit: options.printWidth ?? 100,
          });
        }

        case LanguageName.go: {
          const gofmt = modules['@wasm-fmt/gofmt'];

          if (!gofmt) {
            console.warn('Gofmt module not loaded for Go formatting');
            return code;
          }

          // Initialize the WASM module if needed
          await gofmt.init();

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
          await ruffFmt.init();

          return ruffFmt.format(code, {
            indent_width: options.tabWidth ?? 4,
            line_length: options.printWidth ?? 88,
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

  /**
   * Checks if formatting is available for the current language
   */
  const isFormattingAvailable = (): boolean => {
    const { language } = props;

    if (!language) {
      return false;
    }

    switch (language) {
      case LanguageName.javascript:
      case LanguageName.jsx:
      case LanguageName.json:
        return !!(
          modules['prettier/standalone'] && modules['prettier/parser-babel']
        );

      case LanguageName.typescript:
      case LanguageName.tsx:
        return !!(
          modules['prettier/standalone'] &&
          modules['prettier/parser-typescript']
        );

      case LanguageName.css:
        return !!(
          modules['prettier/standalone'] && modules['prettier/parser-postcss']
        );

      case LanguageName.html:
        return !!(
          modules['prettier/standalone'] && modules['prettier/parser-html']
        );

      case LanguageName.java:
        return !!(
          modules['prettier/standalone'] && modules['prettier-plugin-java']
        );

      case LanguageName.kotlin:
        return !!(
          modules['prettier/standalone'] && modules['prettier-plugin-kotlin']
        );

      case LanguageName.php:
        return !!(
          modules['prettier/standalone'] && modules['@prettier/plugin-php']
        );

      case LanguageName.ruby:
        return !!(
          modules['prettier/standalone'] && modules['@prettier/plugin-ruby']
        );

      case LanguageName.rust:
        return !!(
          modules['prettier/standalone'] && modules['prettier-plugin-rust']
        );

      case LanguageName.cpp:
      case LanguageName.csharp:
        return !!modules['@wasm-fmt/clang-format'];

      case LanguageName.go:
        return !!modules['@wasm-fmt/gofmt'];

      case LanguageName.python:
        return !!modules['@wasm-fmt/ruff_fmt'];

      default:
        return false;
    }
  };

  return {
    formatCode,
    isFormattingAvailable,
  };
}
