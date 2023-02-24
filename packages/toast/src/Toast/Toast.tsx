import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Portal from '@leafygreen-ui/portal';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { ProgressBar } from './ProgressBar';
import {
  baseIconStyle,
  baseToastStyle,
  contentWrapperStyle,
  descriptionStyle,
  descriptionThemeStyle,
  dismissButtonStyle,
  dismissButtonThemeStyle,
  textContentStyle,
  titleStyle,
  titleThemeStyle,
  toastThemeStyles,
  toastTransitionStateStyles,
  variantIconStyle,
} from './Toast.styles';
import { ToastComponentProps, Variant } from './Toast.types';
import { variantIcons } from './VariantIcon';

function Toast({
  title,
  description,
  className,
  variant = Variant.Note,
  progress = 1.0,
  open = false,
  darkMode: darkModeProp,
  onClose,
  timeout = 6_000,
  dismissible = true,
  action,
  ...rest
}: ToastComponentProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const nodeRef = useRef(null);

  const VariantIcon = variantIcons[variant];
  const iconThemeStyle = variantIconStyle[variant];

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
                baseToastStyle,
                toastThemeStyles[theme],
                toastTransitionStateStyles[state],
                className,
              )}
              {...rest}
            >
              <div className={cx(contentWrapperStyle)}>
                <VariantIcon
                  aria-hidden
                  className={cx(baseIconStyle, iconThemeStyle[theme])}
                  size={32}
                />

                <div className={textContentStyle}>
                  <Body
                    data-testid="toast-title"
                    className={cx(titleStyle, titleThemeStyle[theme])}
                  >
                    {title}
                  </Body>

                  {description && (
                    <Body
                      className={cx(
                        descriptionStyle,
                        descriptionThemeStyle[theme],
                      )}
                    >
                      {description}
                    </Body>
                  )}
                </div>
              </div>

              {dismissible && (
                <IconButton
                  className={cx(
                    dismissButtonStyle,
                    dismissButtonThemeStyle[theme],
                  )}
                  aria-label="Close Message"
                  onClick={close}
                  darkMode={!darkMode}
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
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  progress: PropTypes.number,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default Toast;
