import React from 'react';
import { isSameDay } from 'date-fns';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../DatePickerContext';
import {
  DateSegment,
  DateSegmentsState,
  isDateSegment,
} from '../../hooks/useDateSegments/DateSegments.types';
import { useDateSegments } from '../../hooks/useDateSegments/useDateSegments';
import { newDateFromSegments } from '../../utils/newDateFromSegments';
import { DateInputSegment } from '../DateInputSegment';

import {
  segmentPartsWrapperStyles,
  separatorLiteralStyles,
} from './DateInputBox.styles';
import { DateInputBoxProps } from './DateInputBox.types';

/**
 * Renders a styled date input with appropriate segment order & separator characters.
 *
 * Uses vars value & dateFormat with `Intl.DateTimeFormat.prototype.formatToParts()`
 * to determine the segment order and separator characters.
 *
 * Provided value is assumed to be UTC.
 * Argument passed into `setValue` callback is also in UTC
 * @internal
 */
export const DateInputBox = React.forwardRef<HTMLDivElement, DateInputBoxProps>(
  (
    {
      value,
      setValue,
      className,
      labelledBy,
      segmentRefs,
      onSegmentChange,
      ...rest
    }: DateInputBoxProps,
    fwdRef,
  ) => {
    const { formatParts, disabled } = useDatePickerContext();

    const containerRef = useForwardedRef(fwdRef, null);

    /**
     * When a segment is updated, update the external value
     */
    const onSegmentsUpdate = (newSegments: DateSegmentsState) => {
      const { day, month, year } = newSegments;
      /** New date in UTC */
      const utcDate = newDateFromSegments({ day, month, year });

      // Only update the value iff all parts are set, and create a valid date.
      if (utcDate) {
        /** Whether we need to update the external value */
        const shouldUpdate = !value || !isSameDay(utcDate, value);

        if (shouldUpdate) {
          setValue?.(utcDate);
        }
      } else if (!(day || month || year)) {
        // if no segment exists, set the external value to null
        setValue?.(null);
      }
    };

    // Keep track of each date segment
    const { segments, setSegment } = useDateSegments(value ?? null, {
      onUpdate: onSegmentsUpdate,
    });

    /**
     * Curried function that creates a callback function for each segment.
     * Sets the segment value
     */
    const handleSegmentChange =
      (segment: DateSegment) => (newValue: string) => {
        const newSegmentValue = Number(newValue);
        setSegment(segment, newSegmentValue);
        onSegmentChange?.(segment, newSegmentValue);
      };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={cx(segmentPartsWrapperStyles, className)}
        ref={containerRef}
        {...rest}
      >
        {formatParts?.map((part, i) => {
          if (part.type === 'literal') {
            return (
              <span className={separatorLiteralStyles} key={'literal-' + i}>
                {part.value}
              </span>
            );
          } else if (isDateSegment(part.type)) {
            return (
              <DateInputSegment
                key={part.type}
                ref={segmentRefs[part.type]}
                segment={part.type}
                value={segments[part.type]}
                onChange={handleSegmentChange(part.type)}
                aria-labelledby={labelledBy}
              />
            );
          }
        })}
      </div>
    );
  },
);

DateInputBox.displayName = 'DateInputBox';
