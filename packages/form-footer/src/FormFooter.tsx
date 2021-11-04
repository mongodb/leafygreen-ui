import React, { useMemo } from 'react';
import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { transparentize } from 'polished';
import { once } from 'lodash';

const footerStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 24px;
  border: 1px solid ${uiColors.gray.light2};
  box-shadow: 0px -4px 4px 0px ${transparentize(0.9, uiColors.black)};
`;

const contentStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  gap: 8px;
`;

const buttonStyle = css`
  white-space: nowrap;
`;

const flexSpan = css`
  display: inline-flex;
  gap: inherit;
`;

const bannerStyle = css`
  flex-grow: 0;
  min-height: unset;
  padding-block: 7px;
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
        '`primaryButton` prop in `FormFooter` must be either a `Button` component, or object with at minumum a `text` property',
      );
    }
  }, [primaryButton]);

  return (
    <footer className={cx(footerStyle, className)}>
      <div className={cx(contentStyle, contentClassName)}>
        <span className={flexSpan}>
          {backButtonText && (
            <Button
              variant="default"
              onClick={onBackClick}
              className={buttonStyle}
            >
              {backButtonText}
            </Button>
          )}
          {errorMessage && (
            <Banner className={bannerStyle} variant="danger">
              {errorMessage}
            </Banner>
          )}
        </span>
        <span className={flexSpan}>
          <Button variant="default" onClick={onCancel} className={buttonStyle}>
            {cancelButtonText || 'Cancel'}
          </Button>
          {primaryButton && RenderedPrimaryButton}
        </span>
      </div>
    </footer>
  );
}

const errorOnce = once(console.error);
