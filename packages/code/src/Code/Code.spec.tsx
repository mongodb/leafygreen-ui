import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import {
  languageOptions,
  renderCode,
  renderCodeWithLanguageSwitcher,
} from '../Code.testutils';
import { numOfCollapsedLinesOfCode } from '../constants';
import { Panel } from '../Panel';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';

import Code from './Code';
import { hasMultipleLines } from './utils';

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
      renderCode({ onCopy, copyable: true });

      const copyIcon = screen.getByRole('button');
      userEvent.click(copyIcon);
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

  describe('isLoading prop', () => {
    describe('when isLoading is true', () => {
      test('renders a skeleton', () => {
        const { getByTestId } = renderCode({ isLoading: true });
        expect(getByTestId('lg-code-skeleton')).toBeInTheDocument();
      });

      test('does not render a pre tag', () => {
        const { queryByTestId } = renderCode({ isLoading: true });
        expect(queryByTestId('lg-code-pre')).toBeNull();
      });

      describe('with panel slot', () => {
        test('language switcher is disabled', () => {
          const { getCopyButtonUtils } = renderCode({
            isLoading: true,
            language: languageOptions[0].displayName,
            panel: (
              <Panel onChange={() => {}} languageOptions={languageOptions} />
            ),
          });

          expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          expect(getCopyButtonUtils().isDisabled()).toBe(true);
        });
        test('copy button is disabled', () => {
          const { getCopyButtonUtils } = renderCode({
            isLoading: true,
            language: languageOptions[0].displayName,
            panel: <Panel />,
          });

          expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          expect(getCopyButtonUtils().isDisabled()).toBe(true);
        });
      });

      describe('without panel slot', () => {
        test('throws error and copy button is not rendered', () => {
          try {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCode({
                  isLoading: true,
                  copyable: false,
                });
              },
            );
            const _ = getCopyButtonUtils().getButton();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              'message',
              expect.stringMatching(
                /Unable to find an element by: \[data-lgid="lg-code-copy_button"\]/,
              ),
            );
          }
        });
      });
    });
    describe('when isLoading is false', () => {
      test('does not render a skeleton', () => {
        const { queryByTestId } = renderCode({ isLoading: false });
        expect(queryByTestId('lg-code-skeleton')).toBeNull();
      });
      test('renders a pre tag', () => {
        const { getByTestId } = renderCode({ isLoading: false });
        expect(getByTestId('lg-code-pre')).toBeInTheDocument();
      });

      describe('with panel slot', () => {
        test('language switcher is enabled', () => {
          const { getLanguageSwitcherUtils } = renderCode({
            isLoading: false,
            language: languageOptions[0].displayName,
            panel: (
              <Panel onChange={() => {}} languageOptions={languageOptions} />
            ),
          });

          expect(getLanguageSwitcherUtils().getInput()).toBeInTheDocument();
          expect(getLanguageSwitcherUtils().isDisabled()).toBe(false);
        });
        test('copy button is enabled', () => {
          const { getCopyButtonUtils } = Context.within(
            Jest.spyContext(ClipboardJS, 'isSupported'),
            spy => {
              spy.mockReturnValue(true);
              return renderCode({
                isLoading: false,
                language: languageOptions[0].displayName,
                panel: <Panel />,
              });
            },
          );

          expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          expect(getCopyButtonUtils().isDisabled()).toBe(false);
        });
      });

      describe('without panel slot', () => {
        test('copy button is enabled', () => {
          const { getCopyButtonUtils } = Context.within(
            Jest.spyContext(ClipboardJS, 'isSupported'),
            spy => {
              spy.mockReturnValue(true);
              return renderCode({
                isLoading: false,
              });
            },
          );

          expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          expect(getCopyButtonUtils().isDisabled()).toBe(false);
        });
      });
    });
  });

  describe('Without panel slot', () => {
    test('does not render a panel', () => {
      const { queryPanel } = renderCode();
      expect(queryPanel()).toBeNull();
    });

    describe('renders a copy button', () => {
      test('with default value of hover', () => {
        const { getCopyButtonUtils } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode();
          },
        );

        expect(getCopyButtonUtils().getButton()).not.toBeNull();
      });
      test('when copyButtonAppearance is persist', () => {
        const { getCopyButtonUtils } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({ copyButtonAppearance: 'persist' });
          },
        );

        expect(getCopyButtonUtils().getButton()).not.toBeNull();
      });
      test('when copyButtonAppearance is hover', () => {
        const { getCopyButtonUtils } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({ copyButtonAppearance: 'hover' });
          },
        );

        expect(getCopyButtonUtils().getButton()).not.toBeNull();
      });
    });

    describe('throws error', () => {
      test('when copyButtonAppearance is none', () => {
        try {
          const { getCopyButtonUtils } = renderCode({
            copyButtonAppearance: 'none',
          });

          const _ = getCopyButtonUtils().getButton();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-code-copy_button"\]/,
            ),
          );
        }
      });
    });
  });

  describe('With panel slot', () => {
    describe('renders', () => {
      test('panel when no props are passed', () => {
        const { queryPanel } = renderCode({ panel: <Panel /> });
        expect(queryPanel()).toBeDefined();
      });

      test('panel when onCopy is passed', () => {
        const { queryPanel } = renderCode({
          panel: <Panel onCopy={() => {}} />,
        });
        expect(queryPanel()).toBeDefined();
      });
    });

    describe('language switcher', () => {
      test('renders when languageOptions, language, and onChange are defined', () => {
        const { getLanguageSwitcherUtils } = renderCode({
          language: languageOptions[0].displayName,
          panel: (
            <Panel onChange={() => {}} languageOptions={languageOptions} />
          ),
        });
        expect(getLanguageSwitcherUtils().getInput()).toBeDefined();
      });

      test('does not render and throws if the languageOptions is not defined', () => {
        try {
          const { getLanguageSwitcherUtils } = renderCode({
            language: languageOptions[0].displayName,
            // @ts-expect-error
            panel: <Panel onChange={() => {}} />,
          });
          const _ = getLanguageSwitcherUtils().getInput();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-code-select"\]/,
            ),
          );
        }
      });

      test('does not render and throws if onChange is not defined', () => {
        try {
          const { getLanguageSwitcherUtils } = renderCode({
            language: languageOptions[0].displayName,
            // @ts-expect-error - onChange is not defined
            panel: <Panel languageOptions={languageOptions} />,
          });
          const _ = getLanguageSwitcherUtils().getInput();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-code-select"\]/,
            ),
          );
        }
      });

      test('does not render and throws if languageOptions is an empty array', () => {
        try {
          const { getLanguageSwitcherUtils } = renderCode({
            language: languageOptions[0].displayName,
            panel: <Panel onChange={() => {}} languageOptions={[]} />,
          });
          const _ = getLanguageSwitcherUtils().getInput();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-code-select"\]/,
            ),
          );
        }
      });

      test('does not render and throws if langauage is a string', () => {
        try {
          const { getLanguageSwitcherUtils } = renderCode({
            language: 'javascript',
            panel: <Panel onChange={() => {}} languageOptions={[]} />,
          });
          const _ = getLanguageSwitcherUtils().getInput();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-code-select"\]/,
            ),
          );
        }
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
        const { queryPanel } = renderCode({
          panel: (
            <Panel
              showCustomActionButtons
              customActionButtons={customActionButtons}
            />
          ),
        });
        expect(queryPanel()).toBeDefined();
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
      const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({});
      expect(getLanguageSwitcherUtils().getInput()).toBeInTheDocument();
      expect(getLanguageSwitcherUtils().getInput()).toHaveTextContent(
        'JavaScript',
      );
    });

    test('clicking the collapsed select menu button opens a select', () => {
      const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({});
      const trigger = getLanguageSwitcherUtils().getInput();
      userEvent.click(trigger!);
      expect(getLanguageSwitcherUtils().getOptions()).toHaveLength(2);
    });

    test('options displayed in select are based on the languageOptions prop', () => {
      const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({});
      const { getInput, getOptionByValue } = getLanguageSwitcherUtils();
      const trigger = getInput();
      userEvent.click(trigger!);

      ['JavaScript', 'Python'].forEach(lang => {
        expect(getOptionByValue(lang)).toBeInTheDocument();
      });
    });

    test('onChange prop gets called when new language is selected', () => {
      const onChange = jest.fn();
      const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({
        props: {
          onChange,
        },
      });
      const { getOptionByValue, getInput } = getLanguageSwitcherUtils();

      const trigger = getInput();
      userEvent.click(trigger!);

      userEvent.click(getOptionByValue('Python')!);
      expect(onChange).toHaveBeenCalled();
    });

    test('onChange prop is called with an object that represents the newly selected language when called', () => {
      const onChange = jest.fn();
      const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({
        props: {
          onChange,
        },
      });
      const { getOptionByValue, getInput } = getLanguageSwitcherUtils();

      const trigger = getInput();
      userEvent.click(trigger!);

      userEvent.click(getOptionByValue('Python')!);

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

    test(`returns null and shows no expand button when <= ${numOfCollapsedLinesOfCode} lines of code`, () => {
      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(numOfCollapsedLinesOfCode - 1)}
        </Code>,
      );
      const { getExpandButtonUtils } = getTestUtils();
      expect(getExpandButtonUtils().queryButton()).toBeNull();
    });

    test(`shows expand button when > ${numOfCollapsedLinesOfCode} lines of code`, () => {
      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(numOfCollapsedLinesOfCode + 1)}
        </Code>,
      );

      const { getExpandButtonUtils } = getTestUtils();

      expect(getExpandButtonUtils().getButton()).toBeInTheDocument();
    });

    test('shows correct number of lines of code on expand button', () => {
      const lineCount = numOfCollapsedLinesOfCode + 1;

      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(lineCount)}
        </Code>,
      );

      const { getExpandButtonUtils } = getTestUtils();

      const actionButton = getExpandButtonUtils().getButton();
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

      const { getExpandButtonUtils, getIsExpanded } = getTestUtils();

      const actionButton = getExpandButtonUtils().getButton();
      userEvent.click(actionButton!);
      expect(actionButton).toHaveTextContent('Click to collapse');
      expect(getIsExpanded()).toBe(true);
    });

    test('shows expand button again when collapse button is clicked', () => {
      const lineCount = numOfCollapsedLinesOfCode + 1;

      render(
        <Code expandable={true} language="javascript">
          {getCodeSnippet(lineCount)}
        </Code>,
      );

      const { getExpandButtonUtils } = getTestUtils();

      const actionButton = getExpandButtonUtils().getButton();
      userEvent.click(actionButton!); // Expand
      userEvent.click(actionButton!); // Collapse

      expect(actionButton).toHaveTextContent(
        `Click to expand (${lineCount} lines)`,
      );
    });
  });

  describe('Deprecated props', () => {
    describe('custom action buttons', () => {
      test('does not renders a panel with custom action buttons when only customActionButtons is passed', () => {
        const { queryPanel } = renderCode({
          customActionButtons,
        });
        expect(queryPanel()).toBeNull();
      });
      test('does not renders a panel with custom action buttons when only showCustomActionButtons is true', () => {
        const { queryPanel } = renderCode({
          showCustomActionButtons: true,
        });
        expect(queryPanel()).toBeNull();
      });
      test('renders a panel with with custom action buttons when showCustomActionButtons is true and customActionButtons is passed', () => {
        const { queryPanel } = renderCode({
          showCustomActionButtons: true,
          customActionButtons,
        });
        expect(queryPanel()).toBeDefined();
      });
    });

    describe('language switcher', () => {
      test('renders a panel when only language, onChange, and languageOptions are defined', () => {
        const { queryPanel } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions,
          onChange: () => {},
        });
        expect(queryPanel()).toBeDefined();
      });
      test('does not render a panel when language and onChange are defined but languageOptions is not defined', () => {
        const { queryPanel } = renderCode({
          language: languageOptions[0].displayName,
          onChange: () => {},
        });
        expect(queryPanel()).toBeNull();
      });
      test('does not render a panel when language and languageOptions are defined but onChange is not defined', () => {
        const { queryPanel } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions,
        });
        expect(queryPanel()).toBeNull();
      });
      test('does not render a panel when languageOptions is an empty array', () => {
        const { queryPanel } = renderCode({
          language: languageOptions[0].displayName,
          languageOptions: [],
          onChange: () => {},
        });
        expect(queryPanel()).toBeNull();
      });
      test('does not render a panel if language is a string', () => {
        const { queryPanel } = renderCode({
          language: 'javascript',
          languageOptions: [],
          onChange: () => {},
        });
        expect(queryPanel()).toBeNull();
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
        const { queryPanel } = Context.within(
          Jest.spyContext(ClipboardJS, 'isSupported'),
          spy => {
            spy.mockReturnValue(true);
            return renderCode({
              copyable: false,
            });
          },
        );
        expect(queryPanel()).toBeNull();
      });
    });

    describe('panel slot', () => {
      describe('copyable', () => {
        test('is overridden by the panel prop', () => {
          const { queryPanel } = renderCode({
            copyable: false,
            panel: <Panel />,
          });
          expect(queryPanel()).toBeDefined();
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
