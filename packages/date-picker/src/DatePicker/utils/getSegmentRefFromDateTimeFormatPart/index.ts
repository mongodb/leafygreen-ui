import isUndefined from 'lodash/isUndefined';

import { isDateSegment } from '../../../hooks/useDateSegments/DateSegments.types';
import { SegmentRefs } from '../../../DateInput/DateInputBox/DateInputBox.types';

/**
 * Given a {@link Intl.DateTimeFormatPart},
 * return the segmentRefs entry with the same type
 */
export const getSegmentRefFromDateTimeFormatPart = (
  formatPart: Intl.DateTimeFormatPart | undefined,
  segmentRefs: SegmentRefs,
) => {
  if (isUndefined(formatPart)) {
    return;
  }

  const key = formatPart.type;

  if (isDateSegment(key)) {
    const ref = segmentRefs[key];
    return ref;
  }
};
