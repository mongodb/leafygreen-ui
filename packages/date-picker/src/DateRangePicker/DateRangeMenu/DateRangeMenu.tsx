import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
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
    {
      value,
      setValue,
      showQuickSelection,
      onCancel,
      onClear,
      ...rest
    }: DateRangeMenuProps,
    fwdRef,
  ) => {
    const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const { isOpen, setOpen } = useDatePickerContext();
    const menuRef = useForwardedRef(fwdRef, null);
    const calendarSectionRef = useRef<HTMLDivElement>(null);
    const chevronRefs = useDynamicRefs<HTMLButtonElement>();
    const calendarCellRefs = useDynamicRefs<HTMLTableCellElement>();
    const footerButtonRefs = useDynamicRefs<HTMLButtonElement>();
    const selectRefs = useDynamicRefs<HTMLDivElement>();
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
        const currentFocus = document.activeElement;

        // Focus trap:
        // if focus is on the "Apply" button, move focus to either
        // left chevron or month select menu
        if (currentFocus === footerButtonRefs('apply').current) {
          const elementToFocus = showQuickSelection
            ? selectRefs('month').current?.querySelector('button')
            : chevronRefs('left').current;

          e.preventDefault();
          elementToFocus?.focus();
        }
      }
    };

    /** Triggered when the Apply button is clicked */
    const handleApply: MouseEventHandler<HTMLButtonElement> = _ => {
      console.log('handle Apply');
      setValue(value);
      setOpen(false);
    };

    /** Triggered when the cancel button is clicked */
    const handleCancel: MouseEventHandler<HTMLButtonElement> = e => {
      setValue(value);
      setOpen(false);
      onCancel?.(e);
    };

    /** Triggered when the clear button is clicked */
    const handleClear: MouseEventHandler<HTMLButtonElement> = e => {
      setValue([null, null]);
      // setOpen(false);
      onClear?.(e);
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
          <DateRangeMenuFooter
            onApply={handleApply}
            onCancel={handleCancel}
            onClear={handleClear}
            buttonRefs={footerButtonRefs}
          />
        </MenuWrapper>
      </DateRangeMenuProvider>
    );
  },
);

DateRangeMenu.displayName = 'DateRangeMenu';
