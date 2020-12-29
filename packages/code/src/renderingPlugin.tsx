import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useSyntaxContext } from './SyntaxContext';
import { spacing } from '@leafygreen-ui/tokens';

interface TokenProps {
  kind?: string;
  children: React.ReactNode;
}

function generateKindClassName(...args: Array<any>): string {
  return args
    .filter(isString)
    .map(kind => {
      const prefix = 'lg-highlight-';

      // Sometimes, a kind will have run through this function before.
      // This ensures we don't duplicate prefixes.
      if (kind.startsWith(prefix)) {
        return kind;
      }

      return `${prefix}${kind}`;
    })
    .join(' ');
}

function Token({ kind, children }: TokenProps) {
  return <span className={kind}>{children}</span>;
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

function isNumber(item: any): item is number {
  return item != null && typeof item === 'number';
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
  padding-right: ${spacing[3]}px;
  padding-left: ${spacing[3]}px;
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
    // Fixes an issue in Safari where the gradient applied to the table row would be applied
    // to each cell in the row instead of being continuous across cells.
    background-attachment: fixed;

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
              user-select: none;
              text-align: right;
              padding-left: ${spacing[2]}px;
              padding-right: 0;
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

interface FlatTokenObject {
  kind: string;
  children: Array<string>;
}

// Check if object is a TokenObject which has an array with a single string element within it.
function isFlattenedTokenObject(obj: TokenObject): obj is FlatTokenObject {
  // default to an empty object in the off-chance "obj" is null or undefined.
  const { children } = obj ?? {};

  if (isArray(children) && children.length === 1 && isString(children[0])) {
    return true;
  }

  return false;
}

// If an array of tokens contains an object with more than one children, this function will flatten that tree recursively.
function flattenNestedTree(
  children: Array<string | TokenObject>,
  kind?: string,
): Array<string | FlatTokenObject> {
  if (typeof children === 'string') {
    return children;
  }

  return children.reduce((acc, val) => {
    if (isString(val)) {
      // If there's a kind, we construct a custom token object with that kind to preserve highlighting.
      // Without this, the value will simply render without highlighting.
      const child = kind
        ? { kind: generateKindClassName(kind), children: [val] }
        : val;

      return [...acc, child];
    }

    if (val?.children?.length > 1) {
      // Pass the kind here so that the function can highlight nested tokens if applicable
      return [
        ...acc,
        ...flattenNestedTree(
          val.children,
          generateKindClassName(kind, val.kind),
        ),
      ];
    }

    if (isFlattenedTokenObject(val)) {
      return [
        ...acc,
        { kind: generateKindClassName(kind, val.kind), children: val.children },
      ];
    }

    return acc;
  }, [] as Array<string | FlatTokenObject>);
}

function containsLineBreak(token: TreeItem): boolean {
  if (isArray(token)) {
    return token.some(containsLineBreak);
  }

  if (isString(token)) {
    return token.includes('\n');
  }

  if (isObject(token)) {
    return (
      token.children?.includes('\n') ||
      (isString(token.children?.[0]) && token.children[0].includes('\n'))
    );
  }

  return false;
}

type LineDefinition = Array<Array<string | FlatTokenObject>>;

export function treeToLines(
  children: Array<string | TokenObject>,
): LineDefinition {
  const lines: LineDefinition = [];
  let currentLineIndex = 0;

  // Create a new line, if no lines exist yet
  if (lines[currentLineIndex] == null) {
    lines[currentLineIndex] = [];
  }

  const createNewLine = () => {
    currentLineIndex++;
    lines[currentLineIndex] = [];
  };

  flattenNestedTree(children).forEach(child => {
    // If the current element includes a line break, we need to handle it differently
    if (containsLineBreak(child)) {
      if (isString(child)) {
        child.split('\n').forEach((fragment, i) => {
          if (i > 0) {
            createNewLine();
          }

          // Empty new lines should be represented as an empty array
          if (fragment) {
            lines[currentLineIndex].push(fragment);
          }
        });
      } else {
        const tokenString = child.children[0];

        tokenString.split('\n').forEach((fragment, i) => {
          if (i > 0) {
            createNewLine();
          }

          lines[currentLineIndex].push({
            kind: child.kind,
            children: [fragment],
          });
        });
      }
    } else {
      lines[currentLineIndex].push(child);
    }
  });

  return lines;
}

interface TableContentProps {
  lines: LineDefinition;
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

  const lineShouldHighlight = (line: number) => {
    return highlightLines.some(def => {
      if (isNumber(def)) {
        return line === def;
      }

      if (isArray(def)) {
        const sortedArr = def.sort();
        return line >= sortedArr[0] && line <= sortedArr[1];
      }

      return false;
    });
  };

  return (
    <>
      {trimmedLines.map((line, index) => {
        const currentLineNumber = index + 1;
        const highlightLine = lineShouldHighlight(currentLineNumber);

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
