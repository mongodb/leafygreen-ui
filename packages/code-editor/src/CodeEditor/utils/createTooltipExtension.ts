import React from 'react';
import { renderToString } from 'react-dom/server';
import { hoverTooltip } from '@uiw/react-codemirror';

import { CodeEditorTooltip, CodeMirrorExtension } from '../CodeEditor.types';

/**
 * Creates a CodeMirror extension that displays a tooltip when hovering over a specific position
 * in the document.
 *
 * @param tooltip - Configuration object for the tooltip
 * @param tooltip.line - Zero-based line number where the tooltip should appear
 * @param tooltip.column - Zero-based column position (defaults to 0)
 * @param tooltip.content - Content to render in the tooltip (string, ReactNode, or any other value)
 * @param tooltip.above - Whether the tooltip should appear above the position (defaults to true)
 * @returns A CodeMirror extension that renders the tooltip when hovering over the specified position
 *
 * @example
 * ```tsx
 * const tooltipExtension = createTooltipExtension({
 *   line: 2,
 *   column: 5,
 *   content: <div>Tooltip content</div>,
 *   above: true,
 * });
 * ```
 */
export const createTooltipExtension = ({
  line,
  column = 1,
  content,
  above = true,
}: CodeEditorTooltip): CodeMirrorExtension => {
  return hoverTooltip(view => {
    const lineInfo = view.state.doc.line(line); // CodeMirror lines are 1-indexed

    return {
      pos: lineInfo.from + column - 1,
      end: lineInfo.to,
      above: above,
      create() {
        const dom = document.createElement('div');

        if (typeof content === 'string') {
          dom.textContent = content;
        } else if (React.isValidElement(content) || Array.isArray(content)) {
          const contentString = renderToString(
            React.createElement(React.Fragment, null, content),
          );
          dom.innerHTML = contentString;
        } else if (content) {
          dom.textContent = String(content);
        }

        return { dom };
      },
    };
  });
};
