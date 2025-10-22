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
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

import {
  segmentPartsWrapperStyles,
  separatorLiteralDisabledStyles,
  separatorLiteralStyles,
} from './DateInputBox.styles';
import { DateInputBoxProps } from './DateInputBox.types';
import { charsPerSegment } from '../../../constants';
import { InputBox } from '../../InputBox/InputBox';

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
    const { isDirty, formatParts, disabled, min, max, setIsDirty } =
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

    // TODO: MOVE to constants
    const segmentRules = {
      [DateSegment.Day]: {
        maxChars: charsPerSegment.day,
        minExplicitValue: 4,
      },
      [DateSegment.Month]: {
        maxChars: charsPerSegment.month,
        minExplicitValue: 2,
      },
      [DateSegment.Year]: {
        maxChars: charsPerSegment.year,
      },
    };

    return (
      // <div
      //   className={cx(segmentPartsWrapperStyles, className)}
      //   onKeyDown={handleInputKeyDown}
      //   ref={containerRef}
      //   {...rest}
      // >
      //   {formatParts?.map((part, i) => {
      //     if (part.type === 'literal') {
      //       return (
      //         <span
      //           className={cx(separatorLiteralStyles, {
      //             [separatorLiteralDisabledStyles[theme]]: disabled,
      //           })}
      //           key={'literal-' + i}
      //         >
      //           {part.value}
      //         </span>
      //       );
      //     } else if (isDateSegment(part.type)) {
      //       return (
      //         <DateInputSegment
      //           key={part.type}
      //           ref={segmentRefs[part.type]}
      //           aria-labelledby={labelledBy}
      //           min={getMinSegmentValue(part.type, { date: value, min })}
      //           max={getMaxSegmentValue(part.type, { date: value, max })}
      //           segment={part.type}
      //           value={segments[part.type]}
      //           onChange={handleSegmentInputChange}
      //           onBlur={handleSegmentInputBlur}
      //         />
      //       );
      //     }
      //   })}
      // </div>

      <InputBox
        ref={fwdRef}
        segmentRefs={segmentRefs}
        segmentObj={DateSegment}
        charsPerSegment={charsPerSegment}
        formatParts={formatParts}
        segments={segments}
        setSegment={setSegment}
        disabled={disabled}
        segmentRules={segmentRules}
        onSegmentChange={onSegmentChange}
        renderSegment={({ onChange, onBlur, partType }) => (
          <DateInputSegment
            key={partType}
            ref={segmentRefs[partType]}
            aria-labelledby={labelledBy}
            min={getMinSegmentValue(partType, { date: value, min })}
            max={getMaxSegmentValue(partType, { date: value, max })}
            segment={partType}
            value={segments[partType]}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
        {...rest}
      ></InputBox>
    );
  },
);

DateInputBox.displayName = 'DateInputBox';
