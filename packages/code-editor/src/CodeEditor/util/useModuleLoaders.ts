import { useMemo } from 'react';

import { CodeEditorProps } from '../CodeEditor.types';

import type { LoadersMap } from './useLazyModules';

interface CodeEditorModules extends Record<string, unknown> {
  '@uiw/codemirror-extensions-hyper-link': typeof import('@uiw/codemirror-extensions-hyper-link');
  '@codemirror/language': typeof import('@codemirror/language');
  '@codemirror/lint': typeof import('@codemirror/lint');
}

export const useModuleLoaders = ({
  enableClickableUrls,
  enableCodeFolding,
  forceParsing,
  indentUnit,
  tooltips,
}: // language,
CodeEditorProps) => {
  const loaders = useMemo(() => {
    const neededLoaders: Partial<LoadersMap<CodeEditorModules>> = {};

    if (enableClickableUrls) {
      neededLoaders['@uiw/codemirror-extensions-hyper-link'] = () =>
        import('@uiw/codemirror-extensions-hyper-link');
    }

    if (enableCodeFolding || forceParsing || !!indentUnit) {
      neededLoaders['@codemirror/language'] = () =>
        import('@codemirror/language');
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
    // language,
  ]);

  return loaders;
};

export type { CodeEditorModules };
