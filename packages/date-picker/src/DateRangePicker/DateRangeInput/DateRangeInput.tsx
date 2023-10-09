import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { DateInputBox } from '../../DateInput';
import { DateFormField } from '../../DateInput/DateFormField';
import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { isElementInputSegment, isZeroLike } from '../../utils';
import { getRangeSegmentToFocus } from '../utils/getRangeSegmentToFocus';
import { getRelativeRangeSegment } from '../utils/getRelativeRangeSegment';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (
    { value, onChange, handleValidation, ...rest }: DateRangeInputProps,
    fwdRef,
  ) => {
    const { disabled, formatParts, setOpen, setIsDirty } =
      useDatePickerContext();

    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    /** Called when the input, or any of its children, is clicked */
    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      if (!disabled) {
        setOpen(true);
      }

      const segmentToFocus = getRangeSegmentToFocus({
        target,
        formatParts,
        segmentRefs: [startSegmentRefs, endSegmentRefs],
      });

      segmentToFocus?.focus();
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const { target: _target, key } = e;
      const target = _target as HTMLElement;
      const isSegment =
        isElementInputSegment(target, startSegmentRefs) ||
        isElementInputSegment(target, endSegmentRefs);

      // if target is not a segment, do nothing
      if (!isSegment) return;

      const isSegmentEmpty = isZeroLike(target.value);
      const cursorPosition = target.selectionEnd;

      const ctx = {
        target,
        formatParts,
        rangeSegmentRefs: [startSegmentRefs, endSegmentRefs],
      };

      switch (key) {
        case keyMap.ArrowLeft:
          // If the segment is empty,
          // or if the cursor is at the beginning of the input,
          // set focus to prev
          if (isSegmentEmpty || cursorPosition === 0) {
            const prevSegment = getRelativeRangeSegment('prev', ctx);

            prevSegment?.current?.focus();
          }

          break;
        case keyMap.ArrowRight:
          // If the segment is empty,
          // or if the cursor is at the end of the input,
          // set focus to prev
          if (isSegmentEmpty || cursorPosition === target.value.length) {
            const nextSegment = getRelativeRangeSegment('next', ctx);

            nextSegment?.current?.focus();
          }
          break;
        case keyMap.ArrowDown:
        case keyMap.ArrowUp:
          {
            // if decrementing the segment's value is in range
            // decrement that segment value
            // This is the default `input type=number` behavior
          }
          break;

        case keyMap.Backspace: {
          if (isSegmentEmpty) {
            const prevSegment = getRelativeRangeSegment('prev', ctx);
            prevSegment?.current?.focus();
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
    };

    /** Called when any child of DatePickerInput is blurred */
    const handleInputBlur: FocusEventHandler = e => {
      const nextFocus = e.relatedTarget as HTMLInputElement;

      // If the next focus is _not_ on a segment
      if (
        ![startSegmentRefs, endSegmentRefs]
          .flatMap(refs => Object.values(refs).map(ref => ref.current))
          .includes(nextFocus)
      ) {
        setIsDirty(true);
        handleValidation?.(value);
      }
    };

    return (
      <DateFormField
        ref={fwdRef}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        onBlur={handleInputBlur}
        {...rest}
      >
        <div className={inputWrapperStyles}>
          <DateInputBox value={value?.[0]} segmentRefs={startSegmentRefs} />
          <span>{EN_DASH}</span>
          <DateInputBox value={value?.[1]} segmentRefs={endSegmentRefs} />
        </div>
      </DateFormField>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
