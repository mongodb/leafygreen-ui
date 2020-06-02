import React from 'react';
import { css } from '@leafygreen-ui/emotion'

interface TokenProps {
  kind?: string;
  children: React.ReactNode;
}

function Token({ kind, children }: TokenProps) {
  return <span className={kind ? `lg-highlight-${kind}` : ''}>{children}</span>;
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

function processToken(token: TreeItem, index: number): React.ReactNode {
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
    return <Token key={index} kind={token.kind}>{processToken(token.children)}</Token>;
  }
}

function renderTokenTreeToReact(
  { rootNode }: TokenTreeEmitter,
  numbered = false,
) {
  const lines: Array<Array<TreeItem>> = [];

  let currentLine = 0;

  function treeToLines(child: string | TokenObject) {
    // Create a new line, if no lines exist yet
    if (lines[currentLine] == null) {
      lines[currentLine] = [];
    }

    if (isString(child)) {
      // If the current element is a string that includes a line break, we need to handle it differently
      if (child.includes('\n')) {
        child.split('').forEach(fragment => {
          if (fragment === '\n') {
            // If the fragment is a new line character, we create a new line
            currentLine++;
            lines[currentLine] = [];
          } else {
            const currentIndexInLine = lines[currentLine].length - 1;

            if (isString(lines[currentLine][currentIndexInLine])) {
              // If the last element in the line is a string, we append this string to it
              lines[currentLine][currentIndexInLine] += fragment;
            } else {
              // Otherwise, we push the string fragment on its own
              lines[currentLine].push(fragment);
            }
          }
        });
      } else {
        // We don't need to do anything special in the case where the string doesn't contain a line break
        lines[currentLine].push(child);
      }
    }

    // Line breaks aren't a part of token objects, so we can assume those objects go on the current line
    if (isObject(child)) {
      lines[currentLine].push(child);
    }
  }

  rootNode.children.forEach(treeToLines);

  return lines.map((line, index) => {
    const content = line.map(processToken);

    if (numbered) {
      return (
        <tr key={index}>
          <td className={css`user-select: none;`}>{index + 1}</td>
          <td>{content}</td>
        </tr>
      );
    }

    return (
      <>
        {content}
        <br />
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
