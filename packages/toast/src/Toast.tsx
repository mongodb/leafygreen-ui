import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { cx, css } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import ProgressBar from './ToastProgressBar';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  variantIcons,
  variantStyles,
  transitionDuration,
  baseElementStyles,
  toastThemeStyles,
  toastTransitionStateStyles,
} from './styles';
import { Variant } from './types';

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
                toastThemeStyles[theme],
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
                          font-weight: 700;
                        `,
                      )}
                    >
                      {title}
                    </Body>
                  )}

                  <Body className={cx(currentVariantStyles.body)}>{body}</Body>
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
