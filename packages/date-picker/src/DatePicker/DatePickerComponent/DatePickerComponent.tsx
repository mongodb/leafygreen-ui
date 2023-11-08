import React, {
  forwardRef,
  KeyboardEventHandler,
  TransitionEventHandler,
  useEffect,
  useRef,
} from 'react';
import { ExitHandler } from 'react-transition-group/Transition';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';
import { useSingleDateContext } from '../SingleDateContext';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(({ ...rest }: DatePickerComponentProps, fwdRef) => {
  const { isOpen, menuId, disabled } = useDatePickerContext();
  const { value, closeMenu, handleValidation, getHighlightedCell } =
    useSingleDateContext();

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

  /** This listens to when the disabled prop changes to true and closes the menu */
  useEffect(() => {
    if (disabled) {
      closeMenu();
      handleValidation?.(value);
    }
  }, [closeMenu, disabled, handleValidation, value]);

  /** Fired when the CSS transition to open the menu is fired */
  const handleMenuTransitionEntered: TransitionEventHandler = e => {
    if (isOpen && e.target === menuRef.current) {
      // When the menu opens, set focus to the `highlight` cell
      const highlightedCell = getHighlightedCell();
      highlightedCell?.focus();
    }
  };

  const handleMenuTransitionExited: ExitHandler<HTMLDivElement> = () => {
    if (!isOpen) {
      closeMenu();
    }
  };

  /** Handle key down events that should be fired regardless of target */
  const handleDatePickerKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;

    key === 'Escape' &&
      console.log('handleDatePickerKeyDown', {
        key,
        target: e.target.outerHTML,
      });

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

DatePickerComponent.displayName = 'DatePickerContents';
