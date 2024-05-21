import React from 'react';
import PropTypes from 'prop-types';

import Banner from '@leafygreen-ui/banner';
import Button, { Variant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { LGIDS_FORM_FOOTER } from './constants';
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
        data-testid={LGIDS_FORM_FOOTER.root}
        className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
        {...rest}
      >
        <div className={cx(contentStyle, contentClassName)}>
          {showBackButton && (
            <Button
              variant={Variant.default}
              leftGlyph={
                <ArrowLeftIcon data-testid={LGIDS_FORM_FOOTER.backButtonIcon} />
              }
              data-testid={LGIDS_FORM_FOOTER.backButton}
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
                data-testid={LGIDS_FORM_FOOTER.cancelButton}
                {...cancelButtonProps}
                variant={Variant.default}
              >
                {cancelButtonProps?.children || 'Cancel'}
              </Button>
            )}
            {showDeprecatedPrimaryButton ? (
              isComponentType(primaryButton as React.ReactElement, 'Button') ? (
                React.cloneElement(primaryButton as React.ReactElement, {
                  ['data-testid']: LGIDS_FORM_FOOTER.primaryButton,
                })
              ) : (
                <PrimaryButton
                  data-testid={LGIDS_FORM_FOOTER.primaryButton}
                  {...(primaryButton as PrimaryButtonProps)}
                />
              )
            ) : (
              <Button
                variant="primary"
                data-testid={LGIDS_FORM_FOOTER.primaryButton}
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
  primaryButtonProps: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  cancelButtonProps: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  backButtonProps: PropTypes.objectOf(PropTypes.any),
};
