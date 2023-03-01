import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseStyle, inputThemeStyles, themeStyles } from './InputBase.styles';
import { type InputBaseProps, State } from './InputBase.types';

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      darkMode: darkModeProp,
      state = State.None,
      ...rest
    }: InputBaseProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    return (
      // TODO: TextArea, needs polymorphic
      <input
        ref={forwardedRef}
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
