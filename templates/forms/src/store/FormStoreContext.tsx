import React, { createContext, useState, useContext } from 'react';
import FormStore from './FormStore';

const FormStoreContext = createContext<FormStore | null>(null);

export function useFormStore() {
  const context = useContext(FormStoreContext);

  if (!context) {
    throw new Error('useFormStore must be used within a FormStoreProvider.');
  }

  return context;
}

interface FormTemplateProviderProps {
  children: React.ReactNode;
}

export const FormTemplateProvider: React.FC<FormTemplateProviderProps> = ({
  children,
}) => {
  const [formStore] = useState(() => new FormStore());

  return (
    <FormStoreContext.Provider value={formStore}>
      {children}
    </FormStoreContext.Provider>
  );
};
