import { css } from '@leafygreen-ui/emotion';

import { characterWidth, charsPerSegment } from '../../../constants';
import { DateSegment } from '../../../types';

export const segmentWidthStyles: Record<DateSegment, string> = {
  day: css`
    width: ${charsPerSegment.day * characterWidth.D}ch;
  `,
  month: css`
    width: ${charsPerSegment.month * characterWidth.M}ch;
  `,
  year: css`
    width: ${charsPerSegment.year * characterWidth.Y}ch;
  `,
};
