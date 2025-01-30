import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import { numOfCollapsedLinesOfCode } from '../constants';
import { Panel } from '../Panel';
import { PanelProps } from '../Panel/Panel.types';
import { Language } from '../types';

import Code, { hasMultipleLines } from './Code';
import { CodeProps } from './Code.types';

const codeSnippet = 'const greeting = "Hello, world!";';

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
      language={languageOptions[0].displayName}
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

jest.mock('clipboard', () => {
  const ClipboardJSOriginal = jest.requireActual('clipboard');

  // Return a mock that preserves the class and mocks `isSupported`
  return class ClipboardJSMock extends ClipboardJSOriginal {
    static isSupported = jest.fn(() => true); // Mock isSupported
  };
});

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
      const { container } = renderCode();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    describe('copy button', () => {
      test('announces copied to screenreaders when content is copied without a panel', () => {
        renderCode();
        const copyIcon = screen.getByRole('button');
        userEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      test('announces copied to screenreaders when content is copied in the panel', () => {
        renderCode({ panel: <Panel /> });
        const copyIcon = screen.getByRole('button');
        userEvent.click(copyIcon);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });

  // TODO: remove this test when we remove the prop
  describe('when copyable is true', () => {
    test('onCopy callback is fired when code is copied', () => {
      const onCopy = jest.fn();
      Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
        spy.mockReturnValue(true);

        render(
          <Code onCopy={onCopy} copyable={true} language="javascript">
            {codeSnippet}
          </Code>,
        );
      });

      const copyIcon = screen.getByRole('button');
      userEvent.click(copyIcon);
      expect(onCopy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Deprecated props', () => {
    describe('custom action buttons', () => {
      test('does not renders a panel with custom action buttons when only customActionButtons is passed', () => {
        const { queryByTestId } = renderCode({
          customActionButtons,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not renders a panel with custom action buttons when only showCustomActionButtons is true', () => {
        const { queryByTestId } = renderCode({
          showCustomActionButtons: true,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('renders a panel with with custom action buttons when showCustomActionButtons is true and customActionButtons is passed', () => {
        const { getByTestId } = renderCode({
          showCustomActionButtons: true,
          customActionButtons,
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
    });

    describe('language switcher', () => {
      test('renders a panel when only language, onChange, and languageOptions are defined', () => {
        const { getByTestId } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions,
          onChange: () => {},
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
      });
      test('does not render a panel when language and onChange are defined but languageOptions is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
          onChange: () => {},
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel when language and languageOptions are defined but onChange is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions,
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel when languageOptions is an empty array', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions: [],
          onChange: () => {},
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('does not render a panel if language is a string', () => {
        const { queryByTestId } = renderCode({
          language: 'javascript',
          languageOptions: [],
          onChange: () => {},
        });
        expect(queryByTestId('lg-code-panel')).toBeNull();
      });
      test('throws an error if language is not in languageOptions', () => {
        try {
          renderCode({
            language: 'Testing',
            languageOptions,
            onChange: () => {},
          });
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unknown language: "Testing"/),
          );
        }
      });
    });

    describe('chromeTitle', () => {
      test('renders a panel with a title when chromeTitle is defined', () => {
        const { getByTestId } = renderCode({
          chromeTitle: 'Title',
        });
        expect(getByTestId('lg-code-panel')).toBeDefined();
        expect(getByTestId('lg-code-panel')).toHaveTextContent('Title');
      });
    });

    describe('copyable', () => {
      test('renders a panel with a copy button when only copyable is true', () => {
        const { getByTestId } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({
              copyable: true,
            });
          },
        );
        expect(getByTestId('lg-code-panel')).toBeDefined();
        expect(getByTestId('lg-code-copy_button')).toBeDefined();
      });
      test('does not render a panel with a copy button when copyable is false', () => {
        const { queryByTestId } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({
              copyable: false,
            });
          },
        );
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
            language: languageOptions[1].displayName,
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
    test('does not render a panel', () => {
      const { queryByTestId } = renderCode();
      expect(queryByTestId('lg-code-panel')).toBeNull();
    });

    describe('renders a copy button', () => {
      test('with default value of hover', () => {
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
    // eslint-disable-next-line jest/no-disabled-tests
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
    });

    describe('language switcher', () => {
      test('renders when languageOptions, language, and onChange are defined', () => {
        const { getByTestId } = renderCode({
          language: languageOptions[0].displayName,
          panel: (
            <Panel onChange={() => {}} languageOptions={languageOptions} />
          ),
        });
        expect(getByTestId('lg-code-select')).toBeDefined();
      });

      test('does not render if the languageOptions is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
          // @ts-expect-error
          panel: <Panel onChange={() => {}} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });

      test('does not render if onChange is not defined', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
          // @ts-expect-error - onChange is not defined
          panel: <Panel languageOptions={languageOptions} />,
        });
        expect(queryByTestId('lg-code-select')).toBeNull();
      });

      test('does not render if languageOptions is an empty array', () => {
        const { queryByTestId } = renderCode({
          language: languageOptions[0].displayName,
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

      test('throws an error if language is not in languageOptions', () => {
        try {
          renderCode({
            language: 'Testing',
            panel: <Panel onChange={() => {}} languageOptions={[]} />,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unknown language: "Testing"/),
          );
        }
      });
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

      test('renders when custom action buttons are present and showCustomActionButtons is true', () => {
        const { queryByTestId } = renderCode({
          panel: (
            <Panel showCustomActionButtons customActionButtons={actionData} />
          ),
        });
        expect(queryByTestId('lg-code-panel')).toBeDefined();
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
      userEvent.click(actionButton);
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
      userEvent.click(actionButton); // Expand
      userEvent.click(actionButton); // Collapse

      expect(actionButton).toHaveTextContent(
        `Click to expand (${lineCount} lines)`,
      );
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      <Code
        language="javascript"
        customActionButtons={[]}
        showCustomActionButtons={true}
        chromeTitle=""
        languageOptions={[]}
        onChange={() => {}}
        copyable={true}
      >
        snippet
      </Code>
      <Code language="javascript">snippet</Code>
      {/* @ts-expect-error - missing language prop */}
      <Code>snippet</Code>
      {/* @ts-expect-error - missing children */}
      <Code language="javascript"></Code>
      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        panel={<Panel />}
      >
        snippet
      </Code>

      {/* @ts-expect-error - cannot pass both panel and copyButtonAppearance */}
      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        panel={<Panel />}
        copyButtonAppearance="hover"
      >
        snippet
      </Code>

      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        copyButtonAppearance="hover"
      >
        snippet
      </Code>

      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        // @ts-expect-error - onChange prop is missing on <Panel />
        panel={<Panel languageOptions={[]} />}
      >
        snippet
      </Code>
      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        // @ts-expect-error - languageOptions prop is missing on <Panel />
        panel={<Panel onChange={() => {}} />}
      >
        snippet
      </Code>
      <Code
        language="javascript"
        showLineNumbers={true}
        onCopy={() => {}}
        darkMode={true}
        panel={
          <Panel
            onChange={() => {}}
            languageOptions={[]}
            showCustomActionButtons
            customActionButtons={[]}
            title="Title"
          />
        }
      >
        snippet
      </Code>
    </>;
  });
});
