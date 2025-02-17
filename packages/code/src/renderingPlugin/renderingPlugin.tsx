import React from 'react';
import flatMap from 'lodash/flatMap';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import {
  LeafyGreenHighlightResult,
  LeafyGreenHLJSPlugin,
  TokenObject,
} from '../highlight';
import { useSyntaxContext } from '../Syntax/SyntaxContext';

interface TokenProps {
  kind?: string;
  children: React.ReactNode;
}

const prefix = 'lg-highlight-';

export function generateKindClassName(...kinds: Array<any>): string {
  return kinds
    .filter((str): str is string => isString(str) && str.length > 0)
    .map(kind => {
      // Sometimes, a kind will have run through this function before.
      // This ensures we don't duplicate prefixes.
      if (kind.startsWith(prefix)) {
        return kind;
      }

      const classes = kind
        .split('.')
        .map(k => `${prefix}${k}`)
        .join(' ');

      return classes;
    })
    .join(' ');
}

function childrenAsKeywords(...children: Array<string>) {
  const keywords = ['function', 'class'];
  return children.filter(child => keywords.includes(child));
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

function isTokenObject(item: any): item is TokenObject {
  if (item == null || typeof item !== 'object') {
    return false;
  }

  return typeof item.kind === 'string' && item.children instanceof Array;
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
  vertical-align: top;
  padding: 0 ${spacing[300]}px;
`;

function getHighlightedRowStyle(darkMode: boolean) {
  let backgroundColor: string, backgroundImage: string, borderColor: string;

  if (darkMode) {
    backgroundColor = 'transparent';
    backgroundImage = `linear-gradient(90deg, ${palette.gray.dark3}, ${palette.black})`;
    borderColor = palette.gray.dark3;
  } else {
    backgroundColor = palette.yellow.light3;
    backgroundImage = 'none';
    borderColor = palette.yellow.light2;
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
  const numberColor = darkMode ? palette.gray.light1 : palette.gray.dark1;
  const highlightedNumberColor = darkMode
    ? palette.gray.light3
    : palette.yellow.dark2;

  // const childrenToHtmlString = children => {
  //   return ReactDOMServer.renderToStaticMarkup(<>{children}</>);
  // };

  // console.log({ children, string: childrenToHtmlString(children) });

  // const mergeStringsIntoString = children => {
  //   const childArray = React.Children.toArray(children); // Ensure it's an array

  //   return childArray.reduce((acc, child) => {
  //     const lastItem = acc[acc.length - 1];

  //     if (typeof child === 'string') {
  //       if (typeof lastItem === 'string') {
  //         acc[acc.length - 1] = lastItem + child; // Merge consecutive strings
  //       } else {
  //         acc.push(child);
  //       }
  //     } else {
  //       acc.push(child); // Keep React elements untouched
  //     }

  //     return acc;
  //   }, []);
  // };

  // console.log({ mergeStringsIntoString: mergeStringsIntoString(children) });
  return (
    <tr className={cx({ [getHighlightedRowStyle(darkMode)]: highlighted })}>
      {lineNumber && (
        <td
          className={cx(
            cellStyle,
            css`
              user-select: none;
              text-align: right;
              padding-left: ${spacing[400]}px;
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
export function flattenNestedTree(
  children: TokenObject['children'] | TokenObject,
  kind?: string,
): Array<string | FlatTokenObject> {
  if (typeof children === 'string') {
    return children;
  }

  if (isTokenObject(children)) {
    return flattenNestedTree(children.children, kind);
  }

  // Generate a flat map function with a closure around parent's kind
  function flatMapTreeWithKinds(...parentKinds: Array<string | undefined>) {
    parentKinds = parentKinds.filter(
      (str): str is string => isString(str) && str.length > 0,
    );

    return function (
      entity: string | TokenObject,
    ): string | FlatTokenObject | Array<string | FlatTokenObject> {
      console.log({ entity });
      if (isString(entity)) {
        // if (parentKinds.length > 0) {
        //   return {
        //     kind: generateKindClassName(
        //       kind,
        //       ...parentKinds,
        //       ...childrenAsKeywords(entity),
        //     ),
        //     children: [entity],
        //   };
        // } else {
        //   // Splits up the string by underscores
        //   // E.g. "This is before _hi_ this is after" => ["This is before ", "_hi_", " this is after"]
        //   const splitContentByUnderscore = entity.split(/(~~[\w-]+~~)/);

        //   console.log({ entity, splitContentByUnderscore });

        //   // If the array is greater than one then there are underscores in the string and we want to return each item in the array as an entity.
        //   if (splitContentByUnderscore.length > 1) {
        //     return splitContentByUnderscore.map(str => {
        //       // If the string starts and ends with an underscore, we want to remove them and return a new entity with a custom kind.
        //       if (str.startsWith('~~') && str.endsWith('~~')) {
        //         const removeUnderscores = str.slice(2, -2);
        //         return {
        //           kind: generateKindClassName(`${prefix}custom`),
        //           children: [removeUnderscores],
        //         };
        //       }

        //       return str;
        //     });
        //   }

        //   return entity;
        // }
        return parentKinds.length > 0
          ? {
              kind: generateKindClassName(
                kind,
                ...parentKinds,
                ...childrenAsKeywords(entity),
              ),
              children: [entity],
            }
          : entity; // entity is basic text
      }

      // If this is a nested entity, then flat map it's children
      if ((entity?.children?.length ?? 0) >= 1) {
        // Generate a new flat map function with this entity's kind
        return flatMap(
          entity.children,
          flatMapTreeWithKinds(kind, entity.kind, ...parentKinds),
        );
      }

      if (isFlattenedTokenObject(entity)) {
        return {
          kind: generateKindClassName(
            kind,
            entity.kind,
            ...parentKinds,
            ...childrenAsKeywords(...entity.children),
          ),
          children: entity.children,
        };
      }

      return entity as FlatTokenObject;
    };
  }

  return flatMap(children, flatMapTreeWithKinds(kind));
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

  // console.log({ children });

  // Create a new line, if no lines exist yet
  if (lines[currentLineIndex] == null) {
    lines[currentLineIndex] = [];
  }

  const createNewLine = () => {
    currentLineIndex++;
    lines[currentLineIndex] = [];
  };

  console.log({ flatArray: flattenNestedTree(children) });

  flattenNestedTree(children).forEach(child => {
    // console.log({ child });

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
    } else if (child && (isString(child) || isFlattenedTokenObject(child))) {
      lines[currentLineIndex].push(child);
    }
  });

  return lines;
}

interface TableContentProps {
  lines: LineDefinition;
}

export function TableContent({ lines }: TableContentProps) {
  const { highlightLines, showLineNumbers, darkMode, lineNumberStart } =
    useSyntaxContext();
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
        const sortedArr = [...def].sort((a, b) => a - b);

        return line >= sortedArr[0] && line <= sortedArr[1];
      }

      return false;
    });
  };

  return (
    <>
      {trimmedLines.map((line, index) => {
        const currentLineNumber = index + (lineNumberStart ?? 1);
        const highlightLine = lineShouldHighlight(currentLineNumber);

        // Merge consecutive strings into a single string
        const mergeStringsIntoString = children => {
          return children.reduce((acc, child) => {
            const lastItem = acc[acc.length - 1];

            if (typeof child === 'string') {
              if (typeof lastItem === 'string') {
                acc[acc.length - 1] = lastItem + child; // Merge consecutive strings
              } else {
                acc.push(child);
              }
            } else {
              acc.push(child); // Keep React elements untouched
            }

            return acc;
          }, []);
        };

        const mergedLines = mergeStringsIntoString(line);

        // Maps over the merged lines and checks if the line contains underscores. If it does, it splits the line by underscores and returns a new entity with a custom kind.
        const newLines = mergedLines.map(line => {
          if (typeof line === 'string') {
            const splitContentByUnderscore = line.split(/(~~[\w-]+~~)/);

            if (splitContentByUnderscore.length > 1) {
              return splitContentByUnderscore.map(str => {
                // If the string starts and ends with an underscore, we want to remove them and return a new entity with a custom kind.
                if (str.startsWith('~~') && str.endsWith('~~')) {
                  const removeUnderscores = str.slice(2, -2);
                  return {
                    kind: generateKindClassName(`${prefix}custom`),
                    children: [removeUnderscores],
                  };
                }

                return str;
              });
            }
          }

          return line;
        });

        console.log({
          line,
          mergedLines,
          newLines,
        });

        let displayLineNumber;

        if (showLineNumbers) {
          displayLineNumber = currentLineNumber;
        }

        const processedLine = newLines?.length ? (
          newLines.map(processToken)
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

const plugin: LeafyGreenHLJSPlugin = {
  'after:highlight': function (result: LeafyGreenHighlightResult) {
    const { rootNode } = result._emitter;
    // console.log(JSON.stringify(treeToLines(rootNode.children), null, 2));
    result.react = <TableContent lines={treeToLines(rootNode.children)} />;
  },
};

export default plugin;
