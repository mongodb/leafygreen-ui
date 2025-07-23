import { useMemo } from 'react';

import { CodeEditorProps } from '../CodeEditor.types';

import type { LoadersMap } from './useLazyModules';

interface CodeEditorModules {
  '@uiw/codemirror-extensions-hyper-link': typeof import('@uiw/codemirror-extensions-hyper-link');
  '@codemirror/language': typeof import('@codemirror/language');
  '@codemirror/lint': typeof import('@codemirror/lint');
  '@lezer/highlight': typeof import('@lezer/highlight');
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
}

export const useModuleLoaders = ({
  enableClickableUrls,
  enableCodeFolding,
  forceParsing,
  indentUnit,
  tooltips,
  language,
}: // language,
CodeEditorProps) => {
  const loaders = useMemo(() => {
    const neededLoaders: Partial<LoadersMap<CodeEditorModules>> = {};

    if (enableClickableUrls) {
      neededLoaders['@uiw/codemirror-extensions-hyper-link'] = () =>
        import('@uiw/codemirror-extensions-hyper-link');
    }

    if (enableCodeFolding || forceParsing || !!indentUnit || language) {
      neededLoaders['@codemirror/language'] = () =>
        import('@codemirror/language');
    }

    if (language) {
      /* If no language is specified, syntax highlighting isn't needed */
      neededLoaders['@lezer/highlight'] = () => import(`@lezer/highlight`);

      // Load the language extension dynamically based on the specified language
      switch (language) {
        case 'cpp':
          neededLoaders['@codemirror/lang-cpp'] = () =>
            import('@codemirror/lang-cpp');
          break;
        case 'csharp':
          neededLoaders['@replit/codemirror-lang-csharp'] = () =>
            import('@replit/codemirror-lang-csharp');
          break;
        case 'css':
          neededLoaders['@codemirror/lang-css'] = () =>
            import('@codemirror/lang-css');
          break;
        case 'go':
          neededLoaders['@codemirror/lang-go'] = () =>
            import('@codemirror/lang-go');
          break;
        case 'html':
          neededLoaders['@codemirror/lang-html'] = () =>
            import('@codemirror/lang-html');
          break;
        case 'java':
          neededLoaders['@codemirror/lang-java'] = () =>
            import('@codemirror/lang-java');
          break;
        case 'javascript':
        case 'jsx':
        case 'typescript':
        case 'tsx':
          neededLoaders['@codemirror/lang-javascript'] = () =>
            import('@codemirror/lang-javascript');
          break;
        case 'json':
          neededLoaders['@codemirror/lang-json'] = () =>
            import('@codemirror/lang-json');
          break;
        case 'kotlin':
          neededLoaders['@codemirror/legacy-modes/mode/clike'] = () =>
            import('@codemirror/legacy-modes/mode/clike');
          break;
        case 'php':
          neededLoaders['@codemirror/lang-php'] = () =>
            import('@codemirror/lang-php');
          break;
        case 'python':
          neededLoaders['@codemirror/lang-python'] = () =>
            import('@codemirror/lang-python');
          break;
        case 'ruby':
          neededLoaders['@codemirror/legacy-modes/mode/ruby'] = () =>
            import('@codemirror/legacy-modes/mode/ruby');
          break;
        case 'rust':
          neededLoaders['@codemirror/lang-rust'] = () =>
            import('@codemirror/lang-rust');
          break;
      }
    }

    if (tooltips && tooltips.length > 0) {
      neededLoaders['@codemirror/lint'] = () => import('@codemirror/lint');
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

export type { CodeEditorModules };
