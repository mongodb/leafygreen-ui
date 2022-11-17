import React, { createContext, ReactNode, useContext } from 'react';
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
  return (
    <StepperContext.Provider
      value={{
        darkMode,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export default StepperContextProvider;
