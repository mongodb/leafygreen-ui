import { TruncationLocation } from 'src/Chip/Chip.types';

/**
 *
 * Returns a truncated string
 *
 * @param chipCharacterLimit the character limit for the chip
 * @param chipTruncationLocation the location of the truncation
 * @param label the label
 * @param isTruncated boolean that determines if the label should truncate
 * @returns `string`
 * @internal
 */
export const getTruncatedName = (
  chipCharacterLimit: number,
  chipTruncationLocation: TruncationLocation,
  label: React.ReactNode,
  isTruncated: boolean,
) => {
  if (isTruncated && typeof label === 'string') {
    const ellipsis = '…';
    const chars = chipCharacterLimit - 3; // ellipsis dots included in the char limit

    switch (chipTruncationLocation) {
      case 'start': {
        const end = label.substring(label.length - chars).trim();
        return ellipsis + end;
      }

      case 'middle': {
        const start = label.substring(0, chars / 2).trim();
        const end = label.substring(label.length - chars / 2).trim();
        return start + ellipsis + end;
      }

      case 'end': {
        const start = label.substring(0, chars).trim();
        return start + ellipsis;
      }

      default: {
        return label;
      }
    }
  }

  return label;
};
