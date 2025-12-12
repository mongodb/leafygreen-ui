import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select as LGSelect,
} from '@leafygreen-ui/select';

import { unitOptions } from '../constants';
import { getLgIds } from '../utils/getLgIds';

import { selectStyles, wrapperBaseStyles } from './TimeInputSelect.styles';
import { TimeInputSelectProps, UnitOption } from './TimeInputSelect.types';

/**
 * @internal
 */
export const TimeInputSelect = ({
  unit,
  id,
  className,
  onChange,
}: TimeInputSelectProps) => {
  /**
   * Gets the current unit option using the unit string
   *
   * @internal
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
      <LGSelect
        id={id}
        onChange={handleChange}
        aria-labelledby="Unit Picker"
        value={currentUnitOption.displayName}
        className={cx(selectStyles, className)}
        allowDeselect={false}
        dropdownWidthBasis={DropdownWidthBasis.Option}
        renderMode={RenderMode.TopLayer}
        data-lgid={getLgIds().select} // TODO: temp get lg ids from context
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
