import React from 'react';
import { getNodeTextContent } from '@leafygreen-ui/lib';
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

function _InputOption(
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
) {
  const { theme } = useDarkMode(darkModeProp);
  const textContent = getNodeTextContent(children);
  return (
    <li
      ref={ref}
      role="option"
      aria-selected={focused}
      aria-label={textContent}
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
}

export const InputOption = React.forwardRef(_InputOption);
