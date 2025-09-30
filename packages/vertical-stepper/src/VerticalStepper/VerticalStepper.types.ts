import React, { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface VerticalStepperProps
  extends DarkModeProps,
    LgIdProps,
    Omit<ComponentPropsWithRef<'ol'>, 'children'> {
  /**
   * Zero-based. The index of the current step that will appear active. All steps will be marked as completed if the currentStep equals the number of steps.
   */
  currentStep: number;

  /**
   * Two or more `<VerticalStep/>` components
   */
  children: React.ReactNode;
}
