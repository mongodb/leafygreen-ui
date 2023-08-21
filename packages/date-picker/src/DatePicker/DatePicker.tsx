import React, { forwardRef } from 'react';

import { DatePickerProps } from './DatePicker.types';

// eslint-disable-next-line no-empty-pattern
export const DatePicker = forwardRef(({}: DatePickerProps) => {
  return <div>your content here</div>;
});

DatePicker.displayName = 'DatePicker';
