import React, { forwardRef } from 'react';

import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>(
  (
    { value, setValue, onCancel, onClear, ...rest }: DateRangeComponentProps,
    fwdRef,
  ) => {
    return (
      <>
        <DateRangeInput value={value} ref={fwdRef} {...rest} />
        <DateRangeMenu
          value={value}
          setValue={setValue}
          onCellClick={() => {}}
        />
      </>
    );
  },
);

DateRangeComponent.displayName = 'DateRangeComponent';
