import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton, { BaseIconButtonProps } from '@leafygreen-ui/icon-button';

import { iconButtonStyles } from './CalendarButton.styles';

/**
 * The icon button on the right of the DatePicker form field
 */
export const CalendarButton = forwardRef<
  HTMLButtonElement,
  BaseIconButtonProps
>(({ className, ...rest }: BaseIconButtonProps, fwdRef) => {
  return (
    <IconButton
      ref={fwdRef}
      aria-label="Open calendar menu"
      type="button"
      className={cx(iconButtonStyles, className)}
      data-testid="lg-date_picker-input-calendar_button"
      {...rest}
    >
      <Icon glyph="Calendar" />
    </IconButton>
  );
});

CalendarButton.displayName = 'CalendarButton';
