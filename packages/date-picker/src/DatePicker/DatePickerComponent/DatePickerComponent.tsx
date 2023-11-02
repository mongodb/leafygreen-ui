import React, { forwardRef, TransitionEventHandler, useRef } from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';
import { useSingleDateContext } from '../SingleDateContext';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(({ ...rest }: DatePickerComponentProps, fwdRef) => {
  const { isOpen, setOpen, menuId } = useDatePickerContext();

  const closeMenu = () => setOpen(false);
  const { getHighlightedCell } = useSingleDateContext();

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

  const handleTransitionEnd: TransitionEventHandler = () => {
    if (isOpen) {
      // When the menu opens, set focus to the `highlight` cell
      const highlightedCell = getHighlightedCell();
      highlightedCell?.focus();
    }
  };

  return (
    <>
      <DatePickerInput ref={formFieldRef} {...rest} />
      <DatePickerMenu
        ref={menuRef}
        id={menuId}
        refEl={formFieldRef}
        onTransitionEnd={handleTransitionEnd}
      />
    </>
  );
});

DatePickerComponent.displayName = 'DatePickerContents';
