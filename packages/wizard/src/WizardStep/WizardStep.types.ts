import { ReactNode } from 'react';

export interface WizardStepProps extends React.ComponentProps<'div'> {
  /**
   * The content of the step
   */
  children: ReactNode;
}
