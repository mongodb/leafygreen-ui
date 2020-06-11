import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useVariant } from './CodeWrapper';
import { Variant } from './types';

interface TokenProps {
  kind?: string;
  children: React.ReactNode;
}

function Token({ kind, children }: TokenProps) {
  const className = kind ? `lg-highlight-${kind}` : '';

  return <span className={className}>{children}</span>;
}

type TreeItem =
  | null
  | undefined
  | string
  | Array<string | TokenObject>
  | TokenObject;

function isArray(item: any): item is Array<any> {
  return item instanceof Array;
}

function isObject(item: any): item is object {
  return typeof item === 'object';
}

function isString(item: any): item is string {
  return typeof item === 'string';
}

function processToken(token: TreeItem, index?: number): React.ReactNode {
  if (token == null) {
    return null;
  }

  if (isString(token)) {
    return token;
  }

  if (isArray(token)) {
    return token.map(processToken);
  }

  if (isObject(token)) {
    return (
      <Token key={index} kind={token.kind}>
        {processToken(token.children)}
      </Token>
    );
  }
}

const cellStyle = css`
  user-select: none;
  border-spacing: 0;
  padding: 0;
`;

interface LineTableRowProps {
  lineNumber: number;
  children: React.ReactNode;
}

function LineTableRow({ lineNumber, children }: LineTableRowProps) {
  const variant = useVariant();
  const numberColor =
    uiColors.gray[variant === Variant.Dark ? 'dark1' : 'light1'];

  const numberCellStyle = css`
    padding-right: 24px;
    color: ${numberColor};
  `;

  return (
    <tr>
      <td className={cx(cellStyle, numberCellStyle)}>{lineNumber}</td>
      <td className={cellStyle}>{children}</td>
    </tr>
  );
}

function treeToLines(child: Array<string | TokenObject>): Array<Array<TreeItem>> {
  const lines: Array<Array<TreeItem>> = [];
  let currentLineIndex = 0;

  // Create a new line, if no lines exist yet
  if (lines[currentLineIndex] == null) {
    lines[currentLineIndex] = [];
  }

  if (isString(child)) {
    // If the current element is a string that includes a line break, we need to handle it differently
    if (child.includes('\n')) {
      child.split('').forEach(fragment => {
        if (fragment === '\n') {
          // If the fragment is a new line character, we create a new line
          currentLineIndex++;
          lines[currentLineIndex] = [];
        } else {
          const currentIndexInLine = lines[currentLineIndex].length - 1;

          if (isString(lines[currentLineIndex][currentIndexInLine])) {
            // If the last element in the line is a string, we append this string to it
            lines[currentLineIndex][currentIndexInLine] += fragment;
          } else {
            // Otherwise, we push the string fragment on its own
            lines[currentLineIndex].push(fragment);
          }
        }
      });
    } else {
      // We don't need to do anything special in the case where the string doesn't contain a line break
      lines[currentLineIndex].push(child);
    }
  }

  // Line breaks aren't a part of token objects, so we can assume those objects go on the current line
  if (isObject(child)) {
    lines[currentLineIndex].push(child);
  }

  return lines
}

function renderTokenTreeToReact(
  { rootNode }: TokenTreeEmitter,
  numbered = false,
) {
  const lines = treeToLines(rootNode.children);

  console.log(lines) // Returns Array with only one element - the desired array

  return lines.map((line, index) => {
    const content = line.map(processToken);

    if (numbered) {
      return (
        <LineTableRow key={index} lineNumber={index + 1}>
          {content}
        </LineTableRow>
      );
    }

    return (
      <>
        <span key={index}>{content}</span>
        <br key={`br-${index}`} />
      </>
    );
  });
}

const plugin: HighlightPluginEventCallbacks = {
  'after:highlight': function (result) {
    result.react = renderTokenTreeToReact(result.emitter);
    result.reactWithNumbers = renderTokenTreeToReact(result.emitter, true);
  },
};

export default plugin;
