import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

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
 * Hook for managing language-specific syntax highlighting and features in the CodeMirror editor.
 *
 * This extension provides language support for various programming languages including
 * syntax highlighting, code completion, and language-specific features. It dynamically
 * loads and configures the appropriate language extension based on the specified language.
 *
 * Supported languages include: JavaScript, TypeScript, JSX, TSX, Python, Java, C++,
 * C#, CSS, HTML, JSON, Go, PHP, Ruby, Rust, and Kotlin.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the language setting
 * @param params.modules - Module dependencies (requires language-specific modules like @codemirror/lang-javascript, @codemirror/lang-python, etc.)
 * @returns A CodeMirror extension that provides language-specific features
 */
export function useLanguageExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      language: props.language,
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
