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

      const _ = getTestUtils();
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
        const { getLanguage } = renderCode();
        expect(getLanguage()).toBe('javascript');
      });
    });

    describe('getTitle', () => {
      describe('Without the panel', () => {
        test('returns null', () => {
          const { getTitle } = renderCode();
          expect(getTitle()).toBeNull();
        });
      });
      describe('With panel', () => {
        test('returns null if there is no title prop', () => {
          const { getTitle } = renderCodeWithLanguageSwitcher({});
          expect(getTitle()).toBeNull();
        });

        test('returns the title', () => {
          const { getTitle } = renderCodeWithLanguageSwitcher({
            props: { title: 'Leafygreen' },
          });
          expect(getTitle()).toBe('Leafygreen');
        });
      });
    });

    describe('getLanguageSwitcherUtils', () => {
      describe('getInput', () => {
        test('returns the language switcher', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );

          expect(getLanguageSwitcherUtils().getInput()).toBeInTheDocument();
        });

        test('throws error is the languageSwitcher cannot be found', () => {
          try {
            const { getLanguageSwitcherUtils } = renderCode();
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
      });

      describe('isDisabled', () => {
        test('returns false', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );
          expect(getLanguageSwitcherUtils().isDisabled()).toBe(false);
        });

        test('returns true', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher({
            isLoading: true,
          });
          expect(getLanguageSwitcherUtils().isDisabled()).toBe(true);
        });
      });

      describe('getOptions', () => {
        test('returns all options', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(getLanguageSwitcherUtils().getOptions()).toHaveLength(2);
        });
      });

      describe('getOptionByValue', () => {
        test('returns the option', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(
            getLanguageSwitcherUtils().getOptionByValue('JavaScript'),
          ).toBeInTheDocument();
        });

        test('returns null', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(
            getLanguageSwitcherUtils().getOptionByValue('wrong'),
          ).toBeNull();
        });
      });

      describe('getInputValue', () => {
        test('returns the value', () => {
          const { getLanguageSwitcherUtils } = renderCodeWithLanguageSwitcher(
            {},
          );
          userEvent.click(getLanguageSwitcherUtils().getInput()!);
          expect(getLanguageSwitcherUtils().getInputValue()).toBe('JavaScript');
        });
      });
    });

    describe('getIsLoading', () => {
      test('returns false', () => {
        const { getIsLoading } = renderCode();
        expect(getIsLoading()).toBe(false);
      });

      test('returns true', () => {
        const { getIsLoading } = renderCode({ isLoading: true });
        expect(getIsLoading()).toBe(true);
      });
    });

    describe('getCopyButtonUtils', () => {
      describe('getButton', () => {
        describe('Without a panel', () => {
          test('returns the copy button', () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockImplementation(() => true);
                return renderCode();
              },
            );
            expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          });

          test('throws error is the copy button cannot be found', () => {
            try {
              const { getCopyButtonUtils } = Context.within(
                Jest.spyContext(ClipboardJS, 'isSupported'),
                spy => {
                  spy.mockReturnValue(true);
                  return renderCode({ copyButtonAppearance: 'none' });
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

        describe('With a panel', () => {
          test('returns the copy button', () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCodeWithLanguageSwitcher({});
              },
            );
            expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
          });
        });
      });

      describe('queryButton', () => {
        describe('Without a panel', () => {
          test('returns the copy button', () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCode();
              },
            );
            expect(getCopyButtonUtils().queryButton()).toBeInTheDocument();
          });

          test('returns null when copyButtonAppearance is none', () => {
            const { getCopyButtonUtils } = renderCode({
              copyButtonAppearance: 'none',
            });
            expect(getCopyButtonUtils().queryButton()).toBeNull();
          });
        });

        describe('With a panel', () => {
          test('returns the copy button', () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCodeWithLanguageSwitcher({});
              },
            );
            expect(getCopyButtonUtils().queryButton()).toBeInTheDocument();
          });
        });
      });

      describe('findButton', () => {
        describe('Without a panel', () => {
          test('returns the copy button', async () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCode();
              },
            );
            const button = await getCopyButtonUtils().findButton();
            expect(button).toBeInTheDocument();
          });

          test('throws error is the copy button cannot be found', async () => {
            try {
              const { getCopyButtonUtils } = Context.within(
                Jest.spyContext(ClipboardJS, 'isSupported'),
                spy => {
                  spy.mockReturnValue(true);
                  return renderCode({ copyButtonAppearance: 'none' });
                },
              );
              const _ = await getCopyButtonUtils().findButton();
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

        describe('With a panel', () => {
          test('returns the copy button', async () => {
            const { getCopyButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCodeWithLanguageSwitcher({});
              },
            );
            const button = await getCopyButtonUtils().findButton();
            expect(button).toBeInTheDocument();
          });
        });
      });

      describe('isDisabled', () => {
        test('returns true', () => {
          const { getCopyButtonUtils } = Context.within(
            Jest.spyContext(ClipboardJS, 'isSupported'),
            spy => {
              spy.mockReturnValue(true);
              return renderCodeWithLanguageSwitcher({ isLoading: true });
            },
          );
          expect(getCopyButtonUtils().isDisabled()).toBe(true);
        });

        test('returns false', () => {
          const { getCopyButtonUtils } = Context.within(
            Jest.spyContext(ClipboardJS, 'isSupported'),
            spy => {
              spy.mockReturnValue(true);
              return renderCodeWithLanguageSwitcher({});
            },
          );
          expect(getCopyButtonUtils().isDisabled()).toBe(false);
        });
      });
    });

    describe('getExpandButtonUtils', () => {
      describe('queryButton', () => {
        test('returns null', () => {
          const { getExpandButtonUtils } = renderCode();
          expect(getExpandButtonUtils().queryButton()).toBeNull();
        });

        test('returns the expand button', () => {
          const { getExpandButtonUtils } = renderCode({ expandable: true });
          expect(getExpandButtonUtils().queryButton()).toBeInTheDocument();
        });
      });

      describe('findButton', () => {
        test('throws error is the expand button cannot be found', async () => {
          try {
            const { getExpandButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCode();
              },
            );
            const _ = await getExpandButtonUtils().findButton();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              'message',
              expect.stringMatching(
                /Unable to find an element by: \[data-lgid="lg-code-expand_button"\]/,
              ),
            );
          }
        });

        test('returns the expand button', async () => {
          const { getExpandButtonUtils } = renderCode({ expandable: true });
          const button = await getExpandButtonUtils().findButton();
          expect(button).toBeInTheDocument();
        });
      });

      describe('getButton', () => {
        test('throws error is the expand button cannot be found', () => {
          try {
            const { getExpandButtonUtils } = Context.within(
              Jest.spyContext(ClipboardJS, 'isSupported'),
              spy => {
                spy.mockReturnValue(true);
                return renderCode();
              },
            );
            const _ = getExpandButtonUtils().getButton();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              'message',
              expect.stringMatching(
                /Unable to find an element by: \[data-lgid="lg-code-expand_button"\]/,
              ),
            );
          }
        });

        test('returns the expand button', () => {
          const { getExpandButtonUtils } = renderCode({ expandable: true });
          expect(getExpandButtonUtils().getButton()).toBeInTheDocument();
        });
      });
    });

    describe('isExpanded', () => {
      test('returns true', () => {
        const { getIsExpanded } = renderCode({ expandable: true });
        // Code snippet is collapsed by default
        expect(getIsExpanded()).toBe(false);
      });

      test('returns false', () => {
        const { getExpandButtonUtils, getIsExpanded } = renderCode({
          expandable: true,
        });
        const expandButton = getExpandButtonUtils().getButton();
        userEvent.click(expandButton!);
        expect(getIsExpanded()).toBe(true);
      });
    });

    describe('queryPanel', () => {
      test('returns the panel', () => {
        const { queryPanel } = renderCodeWithLanguageSwitcher({});
        expect(queryPanel()).toBeInTheDocument();
      });

      test('returns null', () => {
        const { queryPanel } = renderCode({});
        expect(queryPanel()).toBeNull();
      });
    });
  });

  describe('multiple Codes', () => {
    test('returns the correct language', () => {
      renderMultipleCodes();

      const testUtils1 = getTestUtils('lg-code-1');
      const testUtils2 = getTestUtils('lg-code-2');

      expect(testUtils1.getLanguage()).toBe('JavaScript');
      expect(testUtils2.getLanguage()).toBe('Python');
    });

    test('returns the corresponding language switcher', () => {
      renderMultipleCodes();

      const testUtils1 = getTestUtils('lg-code-1');
      const testUtils2 = getTestUtils('lg-code-2');

      const firstLanguageSwitcher = testUtils1
        .getLanguageSwitcherUtils()
        .getInput();
      const secondLanguageSwitcher = testUtils2
        .getLanguageSwitcherUtils()
        .getInput();

      expect(firstLanguageSwitcher.textContent).toBe('JavaScript');
      expect(secondLanguageSwitcher.textContent).toBe('Python');
    });
  });
});
