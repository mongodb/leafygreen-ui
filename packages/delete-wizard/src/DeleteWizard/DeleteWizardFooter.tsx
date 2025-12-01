import React, { MouseEventHandler } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { css, cx } from '@leafygreen-ui/emotion';
import { type PrimaryStandardButtonProps } from '@leafygreen-ui/form-footer';
import TrashIcon from '@leafygreen-ui/icon/Trash';
import { Either } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';
import {
  Wizard,
  WizardFooterProps,
  WizardSubComponentProperties,
} from '@leafygreen-ui/wizard';

import { useDeleteWizardContext } from './DeleteWizardContext';

const footerStyles = css`
  position: sticky;
  bottom: 0;
`;

const footerContentStyles = css`
  margin-inline: auto;
  max-width: ${breakpoints.XLDesktop}px;
`;

type DeleteWizardFooterProps = Either<
  WizardFooterProps & {
    /**
     * Sets the Back button text (for steps > 1)
     */
    backButtonText?: string;
    /**
     * Sets the Cancel button text.
     * The Cancel button will not render if no text is provided
     */
    cancelButtonText?: string;

    /**
     * Sets the Primary button text.
     *
     * The Primary button icon and variant are set automatically based on the activeStep index.
     * Provide a `primaryButtonProps` to override this behavior
     */
    primaryButtonText?: string;
  },
  'primaryButtonProps' | 'primaryButtonText'
>;

/**
 * A wrapper around Wizard.Footer with embedded styles for the DeleteWizard template
 */
export const DeleteWizardFooter = CompoundSubComponent(
  ({
    className,
    contentClassName,
    primaryButtonText,
    cancelButtonText,
    backButtonText,
    primaryButtonProps,
    cancelButtonProps,
    backButtonProps,
    ...props
  }: DeleteWizardFooterProps) => {
    const { activeStep, totalSteps, onCancel, onDelete } =
      useDeleteWizardContext();
    const isLastStep = activeStep === totalSteps - 1;

    const handlePrimaryButtonClick: MouseEventHandler<
      HTMLButtonElement
    > = e => {
      primaryButtonProps?.onClick?.(e);

      if (isLastStep) {
        onDelete?.(e);
      }
    };

    const handleCancelButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      cancelButtonProps?.onClick?.(e);
      onCancel?.(e);
    };

    const _primaryButtonProps: PrimaryStandardButtonProps = {
      children: primaryButtonText ?? '',
      variant: isLastStep ? 'danger' : 'primary',
      leftGlyph: isLastStep ? <TrashIcon /> : undefined,
      ...primaryButtonProps,
      // we define `onClick` after spreading props so this handler will always take precedence
      onClick: handlePrimaryButtonClick,
    };

    const _backButtonProps = {
      children: backButtonText,
      ...backButtonProps,
    };

    const _cancelButtonProps = {
      children: cancelButtonText,
      ...cancelButtonProps,
      // we define `onClick` after spreading props so this handler will always take precedence
      onClick: handleCancelButtonClick,
    };

    return (
      <Wizard.Footer
        className={cx(footerStyles, className)}
        contentClassName={cx(footerContentStyles, contentClassName)}
        primaryButtonProps={_primaryButtonProps}
        cancelButtonProps={_cancelButtonProps}
        backButtonProps={_backButtonProps}
        {...props}
      />
    );
  },
  {
    displayName: 'DeleteWizardFooter',
    key: WizardSubComponentProperties.Footer,
  },
);
