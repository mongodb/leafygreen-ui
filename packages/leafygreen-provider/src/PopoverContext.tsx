import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

interface PopoverState {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopoverContext = createContext<PopoverState>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

export function usePopoverContext(): PopoverState {
  return useContext(PopoverContext);
}

interface PopoverProviderProps {
  children?: React.ReactNode;
}

function PopoverProvider({ children }: PopoverProviderProps) {
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

export default PopoverProvider;
