import { ComponentPropsWithRef, ReactNode } from 'react';

import { WizardFooter } from '../WizardFooter';
import { WizardStep } from '../WizardStep';

export interface WizardProps extends ComponentPropsWithRef<'div'> {
  /**
   * The current active step index (0-based). If provided, the component operates in controlled mode.
   */
  activeStep?: number;

  /**
   * Callback fired when the active step changes
   */
  onStepChange?: (step: number) => void;

  /**
   * The wizard steps and footer as children
   */
  children: ReactNode;
}

export interface WizardComponent {
  (props: WizardProps): JSX.Element;
  Step: typeof WizardStep;
  Footer: typeof WizardFooter;
  displayName: string;
}
