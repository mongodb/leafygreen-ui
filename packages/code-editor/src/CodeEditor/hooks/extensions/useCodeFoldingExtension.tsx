import React from 'react';
import { renderToString } from 'react-dom/server';
import { type EditorView } from '@codemirror/view';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

import { useExtension } from './useExtension';

/**
 * Hook that provides code folding functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for code folding
 * that can be toggled on/off and customizes the folding marker UI with LeafyGreen icons.
 *
 * @param params Configuration object for the code folding extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.enableCodeFolding Optional flag to enable/disable code folding functionality
 * @param params.languageModule Optional CodeMirror language module reference needed for fold gutter
 * @returns A CodeMirror extension that enables code folding with custom fold markers when both enableCodeFolding and languageModule are provided
 *
 * @remarks
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
export function useCodeFoldingExtension({
  editorView,
  stateModule,
  enableCodeFolding,
  languageModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableCodeFolding?: boolean;
  languageModule?: typeof import('@codemirror/language');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enableCodeFolding,
      languageModule,
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
