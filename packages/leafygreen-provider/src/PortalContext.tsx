import React, { createContext, useContext } from 'react';

export interface PortalContextValues {
  modal: {
    portalContainer?: HTMLElement | null;
  };
  popover: {
    portalContainer?: HTMLElement | null;
    scrollContainer?: HTMLElement | null;
  };
}

const defaultPortalContextValues: PortalContextValues = {
  modal: {
    portalContainer: undefined,
  },
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

export function useModalPortalContainer() {
  const { modal } = useContext(PortalContext);

  return modal;
}

interface PortalContext {
  modal?: PortalContextValues['modal'];
  popover?: PortalContextValues['popover'];
  children: React.ReactNode;
}

export default function PortalContextProvider({
  modal = defaultPortalContextValues.modal,
  popover = defaultPortalContextValues.popover,
  children,
}: PortalContext) {
  return (
    <PortalContext.Provider value={{ modal, popover }}>
      {children}
    </PortalContext.Provider>
  );
}
