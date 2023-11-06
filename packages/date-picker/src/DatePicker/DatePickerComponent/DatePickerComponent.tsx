import React, {
  forwardRef,
  KeyboardEventHandler,
  TransitionEventHandler,
  useRef,
} from 'react';
import { ExitHandler } from 'react-transition-group/Transition';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { getFirstOfMonth } from '../../shared';
import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';
import { useSingleDateContext } from '../SingleDateContext';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(({ ...rest }: DatePickerComponentProps, fwdRef) => {
  const { isOpen, menuId } = useDatePickerContext();
  const { value, closeMenu, handleValidation, getHighlightedCell } =
    useSingleDateContext();

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

  /** Fired when the CSS transition to open the menu is fired */
  const handleMenuTransitionEntered: TransitionEventHandler = () => {
    if (isOpen) {
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
        onTransitionEnd={handleMenuTransitionEntered}
        onExited={handleMenuTransitionExited}
      />
    </>
  );
});

DatePickerComponent.displayName = 'DatePickerContents';
