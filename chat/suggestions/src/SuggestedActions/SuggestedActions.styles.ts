import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

export const baseContainerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[400]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

export const getSuggestedActionsWrapperStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.secondary.default};
  border: 1px solid ${color[theme].border.secondary.default};
  border-radius: ${borderRadius[300]}px;
  width: 100%;
  padding: ${spacing[300]}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  font-size: ${typeScales.body1.fontSize}px;
  color: ${color[theme].text.primary.default};
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const applyButtonStyles = css`
  width: 100%;
  font-weight: ${fontWeights.regular};
`;

export const boldedTextStyle = css`
  font-weight: ${fontWeights.bold};
`;

export const tableStyles = css`
  width: 100%;
  gap: ${spacing[200]}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const tableHeaderStyles = css`
  text-align: left;
  padding: ${spacing[50]}px 0;
`;

export const tableCellStyles = css`
  text-align: right;
  padding: ${spacing[50]}px 0;
`;
