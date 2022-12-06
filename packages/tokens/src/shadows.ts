import { transparentize } from 'polished';
import { palette } from '@leafygreen-ui/palette';

const shadows = {
  menu: `0px 4px 4px ${transparentize(0.75, '#000000')};`,
  card: `0px 4px 10px -4px ${transparentize(0.7, palette.black)};`,
  modal: `0px 8px 20px -8px ${transparentize(0.4, palette.black)};`,
} as const;

export default shadows;
