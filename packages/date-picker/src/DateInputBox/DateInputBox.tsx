import React, { useMemo, useRef } from 'react';
import { isSameDay } from 'date-fns';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { DateInputSegment, DateSegment } from '../DateInputSegment';
import { isDateSegment } from '../DateInputSegment';
import { DateInputWrapper } from '../DateInputWrapper';
import { useDatePickerContext } from '../DatePickerContext';
import { isValidDate } from '../utils/isValidDate';

import {
  segmentPartsWrapperStyles,
  separatorLiteralStyles,
} from './DateInputBox.styles';
import { DateInputBoxProps, DateSegmentsState } from './DateInputBox.types';
import { useDateSegments } from './useDateSegments';
import { constructDateString, toClientTimeZone, useFormatter } from './utils';

const now = new Date();

/**
 * @internal
 *
 * Must be controlled
 */
export function DateInputBox({ value, setValue }: DateInputBoxProps) {
  const { label, dateFormat, timeZone } = useDatePickerContext();
  const inputId = useIdAllocator({ prefix: 'date-input' });
  const inputWrapperRef = useRef(null);

  const formatter = useFormatter(dateFormat, timeZone);

  // Only used to track the _order_ of segments, not the value itself
  const formatOrder = useMemo(() => formatter?.formatToParts(now), [formatter]);

  /**
   * When a segment is updated, check if we should set the external value
   */
  const onSegmentsUpdate = (newSegments: DateSegmentsState) => {
    const { day, month, year } = newSegments;
    const sourceDateStr = constructDateString({ day, month, year });

    // Only update the value iff all parts are set, and create a valid date.
    if (isValidDate(sourceDateStr)) {
      /** New date relative to client time zone */
      const clientDate = toClientTimeZone(sourceDateStr, timeZone);

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
    formatter,
    onUpdate: onSegmentsUpdate,
  });

  /**
   * Curried function that creates a callback function for each segment.
   * Sets the segment value
   */
  const handleSegmentChange = (segment: DateSegment) => (newValue: string) => {
    setSegment(segment, newValue);
  };

  return (
    <DateInputWrapper
      label={label}
      description={dateFormat + ' ' + timeZone}
      inputId={inputId}
    >
      <div
        id={inputId}
        className={segmentPartsWrapperStyles}
        ref={inputWrapperRef}
      >
        {formatOrder?.map((part, i) => {
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
              />
            );
          }
        })}
      </div>
    </DateInputWrapper>
  );
}

DateInputBox.displayName = 'DateInputBox';
