import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { breakpoints } from '@leafygreen-ui/tokens';
import { Wizard, WizardFooterProps } from '@leafygreen-ui/wizard';

const footerStyles = css`
  position: sticky;
  bottom: 0;
`;

const footerContentStyles = css`
  margin-inline: auto;
  max-width: ${breakpoints.XLDesktop}px;
`;

/**
 * A wrapper around Wizard.Footer with embedded styles for the DeleteWizard template
 */
export const DeleteWizardFooter = ({
  className,
  contentClassName,
  ...props
}: WizardFooterProps) => {
  return (
    <Wizard.Footer
      className={cx(footerStyles, className)}
      contentClassName={cx(footerContentStyles, contentClassName)}
      {...props}
    />
  );
};
