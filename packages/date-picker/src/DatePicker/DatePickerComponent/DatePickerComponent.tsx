import React, { forwardRef, useRef } from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu } from '../DatePickerMenu';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(({ ...rest }: DatePickerComponentProps, fwdRef) => {
  const { isOpen, setOpen, menuId } = useDatePickerContext();
  const closeMenu = () => setOpen(false);

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

  return (
    <>
      <DatePickerInput ref={formFieldRef} {...rest} />
      <DatePickerMenu ref={menuRef} id={menuId} refEl={formFieldRef} />
    </>
  );
});

DatePickerComponent.displayName = 'DatePickerContents';
