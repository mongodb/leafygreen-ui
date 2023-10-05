import React, { forwardRef } from 'react';

import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>((props: DateRangeComponentProps, fwdRef) => {
  return (
    <>
      <DateRangeInput />
      <DateRangeMenu />
    </>
  );
});

DateRangeComponent.displayName = 'DateRangeComponent';
