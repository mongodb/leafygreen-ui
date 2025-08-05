import { useMemo } from 'react';

import { type CodeEditorProps } from '../CodeEditor.types';

import { LanguageName } from './extensions/useLanguageExtension';
import { type LoadersMap } from './useLazyModules';

/**
 * Interface representing all the module dependencies that might be dynamically imported
 * by the CodeEditor component. This comprehensive mapping enables the lazy loading
 * system to properly type and load the required modules based on editor configuration.
 *
 * Each property represents a module that can be dynamically imported, with its type
 * corresponding to the result of importing that module.
 */
export interface CodeEditorModules {
  '@uiw/codemirror-extensions-hyper-link': typeof import('@uiw/codemirror-extensions-hyper-link');
  '@codemirror/language': typeof import('@codemirror/language');
  '@codemirror/lint': typeof import('@codemirror/lint');
  '@codemirror/lang-cpp': typeof import('@codemirror/lang-cpp');
  '@replit/codemirror-lang-csharp': typeof import('@replit/codemirror-lang-csharp');
  '@codemirror/lang-css': typeof import('@codemirror/lang-css');
  '@codemirror/lang-go': typeof import('@codemirror/lang-go');
  '@codemirror/lang-html': typeof import('@codemirror/lang-html');
  '@codemirror/lang-java': typeof import('@codemirror/lang-java');
  '@codemirror/lang-javascript': typeof import('@codemirror/lang-javascript');
  '@codemirror/lang-json': typeof import('@codemirror/lang-json');
  '@codemirror/legacy-modes/mode/clike': typeof import('@codemirror/legacy-modes/mode/clike');
  '@codemirror/lang-php': typeof import('@codemirror/lang-php');
  '@codemirror/lang-python': typeof import('@codemirror/lang-python');
  '@codemirror/legacy-modes/mode/ruby': typeof import('@codemirror/legacy-modes/mode/ruby');
  '@codemirror/lang-rust': typeof import('@codemirror/lang-rust');
  '@lezer/highlight': typeof import('@lezer/highlight');
  codemirror: typeof import('codemirror');
  '@codemirror/view': typeof import('@codemirror/view');
  '@codemirror/state': typeof import('@codemirror/state');
  '@codemirror/commands': typeof import('@codemirror/commands');
  '@codemirror/autocomplete': typeof import('@codemirror/autocomplete');
}

/**
 * Hook that determines which module dependencies need to be dynamically loaded
 * based on the current editor configuration.
 *
 * This hook analyzes the provided editor props to construct a map of module loaders
 * that will only import the modules necessary for the current editor features.
 * This approach optimizes bundle size by avoiding loading unnecessary modules.
 *
 * @param {object} params Configuration options derived from CodeEditorProps
 * @param {boolean} [params.enableClickableUrls] Whether clickable URLs are enabled
 * @param {boolean} [params.enableCodeFolding] Whether code folding is enabled
 * @param {boolean} [params.forceParsing] Whether to force complete document parsing
 * @param {string} [params.indentUnit] The type of indentation unit ('spaces' or 'tabs')
 * @param {Array} [params.tooltips] Array of tooltip configurations
 * @param {string} [params.language] The language for syntax highlighting and autocompletion
 * @returns {Partial<LoadersMap<CodeEditorModules>>} A map of module names to their dynamic import functions
 */
export const useModuleLoaders = ({
  enableClickableUrls,
  enableCodeFolding,
  forceParsing,
  indentUnit,
  tooltips,
  language,
}: CodeEditorProps) => {
  const loaders = useMemo(() => {
    /**
     * Start with core modules that are always required by the editor
     * regardless of feature configuration. These modules provide the
     * fundamental editor functionality.
     */
    const neededLoaders: Partial<LoadersMap<CodeEditorModules>> = {
      codemirror: () => import('codemirror'),
      '@codemirror/view': () => import('@codemirror/view'),
      '@codemirror/state': () => import('@codemirror/state'),
      '@codemirror/commands': () => import('@codemirror/commands'),
    };

    if (enableClickableUrls) {
      neededLoaders['@uiw/codemirror-extensions-hyper-link'] = () =>
        import('@uiw/codemirror-extensions-hyper-link');
    }

    if (language || enableCodeFolding || forceParsing || !!indentUnit) {
      neededLoaders['@codemirror/language'] = () =>
        import('@codemirror/language');
    }

    if (tooltips && tooltips.length > 0) {
      neededLoaders['@codemirror/lint'] = () => import('@codemirror/lint');
    }

    if (language) {
      neededLoaders['@lezer/highlight'] = () => import('@lezer/highlight');
      neededLoaders['@codemirror/autocomplete'] = () =>
        import('@codemirror/autocomplete');

      /**
       * Load language-specific modules based on the selected language.
       * Each case imports only the modules needed for that particular language.
       */
      switch (language) {
        case LanguageName.cpp:
          neededLoaders['@codemirror/lang-cpp'] = () =>
            import('@codemirror/lang-cpp');
          break;
        case LanguageName.csharp:
          neededLoaders['@replit/codemirror-lang-csharp'] = () =>
            import('@replit/codemirror-lang-csharp');
          break;
        case LanguageName.css:
          neededLoaders['@codemirror/lang-css'] = () =>
            import('@codemirror/lang-css');
          break;
        case LanguageName.go:
          neededLoaders['@codemirror/lang-go'] = () =>
            import('@codemirror/lang-go');
          break;
        case LanguageName.html:
          neededLoaders['@codemirror/lang-html'] = () =>
            import('@codemirror/lang-html');
          break;
        case LanguageName.java:
          neededLoaders['@codemirror/lang-java'] = () =>
            import('@codemirror/lang-java');
          break;
        case LanguageName.javascript:
        case LanguageName.jsx:
        case LanguageName.typescript:
        case LanguageName.tsx:
          neededLoaders['@codemirror/lang-javascript'] = () =>
            import('@codemirror/lang-javascript');
          break;
        case LanguageName.json:
          neededLoaders['@codemirror/lang-json'] = () =>
            import('@codemirror/lang-json');
          break;
        case LanguageName.kotlin:
          neededLoaders['@codemirror/language'] = () =>
            import('@codemirror/language');
          neededLoaders['@codemirror/legacy-modes/mode/clike'] = () =>
            import('@codemirror/legacy-modes/mode/clike');
          break;
        case LanguageName.php:
          neededLoaders['@codemirror/lang-php'] = () =>
            import('@codemirror/lang-php');
          break;
        case LanguageName.python:
          neededLoaders['@codemirror/lang-python'] = () =>
            import('@codemirror/lang-python');
          break;
        case LanguageName.ruby:
          neededLoaders['@codemirror/language'] = () =>
            import('@codemirror/language');
          neededLoaders['@codemirror/legacy-modes/mode/ruby'] = () =>
            import('@codemirror/legacy-modes/mode/ruby');
          break;
        case LanguageName.rust:
          neededLoaders['@codemirror/lang-rust'] = () =>
            import('@codemirror/lang-rust');
          break;
      }
    }

    return neededLoaders;
  }, [
    enableClickableUrls,
    enableCodeFolding,
    forceParsing,
    indentUnit,
    tooltips,
    language,
  ]);

  return loaders;
};
