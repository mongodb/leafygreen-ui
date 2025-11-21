import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

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

export const WizardStepProvider = ({
  stepId,
  requiresAcknowledgement,
  children,
}: PropsWithChildren<
  Omit<WizardStepContextData, 'isAcknowledged' | 'setAcknowledged'>
>) => {
  const [isAcknowledged, setAcknowledged] = useState(false);

  return (
    <WizardStepContext.Provider
      value={{
        stepId,
        requiresAcknowledgement,
        isAcknowledged,
        setAcknowledged,
      }}
    >
      {children}
    </WizardStepContext.Provider>
  );
};

export const useWizardStepContext = () => useContext(WizardStepContext);
