import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Code from './Code';

// I had to add this in to prevent another error being thrown on the click event (in addition to the TypeError)
window.prompt = jest.fn();

afterAll(cleanup);

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';

describe('packages/Syntax', () => {
  describe('when multiline is true', () => {
    const { container } = render(
      <Code className={className}>{codeSnippet}</Code>,
    );

    const codeContainer = (container.firstChild as HTMLElement).lastChild;
    const codeRoot = (codeContainer as HTMLElement).firstChild;
    const copyButton = codeRoot?.nextSibling?.firstChild as HTMLElement;

    if (!codeRoot || !typeIs.element(codeRoot)) {
      throw new Error('Multiline code element not found');
    }

    if (!copyButton || !typeIs.element(copyButton)) {
      throw new Error('Multiline copy button not found');
    }

    test('root element renders as a <pre> tag', () => {
      expect(codeRoot.tagName).toBe('PRE');
    });

    test(`renders "${className}" in the root element's classList`, () => {
      expect(codeRoot.classList.contains(className)).toBe(true);
    });

    test(`copy button actually copies text to clipboard`, () => {
      // the following line does fire a click event, but it also produces an error
      // TypeError: reselectPrevious is not a function
      fireEvent.click(copyButton);
      const arbitraryInput = render(
        <input
          aria-label="test-input"
          value=""
          onChange={() => {
            console.log('value change');
          }}
        />,
        {
          container: container,
        },
      );
      const inputElement = arbitraryInput.container
        .firstChild as HTMLInputElement;
      // when a paste event is fired, it does not automatically grab text from the clipboard
      // instead, you need to define the value that gets pasted in to the target
      // ideally, I could do this by using the following snippet, but navigator.clipboard is undefined so I can't access it
      /*
        navigator.clipboard.readText().then(
          clipText => fireEvent.paste(inputElement,  { target: { value: clipText }});
          expect(inputElement.value).toBe(codeSnippet);
        );
      */
      fireEvent.paste(inputElement, {
        target: {
          value:
            'ideally the codeSnippet copied from the clipboard would go here instead of this string',
        },
      });
      expect(inputElement.value).toBe(
        'ideally the codeSnippet copied from the clipboard would go here instead of this string',
      );
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

    const codeContainer = (containerRoot as HTMLElement).lastChild;
    const codeRoot = (codeContainer as HTMLElement).firstChild;
    const copyRoot = (codeContainer as HTMLElement).lastChild;

    if (!codeRoot || !typeIs.element(codeRoot)) {
      throw new Error('Single line code element not found');
    }

    if (!copyRoot || !typeIs.element(copyRoot)) {
      throw new Error('Single line copy button not found');
    }

    test('code wrapper element renders as a <div> tag', () => {
      expect(codeRoot.tagName).toBe('DIV');
    });

    test(`renders "${className}" in the root element's classList`, () => {
      expect(codeRoot.classList.contains(className)).toBe(true);
    });
  });
});
