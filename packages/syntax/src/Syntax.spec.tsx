import React from 'react';
import { render } from '@testing-library/react';
import Syntax, {
  expandRangeTuple,
  normalizeLineHighlightingDefinition,
} from './Syntax';

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';

describe('packages/Syntax', () => {
  test(`renders "${className}" in the code element's classList`, () => {
    const { container } = render(
      <Syntax language="none" className={className}>
        {codeSnippet}
      </Syntax>,
    );

    const code = container.firstChild as HTMLElement;
    expect(code.classList.contains(className)).toBe(true);
  });

  test("doesn't highlight code when language is 'none'", () => {
    const { container } = render(
      <Syntax language="none" className={className}>
        {codeSnippet}
      </Syntax>,
    );

    const tableCells = container.querySelectorAll('td');
    Array.from(tableCells).forEach(child => {
      // Text nodes in HTMLCollections are ignored since they are not considered "elements",
      // so we check that the table cell is empty here since we expect a text node to be rendered.
      //
      // https://www.w3.org/TR/domcore/#concept-element
      expect(child.children.length).toBe(0);
    });
  });

  test("highlights code when language is 'javascript'", () => {
    const { container } = render(
      <Syntax className={className} language="javascript">
        {codeSnippet}
      </Syntax>,
    );
    const tableCells = container.querySelectorAll('td');

    Array.from(tableCells).forEach(child => {
      // We test for more than one node rather than a specific number here and below to ensure
      // we're testing this component rather than the underlying library's implementation.
      expect(child.children.length).toBeGreaterThan(1);
    });
  });

  describe('expandRangeTuple()', () => {
    test('when passed two numbers, returns an inclusive array of that range', () => {
      expect(expandRangeTuple([0, 5])).toEqual([0, 1, 2, 3, 4, 5]);
      expect(expandRangeTuple([2, 5])).toEqual([2, 3, 4, 5]);
      expect(expandRangeTuple([5, 2])).toEqual([2, 3, 4, 5]);
      expect(expandRangeTuple([0, 0])).toEqual([0]);
      expect(expandRangeTuple([2, 2])).toEqual([2]);
      expect(expandRangeTuple([-1, 1])).toEqual([0, 1]);
    });
  });

  describe('normalizeLineHighlightingDefinition()', () => {
    test('when passed an empty array, returns an empty array', () => {
      expect(normalizeLineHighlightingDefinition([])).toEqual([]);
    });

    test('when passed an array of numbers, returns an array of those numbers', () => {
      expect(normalizeLineHighlightingDefinition([0, 1])).toEqual([0, 1]);
      expect(normalizeLineHighlightingDefinition([1, 2])).toEqual([1, 2]);
    });

    test('when passed an array of tuples, returns an array of numbers', () => {
      expect(normalizeLineHighlightingDefinition([[0, 1]])).toEqual([0, 1]);
      expect(
        normalizeLineHighlightingDefinition([
          [1, 3],
          [4, 4],
          [7, 5],
        ]),
      ).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('when passed an array of tuples and numbers, returns an array of numbers', () => {
      expect(normalizeLineHighlightingDefinition([[1, 3], 4, [7, 5]])).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]);
    });
  });
});
