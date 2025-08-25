import { LanguageName } from '../extensions/useLanguageExtension';
import { CodeEditorModules } from '../moduleLoaders.types';

/**
 * Creates base Prettier configuration with common settings
 */
/**
 * Prettier parser plugin types - these are the actual modules we import
 */
export const createPrettierConfig = (
  parser: string,
  plugins: Array<unknown>, // Prettier plugins have complex interfaces, allowing any plugin type
  overrides: Record<string, string | number | boolean | unknown> = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
) => ({
  parser,
  plugins,
  tabWidth: editorTabWidth,
  useTabs: editorUseTabs,
  printWidth: 80, // Opinionated default
  ...overrides,
});

/**
 * Creates shared JavaScript/TypeScript configuration
 */
export const createJavaScriptConfig = (
  parser: string,
  plugins: Array<unknown>,
  editorTabWidth: number,
  editorUseTabs: boolean,
) =>
  createPrettierConfig(
    parser,
    plugins,
    {
      // Opinionated JavaScript/TypeScript formatting defaults
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: false,
      arrowParens: 'avoid',
    },
    editorTabWidth,
    editorUseTabs,
  );

/**
 * Creates base clang-format configuration for C++/Java/C# languages
 */
export const createClangFormatConfig = (
  basedOnStyle: string,
  overrides: Record<string, string | number | boolean | unknown> = {},
  editorTabWidth: number,
  editorUseTabs: boolean,
) => `{
  BasedOnStyle: ${basedOnStyle},
  IndentWidth: ${editorTabWidth},
  UseTab: ${editorUseTabs ? 'Always' : 'Never'},
  ColumnLimit: 100,
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
