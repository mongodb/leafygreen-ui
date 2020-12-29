import React from 'react';
import { render } from '@testing-library/react';
import Syntax from './Syntax';

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
});
