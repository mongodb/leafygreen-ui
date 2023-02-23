import React from 'react';

import { InputBaseProps } from './InputBase.types';

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, ...rest }: InputBaseProps, forwardedRef) => {
    return <input ref={forwardedRef} className={className} {...rest} />;
  },
);

InputBase.displayName = 'InputBase';
