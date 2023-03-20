import React, { useState } from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select as SelectComponent } from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

import {
  menuBaseStyles,
  menuThemeStyles,
  selectDisabledStyles,
  wrapperBaseStyles,
} from './Select.styles';
import { SelectProps } from './Select.types';

/**
 * @internal
 */
export function Select({
  id,
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
  'data-testid': dataTestId,
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
    const selectedUnit = unitOptions.find(unit => unit.displayName === val);

    if (selectedUnit !== undefined) {
      onChange(selectedUnit);
    }
  };

  /**
   * Custom unit button with a tooltip.
   * Tooltip will show up if there is an ellipse.
   */
  const CustomMenuButton = React.forwardRef(
    ({ className, children, ...props }: ButtonProps, forwardedRef) => {
      // TODO: HALP with TS
      //@ts-ignore
      const buttonRef: React.MutableRefObject<HTMLElement> = useForwardedRef(
        forwardedRef,
        null,
      );
      const textNode = buttonRef.current?.querySelector(
        'div[data-selecttextvalue]',
      ) as HTMLElement;

      const [open, setOpen] = useState<boolean>(false);

      return (
        <div
          className={css`
            position: relative;
          `} //TODO: add style
        >
          <Tooltip
            enabled={textNode?.offsetWidth < textNode?.scrollWidth}
            justify="middle"
            // Using refEl instead of a trigger because triggerProps such as onMouseEnter are added to the trigger inside the tooltip component. OnMouseEnter is triggered by hovering over trigger or any of its children. In the case of TODO: finish this
            refEl={buttonRef}
            open={open}
            usePortal={false}
          >
            {unit?.displayName}
          </Tooltip>
          <Button
            {...props}
            className={cx(menuBaseStyles, menuThemeStyles[theme], className)}
            ref={buttonRef}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              const popoverParent = (e.target as HTMLButtonElement).closest(
                'div[data-ispopoverwrapper]', //TODO: prefix lg
              );
              if (!popoverParent) setOpen(true);
            }}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          >
            {children}
          </Button>
        </div>
      );
    },
  );

  CustomMenuButton.displayName = 'CustomMenuButton';

  return (
    <div className={cx(wrapperBaseStyles)}>
      <SelectComponent //TODO: add width: max-content inside select menu
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={unit?.displayName}
        className={cx({
          [selectDisabledStyles[theme]]: disabled,
        })}
        allowDeselect={false}
        dropdownAutoWidth
        disabled={disabled}
        size={size}
        data-testid={dataTestId}
        {...popoverProps}
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
