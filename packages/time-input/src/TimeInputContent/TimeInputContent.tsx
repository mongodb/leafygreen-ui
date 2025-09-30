import React, { forwardRef } from 'react';

import { TimeInputInputs } from '../TimeInputInputs';

import { TimeInputContentProps } from './TimeInputContent.types';

/**
 * @internal
 */
export const TimeInputContent = forwardRef<
  HTMLDivElement,
  TimeInputContentProps
>((props: TimeInputContentProps, forwardedRef) => {
  return <TimeInputInputs ref={forwardedRef} {...props} />;
});

TimeInputContent.displayName = 'TimeInputContent';
