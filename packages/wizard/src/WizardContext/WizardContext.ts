import { createContext, useContext } from 'react';

import { Direction } from '@leafygreen-ui/descendants';

interface WizardContextData {
  activeStep: number;
  updateStep: (direction: Direction) => void;
}

export const WizardContext = createContext<WizardContextData>({
  activeStep: 0,
  updateStep: () => {},
});

export const useWizardContext = () => useContext(WizardContext);
