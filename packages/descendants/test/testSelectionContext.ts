import { createContext } from 'react';

export interface TestSelectionContextProps {
  selected: number | undefined;
  setSelected: (x: number | undefined) => void;
}

export const TestSelectionContext = createContext<TestSelectionContextProps>({
  selected: -1,
  setSelected: () => {},
});
