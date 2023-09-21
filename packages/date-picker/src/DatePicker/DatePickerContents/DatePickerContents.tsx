import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import {
  useBackdropClick,
  useDynamicRefs,
  useForwardedRef,
} from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { SegmentRefs } from '../../DateInput/DateInputBox/DateInputBox.types';
import { useDatePickerContext } from '../../DatePickerContext';
import { isZeroLike } from '../../utils/isZeroLike';
import { DatePickerInput, DatePickerInputProps } from '../DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from '../DatePickerMenu';
import { focusRelevantSegment } from '../utils/focusRelevantSegment';
import { getRelativeSegment } from '../utils/getRelativeSegment';
import { isElementInputSegment } from '../utils/isElementInputSegment';

import { DatePickerContentsProps } from './DatePickerContents.types';

export const DatePickerContents = forwardRef<
  HTMLDivElement,
  DatePickerContentsProps
>(({ value, setValue, ...rest }: DatePickerContentsProps, fwdRef) => {
  const { isOpen, setOpen, formatParts, menuId } = useDatePickerContext();
  const closeMenu = () => setOpen(false);

  const getSegmentRef = useDynamicRefs<HTMLInputElement>({
    prefix: 'segment',
  });

  const segmentRefs: SegmentRefs = {
    day: getSegmentRef('day') || undefined,
    month: getSegmentRef('month') || undefined,
    year: getSegmentRef('year') || undefined,
  };

  const formFieldRef = useForwardedRef(fwdRef, null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [displayMonth, setDisplayMonth] = useState<Date>(value ?? new Date());

  const updateValue = (newVal: Date | null) => {
    // if the new value is not the current month, update the month
    if (newVal && !isSameMonth(newVal, displayMonth)) {
      setDisplayMonth(setMonth(displayMonth, newVal.getMonth()));
    }

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

  const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
    updateValue(cellValue);
    setOpen(false);
  };

  const handleMonthChange: DatePickerMenuProps['onMonthChange'] = newMonth => {
    setDisplayMonth(newMonth);
  };

  const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
    setOpen(true);

    focusRelevantSegment({
      target,
      formatParts,
      segmentRefs,
    });
  };

  const handleInputKeyDown: KeyboardEventHandler = e => {
    const { target: _target, key } = e;
    const target = _target as HTMLElement;
    // if target is not a segment, do nothing
    const isSegment = isElementInputSegment(target, segmentRefs);

    if (!isSegment) return;

    const isInputEmpty = !isZeroLike(target.value);
    const cursorPosition = target.selectionEnd;

    switch (key) {
      case keyMap.ArrowLeft: {
        // if input is empty,
        // or the cursor is at the beginning of the input
        // set focus to prev. input (if it exists)
        if (isInputEmpty || cursorPosition === 0) {
          const segmentToFocus = getRelativeSegment('next', {
            segment: target,
            formatParts,
            segmentRefs,
          });
          segmentToFocus?.current?.focus();
        }

        // otherwise, use default behavior

        break;
      }

      case keyMap.ArrowRight: {
        // if input is empty,
        // or the cursor is at the end of the input
        // set focus to next. input (if it exists)
        if (isInputEmpty || cursorPosition === target.value.length) {
          const segmentToFocus = getRelativeSegment('next', {
            segment: target,
            formatParts,
            segmentRefs,
          });

          segmentToFocus?.current?.focus();
        }

        // otherwise, use default behavior

        break;
      }

      case keyMap.ArrowUp: {
        // if incrementing the segment's value is in range
        // increment that segment value
        break;
      }

      case keyMap.ArrowDown: {
        // if decrementing the segment's value is in range
        // decrement that segment value
        break;
      }

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
        onKeyDown={handleInputKeyDown}
        segmentRefs={segmentRefs}
        {...rest}
      />
      <DatePickerMenu
        ref={menuRef}
        id={menuId}
        refEl={formFieldRef}
        value={value}
        isOpen={isOpen}
        month={displayMonth}
        onCellClick={handleCellClick}
        onMonthChange={handleMonthChange}
        usePortal={true}
      />
    </>
  );
});

DatePickerContents.displayName = 'DatePickerContents';
