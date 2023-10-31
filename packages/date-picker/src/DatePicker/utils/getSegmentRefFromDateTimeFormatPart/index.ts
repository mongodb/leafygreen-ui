import isUndefined from 'lodash/isUndefined';

import { isDateSegment, SegmentRefs } from '../../../shared/hooks';

/**
 * Given a {@link Intl.DateTimeFormatPart},
 * return the segmentRefs entry with the same type
 *
 * @deprecated
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
