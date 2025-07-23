import { css } from '@leafygreen-ui/emotion';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

export const labelDescriptionContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[1]}px;
`;

export const wrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

export const largeLabelStyles = css`
  font-size: ${typeScales.large.fontSize}px;
  line-height: ${typeScales.large.lineHeight}px;
`;
