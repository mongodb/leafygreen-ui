import React from 'react';
import { render } from '@testing-library/react';
import Syntax from './Syntax';

function testSnippetRenders(codeSnippet: string) {
  test("renders the full content that's passed in", () => {
    const { getByRole } = render(
      <Syntax language="javascript" lineNumberStart={1}>
        {codeSnippet}
      </Syntax>,
    );

    const table = getByRole('table');

    // We expect textContent to equal the content that's passed in, except
    // that new line characters are completely removed.
    const expectedContent = codeSnippet.replace(/\r?\n|\r/g, '');

    expect(table.textContent).toEqual(expectedContent);
  });
}

describe('packages/Syntax', () => {
  const className = 'test-class';
  const singleLine = 'const greeting = "Hello, world!";';
  const singleLineJSX = '() => <Icon glyph="Plus" fill="#FF0000" />';
  const multipleLines = `

  function greeting(entity) {
    return \`Hello, \${entity}!\`;
  }

  console.log(greeting('World'));

  `;

  test(`renders "${className}" in the code element's classList`, () => {
    const { container } = render(
      <Syntax language="none" className={className} lineNumberStart={1}>
        {singleLine}
      </Syntax>,
    );

    const code = container.firstChild as HTMLElement;
    expect(code.classList.contains(className)).toBe(true);
  });

  test("doesn't highlight code when language is 'none'", () => {
    const { container } = render(
      <Syntax language="none" className={className} lineNumberStart={1}>
        {singleLine}
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
      <Syntax className={className} language="javascript" lineNumberStart={1}>
        {singleLine}
      </Syntax>,
    );

    const tableCells = container.querySelectorAll('td');

    Array.from(tableCells).forEach(child => {
      // We test for more than one node rather than a specific number here and below to ensure
      // we're testing this component rather than the underlying library's implementation.
      expect(child.children.length).toBeGreaterThan(1);
    });
  });

  const codeSnippets = [singleLine, singleLineJSX, multipleLines];

  codeSnippets.forEach(testSnippetRenders);
});
