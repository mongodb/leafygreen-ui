import React, { FocusEventHandler } from 'react';
import isEqual from 'lodash/isEqual';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import {
  DateSegment,
  DateSegmentsState,
  DateSegmentValue,
  isDateSegment,
  useDateSegments,
} from '../../../hooks';
import {
  doesSomeSegmentExist,
  getMaxSegmentValue,
  getMinSegmentValue,
  getRelativeSegment,
  getValueFormatter,
  isExplicitSegmentValue,
  newDateFromSegments,
} from '../../../utils';
import { useDatePickerContext } from '../../DatePickerContext';
import { DateInputSegment } from '../DateInputSegment';
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

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
    const { formatParts, disabled, min, max } = useDatePickerContext();
    const { theme } = useDarkMode();

    const containerRef = useForwardedRef(fwdRef, null);

    /** Formats and sets the segment value */
    const getFormattedSegmentValue = (
      segmentName: DateSegment,
      segmentValue: DateSegmentValue,
    ): DateSegmentValue => {
      const formatter = getValueFormatter(segmentName);
      const formattedValue = formatter(segmentValue);
      return formattedValue;
    };

    /**
     * When a segment is updated,
     * trigger a `change` event for the segment, and
     * update the external Date value if necessary
     */
    const handleSegmentUpdate = (
      newSegments: DateSegmentsState,
      prevSegments?: DateSegmentsState,
    ) => {
      const hasAnySegmentChanged = !isEqual(newSegments, prevSegments);

      if (hasAnySegmentChanged) {
        const utcDate = newDateFromSegments(newSegments);
        const areAllSegmentsEmpty = !doesSomeSegmentExist(newSegments);

        if (utcDate) {
          // Update the value iff all segments create a valid date.
          setValue?.(utcDate);
        } else if (areAllSegmentsEmpty) {
          // otherwise, if no segment exists, set the external value to null
          setValue?.(null);
        }
      }
    };

    /** Keep track of each date segment */
    const { segments, setSegment } = useDateSegments(value, {
      onUpdate: handleSegmentUpdate,
    });

    /** Fired when an individual segment value changes */
    const handleSegmentInputChange: DateInputSegmentChangeEventHandler =
      segmentChangeEvent => {
        let segmentValue = segmentChangeEvent.value;
        const { segment, meta } = segmentChangeEvent;
        const changedViaArrowKeys =
          meta?.key === keyMap.ArrowDown || meta?.key === keyMap.ArrowUp;

        // Auto-format the segment
        if (
          !changedViaArrowKeys &&
          isExplicitSegmentValue(segment, segmentValue)
        ) {
          segmentValue = getFormattedSegmentValue(segment, segmentValue);

          // Auto-advance focus
          const nextSegmentName = getRelativeSegment('next', {
            segment,
            formatParts,
          });

          if (nextSegmentName) {
            const nextSegmentRef = segmentRefs[nextSegmentName];
            nextSegmentRef?.current?.focus();
          }
        }

        setSegment(segment, segmentValue);
        onSegmentChange?.(segmentChangeEvent);
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

DateInputBox.displayName = 'DateInputBox';
