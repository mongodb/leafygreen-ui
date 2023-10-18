import React, { forwardRef } from 'react';

import { useBackdropClick } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../DatePickerContext';
import { useDateRangeContext } from '../DateRangeContext';
import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>(
  (
    {
      handleValidation,
      onCancel,
      onClear,
      showQuickSelection,
      ...rest
    }: DateRangeComponentProps,
    fwdRef,
  ) => {
    const { isOpen, setOpen, menuId } = useDatePickerContext();

    const {
      refs: { formFieldRef, menuRef },
    } = useDateRangeContext();

    useBackdropClick(() => setOpen(false), [formFieldRef, menuRef], isOpen);

    return (
      <>
        <DateRangeInput ref={formFieldRef} {...rest} />
        <DateRangeMenu
          ref={menuRef}
          refEl={formFieldRef}
          id={menuId}
          onCancel={onCancel}
          onClear={onClear}
          showQuickSelection={showQuickSelection}
        />
      </>
    );
  },
);

DateRangeComponent.displayName = 'DateRangeComponent';
