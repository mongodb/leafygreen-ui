import React, { createContext, PropsWithChildren, useContext } from 'react';

import { getLgIds } from '../utils/getLgIds';
import { GetLgIdsReturnType } from '../utils/getLgIds';

export interface WizardContextData {
  /**
   * Defines whether the consuming component is within a Wizard context.
   * This is used to log warnings in sub-components that must be rendered as a Wizard child.
   */
  isWizardContext: boolean;

  /**
   * Defines the currently active Wizard.Step.
   * Note: when controlling this externally, ensure that the provided `activeStep` index is valid relative to the count of steps available.
   * If the zero-indexed `activeStep` value exceeds the count of steps provided (or is negative), nothing will render inside the Wizard.
   */
  activeStep: number;

  /**
   * Updates the Wizard `activeStep` to the provided step number.
   * Note: The Wizard implementation internally handles clamping the step number
   * to the available number of steps
   * @param step
   * @returns
   */
  updateStep: (step: number) => void;

  /**
   * @internal
   * Internally sets the number of steps in the Wizard
   */
  totalSteps: number;
  lgIds: GetLgIdsReturnType;
}

export const WizardContext = createContext<WizardContextData>({
  isWizardContext: false,
  activeStep: 0,
  totalSteps: 0,
  updateStep: () => {},
  lgIds: getLgIds('lg-wizard'),
});

interface WizardProviderProps
  extends PropsWithChildren<Omit<WizardContextData, 'isWizardContext'>> {}

export const WizardProvider = ({
  children,
  activeStep,
  updateStep,
  totalSteps,
  lgIds = getLgIds('lg-wizard'),
}: WizardProviderProps) => {
  return (
    <WizardContext.Provider
      value={{
        isWizardContext: true,
        activeStep,
        updateStep,
        totalSteps,
        lgIds,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => useContext(WizardContext);
