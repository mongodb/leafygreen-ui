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
        data-lg="date-range_menu_footer"
      >
        <Link
          ref={buttonRefs('clear')}
          as="button"
          className={clearButtonStyles}
          aria-label="Clear selection"
          onClick={onClear}
        >
          Clear
        </Link>
        <div>
          <Button
            ref={buttonRefs('cancel')}
            size={Size.XSmall}
            aria-label="Cancel selection"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            ref={buttonRefs('apply')}
            size={Size.XSmall}
            variant={Variant.Primary}
            aria-label="Apply selection"
            onClick={onApply}
          >
            Apply
          </Button>
        </div>
      </div>
    );
  },
);

DateRangeMenuFooter.displayName = 'DateRangeMenuFooter';
