import React, { forwardRef } from 'react';

import Button, { Size, Variant } from '@leafygreen-ui/button';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { Link } from '@leafygreen-ui/typography';

import { clearButtonStyles, footerStyles } from './DateRangeMenuFooter.styles';

interface DateRangeMenuFooterProps {
  buttonRefs: DynamicRefGetter<HTMLButtonElement>;
}

export const DateRangeMenuFooter = forwardRef<
  HTMLDivElement,
  DateRangeMenuFooterProps
>(({ buttonRefs }: DateRangeMenuFooterProps, fwdRef) => {
  return (
    <div ref={fwdRef} className={footerStyles} data-lg="date-range_menu_footer">
      <Link
        ref={buttonRefs('clear')}
        as="button"
        className={clearButtonStyles}
        aria-label="Clear selection"
      >
        Clear
      </Link>
      <div>
        <Button
          ref={buttonRefs('cancel')}
          size={Size.XSmall}
          aria-label="Cancel selection"
        >
          Cancel
        </Button>
        <Button
          ref={buttonRefs('apply')}
          size={Size.XSmall}
          variant={Variant.Primary}
          aria-label="Apply selection"
        >
          Apply
        </Button>
      </div>
    </div>
  );
});

DateRangeMenuFooter.displayName = 'DateRangeMenuFooter';
