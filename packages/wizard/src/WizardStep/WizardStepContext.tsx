import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface WizardStepContextData {
  stepId: string;
  requiresAcknowledgement: boolean;
  isAcknowledged: boolean;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
}

export const WizardStepContext = createContext<WizardStepContextData>({
  stepId: '',
  requiresAcknowledgement: false,
  isAcknowledged: false,
  setAcknowledged: () => {},
});

export const useWizardStepContext = () => useContext(WizardStepContext);
