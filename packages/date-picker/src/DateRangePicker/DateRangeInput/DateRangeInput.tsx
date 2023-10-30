import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { DateRangeType, DateType } from '../../shared//types';
import { DateFormField, DateInputBox } from '../../shared/DateInput';
import { useDatePickerContext } from '../../shared/DatePickerContext';
import { isElementInputSegment, isSameUTCRange, isZeroLike } from '../../utils';
import { useDateRangeContext } from '../DateRangeContext';
import { getRangeSegmentToFocus } from '../utils/getRangeSegmentToFocus';
import { getRelativeRangeSegment } from '../utils/getRelativeRangeSegment';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  ({ onChange, ...rest }: DateRangeInputProps, fwdRef) => {
    const { disabled, formatParts, setOpen, isDirty, setIsDirty } =
      useDatePickerContext();

    const {
      refs: { startSegmentRefs, endSegmentRefs },
      value,
      setValue,
      handleValidation,
      getHighlightedCell,
    } = useDateRangeContext();

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
          if (isSegmentEmpty || cursorPosition === 0) {
            const prevSegment = getRelativeRangeSegment('prev', ctx);

            prevSegment?.current?.focus();
          }

          break;
        case keyMap.ArrowRight:
          if (isSegmentEmpty || cursorPosition === target.value.length) {
            const nextSegment = getRelativeRangeSegment('next', ctx);

            nextSegment?.current?.focus();
          }
          break;
        case keyMap.ArrowDown:
        case keyMap.ArrowUp:
          {
            // default number input behavior
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

        case keyMap.Tab:
          // default behavior
          // focus trap handled by parent
          break;

        default:
          // any other keydown should open the menu
          setOpen(true);
      }
    };

    /** Called when any child of DatePickerInput is blurred */
    const handleInputBlur: FocusEventHandler = e => {
      const nextFocus = e.relatedTarget as HTMLInputElement;

      const segmentElements = [startSegmentRefs, endSegmentRefs].flatMap(refs =>
        Object.values(refs).map(ref => ref.current),
      );

      const isNextFocusASegment = segmentElements.includes(nextFocus);

      // If the next focus is _not_ on a segment
      if (!isNextFocusASegment) {
        setIsDirty(true);
        handleValidation?.(value);
      }
    };

    const handleCalendarButtonClick: MouseEventHandler<
      HTMLButtonElement
    > = e => {
      if (!disabled) {
        e.stopPropagation();
        setOpen(true);
        requestAnimationFrame(() => {
          // once the menu is open
          const highlightedCell = getHighlightedCell();
          highlightedCell?.focus();
        });
      }
    };

    /** Called when the input's start or end value has changed */
    const updateValue = (newRange?: DateRangeType) => {
      if (!isSameUTCRange(value, newRange)) {
        // When the value changes via the input element,
        // we only trigger validation if the component is dirty
        if (isDirty) {
          handleValidation?.(newRange);
        }
        setValue(newRange);
      }
    };

    const handleStartInputChange = (newStart: DateType) => {
      const end = value ? value[1] : null;
      updateValue([newStart, end]);
    };

    const handleEndInputChange = (newEnd: DateType) => {
      const start = value ? value[0] : null;
      updateValue([start, newEnd]);
    };

    return (
      <DateFormField
        ref={fwdRef}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        onBlur={handleInputBlur}
        onIconButtonClick={handleCalendarButtonClick}
        {...rest}
      >
        <div className={inputWrapperStyles}>
          <DateInputBox
            data-lg="date-range_start-input"
            value={value?.[0]}
            setValue={handleStartInputChange}
            segmentRefs={startSegmentRefs}
            onChange={onChange}
          />
          <span>{EN_DASH}</span>
          <DateInputBox
            data-lg="date-range_end-input"
            value={value?.[1]}
            setValue={handleEndInputChange}
            segmentRefs={endSegmentRefs}
            onChange={onChange}
          />
        </div>
      </DateFormField>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
