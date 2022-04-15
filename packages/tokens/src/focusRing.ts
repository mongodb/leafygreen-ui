import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Mode } from './mode';

export const focusRing = {
  default: {
    [Mode.Light]: css`
      box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
    `,
    [Mode.Dark]: css`
      box-shadow: 0 0 0 2px ${palette.black}, 0 0 0 4px ${palette.blue.light1};
    `,
  },
  input: {
    [Mode.Light]: css`
      box-shadow: 0 0 0 3px ${palette.blue.light1};
    `,
    [Mode.Dark]: css`
      box-shadow: 0 0 0 3px ${palette.blue.light1};
    `,
  },
} as const;
