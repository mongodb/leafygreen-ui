import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import { numOfCollapsedLinesOfCode } from '../constants';

import Code, { hasMultipleLines } from './Code';
import { Panel } from '../Panel';
import { CodeProps } from './Code.types';
import { Language } from '../types';
import { PanelProps } from '../Panel/Panel.types';

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';
const onCopy = jest.fn();

const customActionButtons = [
  <IconButton
    onClick={() => {}}
    aria-label="label"
    key="1"
    data-testid="lg-code-icon_button"
  >
    <Icon glyph="Cloud" />
  </IconButton>,
  <Icon glyph="Shell" size={30} key="3" data-testid="lg-code-icon_button" />,
  <IconButton
    href="https://mongodb.design"
    aria-label="label2"
    key="2"
    target="_blank"
    data-testid="lg-code-icon_button"
  >
    <Icon glyph="Code" size={30} />
  </IconButton>,
];

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

const renderCodeWithLanguageSwitcher = (props: Partial<PanelProps> = {}) => {
  const renderResults = render(
    <Code
      language={languageOptions[0]}
      panel={
        <Panel
          onChange={() => {}}
          languageOptions={languageOptions}
          {...props}
        />
      }
    >
      {codeSnippet}
    </Code>,
  );

  return {
    ...renderResults,
  };
};

describe('packages/Code', () => {
  // https://stackoverflow.com/a/69574825/13156339
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      // Provide mock implementation
      writeText: jest.fn().mockReturnValueOnce(Promise.resolve()),
    },
  });

  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = Context.within(
        Jest.spyContext(ClipboardJS, 'isSupported'),
        spy => {
          spy.mockReturnValue(true);
          return renderCode();
        },
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    describe('copy button', () => {
      test.skip('announces copied to screenreaders when content is copied without a panel', () => {
        Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
          spy.mockReturnValue(true);
          return renderCode();
        });

        const copyIcon = screen.getByRole('button');
        fireEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      test('announces copied to screenreaders when content is copied in the panel', () => {
        Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
          spy.mockReturnValue(true);
          return renderCode({ panel: <Panel /> });
        });

        const copyIcon = screen.getByRole('button');
        fireEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
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

  describe('Deprecated props', () => {
    describe('custom action buttons', () => {
      test('does not renders a panel with custom action buttons when only customActionButtons is passed', () => {
        const { queryByTestId } = renderCode({
          customActionButtons,
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not renders a panel with custom action buttons when only showCustomActionButtons is true', () => {
        const { queryByTestId } = renderCode({
          showCustomActionButtons: true,
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      // TODO: think about the copyable prop when it is false
      test('renders a panel with with custom action buttons when showCustomActionButtons is true and customActionButtons is passed', () => {
        const { getByTestId } = renderCode({
          showCustomActionButtons: true,
          customActionButtons,
          copyable: false,
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
    });

    describe('language switcher', () => {
      test('renders a panel when only language, onChange, and languageOptions are defined', () => {
        const { getByTestId } = renderCode({
          language: languageOptions[0],
          languageOptions,
          onChange: () => {},
          copyable: false,
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
      test('does not render a panel when language and onChange are defined but languageOptions is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          onChange: () => {},
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel when language and languageOptions are defined but onChange is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          languageOptions,
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel when languageOptions is an empty array', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0],
          languageOptions: [],
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel if language is a string', () => {
        const { queryByTestId } = renderCode({
          language: 'javascript',
          languageOptions: [],
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      // TODO: this test breaks the component
      test.skip('does not render a panel if language is not in languageOptions', () => {
        const { queryByTestId } = renderCode({
          language: {
            displayName: 'Testing',
            // @ts-expect-error - language is not valid
            language: 'testing',
          },
          languageOptions,
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
    });

    describe('chromeTitle', () => {
      test('renders a panel with a title when chromeTitle is defined', () => {
        const { getByTestId } = renderCode({
          chromeTitle: 'Title',
          copyable: false,
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
    });

    describe('copyable', () => {
      test('renders a panel with a copy button when only copyable is true', () => {
        const { getByTestId } = renderCode({
          copyable: true,
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
      test('does not render a panel with a copy button when copyable is false', () => {
        const { queryByTestId } = renderCode({
          copyable: false,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
    });

    describe('panel slot', () => {
      describe('copyable', () => {
        test('is overridden by the panel prop', () => {
          const { getByTestId } = renderCode({
            copyable: false,
            panel: <Panel />,
          });
          expect(getByTestId('lg-code-panel')).toBeDefined();
        });
      });

      describe('language switcher', () => {
        test('is overridden by the panel prop', () => {
          const { getByTestId } = renderCode({
            language: languageOptions[1],
            languageOptions,
            onChange: () => {},
            panel: (
              <Panel
                data-testid="lg-code_panel-override"
                languageOptions={languageOptions}
                onChange={() => {}}
              />
            ),
          });
          expect(getByTestId('lg-code_panel-override')).toBeDefined();
          expect(
            screen.getByRole('button', { name: 'Python' }),
          ).toBeInTheDocument();
        });
      });
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
    test.skip('does not render a panel', () => {
      // TODO: update this test
      const { container } = renderCode();
      expect(container).not.toContain(screen.queryByTestId('lg-code-panel'));
    });

    describe('renders a copy button', () => {
      test('with default value', () => {
        const { queryByTestId } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode();
          },
        );
        expect(queryByTestId('lg-code-copy_button')).not.toBeNull();
      });
      test('when copyButtonAppearance is persist', () => {
        const { queryByTestId } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({ copyButtonAppearance: 'persist' });
          },
        );
        expect(queryByTestId('lg-code-copy_button')).not.toBeNull();
      });
      test('when copyButtonAppearance is hover', () => {
        const { queryByTestId } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({ copyButtonAppearance: 'hover' });
          },
        );
        expect(queryByTestId('lg-code-copy_button')).not.toBeNull();
      });
    });

    describe('does not renders a copy button', () => {
      test('when copyButtonAppearance is none', () => {
        const { queryByTestId } = renderCode({ copyButtonAppearance: 'none' });
        expect(queryByTestId('lg-code-copy_button')).toBeNull();
      });
    });

    // TODO: get this to work
    test.skip('copies the correct text when copy button is clicked', () => {
      const { queryByTestId } = Context.within(
        Jest.spyContext(ClipboardJS, 'isSupported'),
        spy => {
          spy.mockReturnValue(true);
          return render(<Code language="javascript">{codeSnippet}</Code>);
        },
      );

      const copyButton = queryByTestId('lg-code-copy_button');
      expect(copyButton).not.toBeNull();
      userEvent.click(copyButton);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeSnippet);
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

      test.todo('copies the correct text when copy button is clicked');
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

      test.todo('does not render if language is not in languageOptions');
    });

    describe('custom action buttons', () => {
      test('do not render if showCustomActionButtons is false', () => {
        const { queryAllByTestId } = renderCode({
          panel: (
            <Panel
              showCustomActionButtons={false}
              customActionButtons={customActionButtons}
            />
          ),
        });
        expect(queryAllByTestId('lg-code-icon_button')).toHaveLength(0);
      });
      test('do not render if customActionButtons is an empty array', () => {
        const { queryAllByTestId } = renderCode({
          panel: <Panel showCustomActionButtons customActionButtons={[]} />,
        });
        expect(queryAllByTestId('lg-code-icon_button')).toHaveLength(0);
      });
      test('only renders IconButton elements', () => {
        const { queryAllByTestId } = renderCode({
          panel: (
            <Panel
              showCustomActionButtons
              customActionButtons={customActionButtons}
            />
          ),
        });
        expect(queryAllByTestId('lg-code-icon_button')).toHaveLength(2);
      });
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
      renderCodeWithLanguageSwitcher();
      expect(
        screen.getByRole('button', { name: 'JavaScript' }),
      ).toBeInTheDocument();
    });

    test('clicking the collapsed select menu button opens a select', () => {
      renderCodeWithLanguageSwitcher();
      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      userEvent.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    test('options displayed in select are based on the languageOptions prop', () => {
      renderCodeWithLanguageSwitcher();
      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      userEvent.click(trigger);

      ['JavaScript', 'Python'].forEach(lang => {
        expect(screen.getByRole('option', { name: lang })).toBeInTheDocument();
      });
    });

    test('onChange prop gets called when new language is selected', () => {
      const onChange = jest.fn();
      renderCodeWithLanguageSwitcher({ onChange });

      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      userEvent.click(trigger);

      userEvent.click(screen.getByRole('option', { name: 'Python' }));
      expect(onChange).toHaveBeenCalled();
    });

    test('onChange prop is called with an object that represents the newly selected language when called', () => {
      const onChange = jest.fn();
      renderCodeWithLanguageSwitcher({ onChange });

      const trigger = screen.getByRole('button', { name: 'JavaScript' });
      userEvent.click(trigger);

      userEvent.click(screen.getByRole('option', { name: 'Python' }));

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
