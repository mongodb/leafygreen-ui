import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { processToken, LineTableRow } from './renderingPlugin';

describe('processToken()', () => {
  test('when passed `null`, it retuns `null`', () => {
    expect(processToken(null)).toBeNull();
    expect(processToken(null, 0)).toBeNull();
    expect(processToken(null, 1)).toBeNull();
  });

  test('when passed undefined, it retuns `null`', () => {
    expect(processToken(undefined)).toBeNull();
    expect(processToken(undefined, 0)).toBeNull();
    expect(processToken(undefined, 1)).toBeNull();
  });

  test('when passed an Array, it returns an Array', () => {
    expect(processToken([])).toBeInstanceOf(Array);
    expect(
      processToken([{ foo: 'bar' }, { hello: 'world' }], 0),
    ).toBeInstanceOf(Array);
    expect(processToken([null, null, null], 1)).toBeInstanceOf(Array);
  });

  test('when passed an object, it returns a React element', () => {
    expect(React.isValidElement(processToken({}))).toBeTruthy();
    expect(React.isValidElement(processToken({}, 0))).toBeTruthy();
    expect(React.isValidElement(processToken({}, 1))).toBeTruthy();

    expect(React.isValidElement(processToken({ kind: 'hello' }))).toBeTruthy();
    expect(
      React.isValidElement(processToken({ kind: 'hello' }, 0)),
    ).toBeTruthy();
    expect(
      React.isValidElement(processToken({ kind: 'hello' }, 1)),
    ).toBeTruthy();
  });

  test('when passed a string, it returns astring', () => {
    expect(processToken('hello')).toBe('hello');
    expect(processToken('hello', 0)).toBe('hello');
    expect(processToken('hello', 1)).toBe('hello');
  });

  test("when processToken is passed an argument that's not explicitly supported, it returns that value", () => {
    expect(processToken(false)).toBe(false);
    expect(processToken(false, 0)).toBe(false);
    expect(processToken(false, 1)).toBe(false);
  });
});

describe('LineTableRow', () => {
  const content = 'hello';
  const lineNumber = 1;

  function renderLineTableRow(): RenderResult {
    return render(
      <LineTableRow lineNumber={lineNumber}>{content}</LineTableRow>,
    );
  }

  test('renders a single table row as the root node', () => {
    const { container } = renderLineTableRow();

    // This component must return a <tr> as the root node.
    // We use container.children here rather than a selector like getAllByRole('row')
    // to be sure that we're selecting the root node.
    const rows = container.children;

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

describe('treeToLines', () => {
  // placeholder
});
