import React, { createContext, PropsWithChildren, useContext } from 'react';

/**
 * Shape of the ActionCard context data
 */
export interface ActionCardContextValue {
  /**
   * Whether the expandable section is currently expanded
   */
  isExpanded: boolean;

  /**
   * Function to toggle the expansion state
   */
  toggleExpand: () => void;
}

export const ActionCardContext = createContext<ActionCardContextValue | null>(
  null,
);

export const ActionCardProvider = ({
  value,
  children,
}: PropsWithChildren<{
  value: ActionCardContextValue;
}>) => {
  return (
    <ActionCardContext.Provider value={value}>
      {children}
    </ActionCardContext.Provider>
  );
};

export const useActionCardContext = () => {
  const context = useContext(ActionCardContext);

  if (!context) {
    throw new Error(
      'useActionCardContext must be used within a ActionCardContextProvider',
    );
  }

  return context;
};
