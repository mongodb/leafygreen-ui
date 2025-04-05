import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
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
import { DEFAULT_LGID_ROOT, getLgIds } from './utils';

export default function FormFooter({
  primaryButton,
  primaryButtonProps,
  cancelButtonProps,
  backButtonProps,
  errorMessage,
  contentClassName,
  className,
  darkMode: darkModeProp,
  'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  ...rest
}: FormFooterProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const showBackButton = backButtonProps;
  const showCancelButton = cancelButtonProps;
  const showDeprecatedPrimaryButton = primaryButton;
  const lgIds = getLgIds(dataLgId);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <footer
        data-testid={lgIds.root}
        className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
        {...rest}
      >
        <div className={cx(contentStyle, contentClassName)}>
          {showBackButton && (
            <Button
              variant={ButtonVariant.Default}
              leftGlyph={<ArrowLeftIcon data-testid={lgIds.backButtonIcon} />}
              data-testid={lgIds.backButton}
              {...backButtonProps}
            >
              {backButtonProps?.children || 'Back'}
            </Button>
          )}
          <div className={flexEndContent}>
            {errorMessage && (
              <Banner className={bannerStyle} variant={BannerVariant.Danger}>
                {errorMessage}
              </Banner>
            )}
            {showCancelButton && (
              <Button
                data-testid={lgIds.cancelButton}
                {...cancelButtonProps}
                variant={ButtonVariant.Default}
              >
                {cancelButtonProps?.children || 'Cancel'}
              </Button>
            )}
            {showDeprecatedPrimaryButton ? (
              isComponentType(primaryButton as React.ReactElement, 'Button') ? (
                React.cloneElement(primaryButton as React.ReactElement, {
                  ['data-testid']: lgIds.primaryButton,
                })
              ) : (
                <PrimaryButton
                  data-testid={lgIds.primaryButton}
                  {...(primaryButton as PrimaryButtonProps)}
                />
              )
            ) : (
              <Button
                variant={ButtonVariant.Primary}
                data-testid={lgIds.primaryButton}
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
