import React, { createContext, PropsWithChildren, useContext } from 'react';

import { useWizardContext, WizardContextData } from '@leafygreen-ui/wizard';

import { DeleteWizardProps } from './DeleteWizard.types';

export interface DeleteWizardContextData {
  onCancel?: DeleteWizardProps['onCancel'];
  onDelete?: DeleteWizardProps['onDelete'];
}

export const DeleteWizardContext = createContext<DeleteWizardContextData>({});

export const DeleteWizardContextProvider = ({
  children,
  onCancel,
  onDelete,
}: PropsWithChildren<DeleteWizardContextData>) => {
  return (
    <DeleteWizardContext.Provider
      value={{
        onCancel,
        onDelete,
      }}
    >
      {children}
    </DeleteWizardContext.Provider>
  );
};

/**
 * A re-export of `useWizardContext` specifically for this DeleteWizard
 */
export const useDeleteWizardContext = (): DeleteWizardContextData &
  WizardContextData => {
  const wizardContext = useWizardContext();
  const deleteWizardContext = useContext(DeleteWizardContext);

  return {
    ...wizardContext,
    ...deleteWizardContext,
  };
};
