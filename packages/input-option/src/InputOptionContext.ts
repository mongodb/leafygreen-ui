import { createContext, useContext } from 'react';

import { InputOptionProps } from './InputOption';

interface InputOptionContextData
  extends Pick<InputOptionProps, 'disabled' | 'highlighted' | 'selected'> {}

export const InputOptionContext = createContext<InputOptionContextData>(
  {} as InputOptionContextData,
);

export const useInputOptionContext = () => useContext(InputOptionContext);
