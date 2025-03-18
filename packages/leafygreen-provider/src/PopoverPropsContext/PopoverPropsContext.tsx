import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  PortalContextProvider,
  usePopoverPortalContainer,
} from '../PortalContext/PortalContext';

import { PopoverPropsProviderProps } from './PopoverPropsContext.types';

export const PopoverPropsContext = createContext<PopoverPropsProviderProps>({});

/**
 * Access the popover props context to read props passed to nested popover component instances
 */
export const usePopoverPropsContext = (): PopoverPropsProviderProps => {
  return useContext(PopoverPropsContext);
};

/**
 * Creates a PopoverProps context to pass props to a deeply nested popover element
 * Call `usePopoverPropsContext` to access the popover state
 * This is defined separately from `PopoverContext` to avoid incorrectly resetting `isPopoverOpen` value
 */
export const PopoverPropsProvider = ({
  children,
  ...props
}: PropsWithChildren<PopoverPropsProviderProps>) => {
  const popoverPortalContext = usePopoverPortalContainer();
  const popover = {
    portalContainer:
      props.portalContainer || popoverPortalContext.portalContainer,
    scrollContainer:
      props.scrollContainer || popoverPortalContext.scrollContainer,
  };

  return (
    <PopoverPropsContext.Provider value={props}>
      <PortalContextProvider popover={popover}>
        {children}
      </PortalContextProvider>
    </PopoverPropsContext.Provider>
  );
};

PopoverPropsProvider.displayName = 'PopoverPropsProvider';
