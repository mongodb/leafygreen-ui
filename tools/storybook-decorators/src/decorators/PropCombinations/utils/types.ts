import { ComponentProps } from 'react';

export type PropName<T extends React.ComponentType<any>> =
  keyof ComponentProps<T>;

export type PropCombination<T extends React.ComponentType<any>> = {
  [key in PropName<T>]: ComponentProps<T>[key];
};
