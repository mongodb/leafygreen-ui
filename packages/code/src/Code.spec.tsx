import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Code from './Code';

afterAll(cleanup);

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';

describe('packages/Syntax', () => {
  describe('when multiline is true', () => {
    const {
      container: { firstChild: containerRoot },
    } = render(<Code className={className}>{codeSnippet}</Code>);

    const codeRoot = (containerRoot as HTMLElement).lastChild;

    if (!codeRoot || !typeIs.element(codeRoot)) {
      throw new Error('Multiline code element not found');
    }

    test('root element renders as a <pre> tag', () => {
      expect(codeRoot.tagName).toBe('PRE');
    });

    test(`renders "${className}" in the root element's classList`, () => {
      expect(codeRoot.classList.contains(className)).toBe(true);
    });
  });

  describe('when multiline is false', () => {
    const {
      container: { firstChild: containerRoot },
    } = render(
      <Code className={className} multiline={false}>
        {codeSnippet}
      </Code>,
    );

    const codeRoot = (containerRoot as HTMLElement).lastChild;

    if (!codeRoot || !typeIs.element(codeRoot)) {
      throw new Error('Single line code element not found');
    }

    test('code wrapper element renders as a <div> tag', () => {
      expect(codeRoot.tagName).toBe('DIV');
    });

    test(`renders "${className}" in the root element's classList`, () => {
      expect(codeRoot.classList.contains(className)).toBe(true);
    });
  });
});
