import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

export interface VerticalStepperContextProps {
  currentStep: number;
  hasVerticalStepperParent: boolean;
}

export const VerticalStepperContext =
  createContext<VerticalStepperContextProps>({
    currentStep: 0,
    hasVerticalStepperParent: false,
  });

export const useVerticalStepperContext = () => {
  return useContext(VerticalStepperContext);
};

export const VerticalStepperProvider = ({
  children,
  currentStep,
  hasVerticalStepperParent,
}: PropsWithChildren<VerticalStepperContextProps>) => {
  return (
    <VerticalStepperContext.Provider
      value={{ currentStep, hasVerticalStepperParent }}
    >
      {children}
    </VerticalStepperContext.Provider>
  );
};
