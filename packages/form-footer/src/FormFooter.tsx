import React from 'react';
import { transparentize } from 'polished';

import Banner from '@leafygreen-ui/banner';
import Button, { ButtonProps } from '@leafygreen-ui/button';
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
type CustomButtonProps = Pick<
  ButtonProps,
  'children' | 'leftGlyph' | 'onClick'
>;

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
   * The cancel button which will only appear if cancelButtonProps is defined.
   * Customizable props include children, leftGlyph, and onClick.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  cancelButtonProps?: CustomButtonProps;

  /**
   * The back button which will only appear if backButtonProps is defined.
   * Customizable props include children, leftGlyph, and onClick.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  backButtonProps?: CustomButtonProps;

  /**
   * Text for the cancel button.
   * A cancel button will only appear if this text is defined.
   *
   * @default "Cancel"
   * @deprecated since version 3.1.0 - use cancelButtonProps instead
   */
  cancelButtonText?: string;

  /**
   * onClick callback for the cancel button
   *
   * @deprecated since version 3.1.0 - use cancelButtonProps instead
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text for the back button. A back button will only appear if text is defined.
   *
   * @deprecated since version 3.1.0 - use backButtonProps instead
   */
  backButtonText?: string;

  /**
   * onClick callback for the back button
   *
   * @deprecated since version 3.1.0 - use backButtonProps instead
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
