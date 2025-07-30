import React from 'react';
import { renderToString } from 'react-dom/server';
import { type EditorView } from '@codemirror/view';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useCodeFoldingExtension({
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
      enableCodeFolding: props.enableCodeFolding,
      languageModule: modules?.['@codemirror/language'],
    },
    factory: ({ enableCodeFolding, languageModule }) => {
      if (!enableCodeFolding || !languageModule || !languageModule.foldGutter) {
        return [];
      }

      return languageModule.foldGutter({
        markerDOM: (open: boolean) => {
          const icon = document.createElement('span');
          icon.className = 'cm-custom-fold-marker';
          icon.innerHTML = renderToString(
            open ? (
              <Icon
                glyph="ChevronDown"
                size="small"
                className={css`
                  margin-top: 2px;
                `}
              />
            ) : (
              <Icon
                glyph="ChevronRight"
                size="small"
                className={css`
                  margin-top: 2px;
                `}
              />
            ),
          );
          return icon;
        },
      });
    },
  });
}
