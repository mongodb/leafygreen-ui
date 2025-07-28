import { type EditorView } from '@codemirror/view';

import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

/**
 * Constant object defining supported language names for the CodeMirror editor.
 */
export const LanguageName = {
  cpp: 'cpp',
  csharp: 'csharp',
  css: 'css',
  go: 'go',
  html: 'html',
  java: 'java',
  javascript: 'javascript',
  jsx: 'jsx',
  json: 'json',
  kotlin: 'kotlin',
  php: 'php',
  python: 'python',
  ruby: 'ruby',
  rust: 'rust',
  typescript: 'typescript',
  tsx: 'tsx',
} as const;
export type LanguageName = (typeof LanguageName)[keyof typeof LanguageName];

/**
 * Hook that provides language support for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for language-specific features
 * such as syntax highlighting, auto-completion, and code folding.
 *
 * @param params Configuration object for the language extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.language Language identifier from the LanguageName constants (marked optional for lazy loading, but required for functionality)
 * @param params.modules CodeMirror modules with language packages (e.g., `@codemirror/lang-javascript`, `@codemirror/lang-python`) needed for language support (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that enables language-specific features
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
 */
export function useLanguageExtension({
  editorView,
  stateModule,
  language,
  modules,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  language?: LanguageName;
  modules?: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      language,
      modules,
    },
    factory: ({ language, modules }) => {
      if (!language || !modules) {
        return [];
      }

      switch (language) {
        case LanguageName.cpp:
          return modules['@codemirror/lang-cpp']
            ? modules['@codemirror/lang-cpp'].cpp()
            : [];
        case LanguageName.csharp:
          return modules['@replit/codemirror-lang-csharp']
            ? modules['@replit/codemirror-lang-csharp'].csharp()
            : [];
        case LanguageName.css:
          return modules['@codemirror/lang-css']
            ? modules['@codemirror/lang-css'].css()
            : [];
        case LanguageName.go:
          return modules['@codemirror/lang-go']
            ? modules['@codemirror/lang-go'].go()
            : [];
        case LanguageName.html:
          return modules['@codemirror/lang-html']
            ? modules['@codemirror/lang-html'].html()
            : [];
        case LanguageName.java:
          return modules['@codemirror/lang-java']
            ? modules['@codemirror/lang-java'].java()
            : [];
        case LanguageName.javascript:
          return modules['@codemirror/lang-javascript']
            ? modules['@codemirror/lang-javascript'].javascript({
                jsx: false,
                typescript: false,
              })
            : [];
        case LanguageName.jsx:
          return modules['@codemirror/lang-javascript']
            ? modules['@codemirror/lang-javascript'].javascript({
                jsx: true,
                typescript: false,
              })
            : [];
        case LanguageName.json:
          return modules['@codemirror/lang-json']
            ? modules['@codemirror/lang-json'].json()
            : [];
        case LanguageName.kotlin:
          if (
            !modules['@codemirror/language'] ||
            !modules['@codemirror/legacy-modes/mode/clike']
          ) {
            return [];
          }

          return modules['@codemirror/language'].StreamLanguage.define(
            modules['@codemirror/legacy-modes/mode/clike'].kotlin,
          );
        case LanguageName.php:
          return modules['@codemirror/lang-php']
            ? modules['@codemirror/lang-php'].php()
            : [];
        case LanguageName.python:
          return modules['@codemirror/lang-python']
            ? modules['@codemirror/lang-python'].python()
            : [];
        case LanguageName.ruby:
          if (
            !modules['@codemirror/language'] ||
            !modules['@codemirror/legacy-modes/mode/ruby']
          ) {
            return [];
          }

          return modules['@codemirror/language'].StreamLanguage.define(
            modules['@codemirror/legacy-modes/mode/ruby'].ruby,
          );

        case LanguageName.rust:
          return modules['@codemirror/lang-rust']
            ? modules['@codemirror/lang-rust'].rust()
            : [];
        case LanguageName.typescript:
          return modules['@codemirror/lang-javascript']
            ? modules['@codemirror/lang-javascript'].javascript({
                jsx: false,
                typescript: true,
              })
            : [];
        case LanguageName.tsx:
          return modules['@codemirror/lang-javascript']
            ? modules['@codemirror/lang-javascript'].javascript({
                jsx: true,
                typescript: true,
              })
            : [];
        default:
          return [];
      }
    },
  });
}
