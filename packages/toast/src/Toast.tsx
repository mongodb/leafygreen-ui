import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import { cx, css } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import InfoWithCircle from '@leafygreen-ui/icon/dist/InfoWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import XIcon from '@leafygreen-ui/icon/dist/X';
import ProgressBar from './ToastProgressBar';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

const toastWidth = 400;
const transitionDuration = 150;

type StyledElements =
  | 'toast'
  | 'body'
  | 'icon'
  | 'contentWrapper'
  | 'dismissButton';

const baseElementStyles: Partial<Record<StyledElements, string>> = {
  toast: css`
    position: fixed;
    bottom: ${spacing[6]}px;
    left: ${spacing[4]}px;
    width: ${toastWidth}px;
    max-width: calc(100vw - ${spacing[4] * 2}px);
    border-radius: 12px;
    box-shadow: 0 16px 32px -14px ${transparentize(0.8, palette.black)};
    overflow: hidden;
    transform: translate3d(0, ${spacing[3]}px, 0) scale(0.95);
    transform-origin: bottom center;
    opacity: 0;
    transition: all ${transitionDuration}ms ease-in-out;
    border: 1px solid;
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
    position: absolute;
    top: 7px;
    right: 9px;
    transition: color 0.15s ease-in-out;
  `,
};

const Variant = {
  Success: 'success',
  Note: 'note',
  Warning: 'warning',
  Important: 'important',
  Progress: 'progress',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const variantStyles: Record<
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
        background-color: ${palette.red.dark2};
        border-color: ${palette.red.dark2};
      `,

      icon: css`
        color: ${palette.red.light1};
      `,

      body: css`
        color: ${palette.red.light2};
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

const variantIcons: Record<Variant, React.ComponentType<any>> = {
  [Variant.Success]: CheckmarkWithCircleIcon,
  [Variant.Note]: InfoWithCircle,
  [Variant.Warning]: WarningIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Progress]: RefreshIcon,
};

type TransitionStatus = Parameters<
  Extract<React.ComponentProps<typeof Transition>['children'], Function>
>[0];

const toastTransitionStateStyles: Partial<Record<TransitionStatus, string>> = {
  entered: css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  `,
};

export interface ToastProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /**
   * Optional text shown in bold above the body text.
   */
  title?: React.ReactNode;

  /**
   * Required main text for the Toast.
   */
  body: React.ReactNode;

  /**
   * Optional className passed to the wrapping <div /> for the toast.
   */
  className?: string;

  /**
   * Required style variant to render the Toast as.
   */
  variant: Variant;

  /**
   * Optional number between 0 and 1 that sets the progress bar's progress. Note that the progress bar is only rendered when the Toast variant is set to `'progress'`.
   *
   * **Default:** `1`
   */
  progress?: number;

  /**
   * Optional boolean that renders the Toast and makes it visible when true.
   *
   * **Default:** `false`
   */
  open?: boolean;

  /**
   * Optional click event handler that, when set, renders a close button that receives the passed handler.
   */
  close?: React.MouseEventHandler;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   */
  darkMode?: boolean;
}

function Toast({
  title,
  body,
  className,
  variant,
  progress = 1.0,
  open = false,
  darkMode: darkModeProp,
  close,
  ...rest
}: ToastProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const nodeRef = useRef(null);
  const dismissible = typeof close === 'function';

  const VariantIcon = variantIcons[variant];

  const currentVariantStyles = variantStyles[variant][theme];

  return (
    <Portal>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        <Transition
          in={open}
          timeout={transitionDuration}
          mountOnEnter
          unmountOnExit
          nodeRef={nodeRef}
        >
          {state => (
            <div
              ref={nodeRef}
              className={cx(
                baseElementStyles.toast,
                currentVariantStyles.toast,
                toastTransitionStateStyles[state],
                className,
              )}
              {...rest}
            >
              <div
                className={cx(
                  baseElementStyles.contentWrapper,
                  currentVariantStyles.contentWrapper,
                  {
                    [css`
                      padding-right: ${spacing[3] * 2}px;
                    `]: dismissible,
                  },
                )}
              >
                <VariantIcon
                  aria-hidden
                  className={cx(
                    baseElementStyles.icon,
                    currentVariantStyles.icon,
                  )}
                  size={32}
                />

                <div>
                  {title && (
                    <Body
                      data-testid="toast-title"
                      className={cx(
                        currentVariantStyles.body,
                        css`
                          font-family: Euclid Circular A, ‘Helvetica Neue’,
                            Helvetica, Arial, sans-serif; // TODO: Refresh – remove when fonts are updated
                          font-size: 13px; // TODO: Refresh – remove when fonts are updated
                          font-weight: 700;
                        `,
                      )}
                    >
                      {title}
                    </Body>
                  )}

                  <Body
                    className={cx(
                      currentVariantStyles.body,
                      css`
                        font-family: Euclid Circular A, ‘Helvetica Neue’,
                          Helvetica, Arial, sans-serif; // TODO: Refresh – remove when fonts are updated
                        font-size: 13px; // TODO: Refresh – remove when fonts are updated
                      `,
                    )}
                  >
                    {body}
                  </Body>
                </div>
              </div>

              {dismissible && (
                <IconButton
                  className={cx(
                    baseElementStyles.dismissButton,
                    currentVariantStyles.dismissButton,
                  )}
                  aria-label="Close Message"
                  onClick={close}
                  darkMode={darkMode}
                >
                  <XIcon />
                </IconButton>
              )}

              {variant === Variant.Progress && (
                <ProgressBar theme={theme} progress={progress} />
              )}
            </div>
          )}
        </Transition>
      </div>
    </Portal>
  );
}

Toast.displayName = 'Toast';

Toast.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  progress: PropTypes.number,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default Toast;
