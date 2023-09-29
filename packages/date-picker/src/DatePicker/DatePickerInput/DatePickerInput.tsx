import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { DateFormField, DateInputBox } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { isZeroLike } from '../../utils';
import { focusRelevantSegment } from '../utils/focusRelevantSegment';
import { getRelativeSegment } from '../utils/getRelativeSegment';
import { isElementInputSegment } from '../utils/isElementInputSegment';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      value,
      setValue,
      onClick,
      onKeyDown,
      onSegmentChange,
      handleValidation,
      ...rest
    }: DatePickerInputProps,
    fwdRef,
  ) => {
    const { label, timeZone, formatParts, disabled, setOpen, setIsDirty } =
      useDatePickerContext();
    const segmentRefs = useSegmentRefs();

    const labelId = useIdAllocator({ prefix: 'lg-date-label' });
    const descriptionId = useIdAllocator({ prefix: 'lg-date-description' });
    const errorId = useIdAllocator({ prefix: 'lg-date-description' });
    const inputId = useIdAllocator({ prefix: 'lg-date-input' });

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

    /** Called on any keydown within the input element */
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const { target: _target, key } = e;
      const target = _target as HTMLElement;
      // if target is not a segment, do nothing
      const isSegment = isElementInputSegment(target, segmentRefs);

      if (!isSegment) return;

      const isInputEmpty = isZeroLike(target.value);
      const cursorPosition = target.selectionEnd;

      switch (key) {
        case keyMap.ArrowLeft: {
          // if input is empty,
          // or the cursor is at the beginning of the input
          // set focus to prev. input (if it exists)
          if (isInputEmpty || cursorPosition === 0) {
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

        case keyMap.ArrowUp:
        case keyMap.ArrowDown: {
          // if decrementing the segment's value is in range
          // decrement that segment value
          // This is the default `input type=number` behavior
          break;
        }

        case keyMap.Backspace: {
          if (isInputEmpty) {
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
          handleValidation?.(value);
          break;

        case keyMap.Escape:
          setOpen(false);
          handleValidation?.(value);
          break;

        default:
          // any other keydown should open the menu
          setOpen(true);
      }

      // call any handler that was passed in
      onKeyDown?.(e);
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

    return (
      <DateFormField
        label={label}
        description={timeZone}
        inputId={inputId}
        labelId={labelId}
        descriptionId={descriptionId}
        errorId={errorId}
        ref={fwdRef}
        onInputClick={handleInputClick}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={setValue}
          id={inputId}
          labelledBy={labelId}
          segmentRefs={segmentRefs}
          onSegmentChange={onSegmentChange}
        />
      </DateFormField>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
