import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

export const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

// TODO: Refresh - Update this when DarkMode is designed
export const typeScale1 = css`
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0px;
`;

export const typeScale2 = css`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
`;

export const codeTypeScale2 = css`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0px;
`;
