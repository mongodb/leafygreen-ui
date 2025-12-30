import React, { createContext, PropsWithChildren, useContext } from 'react';

import { State } from '../shared.types';

/**
 * Shape of the ToolCard context data
 */
export interface ToolCardContextValue {
  /**
   * Whether the expandable section is currently expanded
   */
  isExpanded: boolean;

  /**
   * Whether the expand toggle button should be visible
   */
  showExpandButton: boolean;

  /**
   * The current lifecycle state of the tool interaction
   */
  state: State;

  /**
   * Function to toggle the expansion state
   */
  toggleExpand: () => void;
}

export const ToolCardContext = createContext<ToolCardContextValue | null>(null);

export const ToolCardProvider = ({
  value,
  children,
}: PropsWithChildren<{
  value: ToolCardContextValue;
}>) => {
  return (
    <ToolCardContext.Provider value={value}>
      {children}
    </ToolCardContext.Provider>
  );
};

export const useToolCardContext = () => {
  const context = useContext(ToolCardContext);

  if (!context) {
    throw new Error(
      'useToolCardContext must be used within a ToolCardContextProvider',
    );
  }

  return context;
};
