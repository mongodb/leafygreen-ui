import React, { useRef } from 'react';
import { isSameDay } from 'date-fns';

import { cx } from '@leafygreen-ui/emotion';

import { useDatePickerContext } from '../../DatePickerContext';
import { newDateFromSegments } from '../../utils/newDateFromSegments';
import { toClientTimeZone } from '../../utils/toTimeZone';
import {
  DateInputSegment,
  DateSegment,
  isDateSegment,
} from '../DateInputSegment';

import {
  segmentPartsWrapperStyles,
  separatorLiteralStyles,
} from './DateInputBox.styles';
import { DateInputBoxProps, DateSegmentsState } from './DateInputBox.types';
import { useDateSegments } from './useDateSegments';
import { useFormatParts } from './useFormat';

/**
 * @internal
 *
 * Must be controlled
 */
export function DateInputBox({
  value,
  setValue,
  className,
  labelledBy,
  ...rest
}: DateInputBoxProps) {
  const { dateFormat, timeZone } = useDatePickerContext();
  const inputWrapperRef = useRef(null);

  // // Only used to track the _order_ of segments, not the value itself
  const formatParts = useFormatParts(dateFormat);

  /**
   * When a segment is updated, update the external value
   */
  const onSegmentsUpdate = (newSegments: DateSegmentsState) => {
    const { day, month, year } = newSegments;
    const sourceDate = newDateFromSegments({ day, month, year });

    // Only update the value iff all parts are set, and create a valid date.
    if (sourceDate) {
      /** New date relative to client time zone */
      const clientDate = toClientTimeZone(sourceDate, timeZone);

      /** Whether we need to update the external value */
      const shouldUpdate = !value || !isSameDay(clientDate, value);

      if (shouldUpdate) {
        setValue?.(clientDate);
      }
    } else if (!(day || month || year)) {
      // if no segment exists, set the external value to null
      setValue?.(null);
    }
  };

  // Keep track of each date segment
  const { segments, setSegment } = useDateSegments(value, {
    timeZone,
    onUpdate: onSegmentsUpdate,
  });

  /**
   * Curried function that creates a callback function for each segment.
   * Sets the segment value
   */
  const handleSegmentChange = (segment: DateSegment) => (newValue: string) => {
    setSegment(segment, Number(newValue));
  };

  return (
    <div
      className={cx(segmentPartsWrapperStyles, className)}
      ref={inputWrapperRef}
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
}

DateInputBox.displayName = 'DateInputBox';
