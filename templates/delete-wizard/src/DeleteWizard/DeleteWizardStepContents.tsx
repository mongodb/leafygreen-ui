import React, { ComponentProps } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { css, cx } from '@leafygreen-ui/emotion';

import { DeleteWizardCompoundComponentProperties } from './compoundComponentProperties';

export const DeleteWizardStepContents = CompoundSubComponent(
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
    displayName: 'DeleteWizardStepContents',
    key: DeleteWizardCompoundComponentProperties.StepContent,
  },
);
