import React from 'react';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';
import { render, screen, fireEvent } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';
import Code, { hasMultipleLines } from './Code';

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';
const onCopy = jest.fn();

describe('packages/Code', () => {
  const { container } = Context.within(
    Jest.spyContext(ClipboardJS, 'isSupported'),
    spy => {
      spy.mockReturnValue(true);

      return render(
        <Code className={className} language="javascript">
          {codeSnippet}
        </Code>,
      );
    },
  );

  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  const codeContainer = (container.firstChild as HTMLElement).lastChild;
  const codeRoot = (codeContainer as HTMLElement).firstChild;
  const copyButton = codeRoot?.nextSibling?.firstChild as HTMLElement;

  if (!codeRoot || !typeIs.element(codeRoot)) {
    throw new Error('Code element not found');
  }

  if (!copyButton || !typeIs.element(copyButton)) {
    throw new Error('Copy button not found');
  }

  test('root element renders as a <pre> tag', () => {
    expect(codeRoot.tagName).toBe('PRE');
  });

  test(`renders "${className}" in the root element's classList`, () => {
    expect(codeRoot.classList.contains(className)).toBe(true);
  });

  describe('when copyable is true', () => {
    test('onCopy callback is fired when code is copied', () => {
      Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
        spy.mockReturnValue(true);

        render(
          <Code onCopy={onCopy} copyable={true} language="javascript">
            {codeSnippet}
          </Code>,
        );
      });

      const copyIcon = screen.getByRole('button');
      fireEvent.click(copyIcon);
      expect(onCopy).toBeCalledTimes(1);
    });
  });

  describe('hasMultipleLines()', () => {
    test('when passed a single line without preceding and subsequent line breaks, returns "false"', () => {
      const codeExample = `Example`;
      expect(hasMultipleLines(codeExample)).toBeFalsy();
    });

    test('when passed a single line with preceding and subsequent line breaks, returns "false"', () => {
      const codeExample = `\nExample\n`;
      expect(hasMultipleLines(codeExample)).toBeFalsy();
    });

    test('when passed a multiple lines without preceding and subsequent line breaks, returns "true"', () => {
      const codeExample = `Example\nstring`;
      expect(hasMultipleLines(codeExample)).toBeTruthy();
    });

    test('when passed multiple lines with preceding and subsequent line breaks, returns "true"', () => {
      const codeExample = `\nExample\nstring\n`;
      expect(hasMultipleLines(codeExample)).toBeTruthy();
    });
  });
});
