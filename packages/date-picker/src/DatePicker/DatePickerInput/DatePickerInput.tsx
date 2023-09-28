import React, { forwardRef, KeyboardEventHandler } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { DateFormField, DateInputBox } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';
import { isZeroLike } from '../../utils';
import { getRelativeSegment } from '../utils/getRelativeSegment';
import { isElementInputSegment } from '../utils/isElementInputSegment';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      value,
      setValue,
      onClick,
      segmentRefs,
      onKeyDown,
      onSegmentChange,
      ...rest
    }: DatePickerInputProps,
    fwdRef,
  ) => {
    const { label, timeZone, formatParts } = useDatePickerContext();
    const labelId = useIdAllocator({ prefix: 'lg-date-label' });
    const descriptionId = useIdAllocator({ prefix: 'lg-date-description' });
    const errorId = useIdAllocator({ prefix: 'lg-date-description' });
    const inputId = useIdAllocator({ prefix: 'lg-date-input' });

    const handleInputClick = onClick;

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

        default:
          break;
      }

      // call any handler that was passed in
      onKeyDown?.(e);
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
