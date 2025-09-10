import React from 'react';
import { TimeInputSelectProps, UnitOption } from './TimeInputSelect.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select as LGSelect,
} from '@leafygreen-ui/select';
import { cx } from '@leafygreen-ui/emotion';
import {
  wrapperBaseStyles,
  selectStyles,
  getSelectDisabledStyles,
} from './TimeInputSelect.styles';
import { unitOptions } from '../shared/constants';
import { Size } from '../TimeInput/TimeInput.types';

export function TimeInputSelect({
  unit,
  id,
  className,
  onChange,
}: TimeInputSelectProps) {
  const { theme } = useDarkMode();

  // Placeholders for now
  const size = Size.Default;
  const disabled = false;

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

    console.log(selectedUnit);
  };

  return (
    <div className={wrapperBaseStyles}>
      <LGSelect
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
        renderMode={RenderMode.TopLayer}
      >
        {unitOptions.map(option => (
          <Option key={option.displayName} value={option.displayName}>
            {option.displayName}
          </Option>
        ))}
      </LGSelect>
    </div>
  );
}

TimeInputSelect.displayName = 'TimeInputSelect';
