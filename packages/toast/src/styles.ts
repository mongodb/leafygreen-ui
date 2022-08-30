import { css } from '@leafygreen-ui/emotion';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import InfoWithCircle from '@leafygreen-ui/icon/dist/InfoWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, typeScales, spacing } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { Transition } from 'react-transition-group';
import { StyledElements, Variant } from './types';

export const toastWidth = 400;
export const transitionDuration = 150;

export const baseElementStyles: Partial<Record<StyledElements, string>> = {
  toast: css`
    font-family: ${fontFamilies.default};
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    position: fixed;
    bottom: ${spacing[6]}px;
    left: ${spacing[4]}px;
    width: ${toastWidth}px;
    max-width: calc(100vw - ${spacing[4] * 2}px);
    border-radius: 12px;

    overflow: hidden;
    transform: translate3d(0, ${spacing[3]}px, 0) scale(0.95);
    transform-origin: bottom center;
    opacity: 0;
    transition: all ${transitionDuration}ms ease-in-out;
    border: 1px solid;

    a {
      font-size: inherit;
      line-height: inherit;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      border-radius: 4px;
      &:hover,
      &:focus,
      &:focus-visible {
        outline: none;
        span {
          &::after {
            display: none;
          }
        }
      }
      &:focus-visible {
        position: relative;
      }
    }
  `,

  icon: css`
    flex-shrink: 0;
    margin-right: ${spacing[3]}px;
  `,

  contentWrapper: css`
    display: flex;
    align-items: center;
    padding: 12px 12px 12px 16px;
  `,

  dismissButton: css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 8px;
    right: 12px;
    transition: color 0.15s ease-in-out;
  `,

  title: css`
    font-weight: 700;
  `,
};

export const toastThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    box-shadow: 0px 18px 18px -15px #000c12;
  `,
  [Theme.Light]: css`
    box-shadow: 0px 18px 18px -15px ${transparentize(0.8, '#06161e')};
  `,
};

export const variantStyles: Record<
  Variant,
  Record<Theme, Partial<Record<StyledElements, string>>>
> = {
  [Variant.Success]: {
    [Theme.Dark]: {
      toast: css`
        background-color: ${palette.green.dark3};
        border-color: ${palette.green.dark2};
      `,

      icon: css`
        color: ${palette.green.base};
      `,

      body: css`
        color: ${palette.green.light2};

        a {
          color: ${palette.green.light3};
          &:hover {
            color: ${palette.green.light2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.green.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.green.light2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.green.light2};

          &:before {
            background-color: ${palette.green.dark2};
          }
        }
      `,
    },
    [Theme.Light]: {
      toast: css`
        background-color: ${palette.green.light3};
        border-color: ${palette.green.light2};
      `,

      icon: css`
        color: ${palette.green.dark1};
      `,

      body: css`
        color: ${palette.green.dark2};

        a {
          color: ${palette.green.dark3};
          &:hover {
            color: ${palette.green.dark2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.green.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.green.dark2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.green.dark2};

          &:before {
            background-color: ${palette.green.light2};
          }
        }
      `,
    },
  },

  [Variant.Note]: {
    [Theme.Dark]: {
      toast: css`
        background-color: ${palette.blue.dark3};
        border-color: ${palette.blue.dark2};
      `,

      icon: css`
        color: ${palette.blue.light1};
      `,

      body: css`
        color: ${palette.blue.light2};

        a {
          color: ${palette.blue.light3};
          &:hover {
            color: ${palette.blue.light2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.blue.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.blue.light2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.blue.light2};

          &:before {
            background-color: ${palette.blue.dark2};
          }
        }
      `,
    },
    [Theme.Light]: {
      toast: css`
        background-color: ${palette.blue.light3};
        border-color: ${palette.blue.light2};
      `,

      icon: css`
        color: ${palette.blue.base};
      `,

      body: css`
        color: ${palette.blue.dark2};

        a {
          color: ${palette.blue.dark3};
          &:hover {
            color: ${palette.blue.dark2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.blue.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.blue.dark2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.blue.dark2};

          &:before {
            background-color: ${palette.blue.light2};
          }
        }
      `,
    },
  },

  [Variant.Warning]: {
    [Theme.Dark]: {
      toast: css`
        background-color: ${palette.red.dark3};
        border-color: ${palette.red.dark2};
      `,

      icon: css`
        color: ${palette.red.light1};
      `,

      body: css`
        color: ${palette.red.light2};

        a {
          color: ${palette.red.light3};
          &:hover {
            color: ${palette.red.light2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.red.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.red.light2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.red.light2};

          &:before {
            background-color: ${palette.red.dark2};
          }
        }
      `,
    },
    [Theme.Light]: {
      toast: css`
        background-color: ${palette.red.light3};
        border-color: ${palette.red.light2};
      `,

      icon: css`
        color: ${palette.red.base};
      `,

      body: css`
        color: ${palette.red.dark2};

        a {
          color: ${palette.red.dark3};
          &:hover {
            color: ${palette.red.dark2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.red.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.red.dark2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.red.dark2};

          &:before {
            background-color: ${palette.red.light2};
          }
        }
      `,
    },
  },

  [Variant.Important]: {
    [Theme.Dark]: {
      toast: css`
        background-color: ${palette.yellow.dark3};
        border-color: ${palette.yellow.dark2};
      `,

      icon: css`
        color: ${palette.yellow.base};
      `,

      body: css`
        color: ${palette.yellow.light2};

        a {
          color: ${palette.yellow.light3};
          &:hover {
            color: ${palette.yellow.light2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.yellow.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.yellow.light2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.yellow.light2};

          &:before {
            background-color: ${palette.yellow.dark2};
          }
        }
      `,
    },
    [Theme.Light]: {
      toast: css`
        background-color: ${palette.yellow.light3};
        border-color: ${palette.yellow.light2};
      `,

      icon: css`
        color: ${palette.yellow.dark2};
      `,

      body: css`
        color: ${palette.yellow.dark2};

        a {
          color: ${palette.yellow.dark3};
          &:hover {
            color: ${palette.yellow.dark2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.yellow.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.yellow.dark2};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.yellow.dark2};

          &:before {
            background-color: ${palette.yellow.light2};
          }
        }
      `,
    },
  },

  [Variant.Progress]: {
    [Theme.Dark]: {
      toast: css`
        background-color: ${palette.gray.dark3};
        border-color: ${palette.gray.dark2};
      `,

      icon: css`
        color: ${palette.gray.light2};
      `,

      contentWrapper: css`
        padding-bottom: 19px;
      `,

      body: css`
        color: ${palette.gray.light2};

        a {
          color: ${palette.gray.light3};
          &:hover {
            color: ${palette.gray.light2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.gray.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.gray.light1};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.gray.light1};

          &:before {
            background-color: ${palette.gray.dark2};
          }
        }
      `,
    },
    [Theme.Light]: {
      toast: css`
        background-color: ${palette.white};
        border-color: ${palette.blue.light2};
      `,

      icon: css`
        color: ${palette.gray.dark2};
      `,

      contentWrapper: css`
        padding-bottom: 19px;
      `,

      body: css`
        color: ${palette.gray.dark2};

        a {
          color: ${palette.gray.dark3};
          &:hover {
            color: ${palette.gray.dark2};
          }
          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.gray.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }
      `,

      dismissButton: css`
        color: ${palette.gray.dark1};

        &:hover,
        &:active,
        &:focus-visible {
          color: ${palette.gray.dark1};

          &:before {
            background-color: ${palette.gray.light2};
          }
        }
      `,
    },
  },
};

export const variantIcons: Record<Variant, React.ComponentType<any>> = {
  [Variant.Success]: CheckmarkWithCircleIcon,
  [Variant.Note]: InfoWithCircle,
  [Variant.Warning]: WarningIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Progress]: RefreshIcon,
};

type TransitionStatus = Parameters<
  Extract<React.ComponentProps<typeof Transition>['children'], Function>
>[0];

export const toastTransitionStateStyles: Partial<
  Record<TransitionStatus, string>
> = {
  entered: css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  `,
};
