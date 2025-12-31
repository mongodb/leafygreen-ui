import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select as LGSelect,
} from '@leafygreen-ui/select';

import { unitOptions } from '../constants';
import { useTimeInputDisplayContext } from '../Context';
import { UnitOption } from '../shared.types';

import { selectStyles, wrapperBaseStyles } from './TimeInputSelect.styles';
import { TimeInputSelectProps } from './TimeInputSelect.types';

/**
 * @internal
 */
export const TimeInputSelect = ({
  unit,
  id,
  className,
  onChange,
}: TimeInputSelectProps) => {
  const { lgIds, size, disabled } = useTimeInputDisplayContext();

  /**
   * Gets the current unit option using the unit string
   */
  const currentUnitOption = unitOptions.find(
    unitOption => unitOption.displayName === unit,
  ) as UnitOption;

  /**
   * Handles the change event for the select component
   * @param val - The value of the selected unit
   */
  const handleChange = (val: string) => {
    const selectedUnit = unitOptions.find(
      unitOption => unitOption.displayName === val,
    );

    if (selectedUnit !== undefined) {
      onChange(selectedUnit);
    }
  };

  return (
    <div className={wrapperBaseStyles}>
      <LGSelect
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={currentUnitOption.displayName}
        className={cx(selectStyles, className)}
        allowDeselect={false}
        dropdownWidthBasis={DropdownWidthBasis.Option}
        renderMode={RenderMode.TopLayer}
        data-testid={lgIds.select}
        data-lgid={lgIds.select}
        size={size}
        disabled={disabled}
      >
        {unitOptions.map(option => (
          <Option key={option.displayName} value={option.displayName}>
            {option.displayName}
          </Option>
        ))}
      </LGSelect>
    </div>
  );
};

TimeInputSelect.displayName = 'TimeInputSelect';
