import React, { createContext, useContext } from 'react';

export interface PortalContextValues {
  popover: {
    portalContainer?: HTMLElement | null;
    scrollContainer?: HTMLElement | null;
  };
}

const defaultPortalContextValues: PortalContextValues = {
  popover: {
    portalContainer: undefined,
    scrollContainer: undefined,
  },
};

const PortalContext = createContext<PortalContextValues>(
  defaultPortalContextValues,
);

export function usePopoverPortalContainer() {
  const { popover } = useContext(PortalContext);

  return popover;
}

export interface PortalContextInterface {
  popover?: PortalContextValues['popover'];
  children: React.ReactNode;
}

export function PortalContextProvider({
  popover = defaultPortalContextValues.popover,
  children,
}: PortalContextInterface) {
  return (
    <PortalContext.Provider value={{ popover }}>
      {children}
    </PortalContext.Provider>
  );
}
