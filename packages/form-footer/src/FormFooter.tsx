import React from 'react';
import PropTypes from 'prop-types';

import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import {
  bannerStyle,
  contentStyle,
  flexEndContent,
  footerBaseStyle,
  footerThemeStyle,
} from './FormFooter.styles';
import { FormFooterProps } from './FormFooter.types';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

export default function FormFooter({
  primaryButton,
  primaryButtonProps,
  cancelButtonProps,
  backButtonProps,
  errorMessage,
  contentClassName,
  className,
  darkMode: darkModeProp,
  ...rest
}: FormFooterProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const showBackButton = backButtonProps;
  const showCancelButton = cancelButtonProps;
  const showDeprecatedPrimaryButton = primaryButton;

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <footer
        data-testid="lg-form_footer-footer"
        className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
        {...rest}
      >
        <div className={cx(contentStyle, contentClassName)}>
          {showBackButton && (
            <Button
              variant="default"
              leftGlyph={
                <ArrowLeftIcon data-testid="lg-form_footer-back_button-icon" />
              }
              data-testid="lg-form_footer-back_button"
              {...backButtonProps}
            >
              {backButtonProps?.children || 'Back'}
            </Button>
          )}
          <div className={flexEndContent}>
            {errorMessage && (
              <Banner className={bannerStyle} variant="danger">
                {errorMessage}
              </Banner>
            )}
            {showCancelButton && (
              <Button
                data-testid="lg-form_footer-cancel_button"
                {...cancelButtonProps}
                variant="default"
              >
                {cancelButtonProps?.children || 'Cancel'}
              </Button>
            )}
            {showDeprecatedPrimaryButton ? (
              isComponentType(primaryButton as React.ReactElement, 'Button') ? (
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
              )
            ) : (
              <Button
                variant="primary"
                data-testid="lg-form_footer-primary_button"
                {...primaryButtonProps}
              />
            )}
          </div>
        </div>
      </footer>
    </LeafyGreenProvider>
  );
}

FormFooter.displayName = 'ConfirmationModal';

FormFooter.propTypes = {
  contentClassName: PropTypes.string,
  errorMessage: PropTypes.string,
  darkMode: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  primaryButtonProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  cancelButtonProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  backButtonProps: PropTypes.object,
};
