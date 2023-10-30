import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { useSegmentRefs } from '../../hooks';
import { DateFormField } from '../../shared/DateFormField';
import { DateInputBox } from '../../shared/DateInput';
import { useDatePickerContext } from '../../shared/DatePickerContext';
import { isElementInputSegment, isZeroLike } from '../../utils';
import { getRelativeSegment } from '../utils/getRelativeSegment';
import { getSegmentToFocus } from '../utils/getSegmentToFocus';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      value,
      setValue,
      onClick,
      onKeyDown,
      onChange: onSegmentChange,
      handleValidation,
      ...rest
    }: DatePickerInputProps,
    fwdRef,
  ) => {
    const { formatParts, disabled, setOpen, setIsDirty } =
      useDatePickerContext();
    const segmentRefs = useSegmentRefs();

    /** Called when the input, or any of its children, is clicked */
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
          // This is the default `input type=number` behavior
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

      // call any handler that was passed in
      onKeyDown?.(e);
    };

    /** Called when any child of DatePickerInput is blurred */
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

    return (
      <DateFormField
        ref={fwdRef}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        onBlur={handleInputBlur}
        onIconButtonClick={handleIconButtonClick}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={setValue}
          segmentRefs={segmentRefs}
          onChange={onSegmentChange}
        />
      </DateFormField>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
