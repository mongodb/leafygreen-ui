import React, { createContext, PropsWithChildren, useContext } from 'react';

import { Direction } from '@leafygreen-ui/descendants';
import { LgIdString } from '@leafygreen-ui/lib';

export interface WizardContextData {
  isWizardContext: boolean;
  activeStep: number;
  updateStep: (direction: Direction) => void;
  lgId?: LgIdString;
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
  lgId,
}: PropsWithChildren<Omit<WizardContextData, 'isWizardContext'>>) => {
  return (
    <WizardContext.Provider
      value={{
        isWizardContext: true,
        activeStep,
        updateStep,
        lgId,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => useContext(WizardContext);
