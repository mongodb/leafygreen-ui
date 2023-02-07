import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button/dist/IconButton/index';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Portal from '@leafygreen-ui/portal';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  baseElementStyles,
  toastThemeStyles,
  toastTransitionStateStyles,
  variantIcons,
  variantStyles,
} from './styles';
import ProgressBar from './ToastProgressBar';
import { ToastProps, Variant } from './types';

function Toast({
  title,
  body,
  className,
  variant = Variant.Note,
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
          timeout={transitionDuration.default}
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
                        baseElementStyles.title,
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
