import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { processToken, LineTableRow, treeToLines } from './renderingPlugin';

describe('processToken()', () => {
  test('when passed `null`, it returns `null`', () => {
    expect(processToken(null)).toBeNull();
    expect(processToken(null, 0)).toBeNull();
    expect(processToken(null, 1)).toBeNull();
  });

  test('when passed undefined, it returns `null`', () => {
    expect(processToken(undefined)).toBeNull();
    expect(processToken(undefined, 0)).toBeNull();
    expect(processToken(undefined, 1)).toBeNull();
  });

  test('when passed an Array, it returns an Array', () => {
    expect(processToken([])).toBeInstanceOf(Array);
    expect(
      processToken(
        [
          { kind: 'hello', children: [] },
          { kind: 'world', children: [] },
        ],
        0,
      ),
    ).toBeInstanceOf(Array);
    expect(processToken(['hello', 'hello', 'hello'], 1)).toBeInstanceOf(Array);
  });

  test('when passed an object, it returns a React element', () => {
    expect(
      React.isValidElement(processToken({ kind: 'hello', children: [] })),
    ).toBeTruthy();
    expect(
      React.isValidElement(processToken({ kind: 'hello', children: [] }, 0)),
    ).toBeTruthy();
    expect(
      React.isValidElement(processToken({ kind: 'hello', children: [] }, 1)),
    ).toBeTruthy();
  });

  test('when passed a string, it returns astring', () => {
    expect(processToken('hello')).toBe('hello');
    expect(processToken('hello', 0)).toBe('hello');
    expect(processToken('hello', 1)).toBe('hello');
  });

  test("when processToken is passed an argument that's not explicitly supported, it returns that value", () => {
    // @ts-expect-error
    expect(processToken(false)).toBe(false);
    // @ts-expect-error
    expect(processToken(false, 0)).toBe(false);
    // @ts-expect-error
    expect(processToken(false, 1)).toBe(false);
  });
});

describe('LineTableRow', () => {
  const content = 'hello';
  const lineNumber = 1;

  function renderLineTableRow(): RenderResult {
    return render(
      <table>
        <tbody data-testid="tbody">
          <LineTableRow lineNumber={lineNumber}>{content}</LineTableRow>
        </tbody>
      </table>,
    );
  }

  test('renders a single table row as the root node', () => {
    const { getByTestId } = renderLineTableRow();

    // The component must return a single <tr> as the root node.
    // We render a table and tbody tag as parents of the element to avoid a console error,
    // then get the children of that tbody tag to test that the tr element is the only child.
    const rows = getByTestId('tbody').children;

    expect(rows.length).toBe(1);
    expect(rows[0]).toBeInTheDocument();
    expect(rows[0].tagName).toBe('TR');
  });

  test('renders two table cells', () => {
    const { getAllByRole } = renderLineTableRow();

    const cells = getAllByRole('cell');

    expect(cells.length).toBe(2);
    cells.forEach(cell => expect(cell).toBeInTheDocument());
  });

  test(`renders the line number (${lineNumber}) in the first cell`, () => {
    const { getAllByRole } = renderLineTableRow();

    const cells = getAllByRole('cell');
    expect(cells[0]).toHaveTextContent(lineNumber.toString());
  });

  test(`renders '${content}' in the second cell`, () => {
    const { getAllByRole } = renderLineTableRow();

    const cells = getAllByRole('cell');
    expect(cells[1]).toHaveTextContent(content);
  });
});

interface TokenObject {
  kind: string;
  children: Array<string | TokenObject>;
}

const sampleChildren: Array<string | TokenObject> = [
  // Line break at the beginning should be stripped.
  '\n',
  {
    kind: 'function',
    children: [
      { kind: 'keyword', children: ['function'] },
      ' ',
      { kind: 'title', children: ['greeting'] },
      '(',
      { kind: 'params', children: ['entity'] },
      ') ',
    ],
  },
  '{',
  '\n  ',
  { kind: 'keyword', children: ['return'] },
  ' ',
  {
    kind: 'string',
    children: ['`Hello, ', { kind: 'subst', children: ['${entity}'] }, '!`'],
  },
  ';\n',
  '}',
  '\n\n',
  { kind: 'built_in', children: ['console'] },
  '.log',
  '(',
  'greeting',
  '(',
  { kind: 'string', children: ["'World'"] },
  '))',
  // Line break at the end should be stripped.
  ';\n',
];

describe('treeToLines()', () => {
  function validateLine(line: any) {
    function isNonArrayObject(obj: any) {
      if (obj instanceof Array) {
        return false;
      }

      return typeof obj === 'object';
    }

    expect(line).toBeInstanceOf(Array);

    line.forEach((el: any) => {
      if (typeof el === 'string') {
        expect(typeof el).toBe('string');
      } else if (isNonArrayObject(el)) {
        expect(el).toHaveProperty('kind');
        expect(el).toHaveProperty('children');

        el.children.forEach((child: any) => {
          expect(
            typeof child === 'string' || isNonArrayObject(child),
          ).toBeTruthy();
        });
      } else {
        throw new TypeError(
          "element in array was not of types: 'object' | 'string'",
        );
      }
    });
  }

  // eslint-disable-next-line jest/expect-expect
  test('when passed a valid set of children, returns a valid Array', () => {
    treeToLines(sampleChildren).forEach(validateLine);
  });

  // eslint-disable-next-line jest/expect-expect
  test('when passed an invalid set of children, returns a valid Array', () => {
    // @ts-expect-error
    treeToLines([...sampleChildren, null, 0]).forEach(validateLine);
  });

  test('strips empty line breaks from beginning of result', () => {
    const lines = treeToLines(sampleChildren);

    expect(lines[0]).not.toHaveLength(0);
  });

  test('strips empty line breaks from end of result', () => {
    const lines = treeToLines(sampleChildren);

    expect(lines[lines.length - 1]).not.toHaveLength(0);
  });
});
