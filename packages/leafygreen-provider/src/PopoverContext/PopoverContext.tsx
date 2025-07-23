import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { PopoverContextType } from './PopoverContext.types';

export const PopoverContext = createContext<PopoverContextType>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

/**
 * Access the popover context to read and write if a popover element is open in a modal
 */
export const usePopoverContext = (): PopoverContextType => {
  return useContext(PopoverContext);
};

/**
 * Creates a Popover context to read and write if a popover element is open in a modal
 * Call `usePopoverContext` to access the popover state
 * This is defined separately from `PopoverPropsContext` to avoid incorrectly resetting `isPopoverOpen` value
 * We avoid renaming this provider because it will trigger major changes in all packages because
 * `@leafygreen-ui/leafygreen-provider` is a peer dependency to all LG packages
 */
export const PopoverProvider = ({ children }: PropsWithChildren<{}>) => {
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
};

PopoverProvider.displayName = 'PopoverProvider';
