import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Syntax from './Syntax';

afterAll(cleanup);

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';

describe('packages/Syntax', () => {
  const { container } = render(
    <Syntax lang='none' className={className}>{codeSnippet}</Syntax>,
  );

  const code = container.firstChild as HTMLElement;

  if (!code || !typeIs.element(code)) {
    throw new Error('Code element not found');
  }

  test(`renders "${className}" in the code element's classList`, () => {
    expect(code.classList.contains(className)).toBe(true);
  });

  test("doesn't highlight code when lang is 'none'", () => {
    // Text nodes in HTMLCollections are ignored since they are not considered "elements",
    // so we check that children is empty here since we expect a text node to be rendered.
    //
    // https://www.w3.org/TR/domcore/#concept-element
    expect(code.children.length).toBe(0);
  });

  test ("highlights code when lang is 'javascript'", () => {
    render(
      <Syntax className={className} lang='javascript'>{codeSnippet}</Syntax>,
      { container },
    );

    // We test for more than one node rather than a specific number here and below to ensure
    // we're testing this component rather than the underlying library's implementation.
    expect(code.children.length).toBeGreaterThan(1);
  })

  test ("highlights code when lang is 'auto'", () => {
    render(
      <Syntax className={className} lang='auto'>{codeSnippet}</Syntax>,
      { container },
    );

    expect(code.children.length).toBeGreaterThan(1);
  })
});
