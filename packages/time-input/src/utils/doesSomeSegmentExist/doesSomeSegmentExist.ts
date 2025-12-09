import { TimeSegmentsState } from '../../shared.types';

/**
 * Checks if some segment exists
 *
 * @param segments - The segments to check
 * @returns Whether some segment exists
 */
export const doesSomeSegmentExist = (segments: TimeSegmentsState) => {
  // check if all segments are not empty
  return Object.values(segments).some(segment => segment !== '');
};
