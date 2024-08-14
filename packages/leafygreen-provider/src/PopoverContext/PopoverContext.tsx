import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  PopoverContextType,
  PopoverProviderProps,
} from './PopoverContext.types';

export const PopoverContext = createContext<PopoverContextType>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

/**
 * Access the popover context
 */
export const usePopoverContext = (): PopoverContextType => {
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
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
      ...props,
    }),
    [isPopoverOpen, props],
  );

  return (
    <PopoverContext.Provider value={providerValue}>
      {children}
    </PopoverContext.Provider>
  );
};

PopoverProvider.displayName = 'PopoverProvider';

PopoverProvider.propTypes = { children: PropTypes.node };
