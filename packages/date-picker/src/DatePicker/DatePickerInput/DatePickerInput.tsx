import React, {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { isSameUTCDay } from '@leafygreen-ui/date-utils';
import { isZeroLike } from '@leafygreen-ui/lib';
import { createSyntheticEvent, keyMap } from '@leafygreen-ui/lib';

import { DateFormField, DateInputBox } from '../../shared/components/DateInput';
import { DateInputSegmentChangeEventHandler } from '../../shared/components/DateInput/DateInputSegment';
import { useSharedDatePickerContext } from '../../shared/context';
import {
  getRelativeSegmentRef,
  isElementInputSegment,
} from '../../shared/utils';
import { useSingleDateContext } from '../SingleDateContext';
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
    const { formatParts, disabled, isDirty, setIsDirty } =
      useSharedDatePickerContext();
    const {
      refs: { segmentRefs, calendarButtonRef },
      value,
      setValue,
      openMenu,
      toggleMenu,
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
    const handleInputClick: MouseEventHandler<HTMLElement> = e => {
      if (!disabled) {
        openMenu(e);
        const { target } = e;
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
      toggleMenu(e);
    };

    /** Called on any keydown within the input element */
    const handleInputKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const { target: _target, key } = e;
      const target = _target as HTMLElement;
      const isSegment = isElementInputSegment(target, segmentRefs);

      // if target is not a segment, do nothing
      if (!isSegment) return;

      const isSegmentEmpty = isZeroLike(target.value);

      const { selectionStart, selectionEnd } = target;

      switch (key) {
        case keyMap.ArrowLeft: {
          // if input is empty,
          // or the cursor is at the beginning of the input
          // set focus to prev. input (if it exists)
          if (isSegmentEmpty || selectionStart === 0) {
            const segmentToFocus = getRelativeSegmentRef('prev', {
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
          if (isSegmentEmpty || selectionEnd === target.value.length) {
            const segmentToFocus = getRelativeSegmentRef('next', {
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
          // increment/decrement logic implemented by DateInputSegment
          break;
        }

        case keyMap.Backspace: {
          if (isSegmentEmpty) {
            const segmentToFocus = getRelativeSegmentRef('prev', {
              segment: target,
              formatParts,
              segmentRefs,
            });
            segmentToFocus?.current?.focus();
          }
          break;
        }

        case keyMap.Space: {
          openMenu();
          break;
        }

        case keyMap.Enter:
        case keyMap.Escape:
        case keyMap.Tab:
          // Behavior handled by parent or menu
          break;
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
     * If up/down arrows are pressed, don't move to the next segment
     */
    const handleSegmentChange: DateInputSegmentChangeEventHandler =
      segmentChangeEvent => {
        const { segment } = segmentChangeEvent;

        if (isDirty) {
          handleValidation?.(value);
        }

        /**
         * Fire a simulated `change` event
         */
        const changeEvent = new Event('change');
        const target = segmentRefs[segment].current;

        if (target) {
          const reactEvent = createSyntheticEvent<
            ChangeEvent<HTMLInputElement>
          >(changeEvent, target);
          onSegmentChange?.(reactEvent);
        }
      };

    return (
      <DateFormField
        ref={fwdRef}
        buttonRef={calendarButtonRef}
        onKeyDown={handleInputKeyDown}
        onInputClick={handleInputClick}
        onBlur={handleInputBlur}
        onIconButtonClick={handleIconButtonClick}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={handleInputValueChange}
          segmentRefs={segmentRefs}
          onSegmentChange={handleSegmentChange}
        />
      </DateFormField>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
