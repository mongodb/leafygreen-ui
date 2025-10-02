import { useMemo } from 'react';

import { type CodeEditorProps } from '../CodeEditor.types';

import { LanguageName } from './extensions/useLanguageExtension';
import { type CodeEditorModules } from './moduleLoaders.types';
import { type LoadersMap } from './useLazyModules';

// Define stable import functions outside the hook to prevent infinite re-renders
const importCodeMirror = () => import('codemirror');
const importCodeMirrorView = () => import('@codemirror/view');
const importCodeMirrorState = () => import('@codemirror/state');
const importCodeMirrorCommands = () => import('@codemirror/commands');
const importCodeMirrorLanguage = () => import('@codemirror/language');
const importCodeMirrorLint = () => import('@codemirror/lint');
const importLezerHighlight = () => import('@lezer/highlight');
const importCodeMirrorAutocomplete = () => import('@codemirror/autocomplete');
const importCodeMirrorSearch = () => import('@codemirror/search');
const importHyperLink = () => import('@uiw/codemirror-extensions-hyper-link');

// Language-specific imports
const importLangCpp = () => import('@codemirror/lang-cpp');
const importLangCSharp = () => import('@replit/codemirror-lang-csharp');
const importLangCss = () => import('@codemirror/lang-css');
const importLangGo = () => import('@codemirror/lang-go');
const importLangHtml = () => import('@codemirror/lang-html');
const importLangJava = () => import('@codemirror/lang-java');
const importLangJavaScript = () => import('@codemirror/lang-javascript');
const importLangJson = () => import('@codemirror/lang-json');
const importLegacyModeClike = () =>
  import('@codemirror/legacy-modes/mode/clike');
const importLangPhp = () => import('@codemirror/lang-php');
const importLangPython = () => import('@codemirror/lang-python');
const importLegacyModeRuby = () => import('@codemirror/legacy-modes/mode/ruby');
const importLangRust = () => import('@codemirror/lang-rust');

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
  enableSearchPanel,
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
      codemirror: importCodeMirror,
      '@codemirror/view': importCodeMirrorView,
      '@codemirror/state': importCodeMirrorState,
      '@codemirror/commands': importCodeMirrorCommands,
    };

    if (enableSearchPanel) {
      neededLoaders['@codemirror/search'] = importCodeMirrorSearch;
    }

    if (enableClickableUrls) {
      neededLoaders['@uiw/codemirror-extensions-hyper-link'] = importHyperLink;
    }

    if (language || enableCodeFolding || forceParsing || !!indentUnit) {
      neededLoaders['@codemirror/language'] = importCodeMirrorLanguage;
    }

    if (tooltips && tooltips.length > 0) {
      neededLoaders['@codemirror/lint'] = importCodeMirrorLint;
    }

    if (language) {
      neededLoaders['@lezer/highlight'] = importLezerHighlight;
      neededLoaders['@codemirror/autocomplete'] = importCodeMirrorAutocomplete;

      /**
       * Load language-specific modules based on the selected language.
       * Each case imports only the modules needed for that particular language.
       */
      switch (language) {
        case LanguageName.cpp:
          neededLoaders['@codemirror/lang-cpp'] = importLangCpp;
          break;
        case LanguageName.csharp:
          neededLoaders['@replit/codemirror-lang-csharp'] = importLangCSharp;
          break;
        case LanguageName.css:
          neededLoaders['@codemirror/lang-css'] = importLangCss;
          break;
        case LanguageName.go:
          neededLoaders['@codemirror/lang-go'] = importLangGo;
          break;
        case LanguageName.html:
          neededLoaders['@codemirror/lang-html'] = importLangHtml;
          break;
        case LanguageName.java:
          neededLoaders['@codemirror/lang-java'] = importLangJava;
          break;
        case LanguageName.javascript:
        case LanguageName.jsx:
        case LanguageName.typescript:
        case LanguageName.tsx:
          neededLoaders['@codemirror/lang-javascript'] = importLangJavaScript;
          break;
        case LanguageName.json:
          neededLoaders['@codemirror/lang-json'] = importLangJson;
          break;
        case LanguageName.kotlin:
          neededLoaders['@codemirror/language'] = importCodeMirrorLanguage;
          neededLoaders['@codemirror/legacy-modes/mode/clike'] =
            importLegacyModeClike;
          break;
        case LanguageName.php:
          neededLoaders['@codemirror/lang-php'] = importLangPhp;
          break;
        case LanguageName.python:
          neededLoaders['@codemirror/lang-python'] = importLangPython;
          break;
        case LanguageName.ruby:
          neededLoaders['@codemirror/language'] = importCodeMirrorLanguage;
          neededLoaders['@codemirror/legacy-modes/mode/ruby'] =
            importLegacyModeRuby;
          break;
        case LanguageName.rust:
          neededLoaders['@codemirror/lang-rust'] = importLangRust;
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
