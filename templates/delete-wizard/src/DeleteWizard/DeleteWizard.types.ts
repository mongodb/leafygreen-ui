import { ComponentProps } from 'react';

import { WizardProps } from '@leafygreen-ui/wizard';

export interface DeleteWizardProps
  extends WizardProps,
    Omit<ComponentProps<'div'>, 'children'> {}
