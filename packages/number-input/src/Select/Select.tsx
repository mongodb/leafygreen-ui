import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Option, Select as SelectComponent } from '@leafygreen-ui/select';

import { SelectProps } from './Select.types';

export function Select({
  unit,
  unitOptions,
  onChange,
  usePortal,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
}: SelectProps) {
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
    <div className={cx()}>
      <SelectComponent
        onChange={handleChange}
        aria-labelledby="Language Picker"
        value={unit?.displayName}
        className={cx()}
        allowDeselect={false}
        dropdownAutoWidth
        {...popoverProps}
        // Component missing displayName
        // eslint-disable-next-line
        // __INTERNAL__menuButtonSlot__={LanguageSwitcherButton}
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
