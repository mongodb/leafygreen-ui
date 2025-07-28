import React from 'react';
import { renderToString } from 'react-dom/server';
import { type Diagnostic } from '@codemirror/lint';
import { type EditorView } from '@codemirror/view';

import { type CodeEditorTooltip } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

/**
 * Hook that provides tooltip functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension that displays
 * multiple tooltips as diagnostics at specific positions in the code.
 *
 * @param params Configuration object for the tooltip extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.tooltips Array of tooltip configurations specifying position and content
 * @param params.lintModule CodeMirror lint module (`@codemirror/lint`) needed for displaying tooltips as diagnostics (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that renders tooltips at specified positions in the code
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
 *
 * @example
 * ```tsx
 * const tooltips = [
 *   { line: 2, column: 5, length: 4, content: <div>Tooltip 1</div> },
 *   { line: 3, column: 2, length: 2, content: <div>Tooltip 2</div> },
 * ]);
 * ```
 */
export function useTooltipExtension({
  editorView,
  stateModule,
  tooltips,
  lintModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  tooltips: Array<CodeEditorTooltip>;
  lintModule?: typeof import('@codemirror/lint');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      tooltips,
      module: lintModule,
    },
    factory: ({ tooltips, module }) => {
      if (!module || !module.linter || tooltips.length === 0) {
        return [];
      }

      return module.linter(linterView => {
        const diagnostics: Array<Diagnostic> = tooltips.map(
          ({ line, column = 1, content, severity, length }) => {
            const lineInfo = linterView.state.doc.line(line);
            const from = lineInfo.from + column - 1;
            const to = from + length;

            let message = '';
            let renderMessage: (() => HTMLElement) | undefined;

            if (typeof content === 'string') {
              message = content;
            } else if (
              React.isValidElement(content) ||
              Array.isArray(content)
            ) {
              renderMessage = () => {
                const dom = document.createElement('div');
                dom.innerHTML = renderToString(
                  React.createElement(React.Fragment, null, content),
                );
                return dom;
              };
              message = ' '; // Provide a non-empty string to satisfy Diagnostic type
            } else if (content) {
              message = String(content);
            }

            return {
              from,
              to,
              severity: severity || 'info',
              message,
              renderMessage,
            };
          },
        );
        return diagnostics;
      });
    },
  });
}
