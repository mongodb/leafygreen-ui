import { ReactNode } from 'react';

import { LgIdProps } from '@leafygreen-ui/lib';

export interface WizardProps extends LgIdProps {
  /**
   * The current active step index (0-based).
   * If provided, the component operates in controlled mode, and any interaction will not update internal state.
   * Use `onStepChange` to update your external state
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
