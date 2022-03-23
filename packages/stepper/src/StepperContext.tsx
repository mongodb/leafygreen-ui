import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
} from 'react';
import { createUniqueClassName } from '@leafygreen-ui/lib';
interface StepperContextValues {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  stepIconClassName: string;
  stepLabelClassName: string;
}

export const StepperContext = createContext({});
export const useStepperContext = () =>
  useContext<Partial<StepperContextValues>>(StepperContext);

const StepperContextProvider = ({ children }: { children: ReactNode }) => {
  // TODO: This dark mode state should ideally be managed in a global state.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const stepIconClassName = createUniqueClassName();
  const stepLabelClassName = createUniqueClassName();

  return (
    <StepperContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        stepIconClassName,
        stepLabelClassName,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export default StepperContextProvider;