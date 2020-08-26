import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import { cx, css, keyframes } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import XIcon from '@leafygreen-ui/icon/dist/X';

const progressBackgroundBase = '#22B7EB';
const toastWidth = 400;

const progressBarBackgroundStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background-color: ${uiColors.gray.light2};
  border-radius: 0 0 4px 4px;
  overflow: hidden;
`;

const backgroundShimmer = keyframes`
  0% {
    background-position: ${-toastWidth}px;
  }

  100% {
    background-position: ${toastWidth * 2}px;
  }
`;

const progressBarStyle = css`
  overflow: hidden;
  height: 6px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${progressBackgroundBase};
  background-image: linear-gradient(
    90deg,
    ${progressBackgroundBase} 0px,
    #cce8f4 ${toastWidth / 2}px,
    ${progressBackgroundBase} ${toastWidth}px
  );
  background-size: 600px;
  animation: ${backgroundShimmer} 4s infinite linear;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={progressBarBackgroundStyle}>
      <div
        className={cx(
          progressBarStyle,
          css`
            width: ${progress * 100}%;
          `,
        )}
      />
    </div>
  );
}

const RTGStates = {
  Entering: 'entering',
  Entered: 'entered',
  Exiting: 'exiting',
  Exited: 'exited',
} as const;

type RTGStates = typeof RTGStates[keyof typeof RTGStates];

const ToastVariants = {
  success: 'success',
  progress: 'progress',
} as const;

type ToastVariants = typeof ToastVariants[keyof typeof ToastVariants];

const transitionDuration = 150;

const baseToastStyle = css`
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
`;

const toastVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    background-color: ${uiColors.green.light3};
  `,

  [ToastVariants.progress]: css`
    background-color: ${uiColors.white};
    padding-bottom: 6px;
  `,
};

const toastVisibleStateStyle = css`
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
`;

const toastTransitionStateStyles: Partial<Record<RTGStates, string>> = {
  [RTGStates.Entered]: toastVisibleStateStyle,
};

const baseIconStyle = css`
  flex-shrink: 0;
  margin-right: ${spacing[3]};
`;

const iconVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    color: ${uiColors.green.base};
  `,

  [ToastVariants.progress]: css`
    color: ${uiColors.gray.dark2};
  `,
};

const contentWrapperStyles = css`
  display: flex;
  align-items: center;
  padding: ${spacing[3]};
`;

const contentWrapperVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    border-radius: 4px;
    border: 1px solid ${uiColors.green.light2};
  `,

  [ToastVariants.progress]: css`
    border-radius: 4px 4px 0 0;
    border: 1px solid ${uiColors.blue.light2};
    border-bottom: 0;
  `,
};

const bodyVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    color: ${uiColors.green.dark2};
  `,

  [ToastVariants.progress]: css`
    color: ${uiColors.gray.dark2};
  `,
};

const dismissButtonStyle = css`
  position: absolute;
  top: ${spacing[2]};
  right: ${spacing[2]};
  transition: color 0.15s ease-in-out;
`;

const dismissButtonVariantStyle = {
  [ToastVariants.success]: css`
    color: ${uiColors.green.base};

    &:hover {
      color: ${uiColors.green.dark2};

      &:before {
        background-color: ${uiColors.green.light2};
      }
    }
  `,

  [ToastVariants.progress]: '',
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

export default function Toast({
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
              baseToastStyle,
              toastVariantStyles[variant],
              toastTransitionStateStyles[state],
              className,
            )}
            {...rest}
          >
            <div
              className={cx(
                contentWrapperStyles,
                contentWrapperVariantStyles[variant],
                {
                  [css`
                    padding-right: calc(${spacing[3]} + ${spacing[2]});
                  `]: dismissible,
                },
              )}
            >
              <VariantIcon
                className={cx(baseIconStyle, iconVariantStyles[variant])}
                size={30}
              />

              <div>
                {title && (
                  <Body
                    className={cx(
                      bodyVariantStyles[variant],
                      css`
                        font-weight: bold;
                      `,
                    )}
                  >
                    {title}
                  </Body>
                )}

                <Body className={bodyVariantStyles[variant]}>{body}</Body>
              </div>
            </div>

            {dismissible && (
              <IconButton
                className={cx(
                  dismissButtonStyle,
                  dismissButtonVariantStyle[variant],
                )}
                aria-label="Close Message"
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
