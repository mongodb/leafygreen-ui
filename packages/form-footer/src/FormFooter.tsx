import React from 'react';
import { transparentize } from 'polished';

import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

const footerBaseStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 26px 24px;
  display: flex;
  align-items: center;
`;

const footerThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0px -1px 4px 0px ${transparentize(0.75, '#000000')};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.black};
    border-top: 1px solid ${palette.gray.dark2};
    box-shadow: 0px -1px 4px 0px ${transparentize(0.75, '#000000')};
  `,
};

const contentStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const flexEndContent = css`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: inherit;
`;

const bannerStyle = css`
  flex-grow: 0;
  padding-block: 7px;
  max-width: 700px;
`;

const buttonStyle = css`
  white-space: nowrap;
`;

/**
 * Types
 */

export interface FormFooterProps extends HTMLElementProps<'footer'> {
  /**
   * The primary (right-most) button.
   * Defined as a `<Button>` element, or as an object with the shape:
   *
   * ```ts
   * interface PrimaryButtonProps {
   *  text: string;
   *  onClick?: React.MouseEventHandler<HTMLButtonElement>;
   *  variant?: 'primary' | 'danger';
   *  disabled?: boolean;
   *  type?: 'button' | 'submit';
   * }
   * ```
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  primaryButton: React.ReactElement | PrimaryButtonProps;

  /**
   * Text for the cancel button.
   * A cancel button will only appear if this text is defined.
   *
   * @default "Cancel"
   */
  cancelButtonText?: string;

  /**
   * onClick callback for the cancel button
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text for the back button. A back button will only appear if text is defined.
   */
  backButtonText?: string;

  /**
   * onClick callback for the back button
   */
  onBackClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text within the error banner. The banner will only appear if an error message is defined.
   */
  errorMessage?: string;

  /**
   * Styling prop for the content.
   * Useful for setting left and right margins, or max-width
   */
  contentClassName?: string;

  /**
   * Styling prop
   */
  className?: string;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   * @default false
   */
  darkMode?: boolean;
}

/**
 * Component
 */
export default function FormFooter({
  primaryButton,
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
  return (
    <footer
      className={cx(footerBaseStyle, footerThemeStyle[theme], className)}
      {...rest}
    >
      <div className={cx(contentStyle, contentClassName)}>
        {backButtonText && (
          <Button
            variant="default"
            onClick={onBackClick}
            className={buttonStyle}
            leftGlyph={<ArrowLeftIcon />}
            darkMode={darkMode}
          >
            {backButtonText}
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
          {cancelButtonText && (
            <Button
              variant="default"
              onClick={onCancel}
              className={buttonStyle}
              darkMode={darkMode}
            >
              {cancelButtonText || 'Cancel'}
            </Button>
          )}
          {isComponentType(primaryButton as React.ReactElement, 'Button') ? (
            React.cloneElement(primaryButton as React.ReactElement, {
              darkMode: darkMode,
            })
          ) : (
            <PrimaryButton
              darkMode={darkMode}
              {...(primaryButton as PrimaryButtonProps)}
            />
          )}
        </div>
      </div>
    </footer>
  );
}
