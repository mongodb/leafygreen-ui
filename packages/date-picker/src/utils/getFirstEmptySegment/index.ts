import { DatePickerContextProps } from '../../DatePickerContext';
import { DateSegment } from '../../hooks/useDateSegments';
import { SegmentRefs } from '../../hooks/useSegmentRefs';

/**
 *
 * @returns The first empty date segment for the given format
 */
export const getFirstEmptySegment = ({
  formatParts,
  segmentRefs,
}: {
  formatParts: Required<DatePickerContextProps>['formatParts'];
  segmentRefs: SegmentRefs;
}) => {
  // if 1+ are empty, focus the first empty one
  const formatSegments = formatParts.filter(part => part.type !== 'literal');
  const emptySegmentKeys = formatSegments
    .map(p => p.type)
    .filter(type => {
      const element = segmentRefs[type as DateSegment];
      return !element?.current?.value;
    });
  const firstEmptySegmentKey = emptySegmentKeys[0] as DateSegment;
  const firstEmptySegmentRef = segmentRefs[firstEmptySegmentKey];
  return firstEmptySegmentRef.current;
};
