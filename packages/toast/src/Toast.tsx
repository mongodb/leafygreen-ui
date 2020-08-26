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
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import XIcon from '@leafygreen-ui/icon/dist/X';
import ProgressBar from './ToastProgressBar';

const toastWidth = 400;

const transitionDuration = 150;

type StyledElements = 'toast' | 'body' | 'icon' | 'contentWrapper' | 'dismissButton'

const baseElementStyles: Partial<Record<StyledElements, string>> = {
  toast: css`
    position: fixed;
    bottom: ${spacing[6]};
    left: ${spacing[4]};
    width: ${toastWidth}px;
    max-width: calc(100vw - (${spacing[4]} * 2));
    border-radius: 4px;
    box-shadow: 0 18px 18px -15px ${transparentize(0.7, uiColors.black)};
    overflow: hidden;
    transform: translate3d(0, ${spacing[3]}, 0) scale(0.95);
    transform-origin: bottom center;
    opacity: 0;
    transition: all ${transitionDuration}ms ease-in-out;
  `,

  icon: css`
    flex-shrink: 0;
    margin-right: ${spacing[3]};
  `,

  contentWrapper: css`
    display: flex;
    align-items: center;
    padding: ${spacing[3]};
  `,

  dismissButton: css`
    position: absolute;
    top: ${spacing[2]};
    right: ${spacing[2]};
    transition: color 0.15s ease-in-out;
  `,
}

const ToastVariants = {
  success: 'success',
  progress: 'progress',
} as const;

type ToastVariants = typeof ToastVariants[keyof typeof ToastVariants];

const variantStyles: Record<ToastVariants, Partial<Record<StyledElements, string>>> = {
  [ToastVariants.success]: {
    toast: css`
      background-color: ${uiColors.green.light3};
    `,

    icon: css`
      color: ${uiColors.green.base};
    `,

    contentWrapper: css`
      border-radius: 4px;
      border: 1px solid ${uiColors.green.light2};
    `,

    body: css`
      color: ${uiColors.green.dark2};
    `,

    dismissButton: css`
      color: ${uiColors.green.base};

      &:hover {
        color: ${uiColors.green.dark2};

        &:before {
          background-color: ${uiColors.green.light2};
        }
      }
    `,
  },

  [ToastVariants.progress]: {
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

const RTGStates = {
  Entering: 'entering',
  Entered: 'entered',
  Exiting: 'exiting',
  Exited: 'exited',
} as const;

type RTGStates = typeof RTGStates[keyof typeof RTGStates];

const toastTransitionStateStyles: Partial<Record<RTGStates, string>> = {
  [RTGStates.Entered]: css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  `,
};

interface ToastProps extends Omit<React.ComponentProps<'div'>, 'title'> {
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
  variant: ToastVariants;

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
  progress = 1,
  open = false,
  close,
  ...rest
}: ToastProps) {
  const nodeRef = useRef(null);
  const dismissible = !!close;

  let VariantIcon: React.ComponentType<any>;

  if (variant === ToastVariants.progress) {
    VariantIcon = RefreshIcon;
  } else if (variant === ToastVariants.success) {
    VariantIcon = CheckmarkWithCircleIcon;
  } else {
    VariantIcon = CheckmarkWithCircleIcon;
  }

  const currentVariantStyles = variantStyles[variant];

  return (
    <Transition
      in={open}
      timeout={transitionDuration}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state: RTGStates) => (
        <Portal>
          <div
            role="status"
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
                    padding-right: calc(${spacing[3]} + ${spacing[2]});
                  `]: dismissible,
                },
              )}
            >
              <VariantIcon
                className={cx(baseElementStyles.icon, currentVariantStyles.icon)}
                size={30}
              />

              <div>
                {title && (
                  <Body
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

            {variant === ToastVariants.progress && (
              <ProgressBar progress={progress} />
            )}
          </div>
        </Portal>
      )}
    </Transition>
  );
}

Toast.displayName = 'Toast';

Toast.propTypes = {
  title: PropTypes.element,
  body: PropTypes.element.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(ToastVariants)).isRequired,
  progress: PropTypes.number,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default Toast;
