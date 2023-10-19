import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { typeIs } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import LanguageSwitcherExample, {
  PythonLogo,
} from '../LanguageSwitcher/LanguageSwitcherExample';

import Code, { hasMultipleLines } from './Code';

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';
const onCopy = jest.fn();

const actionData = [
  <IconButton
    href="https://mongodb.design"
    aria-label="label"
    darkMode={true}
    key="1"
    target="_blank"
  >
    <Icon glyph="Code" />
  </IconButton>,
];

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

    test('announces copied to screenreaders when content is copied', () => {
      Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
        spy.mockReturnValue(true);

        render(
          <Code copyable={true} language="javascript">
            {codeSnippet}
          </Code>,
        );
      });

      const copyIcon = screen.getByRole('button');
      fireEvent.click(copyIcon);
      expect(screen.getByRole('alert')).toBeInTheDocument();
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
      expect(onCopy).toHaveBeenCalledTimes(1);
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

  describe('panel', () => {
    test('is not rendered when language switcher is not present and when copyable is false and showCustomActionButtons is false', () => {
      expect(container).not.toContain(
        screen.queryByTestId('leafygreen-code-panel'),
      );
    });

    test('is rendered when language switcher is not present, when copyable is false, showCustomActionButtons is true, and actionsButtons has items', () => {
      render(
        <Code
          language="javascript"
          showCustomActionButtons
          customActionButtons={actionData}
        >
          {codeSnippet}
        </Code>,
      );
      expect(screen.queryByTestId('leafygreen-code-panel')).toBeDefined();
    });

    test('is not rendered when language switcher is not present, when copyable is false, when showCustomActionButtons is true, and actionsButtons has no items', () => {
      const { container } = render(
        <Code
          language="javascript"
          showCustomActionButtons
          customActionButtons={[]}
        >
          {codeSnippet}
        </Code>,
      );
      expect(container).not.toContain(
        screen.queryByTestId('leafygreen-code-panel'),
      );
    });
  });

  describe('when rendered as a language switcher', () => {
    let offsetParentSpy: jest.SpyInstance;
    beforeAll(() => {
      offsetParentSpy = jest.spyOn(
        HTMLElement.prototype,
        'offsetParent',
        'get',
      );

      // JSDOM doesn't implement `HTMLElement.prototype.offsetParent`, so this
      // falls back to the parent element since it doesn't matter for these tests.
      offsetParentSpy.mockImplementation(function (this: HTMLElement) {
        return this.parentElement;
      });
    });

    afterAll(() => {
      if (offsetParentSpy.mock.calls.length === 0) {
        // throw Error('`HTMLElement.prototype.offsetParent` was never called');
      }
      offsetParentSpy.mockRestore();
    });

    test('a collapsed select is rendered, with an active state based on the language prop', () => {
      render(<LanguageSwitcherExample />);
      expect(
        screen.getByRole('button', { name: 'JavaScript' }),
      ).toBeInTheDocument();
    });

    test('clicking the collapsed select menu button opens a select', () => {
      render(<LanguageSwitcherExample />);
      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      fireEvent.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    test('options displayed in select are based on the languageOptions prop', () => {
      render(<LanguageSwitcherExample />);
      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      fireEvent.click(trigger);

      ['JavaScript', 'Python'].forEach(lang => {
        expect(screen.getByRole('option', { name: lang })).toBeInTheDocument();
      });
    });

    test('onChange prop gets called when new language is selected', () => {
      const onChange = jest.fn();
      render(<LanguageSwitcherExample onChange={onChange} />);

      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      fireEvent.click(trigger);

      fireEvent.click(screen.getByRole('option', { name: 'Python' }));
      expect(onChange).toHaveBeenCalled();
    });

    test('onChange prop is called with an object that represents the newly selected language when called', () => {
      const onChange = jest.fn();
      render(<LanguageSwitcherExample onChange={onChange} />);

      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      fireEvent.click(trigger);

      fireEvent.click(screen.getByRole('option', { name: 'Python' }));

      expect(onChange).toHaveBeenCalledWith({
        displayName: 'Python',
        image: <PythonLogo />,
        language: 'python',
      });
    });
  });
});
