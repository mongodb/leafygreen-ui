import { createContext, useContext } from 'react';

export interface AccordionItemContextProps {
  buttonId: string;
  isExpanded: boolean;
  index: number;
  itemId: string;
  panelId: string;
}

/**
 * `AccordionItemContext` has data for all child elements nested under an
 * accordion item component instance
 */
export const AccordionItemContext = createContext<AccordionItemContextProps>({
  buttonId: 'button-id',
  isExpanded: false,
  index: 0,
  itemId: 'item-id',
  panelId: 'panel-id',
});

export const useAccordionItemContext = () => {
  return useContext(AccordionItemContext);
};
