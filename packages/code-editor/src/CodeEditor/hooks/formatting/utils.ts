import { LanguageName } from '../extensions/useLanguageExtension';
import { CodeEditorModules } from '../moduleLoaders.types';

import { FormattingOptions } from './types';

/**
 * Creates base Prettier configuration with common settings
 */
export const createPrettierConfig = (
  parser: string,
  plugins: Array<any>,
  options: FormattingOptions = {},
  overrides: Record<string, any> = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
) => ({
  parser,
  plugins,
  tabWidth: editorTabWidth,
  useTabs: editorUseTabs,
  printWidth: options.printWidth ?? 80,
  ...options,
  ...overrides,
});

/**
 * Creates shared JavaScript/TypeScript configuration
 */
export const createJavaScriptConfig = (
  parser: string,
  plugins: Array<any>,
  options: FormattingOptions = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
) =>
  createPrettierConfig(
    parser,
    plugins,
    options,
    {
      semi: options.semi ?? true,
      singleQuote: options.singleQuote ?? true,
      trailingComma: options.trailingComma ?? 'es5',
      bracketSpacing: options.bracketSpacing ?? true,
      jsxBracketSameLine: options.jsxBracketSameLine ?? false,
      arrowParens: options.arrowParens ?? 'avoid',
    },
    editorTabWidth,
    editorUseTabs,
  );

/**
 * Creates base clang-format configuration for C++/Java/C# languages
 */
export const createClangFormatConfig = (
  basedOnStyle: string,
  options: FormattingOptions = {},
  overrides: Record<string, any> = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
) => `{
  BasedOnStyle: ${basedOnStyle},
  IndentWidth: ${editorTabWidth},
  UseTab: ${editorUseTabs ? 'Always' : 'Never'},
  ColumnLimit: ${options.printWidth ?? 100},
  AllowShortFunctionsOnASingleLine: None,
  AllowShortBlocksOnASingleLine: Never,
  AllowShortIfStatementsOnASingleLine: Never,
  AllowShortLoopsOnASingleLine: false,
  IndentCaseLabels: true,
  SpaceAfterCStyleCast: false,
  SpaceBeforeParens: Never,
  ${Object.entries(overrides)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',\n  ')}
}`;

export const areModulesLoaded = (
  language: LanguageName,
  modules: Partial<CodeEditorModules>,
) => {
  if (!language) {
    return false;
  }

  switch (language) {
    case LanguageName.kotlin:
    case LanguageName.php:
    case LanguageName.ruby:
    case LanguageName.rust:
      // External Prettier plugins are not supported in browser environments
      return false;

    case LanguageName.javascript:
    case LanguageName.jsx:
    case LanguageName.json:
      return !!(
        modules['prettier/standalone'] && modules['prettier/parser-babel']
      );
    case LanguageName.typescript:
    case LanguageName.tsx:
      return !!(
        modules['prettier/standalone'] && modules['prettier/parser-typescript']
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
