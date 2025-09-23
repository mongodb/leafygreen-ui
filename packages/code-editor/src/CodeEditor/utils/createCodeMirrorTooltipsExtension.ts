import React from 'react';
import { renderToString } from 'react-dom/server';
import { Diagnostic, linter } from '@codemirror/lint';

import { CodeEditorTooltip, CodeMirrorExtension } from '../CodeEditor.types';

/**
 * Creates a CodeMirror linter extension that displays multiple tooltips as diagnostics.
 * This allows multiple tooltips to be shown at once, each at its own position.
 *
 * @param tooltips - Array of tooltip configs
 * @returns A CodeMirror extension that renders all tooltips as diagnostics
 *
 * @example
 * ```tsx
 * const tooltipExtension = createCodeMirrorTooltipsExtension([
 *   { line: 2, column: 5, length: 4, content: <div>Tooltip 1</div> },
 *   { line: 3, column: 2, length: 2, content: <div>Tooltip 2</div> },
 * ]);
 * ```
 */
export function createCodeMirrorTooltipsExtension(
  tooltips: Array<CodeEditorTooltip>,
): CodeMirrorExtension {
  return linter(view => {
    const diagnostics: Array<Diagnostic> = tooltips.map(
      ({ line, column = 1, content, severity, length }) => {
        const lineInfo = view.state.doc.line(line);
        const from = lineInfo.from + column - 1;
        const to = from + length;

        let message = '';
        let renderMessage: (() => HTMLElement) | undefined;

        if (typeof content === 'string') {
          message = content;
        } else if (React.isValidElement(content) || Array.isArray(content)) {
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
}
