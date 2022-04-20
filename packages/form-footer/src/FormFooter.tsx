import React from 'react';
import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { transparentize } from 'polished';
import ChevronLeftIcon from '@leafygreen-ui/icon/dist/ChevronLeft';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

const footerStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 24px;
  border: 1px solid ${uiColors.gray.light2};
  box-shadow: 0px -4px 4px 0px ${transparentize(0.9, uiColors.black)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  min-height: unset;
  padding-block: 7px;
  max-width: 700px;
`;

const buttonStyle = css`
  white-space: nowrap;
`;

/**
 * Types
 */

export interface FormFooterProps {
  /**
   * The primary (right-most) button. Defined as a <Button> element, or as an object with the shape:
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
   */
  primaryButton?: React.ReactChild | PrimaryButtonProps;

  /**
   * Text for the cancel button. A cancel button will only appear if this text is defined.
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
}: FormFooterProps) {
  return (
    <footer className={cx(footerStyle, className)}>
      <div className={cx(contentStyle, contentClassName)}>
        {backButtonText && (
          <Button
            variant="default"
            onClick={onBackClick}
            className={buttonStyle}
            leftGlyph={<ChevronLeftIcon />}
          >
            {backButtonText}
          </Button>
        )}
        <div className={flexEndContent}>
          {errorMessage && (
            <Banner className={bannerStyle} variant="danger">
              {errorMessage}
            </Banner>
          )}
          {cancelButtonText && (
            <Button
              variant="default"
              onClick={onCancel}
              className={buttonStyle}
            >
              {cancelButtonText || 'Cancel'}
            </Button>
          )}
          {isComponentType(primaryButton, 'Button') ? (
            primaryButton
          ) : (
            <PrimaryButton {...(primaryButton as PrimaryButtonProps)} />
          )}
        </div>
      </div>
    </footer>
  );
}
