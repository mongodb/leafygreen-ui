import { DarkModeProps } from '@leafygreen-ui/lib';
import { PropsWithChildren } from 'react';

export type CodeProviderProps = PropsWithChildren &
  DarkModeProps & {
    contents: string;
  };
