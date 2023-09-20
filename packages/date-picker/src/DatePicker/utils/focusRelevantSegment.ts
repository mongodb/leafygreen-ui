import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { isDateSegment } from '../../DateInput/DateInput.types';
import { SegmentRefs } from '../../DateInput/DateInputBox/DateInputBox.types';
import { DatePickerContextProps } from '../../DatePickerContext';

interface FocusRelevantSegmentArgs {
  target: EventTarget;
  formatParts: DatePickerContextProps['formatParts'];
  segmentRefs: SegmentRefs;
}

/**
 * Helper function that focuses the appropriate input segment
 * given an event target and segment refs.
 *
 * 1) if the target was a segment, focus that segment
 * 2) otherwise, if all segments are filled, focus the last one
 * 3) but, if some segments are empty, focus the first empty one
 */
export const focusRelevantSegment = ({
  target,
  formatParts,
  segmentRefs,
}: FocusRelevantSegmentArgs): void => {
  if (
    isUndefined(target) ||
    isUndefined(formatParts) ||
    isUndefined(segmentRefs)
  ) {
    return;
  }

  const segmentRefsArray = Object.values(segmentRefs).map(r => r.current);

  // If we didn't explicitly click on an input segment...
  if (!segmentRefsArray.includes(target as HTMLInputElement)) {
    // filter out the literals from the format parts
    const formatSegments = formatParts.filter(part => part.type !== 'literal');

    // Check which segments are filled,
    if (segmentRefsArray.every(el => el?.value)) {
      // if all are filled, focus the last one,
      const keyOfLastSegment = (last(formatSegments) as Intl.DateTimeFormatPart)
        .type;

      if (isDateSegment(keyOfLastSegment)) {
        const lastSegmentRef = segmentRefs[keyOfLastSegment];
        lastSegmentRef?.current?.focus();
      }
    } else {
      // if 1+ are empty, focus the first empty one
      const emptySegmentKeys = formatSegments
        .map(p => p.type)
        .filter(type => {
          if (isDateSegment(type)) {
            const element = segmentRefs[type];
            return !element?.current?.value;
          }
        });
      const firstEmptySegmentKey = emptySegmentKeys[0];

      if (isDateSegment(firstEmptySegmentKey)) {
        const firstEmptySegmentRef = segmentRefs[firstEmptySegmentKey];
        firstEmptySegmentRef?.current?.focus();
      }
    }
  }
  // otherwise, we clicked a specific segment,
  // so we focus on that segment (default behavior)
};
