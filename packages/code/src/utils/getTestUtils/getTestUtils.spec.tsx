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

    describe('getLanguageSwitcher', () => {
      describe('getInput', () => {
        test('returns the language switcher', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcher } = getTestUtils();
          expect(getLanguageSwitcher().getInput()).toBeInTheDocument();
        });

        test('returns null', () => {
          renderCode();
          const { getLanguageSwitcher } = getTestUtils();
          expect(getLanguageSwitcher().getInput()).toBeNull();
        });
      });

      describe('isDisabled', () => {
        test('returns false', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcher } = getTestUtils();
          expect(getLanguageSwitcher().isDisabled()).toBe(false);
        });

        test('returns true', () => {
          renderCodeWithLanguageSwitcher({ isLoading: true });
          const { getLanguageSwitcher } = getTestUtils();
          expect(getLanguageSwitcher().isDisabled()).toBe(true);
        });
      });

      describe('getAllOptions', () => {
        test('returns all options', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcher } = getTestUtils();
          userEvent.click(getLanguageSwitcher().getInput()!);
          expect(getLanguageSwitcher().getAllOptions()).toHaveLength(2);
        });
      });

      describe('getOptionByValue', () => {
        test('returns the option', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcher } = getTestUtils();
          userEvent.click(getLanguageSwitcher().getInput()!);
          expect(
            getLanguageSwitcher().getOptionByValue('JavaScript'),
          ).toBeInTheDocument();
        });

        test('returns null', () => {
          renderCodeWithLanguageSwitcher({});
          const { getLanguageSwitcher } = getTestUtils();
          userEvent.click(getLanguageSwitcher().getInput()!);
          expect(getLanguageSwitcher().getOptionByValue('wrong')).toBeNull();
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

    describe('getCopyButton', () => {
      describe('getButton', () => {
        describe('Without a panel', () => {
          test('returns the copy button', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCode();
            });
            const { getCopyButton } = getTestUtils();
            expect(getCopyButton().getButton()).toBeInTheDocument();
          });
          test('returns null', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCode({ copyButtonAppearance: 'none' });
            });
            const { getCopyButton } = getTestUtils();
            expect(getCopyButton().getButton()).toBeNull();
          });
        });

        describe('With a panel', () => {
          test('returns the copy button', () => {
            Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
              spy.mockReturnValue(true);
              return renderCodeWithLanguageSwitcher({});
            });
            const { getCopyButton } = getTestUtils();
            expect(getCopyButton().getButton()).toBeInTheDocument();
          });
        });
      });

      describe('isDisabled', () => {
        test('returns true', () => {
          Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
            spy.mockReturnValue(true);
            return renderCodeWithLanguageSwitcher({ isLoading: true });
          });
          const { getCopyButton } = getTestUtils();
          expect(getCopyButton().isDisabled()).toBe(true);
        });

        test('returns false', () => {
          Context.within(Jest.spyContext(ClipboardJS, 'isSupported'), spy => {
            spy.mockReturnValue(true);
            return renderCodeWithLanguageSwitcher({});
          });
          const { getCopyButton } = getTestUtils();
          expect(getCopyButton().isDisabled()).toBe(false);
        });
      });
    });

    describe('getExpandButton', () => {
      describe('getButton', () => {
        test('return null', () => {
          renderCode();
          const { getExpandButton } = getTestUtils();
          expect(getExpandButton().getButton()).toBeNull();
        });

        test('returns the expand button', () => {
          renderCode({ expandable: true });
          const { getExpandButton } = getTestUtils();
          expect(getExpandButton().getButton()).toBeInTheDocument();
        });
      });

      describe('isExpanded', () => {
        test('returns true', () => {
          renderCode({ expandable: true });
          const { getExpandButton } = getTestUtils();
          expect(getExpandButton().isExpanded()).toBe(false);
        });

        test('returns false', () => {
          renderCode({ expandable: true });
          const { getExpandButton } = getTestUtils();
          const expandButton = getExpandButton().getButton();
          userEvent.click(expandButton!);
          expect(getExpandButton().isExpanded()).toBe(true);
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
