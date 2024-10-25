import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

import { PopoverProviderProps } from './PopoverContext.types';

export const PopoverContext = createContext<PopoverProviderProps>({});

/**
 * Access the popover context
 */
export const usePopoverContext = (): PopoverProviderProps => {
  return useContext(PopoverContext);
};

/**
 * Creates a Popover context.
 * Call `usePopoverContext` to access the popover state
 */
export const PopoverProvider = ({
  children,
  ...props
}: PropsWithChildren<PopoverProviderProps>) => {
  return (
    <PopoverContext.Provider value={props}>{children}</PopoverContext.Provider>
  );
};

PopoverProvider.displayName = 'PopoverProvider';

PopoverProvider.propTypes = { children: PropTypes.node };
