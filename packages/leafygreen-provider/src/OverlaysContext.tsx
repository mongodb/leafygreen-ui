import React, { createContext, PropsWithChildren,useCallback, useContext, useState } from 'react';

interface OverlayItem {
  id: string;
  element: HTMLElement | null;
};

export interface OverlaysContextProps {
  overlays: Array<OverlayItem>;
  register: (overlay: OverlayItem) => void;
  remove: (idToRemove: string) => void;
  topMostOverlay?: OverlayItem;
};

const OverlaysContext = createContext<OverlaysContextProps | undefined>(undefined);

export const OverlaysContextProvider = ({ children }: PropsWithChildren) => {
  const [overlays, setOverlays] = useState<Array<OverlayItem>>([]);

  const register = useCallback((overlay: OverlayItem) => {
    // skip if already registered
    if (overlays.findIndex(item => item.id === overlay.id) > -1) return;
    setOverlays(prev => [...prev, {...overlay}]);
  }, []);

  const remove = useCallback((idToRemove: string) => {
    setOverlays(prev => prev.filter(item => item.id !== idToRemove));
  }, []);

  const topMostOverlay = overlays[overlays.length - 1];

  return (
    <OverlaysContext.Provider value={{
      overlays,
      register,
      remove,
      topMostOverlay
    }}>
      {children}
    </OverlaysContext.Provider>
  );
}

export const useOverlaysContext = (): OverlaysContextProps => {
  const context = useContext(OverlaysContext);

  if (!context) {
    throw new Error('useOverlaysContext must be used within an OverlaysContextProvider');
  }

  return context;
}
