import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { StepperContextValues } from './types';

export const StepperContext = createContext({});
export const useStepperContext = () =>
  useContext<Partial<StepperContextValues>>(StepperContext);

const StepperContextProvider = ({
  darkMode: darkModeProp,
  children,
}: {
  darkMode: boolean;
  children: ReactNode;
}) => {
  // TODO: This dark mode state should ideally be managed in a global state.
  const [darkMode, setDarkMode] = useState<boolean>(darkModeProp);

  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);

  return (
    <StepperContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export default StepperContextProvider;
