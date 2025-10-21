import { createContext, useContext } from 'react';

export interface AccordionContextProps {
  id: string;
  onSelectPanel: (index: number) => void;
  selectedIndex: number;
}

/**
 * `AccordionContext` has data for all child elements nested under an
 * accordion component instance
 */
export const AccordionContext = createContext<AccordionContextProps>({
  id: 'accordion',
  onSelectPanel: () => {},
  selectedIndex: 0,
});

export const useAccordionContext = () => {
  return useContext(AccordionContext);
};
