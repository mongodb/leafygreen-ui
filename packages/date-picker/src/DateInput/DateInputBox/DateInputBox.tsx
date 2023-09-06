import React, { KeyboardEventHandler } from 'react';
import { isSameDay } from 'date-fns';

import { cx } from '@leafygreen-ui/emotion';
import { useDynamicRefs, useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { useDatePickerContext } from '../../DatePickerContext';
import { useDateSegments } from '../../hooks/useDateSegments';
import { useFormatParts } from '../../hooks/useFormat';
import { getRemainingParts } from '../../utils/getRemainingParts';
import { isValidSegmentName } from '../../utils/isValidSegment';
import { newDateFromSegments } from '../../utils/newDateFromSegments';
import {
  DateSegment,
  DateSegmentsState,
  isDateSegment,
} from '../DateInput.types';
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
    { value, setValue, className, labelledBy, ...rest }: DateInputBoxProps,
    fwdRef,
  ) => {
    const { dateFormat } = useDatePickerContext();
    const containerRef = useForwardedRef(fwdRef, null);
    const segmentRefs = useDynamicRefs<HTMLInputElement>({ prefix: 'segment' });

    // Only used to track the _order_ of segments, not the value itself
    const formatParts = useFormatParts(dateFormat);

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
    const { segments, setSegment } = useDateSegments(value, {
      onUpdate: onSegmentsUpdate,
    });

    /**
     * Curried function that creates a callback function for each segment.
     * Sets the segment value
     */
    const handleSegmentChange =
      (segment: DateSegment) => (newValue: string) => {
        setSegment(segment, Number(newValue));
      };

    const handleKeyDown: KeyboardEventHandler = ({ keyCode }) => {
      /** moves the focused segment left or right */
      const moveFocus = (dir: 'left' | 'right') => {
        // TODO: check the position of the cursor before updating focus (see combobox)

        // get the currently focused element
        const focus = document.activeElement;
        const activeSegment = focus?.id;
        const segmentIndex = formatParts?.findIndex(
          part => part.type === activeSegment,
        );

        // get the format parts before/after the current index
        const remainingParts = getRemainingParts(
          dir,
          segmentIndex,
          formatParts,
        );

        // get the next part that represents a value
        const nextIndex = remainingParts?.find(part =>
          isValidSegmentName(part.type),
        );

        // focus the element with that segment id
        const nextRef = nextIndex ? segmentRefs(nextIndex.type) : null;

        if (nextRef) {
          nextRef.current?.focus();
        }
      };

      switch (keyCode) {
        case keyMap.ArrowRight: {
          moveFocus('right');
          break;
        }

        case keyMap.ArrowLeft:
          moveFocus('left');
          break;
        default: {
          break;
        }
      }
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={cx(segmentPartsWrapperStyles, className)}
        ref={containerRef}
        onKeyDown={handleKeyDown}
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
                ref={segmentRefs(part.type)}
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
