import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export interface PopoverState {
  /**
   * Whether the most immediate popover ancestor is open
   */
  isPopoverOpen: boolean;
  /**
   * Sets the internal state
   * @internal
   */
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopoverContext = createContext<PopoverState>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

/**
 * Access the popover state
 * @returns `isPopoverOpen: boolean`
 */
export function usePopoverContext(): PopoverState {
  return useContext(PopoverContext);
}

interface PopoverProviderProps {
  children?: React.ReactNode;
}

/**
 * Creates a Popover context.
 * Call `usePopoverContext` to access the popover state
 */
export function PopoverProvider({ children }: PopoverProviderProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
    }),
    [isPopoverOpen],
  );

  return (
    <PopoverContext.Provider value={providerValue}>
      {children}
    </PopoverContext.Provider>
  );
}

PopoverProvider.displayName = 'PopoverProvider';

PopoverProvider.propTypes = { children: PropTypes.node };
