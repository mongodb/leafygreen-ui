import { ComponentProps } from 'react';

export interface DynamicStoryConfig {
  baseCsf: string;
  stories: () => {
    [key: string]: any;
  };
}

export interface CombinedArgs {
  [prop: string]: Array<any>;
}

export type PropName<T extends React.ComponentType<any>> =
  keyof ComponentProps<T>;

export type PropCombination<T extends React.ComponentType<any>> = {
  [key in PropName<T>]: ComponentProps<T>[key];
};
