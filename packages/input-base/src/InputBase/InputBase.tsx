import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseStyle, inputThemeStyles, themeStyles } from './InputBase.styles';
import { type InputBaseProps, State } from './InputBase.types';

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      darkMode: darkModeProp,
      state = State.None,
      onChange: onChangeProp,
      value: valueProp,
      ...rest
    }: InputBaseProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);

    const { value, handleChange: handleChangeProp } = useControlledValue(
      valueProp,
      onChangeProp,
    );

    const handleChange = (e: React.ChangeEvent<any>) => {
      handleChangeProp?.(e);
    };

    return (
      // TODO: TextArea, needs polymorphic
      <input
        ref={forwardedRef}
        value={value}
        onChange={handleChange}
        className={cx(
          baseStyle,
          themeStyles[theme],
          inputThemeStyles[theme][state],
          className,
        )}
        {...rest}
      />
    );
  },
);

InputBase.displayName = 'InputBase';
