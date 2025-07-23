import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  baseStyles,
  baseThemedStyles,
  checkedStyles,
  labelStyles,
} from './RadioButton.styles';
import { RadioButtonProps } from './RadioButton.types';

export const RadioButton = forwardRef(
  (
    {
      id,
      className,
      name,
      children,
      darkMode: darkModeProp,
      checked,
      ...rest
    }: RadioButtonProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    return (
      <div
        className={cx(
          baseStyles,
          baseThemedStyles[theme],
          { [checkedStyles[theme]]: checked },
          className,
        )}
        ref={ref}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <input
          id={id}
          type="radio"
          name={name}
          defaultChecked={checked}
          aria-checked={checked}
          hidden
          {...rest}
        />
        <label htmlFor={id} className={labelStyles}>
          {children}
        </label>
      </div>
    );
  },
);

RadioButton.displayName = 'RadioButton';
