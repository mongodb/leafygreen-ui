import React, { forwardRef, useRef } from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../DatePickerContext';
import { DateRangeType } from '../../types';
import { isSameUTCRange } from '../../utils';
import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>(
  (
    {
      value,
      setValue,
      handleValidation,
      onCancel,
      onClear,
      showQuickSelection,
      ...rest
    }: DateRangeComponentProps,
    fwdRef,
  ) => {
    const { isOpen, setOpen, isDirty, setIsDirty, menuId } =
      useDatePickerContext();
    const closeMenu = () => setOpen(false);

    const formFieldRef = useForwardedRef(fwdRef, null);
    const menuRef = useRef<HTMLDivElement>(null);

    /** setValue with possible side effects */
    const updateValue = (newVal?: DateRangeType) => {
      setValue(newVal);
    };

    useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

    /** Called when the input's start or end value has changed */
    const handleInputValueChange = (newRange?: DateRangeType) => {
      if (!isSameUTCRange(value, newRange)) {
        // When the value changes via the input element,
        // we only trigger validation if the component is dirty
        if (isDirty) {
          handleValidation?.(newRange);
        }
        updateValue(newRange);
      }
    };

    /** Called when any calendar cell is clicked */
    const handleCalendarValueChange = (newRange?: DateRangeType) => {
      // TODO: more logic here
      updateValue(newRange);
    };

    return (
      <>
        <DateRangeInput
          value={value}
          setValue={handleInputValueChange}
          ref={formFieldRef}
          {...rest}
        />
        <DateRangeMenu
          ref={menuRef}
          refEl={formFieldRef}
          id={menuId}
          value={value}
          setValue={handleCalendarValueChange}
          showQuickSelection={showQuickSelection}
        />
      </>
    );
  },
);

DateRangeComponent.displayName = 'DateRangeComponent';
