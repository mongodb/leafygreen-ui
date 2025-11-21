import React, { createContext, PropsWithChildren, useContext } from 'react';

import { Optional } from '@leafygreen-ui/lib';

import { getLgIds, GetLgIdsReturnType } from '../utils/getLgIds';

export interface WizardContextData {
  isWizardContext: boolean;
  activeStep: number;
  /**
   * Updates the Wizard `activeStep` to the provided step number.
   * Note: The Wizard implementation internally handles clamping the step number
   * to the available number of steps
   * @param step
   * @returns
   */
  updateStep: (step: number) => void;
  lgIds: GetLgIdsReturnType;
}

export const WizardContext = createContext<WizardContextData>({
  isWizardContext: false,
  activeStep: 0,
  updateStep: () => {},
  lgIds: {
    step: 'lg-wizard-step',
    footer: 'lg-wizard-footer',
    footerPrimaryButton: 'lg-wizard-footer-primary_button',
    footerBackButton: 'lg-wizard-footer-back_button',
    footerCancelButton: 'lg-wizard-footer-cancel_button',
  },
});

interface WizardProviderProps
  extends PropsWithChildren<
    Omit<Optional<WizardContextData, 'lgIds'>, 'isWizardContext'>
  > {}

export const WizardProvider = ({
  children,
  activeStep,
  updateStep,
  lgIds = getLgIds('lg-wizard'),
}: WizardProviderProps) => {
  return (
    <WizardContext.Provider
      value={{
        isWizardContext: true,
        activeStep,
        updateStep,
        lgIds,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => useContext(WizardContext);
