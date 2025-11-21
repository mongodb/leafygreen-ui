import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface WizardContextData {
  isWizardContext: boolean;
  activeStep: number;
  /**
   * Updates the Wizard `activeStep` to the provided step number.
   * Note: The Wizard implementation internally handles clamping the step number
   * to the available number of steps
   * @param step
   * @returns
   */
  updateStep: (step: number) => void;
}

export const WizardContext = createContext<WizardContextData>({
  isWizardContext: false,
  activeStep: 0,
  updateStep: () => {},
});

interface WizardProviderProps
  extends PropsWithChildren<Omit<WizardContextData, 'isWizardContext'>> {}

export const WizardProvider = ({
  children,
  activeStep,
  updateStep,
}: WizardProviderProps) => {
  return (
    <WizardContext.Provider
      value={{
        isWizardContext: true,
        activeStep,
        updateStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => useContext(WizardContext);
