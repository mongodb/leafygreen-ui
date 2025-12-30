import { TimeSegmentsState } from '../../shared.types';

/**
 * Checks if every segment is filled
 *
 * @param segments - The segments to check
 * @returns Whether every segment is filled
 */
export const isEverySegmentFilled = (segments: TimeSegmentsState) => {
  return Object.values(segments).every(segment => segment !== '');
};
