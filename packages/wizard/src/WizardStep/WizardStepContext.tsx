import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface WizardStepContextData {
  stepId: string;
  isAcknowledged: boolean;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
}

export const WizardStepContext = createContext<WizardStepContextData>({
  stepId: '',
  isAcknowledged: false,
  setAcknowledged: () => {},
});

export const useWizardStepContext = () => useContext(WizardStepContext);
