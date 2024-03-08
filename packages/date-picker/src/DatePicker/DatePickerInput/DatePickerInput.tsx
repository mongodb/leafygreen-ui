import React, {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import isNull from 'lodash/isNull';

import { isInvalidDateObject, isSameUTCDay } from '@leafygreen-ui/date-utils';
import { createSyntheticEvent, keyMap } from '@leafygreen-ui/lib';

import {
  DateFormField,
  DateInputBox,
  DateInputChangeEventHandler,
} from '../../shared/components/DateInput';
import { DateInputSegmentChangeEventHandler } from '../../shared/components/DateInput/DateInputSegment';
import { useSharedDatePickerContext } from '../../shared/context';
import {
  getFormattedDateStringFromSegments,
  getRelativeSegmentRef,
  isElementInputSegment,
} from '../../shared/utils';
import { useDatePickerContext } from '../DatePickerContext';
import { getSegmentToFocus } from '../utils/getSegmentToFocus';

import { DatePickerInputProps } from './DatePickerInput.types';

/**
 * @internal
 */
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
    const {
      formatParts,
      disabled,
      locale,
      setIsDirty,
      setInternalErrorMessage,
    } = useSharedDatePickerContext();
    const {
      refs: { segmentRefs, calendarButtonRef },
      value,
      setValue,
      openMenu,
      toggleMenu,
      handleValidation,
    } = useDatePickerContext();

    /** Called when the input's Date value has changed */
    const handleInputValueChange: DateInputChangeEventHandler = ({
      value: newVal,
      segments,
    }) => {
      if (!isSameUTCDay(newVal, value)) {
        handleValidation?.(newVal);
        setValue(newVal);
      }

      if (!isNull(newVal) && isInvalidDateObject(newVal)) {
        const dateString = getFormattedDateStringFromSegments(segments, locale);
        setInternalErrorMessage(`${dateString} is not a valid date`);
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
        segmentToFocus?.select();
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

      const isSegmentEmpty = !target.value;

      switch (key) {
        case keyMap.ArrowLeft: {
          // Without this, the input ignores `.select()`
          e.preventDefault();
          // if input is empty,
          // set focus to prev input (if it exists)
          const segmentToFocus = getRelativeSegmentRef('prev', {
            segment: target,
            formatParts,
            segmentRefs,
          });

          segmentToFocus?.current?.focus();
          segmentToFocus?.current?.select();
          // otherwise, use default behavior

          break;
        }

        case keyMap.ArrowRight: {
          // Without this, the input ignores `.select()`
          e.preventDefault();
          // if input is empty,
          // set focus to next. input (if it exists)
          const segmentToFocus = getRelativeSegmentRef('next', {
            segment: target,
            formatParts,
            segmentRefs,
          });

          segmentToFocus?.current?.focus();
          segmentToFocus?.current?.select();
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
            // prevent the backspace in the previous segment
            e.preventDefault();

            const segmentToFocus = getRelativeSegmentRef('prev', {
              segment: target,
              formatParts,
              segmentRefs,
            });
            segmentToFocus?.current?.focus();
            segmentToFocus?.current?.select();
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
      const isNextFocusElementASegment = Object.values(segmentRefs)
        .map(ref => ref.current)
        .includes(nextFocus);

      if (!isNextFocusElementASegment) {
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
        const { segment, value } = segmentChangeEvent;

        /**
         * Fire a simulated `change` event
         */
        const target = segmentRefs[segment].current;

        if (target) {
          // At this point, the target stored in segmentRefs has a stale value.
          // To fix this we update the value of the target with the up-to-date value from `segmentChangeEvent`.
          target.value = value;
          const changeEvent = new Event('change');
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
