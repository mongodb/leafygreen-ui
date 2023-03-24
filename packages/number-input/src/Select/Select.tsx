import React from 'react';

import { ButtonProps } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select as SelectComponent } from '@leafygreen-ui/select';

import { UnitOption } from '../NumberInput/NumberInput.types';
import { SelectButton } from '../SelectButton';

import {
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
  unit = '',
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
  const currentUnitOption = unitOptions.find(
    u => u.displayName === unit,
  ) as UnitOption;

  const handleChange = (val: string) => {
    const selectedUnit = unitOptions.find(u => u.displayName === val);

    if (selectedUnit !== undefined) {
      onChange(selectedUnit);
    }
  };

  /**
   * Custom unit button with a tooltip.
   * Tooltip will show up if there is an ellipse.
   */
  const CustomMenuButton = React.forwardRef(
    ({ className, children, ...props }: ButtonProps, forwardedRef) => (
      <SelectButton
        ref={forwardedRef}
        disabled={disabled}
        displayName={currentUnitOption.displayName}
        {...props}
      >
        {children}
      </SelectButton>
    ),
  );
  CustomMenuButton.displayName = 'CustomMenuButton';

  return (
    <div className={wrapperBaseStyles}>
      <SelectComponent
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={currentUnitOption.displayName}
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
          <Option key={option.displayName} value={option.displayName}>
            {option.displayName}
          </Option>
        ))}
      </SelectComponent>
    </div>
  );
}

Select.displayName = 'Select';
