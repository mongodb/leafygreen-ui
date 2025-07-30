import React from 'react';
import { renderToString } from 'react-dom/server';
import { type Diagnostic } from '@codemirror/lint';
import { type EditorView } from '@codemirror/view';

import {
  type CodeEditorProps,
  type CodeEditorTooltip,
} from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useTooltipExtension({
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
      tooltips: props.tooltips || [],
      module: modules?.['@codemirror/lint'],
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
