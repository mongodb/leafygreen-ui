import React, { forwardRef } from 'react';

import { DateRangeInput } from '../DateRangeInput';
import { DateRangeMenu } from '../DateRangeMenu';

import { DateRangeComponentProps } from './DateRangeComponent.types';

export const DateRangeComponent = forwardRef<
  HTMLDivElement,
  DateRangeComponentProps
>(({ ...rest }: DateRangeComponentProps, fwdRef) => {
  return (
    <>
      <DateRangeInput ref={fwdRef} {...rest} />
      <DateRangeMenu />
    </>
  );
});

DateRangeComponent.displayName = 'DateRangeComponent';
