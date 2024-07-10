import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';

import { UnitOption } from '../NumberInput/NumberInput.types';
import { UnitSelectButton } from '../UnitSelectButton';

import {
  getSelectDisabledStyles,
  selectStyles,
  wrapperBaseStyles,
} from './UnitSelect.styles';
import { UnitSelectProps } from './UnitSelect.types';

/**
 * @internal
 */
export function UnitSelect({
  'data-testid': dataTestId,
  unit,
  id,
  unitOptions,
  onChange,
  disabled,
  usePortal,
  size,
  className,
  portalClassName,
  portalContainer,
  portalRef,
  scrollContainer,
  popoverZIndex,
}: UnitSelectProps) {
  const { theme } = useDarkMode();

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    portalRef,
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

  return (
    <div className={wrapperBaseStyles}>
      <Select
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={currentUnitOption.displayName}
        className={cx(
          selectStyles,
          {
            [getSelectDisabledStyles(theme)]: disabled,
          },
          className,
        )}
        allowDeselect={false}
        dropdownWidthBasis={DropdownWidthBasis.Option}
        disabled={disabled}
        size={size}
        data-testid={dataTestId}
        {...popoverProps}
        __INTERNAL__menuButtonSlot__={UnitSelectButton}
        __INTERNAL__menuButtonSlotProps__={{
          disabled,
          displayName: currentUnitOption.displayName,
        }}
      >
        {unitOptions.map(option => (
          <Option key={option.displayName} value={option.displayName}>
            {option.displayName}
          </Option>
        ))}
      </Select>
    </div>
  );
}

UnitSelect.displayName = 'UnitSelect';
