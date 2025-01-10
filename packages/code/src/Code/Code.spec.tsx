import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { typeIs } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import { numOfCollapsedLinesOfCode } from '../constants';
import LanguageSwitcherExample from '../LanguageSwitcher/LanguageSwitcherExample';

import Code, { hasMultipleLines } from './Code';
import { Panel } from '../Panel';
import { CodeProps } from './Code.types';
import { Language } from '../types';

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

const languageOptions = [
  {
    displayName: 'JavaScript',
    language: Language.JavaScript,
  },
  {
    displayName: 'Python',
    language: Language.Python,
  },
];

const renderCode = (props: Partial<CodeProps> = {}) => {
  const renderResults = render(
    <Code language="javascript" {...props}>
      {codeSnippet}
    </Code>,
  );

  return {
    ...renderResults,
  };
};

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

    describe('copy button', () => {
      test.skip('announces copied to screenreaders when content is copied', () => {
        Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
          spy.mockReturnValue(true);
          renderCode();
        });

        const copyIcon = screen.getByRole('button');
        fireEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      test('announces copied to screenreaders when content is copied in the panel', () => {
        Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
          spy.mockReturnValue(true);
          renderCode({ panel: <Panel /> });
        });

        const copyIcon = screen.getByRole('button');
        fireEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });

  const codeContainer = (container.firstChild as HTMLElement).lastChild;
  const codeRoot = (codeContainer as HTMLElement).firstChild; //pre tag
  // const copyButton = codeRoot?.nextSibling?.firstChild as HTMLElement;

  // TODO: add back
  // if (!codeRoot || !typeIs.element(codeRoot)) {
  //   throw new Error('Code element not found');
  // }

  // if (!copyButton || !typeIs.element(copyButton)) {
  //   throw new Error('Copy button not found');
  // }

  test.skip('root element renders as a <pre> tag', () => {
    expect(codeRoot.tagName).toBe('PRE');
  });

  test.skip(`renders "${className}" in the root element's classList`, () => {
    expect(codeRoot.classList.contains(className)).toBe(true);
  });

  // TODO: remove this test when we remove the prop
  describe.skip('when copyable is true', () => {
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

  describe('Without panel slot', () => {
    test('does not render a panel', () => {
      // TODO: update this test
      expect(container).not.toContain(screen.queryByTestId('lg-code-panel'));
    });

    describe('renders a copy button', () => {
      test.todo('when copyAppearance is persist');
      test.todo('when copyAppearance is hover');
    });

    describe('does not renders a copy button', () => {
      test.todo('when copyAppearance is none');
    });
  });

  describe('With panel slot', () => {
    describe('renders', () => {
      test('panel with only the copy button when no props are passed', () => {
        const { queryByTestId } = renderCode({ panel: <Panel /> });
        expect(queryByTestId('lg-code-panel')).toBeDefined();
      });

      test('panel with only the copy button when onCopy is passed', () => {
        const { queryByTestId } = renderCode({
          panel: <Panel onCopy={() => {}} />,
        });
        expect(queryByTestId('lg-code-panel')).toBeDefined();
      });

      test('panel when custom action buttons are present', () => {
        const { queryByTestId } = renderCode({
          panel: (
            <Panel showCustomActionButtons customActionButtons={actionData} />
          ),
        });
        expect(queryByTestId('lg-code-panel')).toBeDefined();
      });
    });

    describe('language switcher', () => {
      test('renders when languageOptions, language, and onChange are defined', () => {
        const { getByTestId } = renderCode({
          language: languageOptions[0],
          panel: (
            <Panel onChange={() => {}} languageOptions={languageOptions} />
          ),
        });
        expect(getByTestId('lg-code-select')).toBeDefined();
      });

      test('does not render if the languageOptions is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          panel: <Panel onChange={() => {}} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });

      test('does not render if onChange is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          panel: <Panel languageOptions={languageOptions} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });

      test('does not render if languageOptions is an empty array', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          panel: <Panel onChange={() => {}} languageOptions={[]} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });

      test('does not render if langauage is a string', () => {
        const { queryByTestId } = renderCode({
          language: 'javascript',
          panel: <Panel onChange={() => {}} languageOptions={[]} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });
    });

    describe('custom action buttons', () => {
      test.todo('does not render if showCustomActionButtons is false');
      test.todo('does not render if customActionButtons is an empty array');
      test.todo(
        'does not render if customActionButtons contains non-IconButton elements',
      );
      test.todo(
        'renders when showCustomActionButtons is true and customActionButtons contains IconButton elements',
      );
    });

    test.skip('is rendered when language switcher is not present, when copyable is false, showCustomActionButtons is true, and actionsButtons has items', () => {
      render(
        <Code
          language="javascript"
          panel={
            <Panel showCustomActionButtons customActionButtons={actionData} />
          }
        >
          {codeSnippet}
        </Code>,
      );
      expect(screen.queryByTestId('lg-code-panel')).toBeDefined();
    });

    test.skip('is not rendered when language switcher is not present, when copyable is false, when showCustomActionButtons is true, and actionsButtons has no items', () => {
      const { container } = render(
        <Code
          language="javascript"
          panel={<Panel showCustomActionButtons customActionButtons={[]} />}
        >
          {codeSnippet}
        </Code>,
      );
      expect(container).not.toContain(screen.queryByTestId('lg-code-panel'));
    });
  });

  describe.skip('when rendered as a language switcher', () => {
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
        language: 'python',
      });
    });
  });

  describe('when expandable', () => {
    const getCodeSnippet = (lineCount: number) =>
      Array.from(
        { length: lineCount },
        (_, i) => `const greeting${i} = "Hello, world! ${i}";`,
      ).join('\n');

    test(`shows no expand button when <= ${numOfCollapsedLinesOfCode} lines of code`, () => {
      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(numOfCollapsedLinesOfCode - 1)}
        </Code>,
      );

      expect(screen.queryByTestId('lg-code-expand_button')).toBeNull();
    });

    test(`shows expand button when > ${numOfCollapsedLinesOfCode} lines of code`, () => {
      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(numOfCollapsedLinesOfCode + 1)}
        </Code>,
      );

      expect(screen.getByTestId('lg-code-expand_button')).toBeInTheDocument();
    });

    test('shows correct number of lines of code on expand button', () => {
      const lineCount = numOfCollapsedLinesOfCode + 1;

      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(lineCount)}
        </Code>,
      );

      const actionButton = screen.getByTestId('lg-code-expand_button');
      expect(actionButton).toHaveTextContent(
        `Click to expand (${lineCount} lines)`,
      );
    });

    test('shows collapse button when expand button is clicked', () => {
      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(numOfCollapsedLinesOfCode + 1)}
        </Code>,
      );

      const actionButton = screen.getByTestId('lg-code-expand_button');
      fireEvent.click(actionButton);
      expect(actionButton).toHaveTextContent('Click to collapse');
    });

    test('shows expand button again when collapse button is clicked', () => {
      const lineCount = numOfCollapsedLinesOfCode + 1;

      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(lineCount)}
        </Code>,
      );

      const actionButton = screen.getByTestId('lg-code-expand_button');
      fireEvent.click(actionButton); // Expand
      fireEvent.click(actionButton); // Collapse

      expect(actionButton).toHaveTextContent(
        `Click to expand (${lineCount} lines)`,
      );
    });
  });
});
