import { useMemo } from 'react';

import { LanguageName } from './extensions/useLanguageExtension';
import { CodeEditorModules } from './moduleLoaders.types';
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

      // Prettier with external plugins
      case LanguageName.java:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier-plugin-java'] = async () => {
          try {
            const moduleName = 'prettier-plugin-java';
            return await import(moduleName);
          } catch {
            console.warn('prettier-plugin-java is not installed');
            return null;
          }
        };
        break;
      case LanguageName.kotlin:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier-plugin-kotlin'] = async () => {
          try {
            const moduleName = 'prettier-plugin-kotlin';
            return await import(moduleName);
          } catch {
            console.warn('prettier-plugin-kotlin is not installed');
            return null;
          }
        };
        break;
      case LanguageName.php:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['@prettier/plugin-php'] = async () => {
          try {
            const moduleName = '@prettier/plugin-php';
            return await import(moduleName);
          } catch {
            console.warn('@prettier/plugin-php is not installed');
            return null;
          }
        };
        break;
      case LanguageName.ruby:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['@prettier/plugin-ruby'] = async () => {
          try {
            const moduleName = '@prettier/plugin-ruby';
            return await import(moduleName);
          } catch {
            console.warn('@prettier/plugin-ruby is not installed');
            return null;
          }
        };
        break;
      case LanguageName.rust:
        neededLoaders['prettier/standalone'] = () =>
          import('prettier/standalone');
        neededLoaders['prettier-plugin-rust'] = async () => {
          try {
            const moduleName = 'prettier-plugin-rust';
            return await import(moduleName);
          } catch {
            console.warn('prettier-plugin-rust is not installed');
            return null;
          }
        };
        break;

      // WASM formatters
      case LanguageName.cpp:
      case LanguageName.csharp:
        neededLoaders['@wasm-fmt/clang-format'] = async () => {
          try {
            const moduleName = '@wasm-fmt/clang-format';
            return await import(moduleName);
          } catch {
            console.warn('@wasm-fmt/clang-format is not installed');
            return null;
          }
        };
        break;
      case LanguageName.go:
        neededLoaders['@wasm-fmt/gofmt'] = async () => {
          try {
            const moduleName = '@wasm-fmt/gofmt';
            return await import(moduleName);
          } catch {
            console.warn('@wasm-fmt/gofmt is not installed');
            return null;
          }
        };
        break;
      case LanguageName.python:
        neededLoaders['@wasm-fmt/ruff_fmt'] = async () => {
          try {
            const moduleName = '@wasm-fmt/ruff_fmt';
            return await import(moduleName);
          } catch {
            console.warn('@wasm-fmt/ruff_fmt is not installed');
            return null;
          }
        };
        break;
    }

    return neededLoaders;
  }, [language]);

  return loaders;
};
