import React, { forwardRef } from 'react';

import { DateRangeInput } from '../DateRangeInput';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>((props: DateRangeComponentProps, fwdRef) => {
  return (
    <>
      <DateRangeInput />
    </>
  );
});

DateRangeComponent.displayName = 'DateRangeComponent';
