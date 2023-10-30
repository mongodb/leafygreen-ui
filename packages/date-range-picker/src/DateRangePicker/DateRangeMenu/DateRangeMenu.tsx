import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
} from 'react';

import { useDatePickerContext } from '@leafygreen-ui/date-picker/shared/components/DatePickerContext';
import { MenuWrapper } from '@leafygreen-ui/date-picker/shared/components/MenuWrapper';
import { DateRangeType } from '@leafygreen-ui/date-picker/shared/types';
import { keyMap } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import { useDateRangeContext } from '../DateRangeContext';

import {
  menuContentStyles,
  rangeMenuWrapperStyles,
} from './DateRangeMenu.styles';
import { DateRangeMenuProps } from './DateRangeMenu.types';
import { DateRangeMenuCalendars } from './DateRangeMenuCalendars';
import { DateRangeMenuFooter } from './DateRangeMenuFooter';
import { QuickSelectionMenu } from './QuickSelectionMenu';

export const DateRangeMenu = forwardRef<HTMLDivElement, DateRangeMenuProps>(
  (
    { showQuickSelection, onCancel, onClear, ...rest }: DateRangeMenuProps,
    fwdRef,
  ) => {
    // const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const { isOpen, setOpen, setIsDirty } = useDatePickerContext();
    const { value, setValue, getHighlightedCell, refs } = useDateRangeContext();

    useEffect(() => {
      // Once the menu opens, mark the input as dirty
      if (isOpen) {
        setIsDirty(true);
      }
    }, [setIsDirty, isOpen]);

    /** Called when any calendar cell is clicked */
    const updateValue = (newRange?: DateRangeType) => {
      // TODO: more logic here
      setValue(newRange);
    };

    /** Triggered any time an element in the menu is focused */
    const handleMenuFocus: FocusEventHandler<HTMLDivElement> = e => {
      const element = e.target;
      const previousFocus = e.relatedTarget;

      const isInitialMenuFocus =
        refs.menuRef.current?.contains(element) &&
        !refs.menuRef.current.contains(previousFocus);

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
        if (currentFocus === refs.footerButtonRefs('apply').current) {
          const elementToFocus = showQuickSelection
            ? refs.selectRefs('month').current?.querySelector('button')
            : refs.chevronRefs('left').current;

          e.preventDefault();
          elementToFocus?.focus();
        }
      }
    };

    /** Triggered when the Apply button is clicked */
    const handleApply: MouseEventHandler<HTMLButtonElement> = _ => {
      updateValue(value);
      setOpen(false);
    };

    /** Triggered when the cancel button is clicked */
    const handleCancel: MouseEventHandler<HTMLButtonElement> = e => {
      updateValue(value);
      setOpen(false);
      onCancel?.(e);
    };

    /** Triggered when the clear button is clicked */
    const handleClear: MouseEventHandler<HTMLButtonElement> = e => {
      updateValue([null, null]);
      onClear?.(e);
    };

    return (
      <MenuWrapper
        ref={fwdRef}
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
          {showQuickSelection && <QuickSelectionMenu />}
          <DateRangeMenuCalendars ref={refs.calendarSectionRef} />
        </div>
        <DateRangeMenuFooter
          onApply={handleApply}
          onCancel={handleCancel}
          onClear={handleClear}
        />
      </MenuWrapper>
    );
  },
);

DateRangeMenu.displayName = 'DateRangeMenu';
