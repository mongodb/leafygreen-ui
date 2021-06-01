import { createContext, ChangeEventHandler, useContext } from 'react';
import Size from './Size';

export interface RadioBoxGroupContext {
  value: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  size: Size | undefined;
  name: string | undefined;
}

const context = createContext<RadioBoxGroupContext | null>(null);

export const Provider = context.Provider;

export function useRadioBoxGroupContext() {
  return useContext(context);
}
