import { ComponentPropsWithRef } from 'react';

import { ButtonProps } from '@leafygreen-ui/button';

export interface ActionsProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * Callback function called when the Cancel button is clicked.
   */
  onClickCancel: ButtonProps<'button'>['onClick'];

  /**
   * Callback function called when the Run button is clicked.
   */
  onClickRun: ButtonProps<'button'>['onClick'];
}
