import { ReactNode } from 'react';

export interface WizardStepProps
  extends Omit<React.ComponentProps<'div'>, 'title'> {
  /**
   * The title of the step
   */
  title: ReactNode;

  /**
   * The description of the step
   */
  description?: ReactNode;

  /**
   * The content of the step
   */
  children: ReactNode;
}
