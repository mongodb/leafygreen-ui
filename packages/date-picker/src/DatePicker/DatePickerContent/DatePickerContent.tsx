import React, {
  forwardRef,
  KeyboardEventHandler,
  TransitionEventHandler,
  useEffect,
  useRef,
} from 'react';
import { ExitHandler } from 'react-transition-group/Transition';
import isEqual from 'lodash/isEqual';

import {
  useBackdropClick,
  useForwardedRef,
  usePrevious,
} from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { isSameUTCDay } from '../../shared/utils';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';
import { useSingleDateContext } from '../SingleDateContext';

import { DatePickerContentProps } from './DatePickerContent.types';

export const DatePickerContent = forwardRef<
  HTMLDivElement,
  DatePickerContentProps
>(({ ...rest }: DatePickerContentProps, fwdRef) => {
  const { min, max, isOpen, menuId, disabled, isSelectOpen } =
    useDatePickerContext();
  const {
    refs,
    value,
    closeMenu,
    menuTriggerEvent,
    handleValidation,
    getHighlightedCell,
  } = useSingleDateContext();

  const prevValue = usePrevious(value);
  const prevMin = usePrevious(min);
  const prevMax = usePrevious(max);

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prevDisabledValue = usePrevious(disabled);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen && !isSelectOpen);

  /** This listens to when the disabled prop changes to true and closes the menu */
  useEffect(() => {
    // if disabled is true but was previously false. This prevents this effect from rerunning multiple times since other states are updated when the menu closes.
    if (disabled && !prevDisabledValue) {
      closeMenu();
      handleValidation?.(value);
    }
  }, [closeMenu, disabled, handleValidation, value, prevDisabledValue]);

  /** Fired when the CSS transition to open the menu is fired */
  const handleMenuTransitionEntered: TransitionEventHandler = e => {
    // Whether this event is firing in response to the menu transition
    const isTransitionedElementMenu = e.target === menuRef.current;

    // Whether the latest openMenu event was triggered by the calendar button
    const isTriggeredByButton =
      menuTriggerEvent &&
      refs.calendarButtonRef.current?.contains(
        menuTriggerEvent.target as HTMLElement,
      );

    // Only move focus to input when opened via button click
    if (isOpen && isTransitionedElementMenu && isTriggeredByButton) {
      // When the menu opens, set focus to the `highlight` cell
      const highlightedCell = getHighlightedCell();
      highlightedCell?.focus();
    }
  };

  /** Fired when the Transform element for the menu has exited */
  const handleMenuTransitionExited: ExitHandler<HTMLDivElement> = () => {
    if (!isOpen) {
      closeMenu();
    }
  };

  /** Handle key down events that should be fired regardless of target */
  const handleDatePickerKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;

    switch (key) {
      case keyMap.Escape:
        // Ensure that the menu will not close when a select menu is open and the ESC key is pressed.
        if (!isSelectOpen) {
          closeMenu(e);
          handleValidation?.(value);
        }

        break;

      case keyMap.Enter:
        handleValidation?.(value);
        break;

      case keyMap.ArrowDown:
      case keyMap.ArrowUp: {
        e.preventDefault(); // prevent page from scrolling
        break;
      }

      default:
        break;
    }
  };

  /**
   * Side Effects
   */

  /** When value changes, validate it */
  useEffect(() => {
    if (!isEqual(prevValue, value) && !isSameUTCDay(prevValue, value)) {
      handleValidation(value);
    }
  }, [handleValidation, prevValue, value]);

  /**
   * If min/max changes, re-validate the value
   */
  useEffect(() => {
    if (!isSameUTCDay(min, prevMin) || !isSameUTCDay(max, prevMax)) {
      handleValidation(value);
    }
  }, [min, max, value, prevMin, prevMax, handleValidation]);

  return (
    <>
      <DatePickerInput
        ref={formFieldRef}
        onKeyDown={handleDatePickerKeyDown}
        {...rest}
      />
      <DatePickerMenu
        ref={menuRef}
        id={menuId}
        refEl={formFieldRef}
        onKeyDown={handleDatePickerKeyDown}
        onTransitionEnd={handleMenuTransitionEntered}
        onExited={handleMenuTransitionExited}
      />
    </>
  );
});

DatePickerContent.displayName = 'DatePickerContent';
