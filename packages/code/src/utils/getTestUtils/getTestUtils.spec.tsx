import userEvent from '@testing-library/user-event';
import ClipboardJS from 'clipboard';

import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import {
  renderCode,
  renderCodeWithLanguageSwitcher,
  renderMultipleCodes,
} from '../../Code.testutils';

import { getTestUtils } from './getTestUtils';

describe('packages/tabs/getTestUtils', () => {
  test('throws error if Code is not found', () => {
    try {
      renderCode({ 'data-lgid': 'lg-different-id' });
      const _utils = getTestUtils();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        expect.stringMatching(
          /Unable to find an element by: \[data-lgid="lg-code"\]/,
        ),
      );
    }
  });

  describe('single Code', () => {
    describe('getLanguage', () => {
      test('returns the language', () => {
        renderCode();
        const { getLanguage } = getTestUtils();
        expect(getLanguage()).toBe('javascript');
      });
    });

    describe('getTitle', () => {
      describe('Without the panel', () => {
        test('returns null', () => {
          renderCode();
          const { getTitle } = getTestUtils();
          expect(getTitle()).toBeNull();
        });
      });
      describe('With panel', () => {
        test('returns null if there is no title prop', () => {
          renderCodeWithLanguageSwitcher({});
          const { getTitle } = getTestUtils();
          expect(getTitle()).toBeNull();
        });

        test('returns the title', () => {
          renderCodeWithLanguageSwitcher({ props: { title: 'Leafygreen' } });
          const { getTitle } = getTestUtils();
          expect(getTitle()).toBe('Leafygreen');
        });
      });
    });

    describe('getLanguageSwitcherUtils', () => {
      describe('getInput', () => {
        test('returns the language switcher', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcherUtils } = getTestUtils();
          expect(getLanguageSwitcherUtils().getInput()).toBeInTheDocument();
        });

        test('throws error is the languageSwitcher cannot be found', () => {
          try {
            renderCode();
            const { getLanguageSwitcherUtils } = getTestUtils();
            const input = getLanguageSwitcherUtils().getInput();
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
      });

      describe('isDisabled', () => {
        test('returns false', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcherUtils } = getTestUtils();
          expect(getLanguageSwitcherUtils().isDisabled()).toBe(false);
        });

        test('returns true', () => {
          renderCodeWithLanguageSwitcher({ isLoading: true });
          const { getLanguageSwitcherUtils } = getTestUtils();
          expect(getLanguageSwitcherUtils().isDisabled()).toBe(true);
        });
      });

      describe('getAllOptions', () => {
        test('returns all options', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcherUtils } = getTestUtils();
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(getLanguageSwitcherUtils().getAllOptions()).toHaveLength(2);
        });
      });

      describe('getOptionByValue', () => {
        test('returns the option', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcherUtils } = getTestUtils();
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(
            getLanguageSwitcherUtils().getOptionByValue('JavaScript'),
          ).toBeInTheDocument();
        });

        test('returns null', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcherUtils } = getTestUtils();
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(
            getLanguageSwitcherUtils().getOptionByValue('wrong'),
          ).toBeNull();
        });
      });
    });

    describe('getIsLoading', () => {
      test('returns false', () => {
        renderCode();
        const { getIsLoading } = getTestUtils();
        expect(getIsLoading()).toBe(false);
      });

      test('returns true', () => {
        renderCode({ isLoading: true });
        const { getIsLoading } = getTestUtils();
        expect(getIsLoading()).toBe(true);
      });
    });

    describe('getCopyButtonUtils', () => {
      describe('getButton', () => {
        describe('Without a panel', () => {
          test('returns the copy button', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCode();
            });
            const { getCopyButtonUtils } = getTestUtils();
            expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          });
          test('returns null', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCode({ copyButtonAppearance: 'none' });
            });
            const { getCopyButtonUtils } = getTestUtils();
            expect(getCopyButtonUtils().getButton()).toBeNull();
          });
        });

        describe('With a panel', () => {
          test('returns the copy button', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCodeWithLanguageSwitcher({});
            });
            const { getCopyButtonUtils } = getTestUtils();
            expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          });
        });
      });

      describe('isDisabled', () => {
        test('returns true', () => {
          Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
            spy.mockReturnValue(true);
            return renderCodeWithLanguageSwitcher({ isLoading: true });
          });
          const { getCopyButtonUtils } = getTestUtils();
          expect(getCopyButtonUtils().isDisabled()).toBe(true);
        });

        test('returns false', () => {
          Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
            spy.mockReturnValue(true);
            return renderCodeWithLanguageSwitcher({});
          });
          const { getCopyButtonUtils } = getTestUtils();
          expect(getCopyButtonUtils().isDisabled()).toBe(false);
        });
      });
    });

    describe('getExpandButtonUtils', () => {
      describe('getButton', () => {
        test('return null', () => {
          renderCode();
          const { getExpandButtonUtils } = getTestUtils();
          expect(getExpandButtonUtils().getButton()).toBeNull();
        });

        test('returns the expand button', () => {
          renderCode({ expandable: true });
          const { getExpandButtonUtils } = getTestUtils();
          expect(getExpandButtonUtils().getButton()).toBeInTheDocument();
        });
      });

      describe('isExpanded', () => {
        test('returns true', () => {
          renderCode({ expandable: true });
          const { getIsExpanded } = getTestUtils();
          // Code snippet is collapsed by default
          expect(getIsExpanded()).toBe(false);
        });

        test('returns false', () => {
          renderCode({ expandable: true });
          const { getExpandButtonUtils, getIsExpanded } = getTestUtils();
          const expandButton = getExpandButtonUtils().getButton();
          userEvent.click(expandButton!);
          expect(getIsExpanded()).toBe(true);
        });
      });
    });
  });

  describe('multiple Codes', () => {
    test('returns the correct language', () => {
      renderMultipleCodes();

      const testUtils1 = getTestUtils('lg-code-1');
      const testUtils2 = getTestUtils('lg-code-2');

      expect(testUtils1.getLanguage()).toBe('javascript');
      expect(testUtils2.getLanguage()).toBe('python');
    });
  });
});
