import { ReactNode } from 'react';

export interface WizardProps {
  /**
   * The current active step index (0-based).
   *
   * If provided, the component operates in controlled mode, and any interaction will not update internal state.
   * Use `onStepChange` to update your external state
   *
   * Note: when controlling this externally, ensure that the provided `activeStep` index is valid relative to the count of steps available.
   * If the zero-indexed `activeStep` value exceeds the count of steps provided (or is negative), nothing will render inside the Wizard.
   */
  activeStep?: number;

  /**
   * Callback fired when the active step changes.
   */
  onStepChange?: (step: number) => void;

  /**
   * The wizard steps and footer as children
   */
  children: ReactNode;
}
