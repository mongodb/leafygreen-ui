import { createContext, useContext } from 'react';

import { InputOptionProps } from './InputOption';

interface InputOptionContextData
  extends Pick<
    InputOptionProps,
    'checked' | 'darkMode' | 'disabled' | 'highlighted'
  > {}

export const InputOptionContext = createContext<InputOptionContextData>(
  {} as InputOptionContextData,
);

export const useInputOptionContext = () => useContext(InputOptionContext);
