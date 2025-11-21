import React, { createContext, PropsWithChildren, useContext } from 'react';

import { Direction } from '@leafygreen-ui/descendants';

export interface WizardContextData {
  isWizardContext: boolean;
  activeStep: number;
  updateStep: (direction: Direction) => void;
}

export const WizardContext = createContext<WizardContextData>({
  isWizardContext: false,
  activeStep: 0,
  updateStep: () => {},
});

export const WizardProvider = ({
  children,
  activeStep,
  updateStep,
}: PropsWithChildren<Omit<WizardContextData, 'isWizardContext'>>) => {
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
