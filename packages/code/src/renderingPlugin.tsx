import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useSyntaxContext } from './SyntaxContext';
import { create } from 'lodash';

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
  return item != null && item instanceof Array;
}

function isObject(item: any): item is object {
  return item != null && typeof item === 'object' && !(item instanceof Array);
}

function isString(item: any): item is string {
  return item != null && typeof item === 'string';
}

export function processToken(token: TreeItem, key?: number): React.ReactNode {
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
      <Token key={key} kind={token.kind}>
        {processToken(token.children)}
      </Token>
    );
  }

  return token;
}

const cellStyle = css`
  border-spacing: 0;
  padding: 0;
  vertical-align: top;

  &:first-of-type {
    padding-left: 12px;
  }

  &:last-of-type {
    padding-right: 12px;
  }
`;

function getHighlightedRowStyle(darkMode: boolean) {
  let backgroundColor: string, backgroundImage: string, borderColor: string;

  if (darkMode) {
    backgroundColor = 'transparent';
    backgroundImage = `linear-gradient(90deg, ${uiColors.gray.dark3}, transparent)`;
    borderColor = uiColors.gray.dark3;
  } else {
    backgroundColor = uiColors.yellow.light3;
    backgroundImage = 'none';
    borderColor = uiColors.yellow.light2;
  }

  return css`
    background-color: ${backgroundColor};
    background-image: ${backgroundImage};

    // Selects all children of a highlighted row, and adds a border top
    & > td {
      border-top: 1px solid ${borderColor};
    }

    // Selects following rows after a highlighted row, and adds a border top
    // We don't add border bottoms here to support consecutive highlighted rows.
    & + tr > td {
      border-top: 1px solid ${borderColor};
    }

    // Remove borders between consecutive highlighted rows
    & + & > td {
      border-top: 0;
    }

    // If the highlighted row is the last child, then we add a border bottom
    &:last-child > td {
      border-bottom: 1px solid ${borderColor};
    }
  `;
}

interface LineTableRowProps {
  lineNumber?: number;
  children: React.ReactNode;
  highlighted?: boolean;
  darkMode: boolean;
}

export function LineTableRow({
  lineNumber,
  highlighted,
  darkMode,
  children,
}: LineTableRowProps) {
  const numberColor = uiColors.gray[darkMode ? 'dark1' : 'light1'];
  const highlightedNumberColor = darkMode
    ? uiColors.gray.light2
    : uiColors.yellow.dark2;

  return (
    <tr className={cx({ [getHighlightedRowStyle(darkMode)]: highlighted })}>
      {lineNumber && (
        <td
          className={cx(
            cellStyle,
            css`
              padding-right: 24px;
              user-select: none;
              color: ${highlighted ? highlightedNumberColor : numberColor};
            `,
          )}
        >
          {lineNumber}
        </td>
      )}

      <td className={cellStyle}>{children}</td>
    </tr>
  );
}

// If an array of tokens contains an object with more than one children, this function will flatten that tree recursively.
function flattenNestedTree(
  children: Array<string | TokenObject>,
  kind?: string,
): Array<string | TokenObject> {
  if (typeof children === 'string') {
    return children;
  }

  return children.reduce((acc, val) => {
    if (typeof val === 'string') {
      // If there's a kind, we construct a custom token object with that kind to preserve highlighting.
      // Without this, the value will simply render without highlighting.
      const child = kind ? { kind, children: [val] } as TokenObject : val;

      return [...acc, child];
    }

    if (val?.children?.length > 1) {
      // Pass the kind here so that the function can highlight nested tokens if applicable
      return [...acc, ...flattenNestedTree(val.children, val.kind)];
    }

    return [...acc, val]
  }, [] as Array<string | TokenObject>)
}


function containsLineBreak(token: TreeItem): boolean {
  if (isArray(token)) {
    return token.some(containsLineBreak);
  }

  if (isString(token)) {
    return token.includes('\n');
  }

  if (isObject(token)) {
    return token.children?.includes('\n') || (isString(token.children?.[0]) && token.children[0].includes('\n'));
  }

  return false;
}

export function treeToLines(
  children: Array<string | TokenObject>,
): Array<Array<TreeItem>> {
  const lines: Array<Array<TreeItem>> = [];
  let currentLineIndex = 0;

  // Create a new line, if no lines exist yet
  if (lines[currentLineIndex] == null) {
    lines[currentLineIndex] = [];
  }

  const createNewLine = () => {
    currentLineIndex++;
    lines[currentLineIndex] = [''];
  }

  flattenNestedTree(children).forEach(child => {
    const currentIndexInLine = lines[currentLineIndex].length - 1;

    // If the current element includes a line break, we need to handle it differently
    if (containsLineBreak(child)) {
      if (isString(child)) {
        child.split('').forEach(fragment => {
          if (containsLineBreak(fragment)) {
            // If the fragment is a new line character, we create a new line
            createNewLine()
          } else {
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
        if (isString(child.children) || isArray(child.children)) {
          // TODO: we know that the child will not be a TokenObject.
          // Why we need to typecast here is likely because of poor typing in flattenNestedTree()
          const tokenString = isArray(child.children) ? child.children[0] as string : child.children
          const newTokens: Array<string> = []

          let newTokenIndex = 0
          tokenString.split('').forEach(fragment => {
            if (!newTokens[newTokenIndex]) {
              newTokens[newTokenIndex] = ''
            }

            if (containsLineBreak(fragment)) {
              newTokenIndex++
              newTokens[newTokenIndex] = ''
            } else {
              newTokens[newTokenIndex] += fragment
            }
          })

          newTokens.forEach((string, i) => {
            lines[currentLineIndex].push({kind: child.kind, children: [string]});

            if (i !== newTokens.length - 1 ) {
              createNewLine();
            }
          })
        }
      }

    } else {
      lines[currentLineIndex].push(child);
    }
  });

  return lines;
}

interface TableContentProps {
  lines: Array<Array<TreeItem>>;
}

export function TableContent({ lines }: TableContentProps) {
  const { highlightLines, showLineNumbers, darkMode } = useSyntaxContext();
  const trimmedLines = [...lines];

  // Strip empty lines from the beginning of code blocks
  while (trimmedLines[0]?.length === 0) {
    trimmedLines.shift();
  }

  // Strip empty lines from the end of code blocks
  while (trimmedLines[trimmedLines.length - 1]?.length === 0) {
    trimmedLines.pop();
  }

  return (
    <>
      {trimmedLines.map((line, index) => {
        const currentLineNumber = index + 1;
        const highlightLine = highlightLines.includes(currentLineNumber);

        let displayLineNumber;

        if (showLineNumbers) {
          displayLineNumber = currentLineNumber;
        }

        const processedLine = line?.length ? (
          line.map(processToken)
        ) : (
          // We create placeholder content when a line break appears to preserve the line break's height
          // It needs to be inline-block for the table row to not collapse.
          <div
            className={css`
              display: inline-block;
            `}
          />
        );

        return (
          <LineTableRow
            key={currentLineNumber}
            lineNumber={displayLineNumber}
            darkMode={darkMode}
            highlighted={highlightLine}
          >
            {processedLine}
          </LineTableRow>
        );
      })}
    </>
  );
}

const plugin: HighlightPluginEventCallbacks = {
  'after:highlight': function (result) {
    const { rootNode } = result.emitter;

    result.react = <TableContent lines={treeToLines(rootNode.children)} />;
  },
};

export default plugin;
