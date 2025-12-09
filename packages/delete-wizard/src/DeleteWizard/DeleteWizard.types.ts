import { ComponentProps, MouseEventHandler } from 'react';

import { WizardProps } from '@leafygreen-ui/wizard';

export interface DeleteWizardProps
  extends WizardProps,
    Omit<ComponentProps<'div'>, 'children'> {
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}
