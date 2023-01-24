import { ChangeEventHandler, createContext, useContext } from 'react';

import { Size } from './types';

export interface RadioBoxGroupContext {
  value: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  size: Size | undefined;
  name: string | undefined;
  darkMode: boolean;
}

const context = createContext<RadioBoxGroupContext | null>(null);

export const Provider = context.Provider;

export function useRadioBoxGroupContext() {
  return useContext(context);
}
