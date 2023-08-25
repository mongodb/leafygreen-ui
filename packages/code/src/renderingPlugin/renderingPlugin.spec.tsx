import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import {
  flattenNestedTree,
  generateKindClassName,
  LineTableRow,
  processToken,
  treeToLines,
} from './renderingPlugin';

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

  test('when passed a string, it returns a string', () => {
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
          <LineTableRow darkMode={false} lineNumber={lineNumber}>
            {content}
          </LineTableRow>
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

describe('generateKindClassName()', () => {
  test('when passed nothing, returns an empty string', () => {
    const kindClassName = generateKindClassName() as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName.length).toBe(0);
  });

  test('when passed an empty string, returns an empty string', () => {
    const kindClassName = generateKindClassName('') as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName.length).toBe(0);
  });

  test('when passed a single argument, returns a string of the appropriate className', () => {
    const kind = 'string';
    const kindClassName = generateKindClassName(kind) as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName).toEqual(`lg-highlight-${kind}`);
  });

  test('when passed multiple arguments, returns a string containing the appropriate classNames', () => {
    const kind1 = 'string';
    const kind2 = 'function';
    const kindClassName = generateKindClassName(kind1, kind2) as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName).toEqual(
      `lg-highlight-${kind1} lg-highlight-${kind2}`,
    );
  });
});

describe('flattenNestedTree()', () => {
  test('when passed an array of strings, returns an array of strings', () => {
    const flattenedArray = flattenNestedTree(['test1', 'test2']);

    expect(flattenedArray instanceof Array).toBeTruthy();
    expect(flattenedArray[0]).toEqual('test1');
    expect(flattenedArray[1]).toEqual('test2');
  });

  test('when passed an array of objects, returns an array of objects with updated kind', () => {
    const obj1 = { children: ['obj1'], kind: 'string' };
    const obj2 = { children: ['obj2'], kind: 'function' };

    const [modifiedObj1, modifiedObj2] = flattenNestedTree([obj1, obj2]);

    expect(typeof modifiedObj1 === 'object').toBeTruthy();
    expect((modifiedObj1 as any).children[0]).toEqual('obj1');
    expect((modifiedObj1 as any).kind).toEqual(
      generateKindClassName(obj1.kind),
    );

    expect(typeof modifiedObj2 === 'object').toBeTruthy();
    expect((modifiedObj2 as any).children[0]).toEqual('obj2');
    expect((modifiedObj2 as any).kind).toEqual(
      generateKindClassName(obj2.kind),
    );
  });

  test('when passed a token object, returns an array', () => {
    const [item1, item2] = flattenNestedTree({
      kind: 'test1',
      children: ['hello', { kind: 'test2', children: ['world'] }],
    });

    expect(item1).toEqual('hello');
    expect((item2 as TokenObject).kind).toEqual(generateKindClassName('test2'));
    expect((item2 as TokenObject).children[0]).toEqual('world');

    expect(true).toBeTruthy();
  });

  test('when passed an array with a nested object, returns a flattened array of objects with updated kind', () => {
    expect(true).toBe(true);

    const tokenChildren = ['test', 'test2', 'test3'];
    const tokenKind = ['kind1', 'kind2', 'kind3'];

    const [obj1, obj2, obj3] = flattenNestedTree([
      {
        kind: tokenKind[0],
        children: [
          tokenChildren[0],
          {
            kind: tokenKind[1],
            children: [
              tokenChildren[1],
              { kind: tokenKind[2], children: [tokenChildren[2]] },
            ],
          },
        ],
      },
    ]);

    expect((obj1 as any).children[0]).toEqual(tokenChildren[0]);
    expect((obj1 as any).kind).toEqual(generateKindClassName(tokenKind[0]));

    expect((obj2 as any).children[0]).toEqual(tokenChildren[1]);

    // order of classes doesn't matter
    expect([
      generateKindClassName(tokenKind[0], tokenKind[1]),
      generateKindClassName(tokenKind[1], tokenKind[0]),
    ]).toContain((obj2 as any).kind);

    expect((obj3 as any).children[0]).toEqual(tokenChildren[2]);

    expect([
      generateKindClassName(tokenKind[0], tokenKind[1], tokenKind[2]),
      generateKindClassName(tokenKind[2], tokenKind[1], tokenKind[0]),
      // add other permutations if this test is failing
    ]).toContain((obj3 as any).kind);
  });
});

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
      expect(el).toBeDefined();
      expect(el).not.toBeNull();

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
});
