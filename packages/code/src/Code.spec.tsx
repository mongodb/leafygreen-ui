import ClipboardJS from 'clipboard';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';
import Code from './Code';

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';
const onCopy = jest.fn();

describe('packages/Syntax', () => {
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
});
