import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { InputBase } from '@leafygreen-ui/input-base';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { NumberInputProps } from './NumberInput.types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      darkMode: darkModeProp,
      className,
      disabled,
      label,
      id: idProp,
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-numberinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const { darkMode } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef}>
          {label && (
            <Label className={cx()} htmlFor={inputId} disabled={disabled}>
              {label}
            </Label>
          )}
          <InputBase className={cx(className)} type="number" />
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';
