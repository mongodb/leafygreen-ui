import { type CodeEditorModules } from '../util/useModuleLoaders';

const codeMirrorLanguageExtensions = {
  cpp: (modules: CodeEditorModules) => {
    const { cpp } = modules[
      '@codemirror/lang-cpp'
    ] as typeof import('@codemirror/lang-cpp');
    return cpp();
  },
  csharp: (modules: CodeEditorModules) => {
    const { csharp } = modules[
      '@replit/codemirror-lang-csharp'
    ] as typeof import('@replit/codemirror-lang-csharp');
    return csharp();
  },
  css: (modules: CodeEditorModules) => {
    const { css } = modules[
      '@codemirror/lang-css'
    ] as typeof import('@codemirror/lang-css');
    return css();
  },
  go: (modules: CodeEditorModules) => {
    const { go } = modules[
      '@codemirror/lang-go'
    ] as typeof import('@codemirror/lang-go');
    return go();
  },
  html: (modules: CodeEditorModules) => {
    const { html } = modules[
      '@codemirror/lang-html'
    ] as typeof import('@codemirror/lang-html');
    return html();
  },
  java: (modules: CodeEditorModules) => {
    const { java } = modules[
      '@codemirror/lang-java'
    ] as typeof import('@codemirror/lang-java');
    return java();
  },
  javascript: (modules: CodeEditorModules) => {
    const { javascript } = modules[
      '@codemirror/lang-javascript'
    ] as typeof import('@codemirror/lang-javascript');
    return javascript({ jsx: false, typescript: false });
  },
  jsx: (modules: CodeEditorModules) => {
    const { javascript } = modules[
      '@codemirror/lang-javascript'
    ] as typeof import('@codemirror/lang-javascript');
    return javascript({ jsx: true, typescript: false });
  },
  json: (modules: CodeEditorModules) => {
    const { json } = modules[
      '@codemirror/lang-json'
    ] as typeof import('@codemirror/lang-json');
    return json();
  },
  kotlin: (modules: CodeEditorModules) => {
    const { StreamLanguage } = modules[
      '@codemirror/language'
    ] as typeof import('@codemirror/language');
    const { kotlin } = modules[
      '@codemirror/legacy-modes/mode/clike'
    ] as typeof import('@codemirror/legacy-modes/mode/clike');
    return StreamLanguage.define(kotlin);
  },
  php: (modules: CodeEditorModules) => {
    const { php } = modules[
      '@codemirror/lang-php'
    ] as typeof import('@codemirror/lang-php');
    return php();
  },
  python: (modules: CodeEditorModules) => {
    const { python } = modules[
      '@codemirror/lang-python'
    ] as typeof import('@codemirror/lang-python');
    return python();
  },
  ruby: (modules: CodeEditorModules) => {
    const { StreamLanguage } = modules[
      '@codemirror/language'
    ] as typeof import('@codemirror/language');
    const { ruby } = modules[
      '@codemirror/legacy-modes/mode/ruby'
    ] as typeof import('@codemirror/legacy-modes/mode/ruby');
    return StreamLanguage.define(ruby);
  },
  rust: (modules: CodeEditorModules) => {
    const { rust } = modules[
      '@codemirror/lang-rust'
    ] as typeof import('@codemirror/lang-rust');
    return rust();
  },
  typescript: (modules: CodeEditorModules) => {
    const { javascript } = modules[
      '@codemirror/lang-javascript'
    ] as typeof import('@codemirror/lang-javascript');
    return javascript({ jsx: false, typescript: true });
  },
  tsx: (modules: CodeEditorModules) => {
    const { javascript } = modules[
      '@codemirror/lang-javascript'
    ] as typeof import('@codemirror/lang-javascript');
    return javascript({ jsx: true, typescript: true });
  },
} as const;

export type LanguageName = keyof typeof codeMirrorLanguageExtensions;
export const LanguageName = Object.keys(codeMirrorLanguageExtensions).reduce(
  (acc, key) => {
    acc[key as LanguageName] = key as LanguageName;
    return acc;
  },
  {} as Record<LanguageName, LanguageName>,
);

export function createLanguageExtension(
  language: LanguageName,
  modules: CodeEditorModules,
) {
  return codeMirrorLanguageExtensions[language](modules);
}
