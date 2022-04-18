import React, { useMemo } from 'react';
import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { transparentize } from 'polished';
import { once } from 'lodash';
import ChevronLeftIcon from '@leafygreen-ui/icon/dist/ChevronLeft';

const footerStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 24px;
  border: 1px solid ${uiColors.gray.light2};
  box-shadow: 0px -4px 4px 0px ${transparentize(0.9, uiColors.black)};
  display: flex;
  align-items: center;
`;

const contentStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const buttonStyle = css`
  white-space: nowrap;
  justify-self: left;
`;

const flexEndContent = css`
  justify-self: right;
  display: inline-flex;
  gap: inherit;
`;

const bannerStyle = css`
  flex-grow: 0;
  min-height: unset;
  padding-block: 7px;
  max-width: 700px;
`;

/**
 * Types
 */
interface PrimaryButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const isPrimaryButtonProps = (testObj: any): testObj is PrimaryButtonProps => {
  return testObj && testObj.text != null;
};

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
   * Text for the cancel button. A cancel button will appear regardless of whether text is defined.
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
  const RenderedPrimaryButton: React.ReactNode = useMemo(() => {
    if (primaryButton) {
      if (isPrimaryButtonProps(primaryButton)) {
        return (
          <Button
            variant={primaryButton.variant ?? 'primary'}
            disabled={primaryButton.disabled}
            onClick={primaryButton.onClick}
            type={primaryButton.type}
            className={buttonStyle}
          >
            {primaryButton.text}
          </Button>
        );
      }

      if (isComponentType(primaryButton, 'Button')) {
        return primaryButton;
      }

      errorOnce(
        '`primaryButton` prop in `FormFooter` must be either a `Button` component, or object with at minimum a `text` property',
      );
    }
  }, [primaryButton]);

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
          <Button variant="default" onClick={onCancel} className={buttonStyle}>
            {cancelButtonText || 'Cancel'}
          </Button>
          {primaryButton && RenderedPrimaryButton}
        </div>
      </div>
    </footer>
  );
}

const errorOnce = once(console.error);
