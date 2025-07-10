import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { SplitButton } from '@leafygreen-ui/split-button';

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
  const lgIds = getLgIds(dataLgId);

  const showBackButton = backButtonProps !== undefined;
  const isStandardBackButton =
    showBackButton && !('menuItems' in backButtonProps);
  const showCancelButton = cancelButtonProps !== undefined;
  const isStandardCancelButton =
    showCancelButton && !('menuItems' in cancelButtonProps);
  const isStandardPrimaryButton = !('menuItems' in primaryButtonProps);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <footer
        data-testid={lgIds.root}
        className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
        {...rest}
      >
        <div className={cx(contentStyle, contentClassName)}>
          {showBackButton &&
            (isStandardBackButton ? (
              <Button
                variant={ButtonVariant.Default}
                leftGlyph={<ArrowLeftIcon data-testid={lgIds.backButtonIcon} />}
                data-testid={lgIds.backButton}
                {...backButtonProps}
              >
                {backButtonProps?.children || 'Back'}
              </Button>
            ) : (
              <SplitButton
                data-testid={lgIds.backSplitButton}
                variant={ButtonVariant.Default}
                {...backButtonProps}
              />
            ))}
          <div className={flexEndContent}>
            {errorMessage && (
              <Banner className={bannerStyle} variant={BannerVariant.Danger}>
                {errorMessage}
              </Banner>
            )}
            {showCancelButton &&
              (isStandardCancelButton ? (
                <Button
                  data-testid={lgIds.cancelButton}
                  {...cancelButtonProps}
                  variant={ButtonVariant.Default}
                >
                  {cancelButtonProps?.children || 'Cancel'}
                </Button>
              ) : (
                <SplitButton
                  data-testid={lgIds.cancelSplitButton}
                  {...cancelButtonProps}
                  variant={ButtonVariant.Default}
                />
              ))}
            {isStandardPrimaryButton ? (
              <Button
                data-testid={lgIds.primaryButton}
                variant={ButtonVariant.Primary}
                {...primaryButtonProps}
              />
            ) : (
              <SplitButton
                data-testid={lgIds.primarySplitButton}
                variant={ButtonVariant.Primary}
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
