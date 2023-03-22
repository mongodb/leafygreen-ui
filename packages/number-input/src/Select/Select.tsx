import React, { useState } from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  menuButtonTextClassName,
  Option,
  popoverClassName,
  Select as SelectComponent,
} from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

import {
  customMenuButtonWrapperStyles,
  menuBaseStyles,
  menuThemeDisabledStyles,
  menuThemeStyles,
  selectDisabledStyles,
  selectStyles,
  wrapperBaseStyles,
} from './Select.styles';
import { SelectProps } from './Select.types';

/**
 * @internal
 */
export function Select({
  'data-testid': dataTestId,
  unit: unitProp = '',
  id,
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

  /**
   * Gets the current unit option using the unit string
   */
  const currentUnitOption = unitOptions?.find(
    unit => unit.displayName === unitProp,
  );

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
      const [open, setOpen] = useState<boolean>(false);
      const buttonRef: React.MutableRefObject<HTMLElement | null> =
        useForwardedRef(
          forwardedRef,
          null,
        ) as React.MutableRefObject<HTMLElement | null>;

      /**
       * Gets the text node for the selected option.
       */
      const textNode = buttonRef.current?.querySelector(
        `.${menuButtonTextClassName}`,
      ) as HTMLElement;

      /**
       * Checks if the selected option has an ellipse.
       */
      const hasEllipse = textNode?.offsetWidth < textNode?.scrollWidth;

      const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const popoverParent = (e.target as HTMLButtonElement).closest(
          `.${popoverClassName}`,
        );
        if (!popoverParent) setOpen(true);
      };

      const handleMouseLeave = () => setOpen(false);
      const handleOnFocus = () => setOpen(true);
      const handleOnBlur = () => setOpen(false);

      return (
        <div className={customMenuButtonWrapperStyles}>
          <Tooltip
            enabled={hasEllipse && !disabled}
            justify="middle"
            // Using refEl instead of a trigger element because triggerProps by default, such as onMouseEnter, are added to the trigger element inside the tooltip component. OnMouseEnter is triggered by hovering over the trigger or any of its children. In the case of this custom menu button we don't want the tooltip to open when children are hovered so we add our own open logic with onMouseEnter.
            refEl={buttonRef}
            open={open}
            {...popoverProps}
          >
            {currentUnitOption?.displayName}
          </Tooltip>
          <Button
            {...props}
            className={cx(
              menuBaseStyles,
              menuThemeStyles[theme],
              {
                [menuThemeDisabledStyles[theme]]: disabled,
              },
              className,
            )}
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            {children}
          </Button>
        </div>
      );
    },
  );

  CustomMenuButton.displayName = 'CustomMenuButton';

  return (
    <div className={wrapperBaseStyles}>
      <SelectComponent
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={currentUnitOption?.displayName as string}
        className={cx(selectStyles, {
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
