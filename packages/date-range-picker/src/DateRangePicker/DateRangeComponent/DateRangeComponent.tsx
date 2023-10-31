import React from 'react';

import { useDatePickerContext } from '@leafygreen-ui/date-picker/shared/components/DatePickerContext';
import { useBackdropClick } from '@leafygreen-ui/hooks';

import { useDateRangeContext } from '../DateRangeContext';
import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = ({
  onCancel,
  onClear,
  showQuickSelection,
  ...rest
}: DateRangeComponentProps) => {
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
};

DateRangeComponent.displayName = 'DateRangeComponent';
