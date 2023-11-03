import React, {
  forwardRef,
  KeyboardEventHandler,
  TransitionEventHandler,
  useRef,
} from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { getFirstOfMonth } from '../../shared/utils';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';
import { useSingleDateContext } from '../SingleDateContext';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(({ ...rest }: DatePickerComponentProps, fwdRef) => {
  const { isOpen, setOpen, menuId } = useDatePickerContext();
  const { refs, value, today, setMonth, handleValidation, getHighlightedCell } =
    useSingleDateContext();

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  /** Close the menu, and perform side-effects */
  const closeMenu = () => {
    setOpen(false);
    // Return focus to the calendar button
    refs.calendarButtonRef.current?.focus();
    // update month
    setMonth(getFirstOfMonth(value ?? today));
  };

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

  const handleTransitionEnd: TransitionEventHandler = () => {
    if (isOpen) {
      // When the menu opens, set focus to the `highlight` cell
      const highlightedCell = getHighlightedCell();
      highlightedCell?.focus();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;

    switch (key) {
      case keyMap.Escape:
        closeMenu();
        handleValidation?.(value);
        break;

      case keyMap.Enter:
        handleValidation?.(value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <DatePickerInput ref={formFieldRef} onKeyDown={handleKeyDown} {...rest} />
      <DatePickerMenu
        ref={menuRef}
        id={menuId}
        refEl={formFieldRef}
        onKeyDown={handleKeyDown}
        onTransitionEnd={handleTransitionEnd}
      />
    </>
  );
});

DatePickerComponent.displayName = 'DatePickerContents';
