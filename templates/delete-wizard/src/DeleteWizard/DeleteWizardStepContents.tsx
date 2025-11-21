import React, { ComponentProps } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { css, cx } from '@leafygreen-ui/emotion';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';

/**
 * A styled `div` for use inside a `DeleteWizard.Step` to ensure proper page scrolling and footer positioning
 */
export const DeleteWizardStepContent = CompoundSubComponent(
  ({ children, className, ...rest }: ComponentProps<'div'>) => {
    return (
      <div
        className={cx(
          css`
            flex-grow: 1;
          `,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
  {
    displayName: 'DeleteWizardStepContent',
    key: DeleteWizardSubComponentKeys.StepContent,
  },
);
