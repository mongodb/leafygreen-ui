import React, {
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import isEqual from 'lodash/isEqual';

import { isSameUTCDay } from '@leafygreen-ui/date-utils';
import {
  useBackdropClick,
  useForwardedRef,
  usePrevious,
} from '@leafygreen-ui/hooks';
import { keyMap, pickAndOmit } from '@leafygreen-ui/lib';

import {
  ModifiedPopoverPropkeys,
  modifiedPopoverPropNames,
  SharedDatePickerContextProps,
  useSharedDatePickerContext,
} from '../../shared/context';
import { useDatePickerContext } from '../DatePickerContext';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';

import { DatePickerContentProps } from './DatePickerContent.types';

export const DatePickerContent = forwardRef<
  HTMLDivElement,
  DatePickerContentProps
>(({ ...rest }: DatePickerContentProps, fwdRef) => {
  const { min, max, isOpen, menuId, disabled, isSelectOpen, ...sharedProps } =
    useSharedDatePickerContext();
  const { value, closeMenu, handleValidation } = useDatePickerContext();

  const [popoverProps] = pickAndOmit<
    Partial<SharedDatePickerContextProps>,
    ModifiedPopoverPropkeys
  >({ ...sharedProps }, modifiedPopoverPropNames);

  const prevValue = usePrevious(value);
  const prevMin = usePrevious(min);
  const prevMax = usePrevious(max);

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prevDisabledValue = usePrevious(disabled);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen && !isSelectOpen);

  /**
   * This listens to when the disabled prop changes to true and closes the menu
   */
  useEffect(() => {
    // if disabled is true but was previously false. This prevents this effect from rerunning multiple times since other states are updated when the menu closes.
    if (disabled && !prevDisabledValue) {
      closeMenu();
      handleValidation?.(value);
    }
  }, [closeMenu, disabled, handleValidation, value, prevDisabledValue]);

  /**
   * Handle key down events that should be fired regardless of target.
   */
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
   * SIDE EFFECTS
   */

  /** When value changes, validate it */
  useEffect(() => {
    if (!isEqual(prevValue, value) && !isSameUTCDay(value, prevValue)) {
      handleValidation(value);
    }
  }, [handleValidation, prevValue, value]);

  /** If min/max changes, re-validate the value */
  useEffect(() => {
    if (
      (prevMin && !isSameUTCDay(min, prevMin)) ||
      (prevMax && !isSameUTCDay(max, prevMax))
    ) {
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
        {...popoverProps}
      />
    </>
  );
});

DatePickerContent.displayName = 'DatePickerContent';
