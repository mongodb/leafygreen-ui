import React, { forwardRef } from 'react';

import { spacing } from '@leafygreen-ui/tokens';

import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { useDatePickerContext } from '../../DatePickerContext';

import {
  menuContentStyles,
  rangeMenuWrapperStyles,
} from './DateRangeMenu.styles';
import { DateRangeMenuProps } from './DateRangeMenu.types';
import { DateRangeMenuCalendars } from './DateRangeMenuCalendars';
import { DateRangeMenuProvider } from './DateRangeMenuContext';
import { DateRangeMenuFooter } from './DateRangeMenuFooter';
import { QuickSelectionMenu } from './QuickSelectionMenu';

export const DateRangeMenu = forwardRef<HTMLDivElement, DateRangeMenuProps>(
  (
    { value, onChange, showQuickSelection, ...rest }: DateRangeMenuProps,
    fwdRef,
  ) => {
    const { isOpen } = useDatePickerContext();

    // TODO: Focus trap

    return (
      <DateRangeMenuProvider value={value}>
        <MenuWrapper
          ref={fwdRef}
          usePortal
          role="listbox"
          active={isOpen}
          spacing={spacing[1]}
          className={rangeMenuWrapperStyles}
          {...rest}
        >
          <div className={menuContentStyles}>
            {showQuickSelection && <QuickSelectionMenu />}
            <DateRangeMenuCalendars />
          </div>
          <DateRangeMenuFooter />
        </MenuWrapper>
      </DateRangeMenuProvider>
    );
  },
);

DateRangeMenu.displayName = 'DateRangeMenu';
