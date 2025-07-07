import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  bannerStyle,
  contentStyle,
  flexEndContent,
  footerBaseStyle,
  footerThemeStyle,
} from './FormFooter.styles';
import { FormFooterProps } from './FormFooter.types';
import { getLgIds } from './utils';

export default function FormFooter({
  primaryButtonProps,
  cancelButtonProps,
  backButtonProps,
  errorMessage,
  contentClassName,
  className,
  darkMode: darkModeProp,
  'data-lgid': dataLgId,
  ...rest
}: FormFooterProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const showBackButton = backButtonProps;
  const showCancelButton = cancelButtonProps;
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
            <Button
              variant={ButtonVariant.Primary}
              data-testid={lgIds.primaryButton}
              {...primaryButtonProps}
            />
          </div>
        </div>
      </footer>
    </LeafyGreenProvider>
  );
}

FormFooter.displayName = 'ConfirmationModal';
