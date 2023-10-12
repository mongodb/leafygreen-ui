import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import { useForwardedRef } from '@leafygreen-ui/select/src/utils';
import { spacing } from '@leafygreen-ui/tokens';

import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { useDatePickerContext } from '../../DatePickerContext';
import { DateType } from '../../types';
import { setToUTCMidnight } from '../../utils';

import {
  menuContentStyles,
  rangeMenuWrapperStyles,
} from './DateRangeMenu.styles';
import { DateRangeMenuProps } from './DateRangeMenu.types';
import { DateRangeMenuCalendars } from './DateRangeMenuCalendars';
import { DateRangeMenuProvider } from './DateRangeMenuContext';
import { DateRangeMenuFooter } from './DateRangeMenuFooter';
import { QuickSelectionMenu } from './QuickSelectionMenu';

const lgid = 'date-range_menu';

export const DateRangeMenu = forwardRef<HTMLDivElement, DateRangeMenuProps>(
  (
    { value, setValue, showQuickSelection, ...rest }: DateRangeMenuProps,
    fwdRef,
  ) => {
    const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const { isOpen } = useDatePickerContext();
    const menuRef = useForwardedRef(fwdRef, null);
    const calendarSectionRef = useRef<HTMLDivElement>(null);
    const chevronRefs = useDynamicRefs<HTMLButtonElement>();
    const calendarCellRefs = useDynamicRefs<HTMLTableCellElement>();
    const footerButtonRefs = useDynamicRefs<HTMLButtonElement>();
    const selectRefs = useDynamicRefs<HTMLButtonElement>();
    const quickRangeButtonRefs = useDynamicRefs<HTMLButtonElement>();

    // Keep track of the element the user is highlighting with the keyboard
    const [highlight, setHighlight] = useState<DateType>(
      value ? value[0] : today,
    );

    const getHighlightedCell = () => {
      const highlightKey = highlight?.toISOString();
      return highlightKey ? calendarCellRefs(highlightKey)?.current : undefined;
    };

    /** Triggered any time an element in the menu is focused */
    const handleMenuFocus: FocusEventHandler<HTMLDivElement> = e => {
      const element = e.target;
      const previousFocus = e.relatedTarget;

      const isInitialMenuFocus =
        menuRef.current?.contains(element) &&
        !menuRef.current.contains(previousFocus);

      if (isInitialMenuFocus) {
        const highlightedCell = getHighlightedCell();
        highlightedCell?.focus();
      }
    };

    /** Triggered on any key down event */
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      if (e.key === keyMap.Tab) {
        const currentFocus = e.target;

        // Focus trap:
        // if focus is on the "Apply" button, move focus to either
        // left chevron or month select menu
        if (currentFocus === footerButtonRefs('apply').current) {
          const elementToFocus = showQuickSelection
            ? selectRefs('month')
            : chevronRefs('left');

          elementToFocus.current?.focus();
          e.preventDefault();
        }
      }
    };

    return (
      <DateRangeMenuProvider value={value} today={today}>
        <MenuWrapper
          data-lg={lgid}
          ref={menuRef}
          usePortal
          role="listbox"
          active={isOpen}
          spacing={spacing[1]}
          className={rangeMenuWrapperStyles}
          onKeyDown={handleKeyDown}
          onFocus={handleMenuFocus}
          {...rest}
        >
          <div className={menuContentStyles}>
            {showQuickSelection && (
              <QuickSelectionMenu
                selectRefs={selectRefs}
                quickRangeButtonRefs={quickRangeButtonRefs}
              />
            )}
            <DateRangeMenuCalendars
              ref={calendarSectionRef}
              cellRefs={calendarCellRefs}
              chevronRefs={chevronRefs}
              value={value}
              setValue={setValue}
              highlight={highlight}
              setHighlight={setHighlight}
            />
          </div>
          <DateRangeMenuFooter buttonRefs={footerButtonRefs} />
        </MenuWrapper>
      </DateRangeMenuProvider>
    );
  },
);

DateRangeMenu.displayName = 'DateRangeMenu';
