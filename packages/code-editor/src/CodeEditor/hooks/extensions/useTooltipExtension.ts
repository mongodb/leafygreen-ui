import React from 'react';
import { renderToString } from 'react-dom/server';
import { type Diagnostic } from '@codemirror/lint';
import { type EditorView } from '@codemirror/view';

import { CodeEditorTooltip } from '../../../CodeEditorTooltip';
import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

/**
 * Hook for managing diagnostic tooltips and linting in the CodeMirror editor.
 *
 * This extension displays tooltips for errors, warnings, and informational messages
 * at specific locations in the code. It supports both string and React element content
 * for tooltips, allowing for rich formatting and interactive elements. The tooltips
 * are positioned based on line and column coordinates.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the tooltips array
 * @param params.modules - Module dependencies (requires @codemirror/lint for linter)
 * @returns A CodeMirror extension that displays diagnostic tooltips
 */
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
          ({
            line,
            column = 1,
            severity = 'info',
            length,
            messages,
            links,
          }) => {
            const lineInfo = linterView.state.doc.line(line);
            const from = lineInfo.from + column - 1;
            const to = from + length;

            const renderMessage = () => {
              const dom = document.createElement('div');
              dom.innerHTML = renderToString(
                React.createElement(CodeEditorTooltip, { messages, links }),
              );
              return dom;
            };

            return {
              from,
              to,
              severity,
              message: ' ', // Provide a non-empty string to satisfy Diagnostic type
              renderMessage,
            };
          },
        );
        return diagnostics;
      });
    },
  });
}
