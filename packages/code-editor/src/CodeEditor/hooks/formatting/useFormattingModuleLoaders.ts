import { useMemo } from 'react';

import { LanguageName } from '../extensions/useLanguageExtension';
import { type CodeEditorModules } from '../moduleLoaders.types';
import { type LoadersMap } from '../useLazyModules';

// Define stable import functions outside the hook to prevent infinite re-renders
const importPrettierStandalone = () => import('prettier/standalone');
const importPrettierParserBabel = () => import('prettier/parser-babel');
const importPrettierParserTypescript = () =>
  import('prettier/parser-typescript');
const importPrettierParserPostcss = () => import('prettier/parser-postcss');
const importPrettierParserHtml = () => import('prettier/parser-html');
const importWasmClangFormat = () => import('@wasm-fmt/clang-format');
const importWasmGofmt = () => import('@wasm-fmt/gofmt');
const importWasmRuffFmt = () => import('@wasm-fmt/ruff_fmt');

/**
 * Hook that creates module loaders specifically for formatting functionality.
 * This hook is separate from useModuleLoaders to allow formatting modules
 * to be loaded on-demand when formatting is needed.
 *
 * Note: Kotlin, Ruby, Php, and Rust are not supported in browser environments
 * so they are not included in the loaders.
 *
 * @param language The language for which to load formatting modules
 * @returns A map of module names to their dynamic import functions
 */
export const useFormattingModuleLoaders = (language?: LanguageName) => {
  const loaders = useMemo(() => {
    const neededLoaders: Partial<LoadersMap<CodeEditorModules>> = {};

    if (!language) {
      return neededLoaders;
    }

    switch (language) {
      // Prettier with built-in parsers
      case LanguageName.javascript:
      case LanguageName.jsx:
      case LanguageName.json:
        neededLoaders['prettier/standalone'] = importPrettierStandalone;
        neededLoaders['prettier/parser-babel'] = importPrettierParserBabel;
        break;
      case LanguageName.typescript:
      case LanguageName.tsx:
        neededLoaders['prettier/standalone'] = importPrettierStandalone;
        neededLoaders['prettier/parser-typescript'] =
          importPrettierParserTypescript;
        break;
      case LanguageName.css:
        neededLoaders['prettier/standalone'] = importPrettierStandalone;
        neededLoaders['prettier/parser-postcss'] = importPrettierParserPostcss;
        break;
      case LanguageName.html:
        neededLoaders['prettier/standalone'] = importPrettierStandalone;
        neededLoaders['prettier/parser-html'] = importPrettierParserHtml;
        break;

      // WASM formatters
      case LanguageName.java:
      case LanguageName.cpp:
      case LanguageName.csharp:
        neededLoaders['@wasm-fmt/clang-format'] = importWasmClangFormat;
        break;
      case LanguageName.go:
        neededLoaders['@wasm-fmt/gofmt'] = importWasmGofmt;
        break;
      case LanguageName.python:
        neededLoaders['@wasm-fmt/ruff_fmt'] = importWasmRuffFmt;
        break;
    }

    return neededLoaders;
  }, [language]);

  return loaders;
};
