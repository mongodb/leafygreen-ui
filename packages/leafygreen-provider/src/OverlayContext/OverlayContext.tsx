import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

interface OverlayItem<E extends HTMLElement = HTMLElement> {
  element: E;
  ref: RefObject<E>;
  id: string;
}

export interface OverlayContextProps {
  getOverlays: () => Array<OverlayItem>;
  registerOverlay: (overlay: OverlayItem) => void;
  removeOverlay: (idToRemove: string) => void;
  topMostOverlay: OverlayItem | undefined;
}

export const OverlayContext = createContext<OverlayContextProps | undefined>(
  undefined,
);

export const useOverlayContext = (): OverlayContextProps => {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error('useOverlayContext must be used within an OverlayProvider');
  }

  return context;
};

/**
 * Global provider tracking overlays that stack on z-axis
 */
const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [overlays, setOverlays] = useState<Array<OverlayItem>>([]);

  const topMostOverlay = useMemo(
    () => overlays[overlays.length - 1],
    [overlays],
  );

  const registerOverlay = useCallback((overlay: OverlayItem) => {
    if (overlays.findIndex(item => item.id === overlay.id) > -1) return;
    setOverlays(prev => [...prev, { ...overlay }]);
  }, []);

  const removeOverlay = useCallback((idToRemove: string) => {
    setOverlays(prev => prev.filter(item => item.id !== idToRemove));
  }, []);

  return (
    <OverlayContext.Provider
      value={{
        getOverlays: () => overlays,
        registerOverlay,
        removeOverlay,
        topMostOverlay,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

OverlayProvider.displayName = 'OverlayProvider';

OverlayProvider.propTypes = {
  children: PropTypes.node,
};

export default OverlayProvider;
