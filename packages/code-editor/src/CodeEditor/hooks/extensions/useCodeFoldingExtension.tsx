import React from 'react';
import { renderToString } from 'react-dom/server';
import { type EditorView } from '@codemirror/view';

import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { spacing } from '@leafygreen-ui/tokens';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

const CUSTOM_ICON_SIZE = 10;

/**
 * Hook for managing code folding functionality in the CodeMirror editor.
 *
 * This extension adds code folding capabilities with custom LeafyGreen UI icons.
 * When enabled, users can collapse and expand code blocks (like functions, classes,
 * etc.) to improve readability and navigation. The extension uses ChevronDown and
 * ChevronRight icons to indicate fold states.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the enableCodeFolding flag
 * @param params.modules - Module dependencies (requires @codemirror/language for foldGutter)
 * @returns A CodeMirror extension that enables code folding with custom icons
 */
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
                size={CUSTOM_ICON_SIZE}
                className={css`
                  margin-top: ${spacing[100]}px;
                `}
              />
            ) : (
              <Icon
                glyph="ChevronRight"
                size={CUSTOM_ICON_SIZE}
                className={css`
                  /**
                   * Design indicated that the close icon seemed a bit unaligned at 4px, so we added 1px to better align
                   */
                  margin-top: ${spacing[100] + 1}px;
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
