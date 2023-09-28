import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { DatePickerInput, DatePickerInputProps } from '../DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from '../DatePickerMenu';
import { focusRelevantSegment } from '../utils/focusRelevantSegment';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(
  (
    { value, setValue, handleValidation, ...rest }: DatePickerComponentProps,
    fwdRef,
  ) => {
    const { disabled, isOpen, setOpen, formatParts, menuId } =
      useDatePickerContext();
    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    const segmentRefs = useSegmentRefs();
    const formFieldRef = useForwardedRef(fwdRef, null);
    const menuRef = useRef<HTMLDivElement>(null);

    /** setValue with possible side effects */
    const updateValue = (newVal: Date | null) => {
      setValue(newVal);
    };

    useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

    const handleInputChange: DatePickerInputProps['setValue'] = (
      inputVal: Date | null,
    ) => {
      if (inputVal !== value) {
        updateValue(inputVal);
      }
    };

    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      if (!disabled) {
        setOpen(true);

        focusRelevantSegment({
          target,
          formatParts,
          segmentRefs,
        });
      }
    };

    const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
      updateValue(cellValue);
      setOpen(false);
    };

    const handleInputKeydown: KeyboardEventHandler = ({ key }) => {
      switch (key) {
        case keyMap.Enter:
          // noop. Enter can interfere with Form behavior
          break;
        case keyMap.Escape:
          closeMenu();
          break;
        default:
          // any other keydown should open the menu
          openMenu();
          break;
      }
    };

    const handleMenuKeydown: KeyboardEventHandler = ({ key }) => {
      switch (key) {
        case keyMap.Escape:
          closeMenu();
          break;
        default:
          break;
      }
    };

    return (
      <>
        <DatePickerInput
          ref={formFieldRef}
          value={value}
          setValue={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleInputKeydown}
          segmentRefs={segmentRefs}
          {...rest}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={formFieldRef}
          value={value}
          onCellClick={handleCellClick}
          onKeyDown={handleMenuKeydown}
        />
      </>
    );
  },
);

DatePickerComponent.displayName = 'DatePickerContents';
