// @ts-nocheck

import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
} from 'react';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';

import {
  isDateObject,
  isInvalidDateObject,
  isValidDate,
} from '@leafygreen-ui/date-utils';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import { useSharedDatePickerContext } from '../../../context';
import { useDateSegments } from '../../../hooks';
import {
  DateSegment,
  DateSegmentsState,
  DateSegmentValue,
  isDateSegment,
} from '../../../types';
import {
  getMaxSegmentValue,
  getMinSegmentValue,
  getRelativeSegment,
  getValueFormatter,
  isEverySegmentFilled,
  isEverySegmentValueExplicit,
  isExplicitSegmentValue,
  newDateFromSegments,
  getRelativeSegmentRef,
  isElementInputSegment,
} from '../../../utils';
import { DateInputSegment } from '../DateInputSegment';
import { InputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

import {
  segmentPartsWrapperStyles,
  separatorLiteralDisabledStyles,
  separatorLiteralStyles,
} from './InputBox.styles';
import { InputBoxProps } from './InputBox.types';
import { charsPerSegment } from '../../../constants';

/**
 * Renders a styled date input with appropriate segment order & separator characters.
 *
 * Depends on {@link DateInputSegment}
 *
 * Uses parameters `value` & `locale` along with {@link Intl.DateTimeFormat.prototype.formatToParts}
 * to determine the segment order and separator characters.
 *
 * Provided value is assumed to be UTC.
 *
 * Argument passed into `setValue` callback is also in UTC
 * @internal
 */
export const InputBox = React.forwardRef<HTMLDivElement, InputBoxProps>(
  (
    {
      value,
      setValue,
      className,
      labelledBy,
      segmentRefs,
      onSegmentChange,
      onKeyDown,
      handleSegmentUpdate,
      ...rest
    }: InputBoxProps,
    fwdRef,
  ) => {
    const { isDirty, formatParts, disabled, min, max, setIsDirty } =
      useSharedDatePickerContext();
    const { theme } = useDarkMode();

    const containerRef = useForwardedRef(fwdRef, null);

    /** Formats and sets the segment value */
    const getFormattedSegmentValue = (
      segmentName: DateSegment,
      segmentValue: DateSegmentValue,
    ): DateSegmentValue => {
      const formatter = getValueFormatter(segmentName, charsPerSegment);
      const formattedValue = formatter(segmentValue);
      return formattedValue;
    };

    /** if the value is a `Date` the component is dirty */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

    /** State Management for segments using a useReducer instead of useState */
    /** Keep track of each date segment */
    const { segments, setSegment } = useDateSegments(value, {
      onUpdate: handleSegmentUpdate,
    });

    /** Fired when an individual segment value changes */
    const handleSegmentInputChange: InputSegmentChangeEventHandler =
      segmentChangeEvent => {
        let segmentValue = segmentChangeEvent.value;
        const { segment: segmentName, meta } = segmentChangeEvent;
        const changedViaArrowKeys =
          meta?.key === keyMap.ArrowDown || meta?.key === keyMap.ArrowUp;

        // Auto-format the segment if it is explicit and was not changed via arrow-keys
        if (
          !changedViaArrowKeys &&
          isExplicitSegmentValue(segmentName, segmentValue)
        ) {
          segmentValue = getFormattedSegmentValue(segmentName, segmentValue);

          // Auto-advance focus (if possible)
          const nextSegmentName = getRelativeSegment('next', {
            segment: segmentName,
            formatParts,
          });

          if (nextSegmentName) {
            const nextSegmentRef = segmentRefs[nextSegmentName];
            nextSegmentRef?.current?.focus();
            nextSegmentRef?.current?.select();
          }
        }

        setSegment(segmentName, segmentValue);
        onSegmentChange?.(segmentChangeEvent);
        // TODO: onInputChange callback here
      };

    /** Triggered when a segment is blurred */
    const handleSegmentInputBlur: FocusEventHandler<HTMLInputElement> = e => {
      const segmentName = e.target.getAttribute('id');
      const segmentValue = e.target.value;

      if (isDateSegment(segmentName)) {
        const formattedValue = getFormattedSegmentValue(
          segmentName,
          segmentValue,
        );
        setSegment(segmentName, formattedValue);
      }
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

        case keyMap.Space:
        case keyMap.Enter:
        case keyMap.Escape:
        case keyMap.Tab:
          // Behavior handled by parent or menu
          break;
      }

      // call any handler that was passed in
      onKeyDown?.(e);
    };

    return (
      <div
        className={cx(segmentPartsWrapperStyles, className)}
        onKeyDown={handleInputKeyDown}
        ref={containerRef}
        {...rest}
      >
        {formatParts?.map((part, i) => {
          if (part.type === 'literal') {
            return (
              <span
                className={cx(separatorLiteralStyles, {
                  [separatorLiteralDisabledStyles[theme]]: disabled,
                })}
                key={'literal-' + i}
              >
                {part.value}
              </span>
            );
          } else if (isDateSegment(part.type)) {
            return (
              <DateInputSegment
                key={part.type}
                ref={segmentRefs[part.type]}
                aria-labelledby={labelledBy}
                min={getMinSegmentValue(part.type, { date: value, min })}
                max={getMaxSegmentValue(part.type, { date: value, max })}
                segment={part.type}
                value={segments[part.type]}
                onChange={handleSegmentInputChange}
                onBlur={handleSegmentInputBlur}
              />
            );
          }
        })}
      </div>
    );
  },
);

InputBox.displayName = 'InputBox';
