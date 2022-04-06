import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { StepperContextValues } from './types';

export const StepperContext = createContext({});
export const useStepperContext = () =>
  useContext<Partial<StepperContextValues>>(StepperContext);

const StepperContextProvider = ({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: ReactNode;
}) => {
  // TODO: This dark mode state should ideally be managed in a global state.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode);
  const stepIconClassName = createUniqueClassName();
  const stepLabelClassName = createUniqueClassName();

  useEffect(() => {
    setIsDarkMode(darkMode);
  }, [darkMode]);

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
