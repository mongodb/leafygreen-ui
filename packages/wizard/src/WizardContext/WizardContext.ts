import { createContext, useContext } from 'react';

import { Direction } from '@leafygreen-ui/descendants';

interface WizardContextData {
  isWizardContext: boolean;
  activeStep: number;
  updateStep: (direction: Direction) => void;
}

export const WizardContext = createContext<WizardContextData>({
  isWizardContext: false,
  activeStep: 0,
  updateStep: () => {},
});

export const useWizardContext = () => useContext(WizardContext);
