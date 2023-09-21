import { createContext, useContext } from 'react';

import { HighlightProvider } from './HighlightProvider.types';

export const HighlightContext = createContext<HighlightProvider>({});

export const useHighlightContext = () => useContext(HighlightContext);
