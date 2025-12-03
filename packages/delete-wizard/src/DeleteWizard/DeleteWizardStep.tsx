import React, { ComponentProps } from 'react';

import {
  CompoundSubComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  useWizardStepContext,
  Wizard,
  WizardStepProps,
  WizardSubComponentProperties,
} from '@leafygreen-ui/wizard';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';
import { useDeleteWizardContext } from './DeleteWizardContext';

export const useDeleteWizardStepContext = useWizardStepContext;

export interface DeleteWizardStepProps
  extends WizardStepProps,
    ComponentProps<'div'> {}
/**
 * A wrapper around Wizard.Step
 */
export const DeleteWizardStep = CompoundSubComponent(
  ({
    children,
    className,
    requiresAcknowledgement,
    ...rest
  }: DeleteWizardStepProps) => {
    const { lgIds } = useDeleteWizardContext();
    const footerChild = findChild(
      children,
      WizardSubComponentProperties.Footer,
    );

    const restChildren = filterChildren(children, [
      WizardSubComponentProperties.Footer,
    ]);

    return (
      <Wizard.Step requiresAcknowledgement={requiresAcknowledgement} {...rest}>
        <div
          className={cx(
            css`
              flex-grow: 1;
            `,
            className,
          )}
          data-lgid={lgIds.step}
          {...rest}
        >
          {restChildren}
        </div>
        {footerChild}
      </Wizard.Step>
    );
  },
  {
    displayName: 'DeleteWizardStep',
    key: DeleteWizardSubComponentKeys.Step,
  },
);
