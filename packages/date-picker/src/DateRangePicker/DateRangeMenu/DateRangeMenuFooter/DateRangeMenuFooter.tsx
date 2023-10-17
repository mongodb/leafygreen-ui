import React, { forwardRef, MouseEventHandler } from 'react';

import Button, { Size, Variant } from '@leafygreen-ui/button';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { Link } from '@leafygreen-ui/typography';

import { clearButtonStyles, footerStyles } from './DateRangeMenuFooter.styles';

interface DateRangeMenuFooterProps {
  onApply: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onClear: MouseEventHandler<HTMLButtonElement>;
  buttonRefs: DynamicRefGetter<HTMLButtonElement>;
}

export const DateRangeMenuFooter = forwardRef<
  HTMLDivElement,
  DateRangeMenuFooterProps
>(
  (
    { onApply, onCancel, onClear, buttonRefs }: DateRangeMenuFooterProps,
    fwdRef,
  ) => {
    return (
      <div
        ref={fwdRef}
        className={footerStyles}
        data-testid="lg-date_picker-menu-footer"
      >
        <Link
          ref={buttonRefs('clear')}
          as="button"
          className={clearButtonStyles}
          aria-label="Clear selection"
          onClick={onClear}
          data-testid="lg-date_picker-menu-footer_button"
        >
          Clear
        </Link>
        <div>
          <Button
            ref={buttonRefs('cancel')}
            size={Size.XSmall}
            aria-label="Cancel selection"
            onClick={onCancel}
            data-testid="lg-date_picker-menu-footer_button"
          >
            Cancel
          </Button>
          <Button
            ref={buttonRefs('apply')}
            size={Size.XSmall}
            variant={Variant.Primary}
            aria-label="Apply selection"
            onClick={onApply}
            data-testid="lg-date_picker-menu-footer_button"
          >
            Apply
          </Button>
        </div>
      </div>
    );
  },
);

DateRangeMenuFooter.displayName = 'DateRangeMenuFooter';
