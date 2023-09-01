import React from 'react';

import { MenuWrapper } from '../../Calendar/MenuWrapper';

import { DatePickerMenuProps } from './DatePickerMenu.types';

export function DatePickerMenu({
  isOpen,
  value,
  month,
  onMonthChange,
  onCellClick,
  ...rest
}: DatePickerMenuProps) {
  return (
    <MenuWrapper active={isOpen} {...rest}>
      content
    </MenuWrapper>
  );
}

DatePickerMenu.displayName = 'DatePickerMenu';
