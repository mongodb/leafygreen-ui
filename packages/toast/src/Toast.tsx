import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import { cx, css } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import XIcon from '@leafygreen-ui/icon/dist/X';
import ProgressBar from './ToastProgressBar';

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
    border-radius: 4px;
    box-shadow: 0 18px 18px -15px ${transparentize(0.7, uiColors.black)};
    overflow: hidden;
    transform: translate3d(0, ${spacing[3]}px, 0) scale(0.95);
    transform-origin: bottom center;
    opacity: 0;
    transition: all ${transitionDuration}ms ease-in-out;
  `,

  icon: css`
    flex-shrink: 0;
    margin-right: ${spacing[3]}px;
  `,

  contentWrapper: css`
    display: flex;
    align-items: center;
    padding: ${spacing[3]}px;
  `,

  dismissButton: css`
    position: absolute;
    top: ${spacing[2]}px;
    right: ${spacing[2]}px;
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
  Partial<Record<StyledElements, string>>
> = {
  [Variant.Success]: {
    toast: css`
      background-color: ${uiColors.green.light3};
    `,

    icon: css`
      color: ${uiColors.green.dark1};
    `,

    contentWrapper: css`
      border-radius: 4px;
      border: 1px solid ${uiColors.green.light2};
    `,

    body: css`
      color: ${uiColors.green.dark2};
    `,

    dismissButton: css`
      color: ${uiColors.green.dark1};

      &:hover {
        color: ${uiColors.green.dark2};

        &:before {
          background-color: ${uiColors.green.light2};
        }
      }
    `,
  },

  [Variant.Note]: {
    toast: css`
      background-color: ${uiColors.blue.light3};
    `,

    icon: css`
      color: ${uiColors.blue.dark2};
    `,

    contentWrapper: css`
      border-radius: 4px;
      border: 1px solid ${uiColors.blue.light2};
    `,

    body: css`
      color: ${uiColors.blue.dark2};
    `,

    dismissButton: css`
      color: ${uiColors.blue.dark2};

      &:hover {
        color: ${uiColors.blue.dark3};

        &:before {
          background-color: ${uiColors.blue.light2};
        }
      }
    `,
  },

  [Variant.Warning]: {
    toast: css`
      background-color: ${uiColors.red.light3};
    `,

    icon: css`
      color: ${uiColors.red.base};
    `,

    contentWrapper: css`
      border-radius: 4px;
      border: 1px solid ${uiColors.red.light2};
    `,

    body: css`
      color: ${uiColors.red.dark2};
    `,

    dismissButton: css`
      color: ${uiColors.red.dark2};

      &:hover {
        color: ${uiColors.green.dark3};

        &:before {
          background-color: ${uiColors.red.light2};
        }
      }
    `,
  },

  [Variant.Important]: {
    toast: css`
      background-color: ${uiColors.yellow.light3};
    `,

    icon: css`
      color: ${uiColors.yellow.dark2};
    `,

    contentWrapper: css`
      border-radius: 4px;
      border: 1px solid ${uiColors.yellow.light2};
    `,

    body: css`
      color: ${uiColors.yellow.dark2};
    `,

    dismissButton: css`
      color: ${uiColors.yellow.dark2};

      &:hover {
        color: ${uiColors.yellow.dark3};

        &:before {
          background-color: ${uiColors.yellow.light2};
        }
      }
    `,
  },

  [Variant.Progress]: {
    toast: css`
      background-color: ${uiColors.white};
      padding-bottom: 6px;
    `,

    icon: css`
      color: ${uiColors.gray.dark2};
    `,

    contentWrapper: css`
      border-radius: 4px 4px 0 0;
      border: 1px solid ${uiColors.blue.light2};
      border-bottom: 0;
    `,

    body: css`
      color: ${uiColors.gray.dark2};
    `,
  },
};

const variantIcons: Record<Variant, React.ComponentType<any>> = {
  [Variant.Success]: CheckmarkWithCircleIcon,
  [Variant.Note]: CloudIcon,
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
}

function Toast({
  title,
  body,
  className,
  variant,
  progress = 1.0,
  open = false,
  close,
  ...rest
}: ToastProps) {
  const nodeRef = useRef(null);
  const dismissible = typeof close === 'function';

  const VariantIcon = variantIcons[variant];

  const currentVariantStyles = variantStyles[variant];

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
                  size={30}
                />

                <div>
                  {title && (
                    <Body
                      data-testid="toast-title"
                      className={cx(
                        currentVariantStyles.body,
                        css`
                          font-weight: bold;
                        `,
                      )}
                    >
                      {title}
                    </Body>
                  )}

                  <Body className={currentVariantStyles.body}>{body}</Body>
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
                >
                  <XIcon />
                </IconButton>
              )}

              {variant === Variant.Progress && (
                <ProgressBar progress={progress} />
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
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  progress: PropTypes.number,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default Toast;
