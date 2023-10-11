import React, { forwardRef, KeyboardEventHandler } from 'react';

import { keyMap } from '@leafygreen-ui/lib';
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
    { value, setValue, showQuickSelection, ...rest }: DateRangeMenuProps,
    fwdRef,
  ) => {
    const { isOpen } = useDatePickerContext();

    // Focus trap
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      if (e.key === keyMap.Tab) {
        const currentFocus = document.activeElement;

        // if focus is on a cell, move focus to the footer
      }
    };

    return (
      <DateRangeMenuProvider value={value}>
        <MenuWrapper
          data-lg="date-range-menu"
          ref={fwdRef}
          usePortal
          role="listbox"
          active={isOpen}
          spacing={spacing[1]}
          className={rangeMenuWrapperStyles}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <div className={menuContentStyles}>
            <DateRangeMenuCalendars value={value} setValue={setValue} />
            {showQuickSelection && <QuickSelectionMenu />}
          </div>
          <DateRangeMenuFooter />
        </MenuWrapper>
      </DateRangeMenuProvider>
    );
  },
);

DateRangeMenu.displayName = 'DateRangeMenu';
