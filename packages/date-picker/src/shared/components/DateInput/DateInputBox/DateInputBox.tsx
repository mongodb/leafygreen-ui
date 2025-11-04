import React, { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';

import {
  isDateObject,
  isInvalidDateObject,
  isValidDate,
} from '@leafygreen-ui/date-utils';
import { InputBox } from '@leafygreen-ui/input-box';

import {
  charsPerSegment,
  dateSegmentRules,
  defaultMin,
} from '../../../constants';
import { useSharedDatePickerContext } from '../../../context';
import { useDateSegments } from '../../../hooks';
import { DateSegment, DateSegmentsState } from '../../../types';
import {
  isEverySegmentFilled,
  isEverySegmentValueExplicit,
  newDateFromSegments,
} from '../../../utils';
import { DateInputSegment } from '../DateInputSegment';

import { DateInputBoxProps } from './DateInputBox.types';
import { DateInputBoxProvider } from '../DateInputBoxContext';

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
export const DateInputBox = React.forwardRef<HTMLDivElement, DateInputBoxProps>(
  (
    {
      value,
      setValue,
      className,
      labelledBy,
      segmentRefs,
      onSegmentChange,
      onKeyDown,
      ...rest
    }: DateInputBoxProps,
    fwdRef,
  ) => {
    const { isDirty, formatParts, disabled, setIsDirty, size } =
      useSharedDatePickerContext();

    /** if the value is a `Date` the component is dirty */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

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
        const newDate = newDateFromSegments(newSegments);

        const shouldSetValue =
          isNull(newDate) ||
          (isValidDate(newDate) && isEverySegmentValueExplicit(newSegments)) ||
          (isInvalidDateObject(newDate) &&
            (isDirty || isEverySegmentFilled(newSegments)));

        if (shouldSetValue) {
          setValue?.({
            value: newDate,
            segments: newSegments,
          });
        }
      }
    };

    /** State Management for segments using a useReducer instead of useState */
    /** Keep track of each date segment */
    const { segments, setSegment } = useDateSegments(value, {
      onUpdate: handleSegmentUpdate,
    });

    return (
      <DateInputBoxProvider value={value}>
        <InputBox
          ref={fwdRef}
          onKeyDown={onKeyDown}
          segmentRefs={segmentRefs}
          segmentEnum={DateSegment}
          charsPerSegment={charsPerSegment}
          formatParts={formatParts}
          segments={segments}
          setSegment={setSegment}
          disabled={disabled}
          segmentRules={dateSegmentRules}
          onSegmentChange={onSegmentChange}
          minValues={defaultMin}
          labelledBy={labelledBy}
          segmentComponent={DateInputSegment}
          size={size}
          {...rest}
        />
      </DateInputBoxProvider>
    );
  },
);

DateInputBox.displayName = 'DateInputBox';
