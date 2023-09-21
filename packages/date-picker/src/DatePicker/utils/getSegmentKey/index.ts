import { SegmentRefs } from '../../../hooks/useSegmentRefs';

/** Returns the key of a given segment ref or element */
export const getSegmentKey = (
  segment: HTMLInputElement | React.RefObject<HTMLInputElement>,
  segmentRefs: SegmentRefs,
): keyof SegmentRefs | undefined => {
  const currentSegmentKeyValuePair = Object.entries(segmentRefs).find(
    ([_, val]) => {
      return (
        val.current ===
          (segment as React.RefObject<HTMLInputElement>).current ||
        val.current === (segment as HTMLInputElement)
      );
    },
  ) as [keyof SegmentRefs, React.RefObject<HTMLInputElement>] | undefined;

  if (currentSegmentKeyValuePair) {
    const currentSegmentKey = currentSegmentKeyValuePair[0];
    return currentSegmentKey;
  }
};
