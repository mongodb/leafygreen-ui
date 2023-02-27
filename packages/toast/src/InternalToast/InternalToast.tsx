import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { ToastProps, Variant } from '../Toast.types';

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
} from './InternalToast.styles';
import { ProgressBar } from './ProgressBar';
import { variantIcons } from './VariantIcon';

export function InternalToast({
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
}: ToastProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const nodeRef = useRef(null);

  const VariantIcon = variantIcons[variant];
  const iconThemeStyle = variantIconStyle[variant];

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

InternalToast.displayName = 'InternalToast';

InternalToast.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(Object.values(Variant)),
  progress: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
