import React from 'react';

import Button, { Size, Variant } from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';

import { clearButtonStyles, footerStyles } from './DateRangeMenuFooter.styles';

export const DateRangeMenuFooter = () => {
  return (
    <div className={footerStyles} data-lg="date-range-picker-menu-footer">
      <Link as="button" className={clearButtonStyles}>
        Clear
      </Link>
      <div>
        <Button size={Size.XSmall}>Cancel</Button>
        <Button size={Size.XSmall} variant={Variant.Primary}>
          Apply
        </Button>
      </div>
    </div>
  );
};
