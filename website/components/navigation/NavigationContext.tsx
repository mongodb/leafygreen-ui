import React, { createContext, useMemo, useContext } from 'react';

export interface MobileNavigationProviderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const MobileNavigationContext = createContext<MobileNavigationProviderProps>({
  open: false,
  setOpen: () => false,
});

export function useMobileNavigation() {
  return useContext(MobileNavigationContext);
}

function MobileNavigationProvider({
  children,
  open,
  setOpen,
}: MobileNavigationProviderProps) {
  const contextValue = useMemo(() => {
    return { open, setOpen };
  }, [open, setOpen]);

  return (
    <MobileNavigationContext.Provider value={contextValue}>
      {children}
    </MobileNavigationContext.Provider>
  );
}

MobileNavigationProvider.displayName = 'MobileNavigationProvider';

export default MobileNavigationProvider;
