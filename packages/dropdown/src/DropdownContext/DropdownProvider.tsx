import { createContext, useContext } from 'react';

import { DropdownProvider } from './DropdownProvider.types';

export const DropdownContext = createContext<DropdownProvider>({});

export const useDropdownContext = () => useContext(DropdownContext);
