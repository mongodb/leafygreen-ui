import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
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
  // open = false,
  darkMode: darkModeProp,
  onClose,
  timeout = 6_000,
  dismissible = true,
  action,
  ...rest
}: ToastComponentProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const timeoutId = useRef<NodeJS.Timeout>();
  const nodeRef = useRef(null);

  const VariantIcon = variantIcons[variant];
  const iconThemeStyle = variantIconStyle[variant];

  const startTimer = useCallback(() => {
    if (timeout) {
      const _timeoutId = setTimeout(() => {
        onClose?.({});
      }, timeout);

      timeoutId.current = _timeoutId;
    }
  }, [onClose, timeout]);

  const stopTimer = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  useEffect(() => {
    stopTimer();
    startTimer();
  }, [timeout, startTimer]);

  return (
    <div
      ref={nodeRef}
      className={cx(baseToastStyle, toastThemeStyles[theme], className)}
      aria-atomic="true"
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
              className={cx(descriptionStyle, descriptionThemeStyle[theme])}
            >
              {description}
            </Body>
          )}
        </div>
      </div>

      {dismissible && (
        <IconButton
          className={cx(dismissButtonStyle, dismissButtonThemeStyle[theme])}
          aria-label="Close Message"
          onClick={onClose}
          darkMode={!darkMode}
        >
          <XIcon />
        </IconButton>
      )}
      {variant === Variant.Progress && (
        <ProgressBar theme={theme} progress={progress} />
      )}
    </div>
  );
}

Toast.displayName = 'Toast';

Toast.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(Object.values(Variant)),
  progress: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Toast;
