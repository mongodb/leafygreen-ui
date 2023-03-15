import React from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Option,
  Select as SelectComponent,
  textClassName,
} from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

import {
  baseStyles,
  menuThemeStyles,
  themeStyles,
  wrapperBaseStyles,
} from './Select.styles';
import { SelectProps } from './Select.types';

/**
 * @internal
 */
export function Select({
  unit,
  unitOptions,
  onChange,
  disabled,
  usePortal,
  size,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
}: SelectProps) {
  const { theme } = useDarkMode();

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    scrollContainer,
  } as const;

  const handleChange = (val: string) => {
    // eslint-disable-next-line no-console
    console.log({ val });

    const selectedUnit = unitOptions.find(unit => unit.displayName === val);

    if (selectedUnit !== undefined) {
      onChange(selectedUnit);
    }
  };

  /**
   * Custom unit button with a tooltip.
   * Tooltip will show up if there is an ellipse.
   */
  // eslint-disable-next-line react/display-name
  const CustomMenuButton = React.forwardRef(
    ({ className, children, ...props }: ButtonProps, forwardedRef) => {
      // TODO: HALP with TS
      //@ts-ignore
      const wrapperRef: React.MutableRefObject<HTMLElement> = useForwardedRef(
        forwardedRef,
        null,
      );
      const textNode = wrapperRef.current?.querySelector(
        `.${textClassName}`,
      ) as HTMLElement;

      return (
        <Tooltip
          enabled={textNode?.offsetWidth < textNode?.scrollWidth}
          justify="middle"
          trigger={
            <Button
              {...props}
              className={cx(menuThemeStyles[theme], className)}
              ref={wrapperRef}
            >
              {children}
            </Button>
          }
        >
          {unit?.displayName}
        </Tooltip>
      );
    },
  );

  return (
    <div className={cx(wrapperBaseStyles)}>
      <SelectComponent
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={unit?.displayName}
        className={cx(baseStyles, themeStyles[theme])}
        allowDeselect={false}
        dropdownAutoWidth
        disabled={disabled}
        size={size}
        {...popoverProps}
        // Component missing displayName
        // eslint-disable-next-line
        __INTERNAL__menuButtonSlot__={CustomMenuButton}
      >
        {unitOptions?.map(option => (
          <Option key={option?.displayName} value={option?.displayName}>
            {option?.displayName}
          </Option>
        ))}
      </SelectComponent>
    </div>
  );
}

Select.displayName = 'Select';
