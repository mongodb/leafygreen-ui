import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

export const getSuggetionCardWrapperStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.secondary.default};
  border: 1px solid ${color[theme].border.secondary.default};
  border-radius: ${borderRadius[300]}px;
  width: 100%;
  padding: ${spacing[300]}px;
  gap: ${spacing[200]}px;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const applyButtonStyles = css`
  width: 100%;
  margin-top: ${spacing[200]}px;
  font-weight: ${fontWeights.regular};
`;

export const bannerWrapperStyles = css`
  width: 100%;
  gap: ${spacing[200]}px;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  margin-top: ${spacing[400]}px;
  justify-content: space-between;
`;

export const boldedTextStyle = css`
  font-weight: ${fontWeights.bold};
`;

export const tableStyles = css`
  width: 100%;
  gap: ${spacing[200]}px;
  line-height: ${typeScales.body1.lineHeight}px;
  margin-top: ${spacing[200]}px;
`;

export const tableHeaderStyles = css`
  text-align: left;
  padding: ${spacing[50]}px 0;
`;

export const tableCellStyles = css`
  text-align: right;
  padding: ${spacing[50]}px 0;
`;

export const listStyles = css`
  padding-left: ${spacing[500]}px;
  line-height: ${typeScales.body1.lineHeight}px;
  margin: ${spacing[100]}px;
`;
