import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import { isSameDay } from 'date-fns';
import isEqual from 'lodash/isEqual';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import {
  DateSegment,
  DateSegmentsState,
  isDateSegment,
  useDateSegments,
} from '../../../hooks';
import {
  doesSomeSegmentExist,
  getValueFormatter,
  newDateFromSegments,
} from '../../../utils';
import { useDatePickerContext } from '../../DatePickerContext';
import { DateInputSegment } from '../DateInputSegment';

import {
  segmentPartsWrapperStyles,
  separatorLiteralDisabledStyles,
  separatorLiteralStyles,
} from './DateInputBox.styles';
import { DateInputBoxProps } from './DateInputBox.types';

/**
 * Renders a styled date input with appropriate segment order & separator characters.
 *
 * Depends on {@link DateInputSegment}
 *
 * Uses parameters `value` & `dateFormat` along with {@link Intl.DateTimeFormat.prototype.formatToParts}
 * to determine the segment order and separator characters.
 *
 * Provided value is assumed to be UTC.
 *
 * Argument passed into `setValue` callback is also in UTC
 * @internal
 */
export const DateInputBox = React.forwardRef<HTMLDivElement, DateInputBoxProps>(
  (
    {
      value: dateValue,
      setValue: setDateValue,
      className,
      labelledBy,
      segmentRefs,
      onChange: onSegmentChange,
      ...rest
    }: DateInputBoxProps,
    fwdRef,
  ) => {
    const { formatParts, disabled } = useDatePickerContext();
    const { theme } = useDarkMode();

    const containerRef = useForwardedRef(fwdRef, null);

    // Store the value of which key is pressed when handleSegmentChange is fired.
    // This key value will then be passed inside `triggerChangeEventForSegment`
    // using ref and state will have stale values and we don't need the component to rerender when this value changes
    let key = '';

    /**
     * Fires a synthetic change event
     * and calls the provided `onChange` handler
     */
    const triggerChangeEventForSegment = (segment: DateSegment) => {
      const changeEvent = new Event('change');
      const eventTarget = segmentRefs[segment].current;

      console.log('triggerChangeEventForSegment', key);

      if (eventTarget) {
        const reactEvent = createSyntheticEvent(
          changeEvent,
          eventTarget,
          key,
        ) as ChangeEvent<HTMLInputElement>;
        onSegmentChange?.(reactEvent);
      }
    };

    /**
     * When a segment is updated,
     * trigger a `change` event for the segment, and
     * update the external Date value if necessary
     */
    const onSegmentsUpdate = (
      newSegments: DateSegmentsState,
      prevSegments?: DateSegmentsState,
      updatedSegment?: DateSegment,
    ) => {
      const utcDate = newDateFromSegments(newSegments);
      const haveSegmentValuesChanged = !isEqual(newSegments, prevSegments);
      const areAllSegmentsEmpty = !doesSomeSegmentExist(newSegments);

      if (haveSegmentValuesChanged) {
        // Synthetically trigger the onChange event passed in from the parent
        if (updatedSegment) {
          triggerChangeEventForSegment(updatedSegment);
        } else {
          Object.keys(newSegments).forEach(seg => {
            triggerChangeEventForSegment(seg as DateSegment);
          });
        }

        if (utcDate) {
          // Only update the value iff all parts are set, and create a valid date.
          const shouldUpdate = !dateValue || !isSameDay(utcDate, dateValue);

          if (shouldUpdate) {
            setDateValue?.(utcDate);
          }
        } else if (haveSegmentValuesChanged && areAllSegmentsEmpty) {
          // if no segment exists, set the external value to null
          setDateValue?.(null);
        }
      }
    };

    /** Keep track of each date segment */
    const { segments, setSegment } = useDateSegments(dateValue, {
      onUpdate: onSegmentsUpdate,
    });

    /** fired when an individual segment value changes */
    const handleSegmentChange: ChangeEventHandler<HTMLInputElement> = e => {
      const segmentName = e.target.getAttribute('id');
      const newValue = e.target.value;

      // set the value of the key which will then be used
      // @ts-ignore FIXME:
      key = e.key;

      if (isDateSegment(segmentName)) {
        setSegment(segmentName, newValue);
      }
    };

    const handleSegmentBlur: FocusEventHandler<HTMLInputElement> = e => {
      const segmentName = e.target.getAttribute('id');
      const newValue = e.target.value;

      if (isDateSegment(segmentName)) {
        const formatter = getValueFormatter(segmentName);
        const formattedValue = formatter(newValue);
        setSegment(segmentName, formattedValue);
      }
    };

    return (
      <div
        className={cx(segmentPartsWrapperStyles, className)}
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
                segment={part.type}
                value={segments[part.type]}
                onChange={handleSegmentChange}
                onBlur={handleSegmentBlur}
              />
            );
          }
        })}
      </div>
    );
  },
);

DateInputBox.displayName = 'DateInputBox';
