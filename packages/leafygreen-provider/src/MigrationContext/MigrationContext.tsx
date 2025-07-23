import React, { createContext, PropsWithChildren, useContext } from 'react';

import { MigrationContextType } from './MigrationContext.types';

export const MigrationContext = createContext<MigrationContextType>({
  forceUseTopLayer: false,
});

/**
 * Access the modal popover context
 */
export const useMigrationContext = (): MigrationContextType => {
  return useContext(MigrationContext);
};

/**
 * Creates a global context for migration purposes.
 * Call `useMigrationContext` to access the migration context
 */
export const MigrationProvider = ({
  children,
  ...props
}: PropsWithChildren<MigrationContextType>) => {
  return (
    <MigrationContext.Provider value={props}>
      {children}
    </MigrationContext.Provider>
  );
};

MigrationProvider.displayName = 'MigrationProvider';
