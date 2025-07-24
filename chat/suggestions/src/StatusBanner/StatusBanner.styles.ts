import { css } from '@leafygreen-ui/emotion';
import { fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

export const bannerWrapperStyles = css`
  width: 100%;
  gap: ${spacing[200]}px;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  justify-content: space-between;
`;

export const boldedTextStyle = css`
  font-weight: ${fontWeights.bold};
`;

export const listStyles = css`
  padding-left: ${spacing[500]}px;
  line-height: ${typeScales.body1.lineHeight}px;
  margin: ${spacing[100]}px;
`;
