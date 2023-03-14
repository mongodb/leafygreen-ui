import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select as SelectComponent } from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

import { baseStyles, themeStyles, wrapperBaseStyles } from './Select.styles';
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

  return (
    <div className={cx(wrapperBaseStyles)}>
      <Tooltip
        enabled={false}
        justify="middle"
        trigger={
          <div>
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
            >
              {unitOptions?.map(option => (
                <Option key={option?.displayName} value={option?.displayName}>
                  {option?.displayName}
                </Option>
              ))}
            </SelectComponent>
          </div>
        }
      >
        {unit?.displayName}
      </Tooltip>
    </div>
  );
}

Select.displayName = 'Select';
