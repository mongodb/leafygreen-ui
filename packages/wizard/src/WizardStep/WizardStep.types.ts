import { ReactNode } from 'react';

export interface WizardStepProps {
  /**
   * The title of the step
   */
  title: ReactNode;

  /**
   * The description of the step
   */
  description: ReactNode;

  /**
   * The content of the step
   */
  children: ReactNode;
}
