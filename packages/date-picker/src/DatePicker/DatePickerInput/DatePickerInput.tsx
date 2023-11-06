import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { DateFormField, DateInputBox } from '../../shared/components/DateInput';
import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import {
  isElementInputSegment,
  isExplicitSegmentValue,
  isSameUTCDay,
  isValidSegmentName,
  isValidValueForSegment,
  isZeroLike,
} from '../../shared/utils';
import { useSingleDateContext } from '../SingleDateContext';
import { getRelativeSegment } from '../utils/getRelativeSegment';
import { getSegmentToFocus } from '../utils/getSegmentToFocus';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      onClick,
      onKeyDown,
      onChange: onSegmentChange,
      ...rest
    }: DatePickerInputProps,
    fwdRef,
  ) => {
    const { formatParts, disabled, isDirty, setOpen, setIsDirty } =
      useDatePickerContext();
    const {
      refs: { segmentRefs, calendarButtonRef },
      value,
      setValue,
      handleValidation,
    } = useSingleDateContext();

    /** Called when the input's Date value has changed */
    const handleInputValueChange = (inputVal?: Date | null) => {
      if (!isSameUTCDay(inputVal, value)) {
        handleValidation?.(inputVal);
        setValue(inputVal || null);
      }
    };

    /**
     * Called when the input, or any of its children, is clicked.
     * Opens the menu and focuses the appropriate segment
     */
    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      if (!disabled) {
        setOpen(true);

        const segmentToFocus = getSegmentToFocus({
          target,
          formatParts,
          segmentRefs,
        });

        segmentToFocus?.focus();
      }
    };

    /**
     * Called when the calendar button is clicked.
     * Opens the menu & focuses the appropriate cell
     */
    const handleIconButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      // Prevent the parent click handler from being called since clicks on the parent always opens the dropdown
      e.stopPropagation();
      setOpen(o => !o);
    };

    /** Called on any keydown within the input element */
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const { target: _target, key } = e;
      const target = _target as HTMLElement;
      const isSegment = isElementInputSegment(target, segmentRefs);

      // if target is not a segment, do nothing
      if (!isSegment) return;

      const isSegmentEmpty = isZeroLike(target.value);
      const cursorPosition = target.selectionEnd;

      switch (key) {
        case keyMap.ArrowLeft: {
          // if input is empty,
          // or the cursor is at the beginning of the input
          // set focus to prev. input (if it exists)
          if (isSegmentEmpty || cursorPosition === 0) {
            const segmentToFocus = getRelativeSegment('prev', {
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
          if (isSegmentEmpty || cursorPosition === target.value.length) {
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

        case keyMap.ArrowUp:
        case keyMap.ArrowDown: {
          // if decrementing the segment's value is in range
          // decrement that segment value
          // This is the default `input type=number` & `role="spinbutton"` behavior
          break;
        }

        case keyMap.Backspace: {
          if (isSegmentEmpty) {
            const segmentToFocus = getRelativeSegment('prev', {
              segment: target,
              formatParts,
              segmentRefs,
            });
            segmentToFocus?.current?.focus();
          }
          break;
        }

        case keyMap.Enter:
        case keyMap.Escape:
        case keyMap.Tab:
          // Behavior handled by parent or menu
          break;

        default:
          // any other keydown should open the menu
          setOpen(true);
      }

      // call any handler that was passed in
      onKeyDown?.(e);
    };

    /**
     * Called when any child of DatePickerInput is blurred.
     * Calls the validation handler.
     */
    const handleInputBlur: FocusEventHandler = e => {
      const nextFocus = e.relatedTarget as HTMLInputElement;

      // If the next focus is _not_ on a segment
      if (
        !Object.values(segmentRefs)
          .map(ref => ref.current)
          .includes(nextFocus)
      ) {
        setIsDirty(true);
        handleValidation?.(value);
      }
    };

    /**
     * Called when any segment changes
     */
    const handleSegmentChange: ChangeEventHandler<HTMLInputElement> = e => {
      const segment = e.target.dataset['segment'];
      const segmentValue = e.target.value;

      if (isValidSegmentName(segment)) {
        if (
          isValidValueForSegment(segment, segmentValue) &&
          isExplicitSegmentValue(segment, segmentValue)
        ) {
          const nextSegment = getRelativeSegment('next', {
            segment: segmentRefs[segment],
            formatParts,
            segmentRefs,
          });

          nextSegment?.current?.focus();
        } else if (!isValidValueForSegment(segment, segmentValue) && isDirty) {
          handleValidation?.(value);
        }
      }
      onSegmentChange?.(e);
    };

    return (
      <DateFormField
        ref={fwdRef}
        buttonRef={calendarButtonRef}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        onBlur={handleInputBlur}
        onIconButtonClick={handleIconButtonClick}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={handleInputValueChange}
          segmentRefs={segmentRefs}
          onChange={handleSegmentChange}
        />
      </DateFormField>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
