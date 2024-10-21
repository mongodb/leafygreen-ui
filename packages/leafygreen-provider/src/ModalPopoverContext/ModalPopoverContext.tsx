import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  ModalPopoverContextType,
  ModalPopoverProviderProps,
} from './ModalPopoverContext.types';

export const ModalPopoverContext = createContext<ModalPopoverContextType>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

/**
 * Access the modal popover context
 */
export const useModalPopoverContext = (): ModalPopoverContextType => {
  return useContext(ModalPopoverContext);
};

/**
 * Creates a Modal Popover context.
 * Call `useModalPopoverContext` to access the popover state
 */
export const ModalPopoverProvider = ({
  children,
}: ModalPopoverProviderProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
    }),
    [isPopoverOpen],
  );

  return (
    <ModalPopoverContext.Provider value={providerValue}>
      {children}
    </ModalPopoverContext.Provider>
  );
};

ModalPopoverProvider.displayName = 'ModalPopoverProvider';

ModalPopoverProvider.propTypes = { children: PropTypes.node };
