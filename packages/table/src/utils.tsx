import React, { SetStateAction } from 'react';

export interface SharedRowProps {
  selectable?: boolean;
  setIndeterminate?: React.Dispatch<SetStateAction<boolean>>;
  checked?: boolean;
}

export const coerceArray = (arg: any) => {
  if (Array.isArray(arg)) {
    return [...arg];
  } else {
    return [arg];
  }
};
