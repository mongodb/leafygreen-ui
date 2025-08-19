import { useMemo } from 'react';

import { LanguageName } from './extensions/useLanguageExtension';
import { type CodeEditorModules } from './moduleLoaders.types';
import { type LoadersMap } from './useLazyModules';

/**
 * Hook that creates module loaders specifically for formatting functionality.
 * This hook is separate from useModuleLoaders to allow formatting modules
 * to be loaded on-demand when formatting is needed.
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

    // Check if we're in a Node.js environment (server-side)
    // const isNodeEnvironment = typeof window === 'undefined';

    switch (language) {
      // Prettier with built-in parsers
      case LanguageName.javascript:
      case LanguageName.jsx:
      case LanguageName.json:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier/parser-babel'] = () =>
          import('prettier/parser-babel');
        break;
      case LanguageName.typescript:
      case LanguageName.tsx:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier/parser-typescript'] = () =>
          import('prettier/parser-typescript');
        break;
      case LanguageName.css:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier/parser-postcss'] = () =>
          import('prettier/parser-postcss');
        break;
      case LanguageName.html:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier/parser-html'] = () =>
          import('prettier/parser-html');
        break;

      // Prettier with external plugins - disabled due to browser compatibility issues
      // (Java is now supported via WASM clang-format instead)
      // case LanguageName.kotlin:
      //   neededLoaders['prettier/standalone'] = () =>
      //     import('prettier/standalone');
      //   // Only load Node.js-specific plugins in Node.js environment
      //   if (isNodeEnvironment) {
      //     neededLoaders['prettier-plugin-kotlin'] = () =>
      //       import('prettier-plugin-kotlin');
      //   }
      //   break;
      // case LanguageName.php:
      //   neededLoaders['prettier/standalone'] = () =>
      //     import('prettier/standalone');
      //   neededLoaders['@prettier/plugin-php'] = () =>
      //     import('@prettier/plugin-php/standalone');
      //   break;
      // case LanguageName.ruby:
      //   neededLoaders['prettier/standalone'] = () =>
      //     import('prettier/standalone');
      //   // Only load Node.js-specific plugins in Node.js environment
      //   if (isNodeEnvironment) {
      //     neededLoaders['@prettier/plugin-ruby'] = () =>
      //       import('@prettier/plugin-ruby');
      //   }
      //   break;
      // case LanguageName.rust:
      //   neededLoaders['prettier/standalone'] = () =>
      //     import('prettier/standalone');
      //   neededLoaders['prettier-plugin-rust'] = () =>
      //     import('prettier-plugin-rust');
      //   break;

      // WASM formatters
      case LanguageName.java:
      case LanguageName.cpp:
      case LanguageName.csharp:
        neededLoaders['@wasm-fmt/clang-format'] = () =>
          import('@wasm-fmt/clang-format');
        break;
      case LanguageName.go:
        neededLoaders['@wasm-fmt/gofmt'] = () => import('@wasm-fmt/gofmt');
        break;
      case LanguageName.python:
        neededLoaders['@wasm-fmt/ruff_fmt'] = () =>
          import('@wasm-fmt/ruff_fmt');
        break;
    }

    return neededLoaders;
  }, [language]);

  return loaders;
};
