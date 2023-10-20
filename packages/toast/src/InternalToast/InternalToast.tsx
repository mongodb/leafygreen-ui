import React from 'react';
import defaults from 'lodash/defaults';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { Variant } from '../Toast.types';

import { defaultToastProps } from './defaultProps';
import {
  baseIconStyle,
  baseToastStyle,
  contentVisibleStyles,
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
import { InternalToastProps } from './InternalToast.types';
import { ProgressBar } from './ProgressBar';
import { variantIcons } from './VariantIcon';

/**
 * The internal toast component
 *
 * Only responsible for rendering itself
 *
 * @internal
 */
export const InternalToast = React.forwardRef<
  HTMLDivElement,
  InternalToastProps
>(
  (
    {
      id,
      title,
      description,
      className,
      onClose,
      actionElement,
      index = 0,
      isHovered,
      isControlled,
      variant: variantProp,
      progress: progressProp,
      dismissible: dismissibleProp,
      darkMode: darkModeProp,
      ...rest
    }: InternalToastProps,
    forwardedRef,
  ) => {
    const { variant, progress, dismissible } = defaults(
      {
        variant: variantProp,
        progress: progressProp,
        dismissible: dismissibleProp,
      },
      defaultToastProps,
    );

    /** Warn if toast won't close  */
    if (!dismissible && !rest.timeout) {
      console.warn(
        `Toast ${id} may never close. Toast must be \`dismissible\` or have a \`timeout\` value.`,
      );
    }

    const { theme, darkMode } = useDarkMode(darkModeProp);
    const showContent = index === 0 || isHovered;
    const VariantIcon = variantIcons[variant];
    const iconThemeStyle = variantIconStyle[variant];

    return (
      <LeafyGreenProvider darkMode={!darkMode}>
        <div
          id={id}
          ref={forwardedRef}
          className={cx(baseToastStyle, toastThemeStyles[theme], className)}
          aria-atomic="true"
          data-testid="lg-toast"
          {...rest}
        >
          <div
            data-testid="lg-toast-content"
            aria-hidden={!showContent}
            className={cx(contentWrapperStyle, {
              [contentVisibleStyles]: showContent,
            })}
          >
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

            {variant === Variant.Progress && actionElement}
          </div>

          {dismissible && (
            <IconButton
              className={cx(dismissButtonStyle, dismissButtonThemeStyle[theme])}
              aria-label="Close Message"
              onClick={onClose}
              darkMode={!darkMode}
              data-testid="lg-toast-dismiss-button"
            >
              <XIcon aria-hidden role="presentation" />
            </IconButton>
          )}
          {variant === Variant.Progress && showContent && (
            <ProgressBar theme={theme} progress={progress} />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

InternalToast.displayName = 'InternalToast';

InternalToast.propTypes = {
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(Object.values(Variant)),
  progress: PropTypes.number,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
};
