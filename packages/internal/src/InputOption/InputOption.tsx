import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { InputOptionProps } from './InputOption.types';
import {
  inputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
} from './InputOption.style';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

const _InputOption: React.ForwardRefRenderFunction<
  HTMLLIElement,
  InputOptionProps
> = (
  {
    children,
    disabled,
    focused,
    active,
    darkMode: darkModeProp,
    showWedge = true,
    className,
    ...rest
  }: InputOptionProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <li
      ref={ref}
      role="option"
      aria-selected={focused}
      tabIndex={-1}
      className={cx(
        inputOptionStyles,
        inputOptionThemeStyles[theme],
        {
          [inputOptionWedge]: showWedge,
          [inputOptionActiveStyles[theme]]: active || focused,
          [inputOptionDisabledStyles[theme]]: disabled,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
};

// type InputOptionType = React.ForwardRefExoticComponent<InputOptionProps>;
export const InputOption = React.forwardRef<HTMLLIElement, InputOptionProps>(
  _InputOption,
);
