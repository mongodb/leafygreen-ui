import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { isSameUTCDay } from '../../utils';
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
    const {
      disabled,
      isOpen,
      setOpen,
      isDirty,
      setIsDirty,
      formatParts,
      menuId,
    } = useDatePickerContext();
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

    /** Called when any input segment's value has changed */
    const handleInputChange: DatePickerInputProps['setValue'] = (
      inputVal: Date | null,
    ) => {
      if (!isSameUTCDay(inputVal, value)) {
        // When the value changes via the input element,
        // we only trigger validation if the component is dirty
        if (isDirty) {
          handleValidation?.(inputVal);
        }
        updateValue(inputVal);
      }
    };

    /** Called when the input, or any of its children, is clicked */
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

    /** Called when any child of DatePickerInput is blurred */
    const handleInputBlur: FocusEventHandler = e => {
      const nextFocus = e.relatedTarget;

      // If the next focus is _not_ on a segment
      if (
        !Object.values(segmentRefs)
          .map(ref => ref.current)
          .includes(nextFocus as HTMLInputElement)
      ) {
        setIsDirty(true);
        handleValidation?.(value);
      }
    };

    /** Called when any calendar cell is clicked */
    const handleCalendarCellClick: DatePickerMenuProps['onCellClick'] = (
      cellValue: Date,
    ) => {
      if (!isSameUTCDay(cellValue, value)) {
        // when the value is changed via cell,
        // we trigger validation every time
        handleValidation?.(cellValue);
        setIsDirty(true);
        // finally we update the component value
        updateValue(cellValue);
        // and close the menu
        setOpen(false);
      }
    };

    /** Called on any keydown within the input element */
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

    /** Called on any keydown within the menu element */
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
          onBlur={handleInputBlur}
          segmentRefs={segmentRefs}
          {...rest}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={formFieldRef}
          value={value}
          onCellClick={handleCalendarCellClick}
          onKeyDown={handleMenuKeydown}
        />
      </>
    );
  },
);

DatePickerComponent.displayName = 'DatePickerContents';
