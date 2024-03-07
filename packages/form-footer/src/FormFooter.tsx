import React from 'react';

import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import {
  bannerStyle,
  buttonStyle,
  contentStyle,
  flexEndContent,
  footerBaseStyle,
  footerThemeStyle,
} from './FormFooter.styles';
import { FormFooterProps } from './FormFooter.types';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

export default function FormFooter({
  primaryButton,
  cancelButtonProps,
  backButtonProps,
  onCancel,
  cancelButtonText = 'Cancel',
  backButtonText,
  onBackClick,
  errorMessage,
  contentClassName,
  className,
  darkMode: darkModeProp,
  ...rest
}: FormFooterProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const showBackButton = backButtonProps || backButtonText;
  /**
   * versions prior to 3.1.0 will render the cancel button if cancelButtonText is undefined or
   * a nonempty string so we need to explicitly check for an empty string
   */
  const showCancelButton = cancelButtonProps || cancelButtonText !== '';

  // TODO @stephl3: remove once deprecated props are removed
  const _backButtonProps = {
    children: backButtonProps?.children || backButtonText,
    onClick: backButtonProps?.onClick || onBackClick,
    leftGlyph: backButtonProps ? (
      backButtonProps.leftGlyph
    ) : (
      <ArrowLeftIcon data-testid="lg-form_footer-back_button-icon" />
    ),
  };
  const _cancelButtonProps = {
    children: cancelButtonProps?.children || cancelButtonText,
    onClick: cancelButtonProps?.onClick || onCancel,
    leftGlyph: cancelButtonProps?.leftGlyph ?? undefined,
  };

  return (
    <footer
      data-testid="lg-form_footer-footer"
      className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
      {...rest}
    >
      <div className={cx(contentStyle, contentClassName)}>
        {showBackButton && (
          <Button
            variant="default"
            onClick={_backButtonProps.onClick}
            className={buttonStyle}
            leftGlyph={_backButtonProps.leftGlyph}
            darkMode={darkMode}
            data-testid="lg-form_footer-back_button"
          >
            {_backButtonProps.children}
          </Button>
        )}
        <div className={flexEndContent}>
          {errorMessage && (
            <Banner
              darkMode={darkMode}
              className={bannerStyle}
              variant="danger"
            >
              {errorMessage}
            </Banner>
          )}
          {showCancelButton && (
            <Button
              variant="default"
              onClick={_cancelButtonProps.onClick}
              className={buttonStyle}
              leftGlyph={_cancelButtonProps.leftGlyph}
              darkMode={darkMode}
              data-testid="lg-form_footer-cancel_button"
            >
              {_cancelButtonProps.children || 'Cancel'}
            </Button>
          )}
          {isComponentType(primaryButton as React.ReactElement, 'Button') ? (
            React.cloneElement(primaryButton as React.ReactElement, {
              darkMode: darkMode,
              ['data-testid']: 'lg-form_footer-primary_button',
            })
          ) : (
            <PrimaryButton
              darkMode={darkMode}
              data-testid="lg-form_footer-primary_button"
              {...(primaryButton as PrimaryButtonProps)}
            />
          )}
        </div>
      </div>
    </footer>
  );
}
